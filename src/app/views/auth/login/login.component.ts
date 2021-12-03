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
  private readonly apikey = "Y25lpigIn2o/Ppdl3h8Uxe4fLdm06cVmQwslr9S5SfDx";
  agentId: number = 0;

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
    this._authService.signin()
      .subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp.success == true) {
            this.agentId = resp.agent_id;
          }
        },
        error => {
          const errorMessage = <any>error;
          if (errorMessage != null) {
            //this.generalFunctionsService.notifications('Usuario no válido, verifique sus credenciales', 'danger');\
          }
        }
      );
  }

  login() {
    this.submitted = true;
    var objectRequest =
    {
      "agentId": this.agentId,
      "username": this.user.email,
      "password": this.user.password,
      "apikey": this.apikey
    }

    // TODO: change when backend was ready
    this._authService.login(objectRequest)
      .subscribe(
        (resp: any) => {
          debugger;
          if (resp != null && resp.success == true) {
            this.userLogined = resp.client;
            //this.mapCodes();
            this._authService.setCurrentUser(resp.client);
            //this._authService.saveToken(resp.bearerToken);
            this.userLogged = resp.client;
            this.user.email = '';
            this.user.password = '';
            this.generalFunctionsService.notifications('Bienvenid@.', 'Autenticación exitosa', 'success');
            this.router.navigate(["pages/horse-bet"]);
          } else {
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
