import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }     from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, 
MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, 
MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, 
MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, 
MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, 
MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, 
MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, 
MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';

import 'hammerjs';

import { AppComponent } from './app.component';

import { AwscogusermgrService } from './user/awscogusermgr/awscogusermgr.service';
import { Jwtauthsvchelper } from './user/jwtauthsvchelper/jwtauthsvchelper.service';
import { ListService } from './setup/services/list.service';

import { ConfirmationComponent } from './user/confirmation/confirmation.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
//import { NavbarComponent } from './user/navbar/navbar.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SetupComponent } from './setup/setup.component';
import { SetuplistComponent } from './setup/setuplist/setuplist.component';
import { SetuplistitemComponent } from './setup/setuplistitem/setuplistitem.component';
import { SetuptableComponent } from './setup/setuptable/setuptable.component';
import { SignupComponent } from './user/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    LogoutComponent,
    //NavbarComponent,
    SignupComponent,
    ConfirmationComponent,
    SetupComponent,
    SetuplistComponent,
    SetuplistitemComponent,
    SetuptableComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatButtonModule,MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,MatListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,MatSidenavModule,
    MatProgressBarModule,MatProgressSpinnerModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatTabsModule,
    MatToolbarModule,MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [AwscogusermgrService,Jwtauthsvchelper,ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
