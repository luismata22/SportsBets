import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  collapseShow = "hidden";
  userLogged: any;
  
  constructor(private authService: AuthenticationService,
    private router: Router) {}

  ngOnInit() {
    this.userLogged = this.authService.storeUser;
  }

  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }

  logout() {
    this.authService.removeTokens();
          this.router.navigate(["auth/login"]);
    /* this.authService.logout()
      .subscribe(
        (resp: any) => {
          this.authService.removeTokens();
          this.router.navigate(["auth/login"]);
        }) */
  }
}
