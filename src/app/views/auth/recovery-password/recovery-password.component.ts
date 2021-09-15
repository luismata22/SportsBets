import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {

  submitted: boolean;
  public pass: any;
  public user =
    {
      email: localStorage.getItem('email') || "",
      password: "",
      rememberMe: localStorage.getItem('rememberMe') as unknown as boolean || false
    }

  constructor(private _authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  resetPassword() {
    debugger;
    this.submitted = true;
    if (this.user.email != "") {
      var objectRequest = { "username": this.user.email }
      this._authService.resetPassword(objectRequest).subscribe(
        (data: any) => {
          this.pass = data;
          this.user.email = '';
          this.user.password = '';
          this.submitted = false;
          this.router.navigate(["auth/login"]);
        },
        (err) => {
  
  
          this.submitted = false;
  
          if (err.status == 404) {
            
          } else {
            
          }
        }
      );
    }
  }
}
