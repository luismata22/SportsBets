import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexNavbarComponent } from './components/navbars/index-navbar/index-navbar.component';
import { FooterComponent } from './components/footers/footer/footer.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthNavbarComponent } from './components/navbars/auth-navbar/auth-navbar.component';
import { FooterSmallComponent } from './components/footers/footer-small/footer-small.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminNavbarComponent } from './components/navbars/admin-navbar/admin-navbar.component';
import { HeaderStatsComponent } from './components/headers/header-stats/header-stats.component';
import { FooterAdminComponent } from './components/footers/footer-admin/footer-admin.component';
import { CardStatsComponent } from './components/cards/card-stats/card-stats.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { CardLineChartComponent } from './components/cards/card-line-chart/card-line-chart.component';
import { CardBarChartComponent } from './components/cards/card-bar-chart/card-bar-chart.component';
import { UserDropdownComponent } from './components/dropdowns/user-dropdown/user-dropdown.component';
import { ProfileComponent } from './views/pages/profile/profile.component';
import { HorseBetComponent } from './views/pages/horse-bet/horse-bet.component';
import { CardTableComponent } from './components/cards/card-table/card-table.component';
import { TableDropdownComponent } from './components/dropdowns/table-dropdown/table-dropdown.component';
import { IndexDropdownComponent } from './components/dropdowns/index-dropdown/index-dropdown.component';
import { MainComponent } from './layouts/main/main.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecoveryPasswordComponent } from './views/auth/recovery-password/recovery-password.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { UsersComponent } from './views/pages/users/users.component';
import { LandingComponent } from './views/landing/landing.component';
import { IndexComponent } from './layouts/index/index.component';
import { BarTopComponent } from './views/pages/horse-bet/bar-top/bar-top.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from './services/authentication.service';
import { HttpconfigInterceptor } from './interceptors/httpconfig.interceptor';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [
    AppComponent,
    IndexNavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    AuthNavbarComponent,
    FooterSmallComponent,
    SidebarComponent,
    AdminNavbarComponent,
    HeaderStatsComponent,
    FooterAdminComponent,
    CardStatsComponent,
    DashboardComponent,
    CardLineChartComponent,
    CardBarChartComponent,
    UserDropdownComponent,
    ProfileComponent,
    HorseBetComponent,
    CardTableComponent,
    TableDropdownComponent,
    IndexDropdownComponent,
    MainComponent,
    RecoveryPasswordComponent,
    UsersComponent,
    LandingComponent,
    IndexComponent,
    BarTopComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthenticationService,
    /* LogoutGuard,
    LoginGuard,
    {
      provide: LOCALE_ID,
      useValue: "es-CO",
    }, */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpconfigInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
