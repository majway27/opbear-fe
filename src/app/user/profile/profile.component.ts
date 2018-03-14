import { Component, OnInit } from '@angular/core';


import { AuthService } from '../services/auth.service';
import { Userprop } from '../model/userprop';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  userprops: Userprop[];
  errorMessage: String;
  myUserName = "";

  constructor(
    private authService: AuthService ) { 
  }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe(
        result => {
          this.myUserName = result.username;
          this.authService.myUserDetails(result)
              .subscribe(
                result => {
                  console.log(result);
                  this.userprops = result;
                },
                error => {
                    console.log(error);
                });
        },
        error => {
          console.log(error);
        });
  }

  myLogout() {
    this.authService.logout();
  }
  
}
