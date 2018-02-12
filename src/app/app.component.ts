import { Component } from '@angular/core';

import { Jwtauthsvchelper } from './user/jwtauthsvchelper/jwtauthsvchelper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Optimistic Bearings';
  
  constructor(private  jwtauthsvchelper:  Jwtauthsvchelper) { }
  
  loggedIn() {
    if (this.jwtauthsvchelper.loggedIn()) {
      //console.log("Localstorage getitem-jwt: " + localStorage.getItem('token')); 
      return true
    } else {
      return false
    }
  }
  
  getMyUser() {
    if (this.jwtauthsvchelper.getUserName()) {
      return this.jwtauthsvchelper.getUserName()
    } else {
      return false
    }
  }
  
}
