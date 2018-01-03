import { environment } from '../../../environments/environment';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AwscogusermgrService } from '../awscogusermgr/awscogusermgr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {

  constructor(public router: Router, private awscogusermgrService: AwscogusermgrService) {
  }

  ngOnInit() {
  }

  login(username,password) {
    //event.preventDefault(); //Firefox issue
    console.log("Requesting Login");
    this.awscogusermgrService.startCognitoSession(username, password);
    console.log("Call Returned");
    this.router.navigate(['dashboard']);
  }
}