import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AwscogusermgrService } from '../awscogusermgr/awscogusermgr.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private awscogusermgrService: AwscogusermgrService) {
  }

  ngOnInit() {
    this.awscogusermgrService.logoutUser();
    this.router.navigate(['login']);
  }

}
