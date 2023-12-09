import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { OpenAccount } from '../Models/OpenAccount-request';
import { ApiService } from '../services/api.service';
import { Transaction, UserInfo } from '../Models/api';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private url = environment.Url;
  displayedColumns: string[] = ['accountID', 'amount', 'timestamp'];
  dataSource:Transaction[]=[];

  firstName:string=""
  surName:string=""
  balance:string=""
  constructor(private api: ApiService, private fb: FormBuilder, private dialogRef: MatDialog, private http: HttpClient) { }

  newAccount = this.fb.group({
    initialCredit: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
    customerId: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
  });

  userInfo = this.fb.group({
    customerId: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
  });

  openDialog(responseMessage: any) {
    this.dialogRef.open(PopupComponent, {
      data: {
        name: responseMessage
      }
    });
  }

  addAccount() {
    const openAccount: OpenAccount = {
      customerID: this.newAccount.get('customerId')?.value,
      initialCredit: this.newAccount.get('initialCredit')?.value
    };


    this.api.createAccount(openAccount)
      .subscribe((res: any) => {
        this.openDialog(res.message);
      },
        error => {
          console.error('Error occurred:', error);
        })
  }
  getUserInfo() {
    this.api.getUserInfo(this.userInfo.get('customerId')?.value)
    .subscribe((res:any)=>{
      if(res.message){
        this.dataSource = [];
        this.firstName="";
        this.surName='';
        this.balance='';
        this.openDialog(res.message);
      }else{
        
        this.dataSource = res.transactions;
      }
    })
  }

  
}
