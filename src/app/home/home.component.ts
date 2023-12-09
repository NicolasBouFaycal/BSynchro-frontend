import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { OpenAccount } from '../Models/OpenAccount-request';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private url = environment.Url;

  constructor(private fb: FormBuilder,private dialogRef:MatDialog,private http:HttpClient) { }

  newAccount = this.fb.group({
    initialCredit: ['',[Validators.required,Validators.pattern(/^\d+(\.\d+)?$/)]],
    customerId:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]]
  });

  openDialog(responseMessage:string){
    this.dialogRef.open(PopupComponent,{
      data:{
        name:responseMessage
      }
    });
  }

  addAccount(){
    const openAccount: OpenAccount = {
      customerID:this.newAccount.get('customerId')?.value,
      initialCredit:this.newAccount.get('initialCredit')?.value
    };
    

    this.http.post(this.url+"/Accounts/OpenAccount",openAccount)
    .subscribe((res: any)=>{
      this.openDialog(res.message);
    },
    error => {
      console.error('Error occurred:', error);
      // Handle errors here
    })
  }
}
