import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent { 
 
  title = 'Optimistic Bearings - Home';
  myUser = "";
  loggedIn = false;

  constructor( private authService: AuthService ) { }
  
  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn;
    //console.log("DC Logged in: " + this.authService.isLoggedIn);
    /*this.authservice.isAuthenticated()
      .subscribe(
        result => {
          //console.log(result);
          this.loggedIn = true;
          this.myUser = result.username;
        },
        error => {
          console.log(error);
          return false;
        });*/
  }

}