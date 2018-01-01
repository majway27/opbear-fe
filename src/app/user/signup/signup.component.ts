import { environment } from '../../../environments/environment';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { AwscogusermgrService } from '../awscogusermgr/awscogusermgr.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public router: Router, private awscogusermgrService: AwscogusermgrService) {
  }

  ngOnInit() {
  }
  
  usernamefc = new FormControl('', [Validators.required, Validators.minLength(3)]);
  passwordfc = new FormControl('', [Validators.required, Validators.minLength(6)]);
  
  submitSignUpValues() {
    event.preventDefault();
    //this.confirmationCode.setValue('675015');
    //console.log("Submitted code: " + this.confirmationCode.value)
    //console.log('Validation Status: ' + this.confirmationCode.status);
    if (typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      sessionStorage.username = this.usernamefc.value;
      sessionStorage.password = this.passwordfc.value;
    } else {
      // Sorry! No Web Storage support..
      alert("Sorry!  This application is only supported on modern browsers.")
    }
    console.log("Requesting SignUp");
    this.awscogusermgrService.addCognitoUser(
      this.usernamefc.value,
      this.passwordfc.value
    );
    console.log("Call Returned");
    //console.log("un:" + sessionStorage.username + " pwd: " + sessionStorage.password);
    this.router.navigate(['confirmation']);
  }
  
  resetSignUp() {
      this.usernamefc.reset();
      this.passwordfc.reset();
  }
  
  
}
