import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log("Logging Out");
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('current_user');
    this.router.navigate(['login']);
  }

}
