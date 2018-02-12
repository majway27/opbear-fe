import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { AwscogusermgrService } from '../awscogusermgr/awscogusermgr.service';
import { Jwtauthsvchelper } from '../jwtauthsvchelper/jwtauthsvchelper.service';
import { Userprop } from '../userprop/userprop';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

@Injectable()
export class ProfileComponent implements OnInit {

  username: string;
  userprops: Userprop[];
  errorMessage: String;
  subscription: Subscription;

  constructor(
    public router: Router, 
    private awscogusermgrService: AwscogusermgrService,
    private jwtauthsvchelper: Jwtauthsvchelper) { 
    this.username=""; 
    this.subscription = this.awscogusermgrService.retOb()
      .subscribe(userprops => { this.userprops = userprops; });
  }

  ngOnInit() {
    this.username = this.jwtauthsvchelper.getUserName();
    this.awscogusermgrService.getCognitoUserDetails();
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }

  s3Test() {
    this.awscogusermgrService.s3Test();
  }
  
  myLogout() {
    this.awscogusermgrService.logoutUser();
    this.router.navigate(['login']);
  }
  
}
