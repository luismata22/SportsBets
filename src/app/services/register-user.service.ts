import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  private server: string = environment.API_URL; //This variables is from enviroment.ts
  public currentUser: any;
  private services = {
    register: this.server + "api/register-user",
  };

  constructor(private http: HttpClient) { }

  registerUser(data) {
    return this.http.post(this.services.register, data);
  }
}
