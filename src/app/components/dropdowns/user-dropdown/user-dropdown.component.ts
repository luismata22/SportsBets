import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { createPopper } from '@popperjs/core';
import { Authenticate } from 'src/app/models/security/Authenticate';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent implements AfterViewInit {

  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;
  userLogged: any;

  constructor(private authService: AuthenticationService,
    private router: Router) {
  }

  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
    this.userLogged = this.authService.storeUser;
    console.log(this.userLogged);
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
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
