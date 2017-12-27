import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'confirmation',  component: ConfirmationComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'logout',  component: LogoutComponent },
  { path: 'profile',  component: ProfileComponent },
  { path: 'signup',  component: SignupComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}