import { Component, OnInit } from '@angular/core';
import { RegisterUserService } from 'src/app/services/register-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted: boolean;
  public dataUser =
    {
      name: "",
      email: localStorage.getItem('email') || "",
      password: "",
    }
    private readonly apikey = "Y25lpigIn2o/Ppdl3h8Uxe4fLdm06cVmQwslr9S5SfDx";

  constructor(private registerUserService: RegisterUserService) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.submitted = true;
    var objectRequest =
    {
      "name": this.dataUser.name,
      "username": this.dataUser.email,
      "email": this.dataUser.email,
      "password": this.dataUser.password,
      "apikey": this.apikey
    }
    this.registerUserService.registerUser(objectRequest)
      .subscribe(
        (resp: any) => {
          /* if (resp != null) {
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
          } */
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
}
