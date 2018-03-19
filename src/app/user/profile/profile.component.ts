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
  //userprops = [];
  

  constructor(
    private authService: AuthService ) { 
  }

  ngOnInit() {
    this.authService.myUserDetails()
      .subscribe(
        result => {
          console.log(result);
          this.myUserName = result.username;
          const myProp = new Userprop("ID",result.id);
          this.userprops = [myProp];
        },
        error => {
          console.log(error);
        });
  }

  myLogout() {
    this.authService.logout();
  }
  
}
