import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Jwtauthsvchelper } from './user/jwtauthsvchelper/jwtauthsvchelper.service';

import { ConfirmationComponent } from './user/confirmation/confirmation.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SetupComponent } from './setup/setup.component';
import { SetuptableComponent } from './setup/setuptable/setuptable.component';
import { SetuplistitemComponent } from './setup/setuplistitem/setuplistitem.component';
import { SignupComponent } from './user/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent, canActivate: [Jwtauthsvchelper]  },
  { path: 'confirmation',  component: ConfirmationComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'logout',  component: LogoutComponent },
  { path: 'profile',  component: ProfileComponent, canActivate: [Jwtauthsvchelper] },
  { path: 'setup',  component: SetupComponent, canActivate: [Jwtauthsvchelper]  },
  { path: 'setup/:id',  component: SetuplistitemComponent, canActivate: [Jwtauthsvchelper]  },
  { path: 'setuptable',  component: SetuptableComponent, canActivate: [Jwtauthsvchelper]  },
  { path: 'signup',  component: SignupComponent },
  { path: 'unauthorized',  component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}