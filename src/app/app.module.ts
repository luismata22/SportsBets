import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './views/index/index.component';
import { IndexNavbarComponent } from './components/navbars/index-navbar/index-navbar.component';
import { FooterComponent } from './components/footers/footer/footer.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthNavbarComponent } from './components/navbars/auth-navbar/auth-navbar.component';
import { FooterSmallComponent } from './components/footers/footer-small/footer-small.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminNavbarComponent } from './components/navbars/admin-navbar/admin-navbar.component';
import { HeaderStatsComponent } from './components/headers/header-stats/header-stats.component';
import { FooterAdminComponent } from './components/footers/footer-admin/footer-admin.component';
import { CardStatsComponent } from './components/cards/card-stats/card-stats.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { CardLineChartComponent } from './components/cards/card-line-chart/card-line-chart.component';
import { CardBarChartComponent } from './components/cards/card-bar-chart/card-bar-chart.component';
import { UserDropdownComponent } from './components/dropdowns/user-dropdown/user-dropdown.component';
import { ProfileComponent } from './views/admin/profile/profile.component';
import { HorseBetComponent } from './views/admin/horse-bet/horse-bet.component';
import { CardTableComponent } from './components/cards/card-table/card-table.component';
import { TableDropdownComponent } from './components/dropdowns/table-dropdown/table-dropdown.component';
import { IndexDropdownComponent } from './components/dropdowns/index-dropdown/index-dropdown.component';
import { MainComponent } from './layouts/main/main.component';
import { BetsComponent } from './views/pages/bets/bets.component';
import { BarTopComponent } from './views/pages/bets/bar-top/bar-top.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecoveryPasswordComponent } from './views/auth/recovery-password/recovery-password.component';
import { RouterModule } from '@angular/router';
import { DetailBetsComponent } from './views/pages/detail-bets/detail-bets.component';
import { DataTablesModule } from 'angular-datatables';
import { UsersComponent } from './views/admin/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    IndexNavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    AuthNavbarComponent,
    FooterSmallComponent,
    AdminComponent,
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
    BarTopComponent,
    IndexDropdownComponent,
    MainComponent,
    BetsComponent,
    RecoveryPasswordComponent,
    DetailBetsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
