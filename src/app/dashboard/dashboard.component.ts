import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent { 
 
  constructor() { }
  
  ngOnInit(): void {
  }

  loggedIn() {
    //console.log("Checking Login Status")
    //event.preventDefault();
    if (localStorage.getItem('jwt_token')) {
      //console.log("Localstorage getitem-jwt: " + localStorage.getItem('jwt_token')); 
      return true
    } else {
      return false
    }
  }
  
  getMyUser() {
    //console.log("Checking Login Status")
    //event.preventDefault();
    if (localStorage.getItem('username')) {
      //console.log("Localstorage getitem-jwt: " + localStorage.getItem('jwt_token')); 
      return localStorage.getItem('username')
    } else {
      return false
    }
  }
}