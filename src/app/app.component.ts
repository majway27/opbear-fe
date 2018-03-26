import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './user/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Optimistic Bearings';
  loggedIn = false;
  sessionSubscription: Subscription
  
  constructor( private authService: AuthService ) { 
    this.sessionSubscription = this.authService.returnSessionSubject()
      .subscribe(flag => { this.loggedIn = flag; });
  }
  
  ngOnInit(): void {
    this.authService.isAuthenticated()
      .subscribe(
        result => {
          this.loggedIn = true;
          //console.log("AC Logged in: " + this.authService.isLoggedIn);
        },
        error => {
          console.log(error);
          //console.log("AC Logged in: " + this.authService.isLoggedIn);
        });
  }
  
  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.sessionSubscription.unsubscribe();
  }
  
}
