import { Component, OnInit } from '@angular/core';

import { AuthService } from './user/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Optimistic Bearings';
  loggedIn = false;
  
  constructor( private authService: AuthService ) { }
  
  ngOnInit(): void {
    this.authService.isAuthenticated()
      .subscribe(
        result => {
          this.loggedIn = true;
        },
        error => {
          console.log(error);
          return false;  //overkill
        });
  }
  
}
