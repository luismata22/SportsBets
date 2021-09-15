import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { MainComponent } from './layouts/main/main.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { HorseBetComponent } from './views/admin/horse-bet/horse-bet.component';
import { ProfileComponent } from './views/admin/profile/profile.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RecoveryPasswordComponent } from './views/auth/recovery-password/recovery-password.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { IndexComponent } from './views/index/index.component';
import { BetsComponent } from './views/pages/bets/bets.component';

const routes: Routes = [
  // admin views
   {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      // { path: "settings", component: SettingsComponent },
      { path: "horse-bet", component: HorseBetComponent },
      { path: "profile", component: ProfileComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "recovery-password", component: RecoveryPasswordComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  // { path: "profile", component: ProfileComponent },
  // { path: "landing", component: LandingComponent }, */
  { 
    path: "", 
    component: MainComponent,
    children:[
      { path: "", component: IndexComponent },
      { path: "bets", component: BetsComponent },
      { path: "profile", component: ProfileComponent },
    ]
  },
  //{ path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
