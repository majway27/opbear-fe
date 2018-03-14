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

import { AuthService } from './user/services/auth.service';
import { AuthGuardService } from './auth-guard.service';
import { ListService } from './setup/services/list.service';

import { ConfirmationComponent } from './user/confirmation/confirmation.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';
import { GoogleSigninComponent } from './user/google-signin/google-signin.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SetupComponent, DialogAddSetupList, DialogRenameSetupList } from './setup/setup.component';
import { SetuplistComponent } from './setup/setuplist/setuplist.component';
import { SetuplistitemComponent, DialogAddSetupListItem, DialogRenameSetupListItem } from './setup/setuplistitem/setuplistitem.component';
import { SignupComponent } from './user/signup/signup.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GoogleSigninComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    ConfirmationComponent,
    SetupComponent, DialogAddSetupList, DialogRenameSetupList,
    SetuplistComponent,
    SetuplistitemComponent, DialogAddSetupListItem, DialogRenameSetupListItem,
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatButtonModule,MatButtonToggleModule,MatDialogModule, MatSnackBarModule,
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
  entryComponents: [ 
    DialogAddSetupList, 
    DialogRenameSetupList, 
    DialogAddSetupListItem, 
    DialogRenameSetupListItem 
    ],
  providers: [
    AuthService,
    AuthGuardService,
    ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
