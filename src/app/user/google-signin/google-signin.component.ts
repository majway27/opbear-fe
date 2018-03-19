import { Component, ElementRef, AfterViewInit } from '@angular/core';
declare const gapi: any;

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.css']
})
export class GoogleSigninComponent implements AfterViewInit {
  
  private clientId:string = '887583629397-8ep4fa6eo1epk2f7slphj28u23v63n56.apps.googleusercontent.com';
  
  private scope = [
    'profile', 'email'
  ].join(' ');

  public auth2: any;
  
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }
  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

        let profile = googleUser.getBasicProfile();
        /*console.log('Token: ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());*/
        
        const auth_obj = {};
        auth_obj['token'] = googleUser.getAuthResponse().id_token;
        auth_obj['expires_at'] = googleUser.getAuthResponse().expires_at;
        //console.log(profile)
        profile.id = profile.getId();
        profile.username = profile.getEmail();
        that.authService.googleLogin(auth_obj,profile)


      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(
    private element: ElementRef,
    private authService: AuthService
    ) {
    //console.log('ElementRef: ', this.element);
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
