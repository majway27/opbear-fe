import { environment } from '../../../environments/environment';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AwscogusermgrService } from '../awscogusermgr/awscogusermgr.service';
import { Jwtauthsvchelper } from '../jwtauthsvchelper/jwtauthsvchelper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {

  constructor(
    public router: Router, 
    private awscogusermgrService: AwscogusermgrService,
    private  jwtauthsvchelper:  Jwtauthsvchelper) {
  }

  ngOnInit() {}

  login(username,password) {
    //event.preventDefault(); //Firefox issue
    console.log("Requesting Login");
    this.awscogusermgrService.firstLogin(
      username, 
      password, 
      this
    );
    //console.log("Call Returned");
  }
  
  goHome() {
    this.jwtauthsvchelper.goHome()
  }
  
}