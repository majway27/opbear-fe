import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthService ) {
  }
  
  ngOnInit() {
    // Auto-login if creds are present in local storage
    if (localStorage.getItem('ob.username')) {
      this.authService.rememberme();
    }
  }

  login(username,password) {
    this.authService.login(username,password)
  }
}