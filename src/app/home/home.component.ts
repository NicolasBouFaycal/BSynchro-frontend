import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private fb: FormBuilder,private dialogRef:MatDialog) { }

  newAccount = this.fb.group({
    initialCredit: [''],
    customerId:['']
  });

  openDialog(){
    this.dialogRef.open(PopupComponent,{
      data:{
        name:'nicolas'
      }
    });
  }
}
