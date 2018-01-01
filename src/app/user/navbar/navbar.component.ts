import { Component, OnInit } from '@angular/core';

import { Jwtauthsvchelper } from '../jwtauthsvchelper/jwtauthsvchelper.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'Optimistic Bearings';

  constructor(private  jwtauthsvchelper:  Jwtauthsvchelper) { }

  ngOnInit() {
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
