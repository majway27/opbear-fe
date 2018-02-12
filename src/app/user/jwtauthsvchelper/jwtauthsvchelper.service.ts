import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { AwscogusermgrService } from '../awscogusermgr/awscogusermgr.service';

@Injectable()
export class Jwtauthsvchelper implements CanActivate {

  constructor(
    private router: Router,
    private awscogusermgrService: AwscogusermgrService
    ) {}

  canActivate() {
    if(this.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['unauthorized']);
      return false;
    }
  }

  loggedIn() {
    return tokenNotExpired();
  }
  
  getUserName() {
    /*if (localStorage.getItem('username')) {
      return localStorage.getItem('username')
    } else {
      return ""
    }*/
    let cognitoUser = this.awscogusermgrService.getUser();
    return cognitoUser.username
    
  }
  
  goHome() {
    this.router.navigate(['dashboard']);
  }

}