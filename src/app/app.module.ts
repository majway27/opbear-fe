import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { AwscogusermgrService } from './user/awscogusermgr/awscogusermgr.service';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { LogoutComponent } from './user/logout/logout.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { SignupComponent } from './user/signup/signup.component';
import { ConfirmationComponent } from './user/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    LogoutComponent,
    NavbarComponent,
    SignupComponent,
    ConfirmationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [AwscogusermgrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
