import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { IndexComponent } from './layouts/index/index.component';
import { MainComponent } from './layouts/main/main.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { HorseBetComponent } from './views/pages/horse-bet/horse-bet.component';
import { ProfileComponent } from './views/pages/profile/profile.component';
import { UsersComponent } from './views/pages/users/users.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RecoveryPasswordComponent } from './views/auth/recovery-password/recovery-password.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { LandingComponent } from './views/landing/landing.component';
import { DetailBetsComponent } from './views/pages/detail-bets/detail-bets.component';

const routes: Routes = [
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
  // admin views
   {
    path: "pages",
    component: MainComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "horse-bet", component: HorseBetComponent },
      { path: "profile", component: ProfileComponent },
      { path: "users", component: UsersComponent },
      { path: "detail-bets/:id", component: DetailBetsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  { 
    path: "", 
    component: IndexComponent,
    children:[
      { path: "", component: LandingComponent }
    ]
  },
  //{ path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
