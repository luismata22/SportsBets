import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Authenticate } from '../models/security/Authenticate';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly USER_STATE = '_USER_STATE';
  private readonly REMEMBER_ME = '_REMEMBER_ME';
  private readonly ACCESS_STATE = '_ACCESS_STATE';
  private server: string = environment.API_URL; //This variables is from enviroment.ts
  public currentUser: any;
  private services = {
    login: this.server + "api/login",
    logout: this.server + "api/logout",
  };

  constructor(
    private http: HttpClient) { }

  login( data ) {
    return this.http.get(this.services.login + "/" + data.username + "/" + data.password);
  }

  logout() {
    return this.http.get(this.services.logout)
  }

  resetPassword(data) {
    return this.http.post(this.server + "recover-password", data, {
      //headers: httpOptionsXTokenMmongo,
    });
  }

  setCurrentUser(user) {
    this.currentUser = user;
    this.storeTokens(user);
  }

  private storeTokens(data: Authenticate) {
    const item = {
      id: data.id,
      token: data.token,
      refreshToken: data.refreshToken,
      fullName: data.name + ' ' + data.lastName,
      email: data.email
    };
    localStorage.setItem(this.REMEMBER_ME, JSON.stringify(data.rememberMe));

    if (data.rememberMe) {
      localStorage.removeItem(this.USER_STATE);
      localStorage.setItem(this.USER_STATE, JSON.stringify(item));
    } else {
      sessionStorage.removeItem(this.USER_STATE);
      sessionStorage.setItem(this.USER_STATE, JSON.stringify(item));
    }

  }

  public removeTokens() {
    if (this.rememberMe === true) {
      localStorage.removeItem(this.USER_STATE);
    } else {
      sessionStorage.removeItem(this.USER_STATE);
    }
    localStorage.removeItem(this.REMEMBER_ME);
  }

  get rememberMe() {
    return localStorage.getItem(this.REMEMBER_ME) === 'true' ? true : false;
  }

  get idUser() {
    return this.storeUser?.id ?? '';
  }

  get entityName() {
    return this.storeUser?.fullName ?? '';
  }

  get userName() {
    return this.storeUser?.email ?? '';
  }

  get storeUser() {
    if (this.rememberMe === true) {
      return JSON.parse(localStorage.getItem(this.USER_STATE) || '{}');
    }
    return JSON.parse(sessionStorage.getItem(this.USER_STATE) || '{}');
  }
}
