import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent { 
 
  title = 'Optimistic Bearings - Home';
  myUserName = "";

  constructor( private authService: AuthService ) { }
  
  ngOnInit(): void {
    this.authService.myUserDetails()
      .subscribe(
        result => {
          //console.log(result.username);
          this.myUserName = result.username;
        },
        error => {
          console.log(error);
        });
  }

}