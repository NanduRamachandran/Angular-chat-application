import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = environment.baseURL;
  subRoute= environment.subRoute;

  constructor(private http:HttpClient) { }

  GetRegisteredUsers(){
    let url = `${this.baseURL}/${this.subRoute}/GetRegisteredUsers`;
    return this.http.get<any>(url);
  }

  RegisterUser(name:string, email:string, password:string) {
    let url = `${this.baseURL}/${this.subRoute}/RegisterUser`;

    let data = {
      "name": name,
      "email": email,
      "password": password
    }

    return this.http.post<any>(url, data);
  }

  LoginUser(email:string, password:string) {
    let url = `${this.baseURL}/${this.subRoute}/login`;

    let data = {
      "email": email,
      "password": password
    }

    return this.http.post<any>(url, data);
  }
}
