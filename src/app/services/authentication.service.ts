import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private server: string = environment.API_URL; //This variables is from enviroment.ts
  public currentUser: any;
  private services = {
    login: this.server + "/login/",
  };

  constructor(
    private http: HttpClient) { }

  login( data ) {
    return this.http.post(this.server + 'signin', data)
  }

  resetPassword(data) {
    return this.http.post(this.server + "recover-password", data, {
      //headers: httpOptionsXTokenMmongo,
    });
  }

  setCurrentUser(user) {
    this.currentUser = user;
    //localStorage.setItem(this.localData.access_token, user.bearerToken);
    //localStorage.setItem( this.localData.access_token, btoa(user.bearerToken);
    localStorage.setItem(
      //this.localData.currentUser,
      user,
      btoa(unescape(encodeURIComponent(JSON.stringify(user))))
    );
    //this.updateUserData.emit(user)
    //localStorage.setItem(this.localData.language, "es");
  }
}
