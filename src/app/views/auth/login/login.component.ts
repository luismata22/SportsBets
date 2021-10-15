import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rememberMe: boolean;
  submitted: boolean;
  public userLogined: any;
  public userLogged: any;

  public user =
    {
      email: localStorage.getItem('email') || "", //admin@correo.com
      password: "", //12345
      rememberMe: localStorage.getItem('rememberMe') as unknown as boolean || false
    }

  constructor(
    private _authService: AuthenticationService,
    private router: Router,
    private generalFunctionsService: GeneralFunctionsService) { }

  ngOnInit(): void {
  }

  login() {
    this.submitted = true;
    var objectRequest =
    {
      "username": this.user.email,
      "password": this.user.password
    }

    // TODO: change when backend was ready
    this._authService.login(objectRequest)
      .subscribe(
        (resp: any) => {
          if (resp != null) {
            this.userLogined = resp;
            //this.mapCodes();
            this._authService.setCurrentUser(resp);
            //this._authService.saveToken(resp.bearerToken);
            this.userLogged = resp.userInfo;
            this.user.email = '';
            this.user.password = '';
            this.generalFunctionsService.notifications('Bienvenid@.', 'Autenticación exitosa', 'success');
            this.router.navigate(["pages/dashboard"]);
          }else{
            this.generalFunctionsService.notifications('Usuario o contraseña incorrectos.', 'Autenticación inválida', 'error');
          }
          this.submitted = false;
        },
        error => {
          const errorMessage = <any>error;
          if (errorMessage != null) {
            //this.generalFunctionsService.notifications('Usuario no válido, verifique sus credenciales', 'danger');\
          }
          this.submitted = false;
        }
      );
  }

  checkValue(event: any) {
    this.rememberMe = event.target.checked;
    if (this.rememberMe) {
      localStorage.setItem("email", this.user.email);
      localStorage.setItem("rememberMe", JSON.stringify(this.rememberMe));
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("rememberMe");
    }
  }
}
