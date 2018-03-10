import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from './user/services/auth.service';
import { AuthGuardService } from './auth-guard.service';

import { ConfirmationComponent } from './user/confirmation/confirmation.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SetupComponent } from './setup/setup.component';
import { SetuptableComponent } from './setup/setuptable/setuptable.component';
import { SetuplistitemComponent } from './setup/setuplistitem/setuplistitem.component';
import { SignupComponent } from './user/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent, canActivate: [AuthGuardService]  },
  { path: 'confirmation',  component: ConfirmationComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'profile',  component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'setup',  component: SetupComponent, canActivate: [AuthGuardService]  },
  { path: 'setup/:id',  component: SetuplistitemComponent, canActivate: [AuthGuardService]  },
  { path: 'setuptable',  component: SetuptableComponent, canActivate: [AuthGuardService]  },
  { path: 'signup',  component: SignupComponent },
  { path: 'unauthorized',  component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}