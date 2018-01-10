import { Component, OnInit } from '@angular/core';

import { Jwtauthsvchelper } from '../jwtauthsvchelper/jwtauthsvchelper.service';
//import { AwscogusermgrService } from '../awscogusermgr/awscogusermgr.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent { 
 
  title = 'Optimistic Bearings - Home';
 
  constructor(private  jwtauthsvchelper:  Jwtauthsvchelper) { }
  
  ngOnInit(): void {
  }

  loggedIn() {
    if (this.jwtauthsvchelper.loggedIn()) {
      //console.log("Localstorage getitem-jwt: " + localStorage.getItem('token')); 
      return true
    } else {
      return false
    }
  }
  
  getMyUser() {
    if (this.jwtauthsvchelper.getUser()) {
      return this.jwtauthsvchelper.getUser()
    } else {
      return false
    }
  }
  
}