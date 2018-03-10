import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { AwscogusermgrService } from '../awscogusermgr/awscogusermgr.service';
import { AuthService } from '../services/auth.service';
import { Userprop } from '../userprop/userprop';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

@Injectable()
export class ProfileComponent implements OnInit {

  userprops: Userprop[];
  errorMessage: String;
  subscription: Subscription;
  myUserName = "";

  constructor(
    public router: Router, 
    private awscogusermgrService: AwscogusermgrService,
    private authService: AuthService ) { 
    /*this.subscription = this.awscogusermgrService.retOb()
      .subscribe(userprops => { this.userprops = userprops; });*/
  }

  ngOnInit() {
    const myThis = this;
    
    this.authService.isAuthenticated()
      .subscribe(
        result => {
          this.myUserName = result.username;
          this.authService.myUserDetails(result)
              .subscribe(
                result => {
                  console.log(result);
                  this.userprops = result;
                },
                error => {
                    console.log(error);
                });
        },
        error => {
          console.log(error);
        });
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }

  s3Test() {
    this.awscogusermgrService.s3Test();
  }
  
  myLogout() {
    this.authService.logout();
  }
  
}
