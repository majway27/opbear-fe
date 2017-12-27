import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { AwscogusermgrService } from './awscogusermgr/awscogusermgr.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

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
