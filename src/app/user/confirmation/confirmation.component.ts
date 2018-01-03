import { environment } from '../../../environments/environment';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { AwscogusermgrService } from '../awscogusermgr/awscogusermgr.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(public router: Router, private awscogusermgrService: AwscogusermgrService) {
  }

  ngOnInit() {
  }
  
  confirmationCode = new FormControl('', [Validators.required, Validators.maxLength(6)]);
  
  submitCodeValue() {
    //event.preventDefault();
    //this.confirmationCode.setValue('675015');
    console.log("Submitted code: " + this.confirmationCode.value)
    console.log('Validation Status: ' + this.confirmationCode.status);
    console.log("Requesting Confirmation");
    this.awscogusermgrService.confirmCognitoUser(this.confirmationCode.value);
    console.log("Call Returned");
    this.awscogusermgrService.startCognitoSession(
      sessionStorage.username,
      sessionStorage.password
    );
    this.router.navigate(['dashboard']);
  }
  
  resetCode() {
      this.confirmationCode.reset(); 
  }
  
}
