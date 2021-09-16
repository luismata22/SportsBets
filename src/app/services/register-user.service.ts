import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  private server: string = environment.API_URL; //This variables is from enviroment.ts

  constructor(private http: HttpClient) { }

  saveUser(data) {
    return this.http.post(this.server+"/register-user", data);
  }
}
