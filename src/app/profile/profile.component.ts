import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { AwscogusermgrService } from '../awscogusermgr/awscogusermgr.service';
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

  constructor(public router: Router, private awscogusermgrService: AwscogusermgrService) { 
    this.username=""; 
    this.subscription = this.awscogusermgrService.retOb()
      .subscribe(userprops => { this.userprops = userprops; });
  }

  ngOnInit() {
    console.log("Requesting Attributes")
    if (this.awscogusermgrService.checkSession()) {
      this.awscogusermgrService.getCognitoUserDetails();
      console.log("Call Returned");
    } else {
      // Wait for login to come back
      setTimeout(()=>{ this.awscogusermgrService.getCognitoUserDetails() }, 4000);
    }
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }

}
