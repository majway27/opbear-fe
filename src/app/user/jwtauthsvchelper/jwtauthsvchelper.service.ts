import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class Jwtauthsvchelper implements CanActivate {

  constructor( private router: Router ) {}

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
  
  getUser() {
    if (localStorage.getItem('username')) {
      return localStorage.getItem('username')
    } else {
      return false
    }
  }

}