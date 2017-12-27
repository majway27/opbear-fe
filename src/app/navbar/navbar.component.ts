import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'Optimistic Bearings';

  constructor() { }

  ngOnInit() {
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
    if (localStorage.getItem('current_user')) {
      //console.log("Localstorage getitem-jwt: " + localStorage.getItem('jwt_token')); 
      return localStorage.getItem('current_user')
    } else {
      return false
    }
  }

}
