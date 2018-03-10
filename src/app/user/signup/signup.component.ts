import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor( private authService: AuthService ) { }

  usernamefc = new FormControl('', [Validators.required, Validators.minLength(3)]);
  passwordfc = new FormControl('', [Validators.required, Validators.minLength(8)]);
  
  submitSignUpValues() {

    if (typeof(Storage) !== "undefined") {
      console.log('Starting signup')
      this.authService.signup( this.usernamefc.value, this.passwordfc.value )

    } else {
      // Sorry! No Web Storage support..
      alert("Sorry!  This application is only supported on modern browsers.")
    }
    
  }
  
}