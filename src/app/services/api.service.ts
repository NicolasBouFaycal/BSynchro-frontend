import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../Models/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = environment.Url;

  constructor(private http:HttpClient) { }

  createAccount(openAccount:any){
    return this.http.post(this.url+"/Accounts/OpenAccount",openAccount)
  }


  getUserInfo(customerId:any):Observable<UserInfo>{
    return this.http.get<UserInfo>(this.url+"/Accounts/UserInfo?customerId="+customerId);
  }
}
