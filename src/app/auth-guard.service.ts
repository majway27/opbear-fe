import { Injectable }   from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                       from '@angular/router';

import { Observable }   from 'rxjs/Observable';
import { fromPromise }  from 'rxjs/observable/fromPromise';

import { AuthService }  from './user/services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor( 
        private authService: AuthService,
        private router: Router ) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        if (!this.authService.isLoggedIn) {
            //console.log("special: not logged in");
            this.router.navigate(['/login']);
        }
        // Should only get here if user is logged in
        //console.log("auth guard good");
        //return this.authService.isLoggedIn;
        return true;
    }

}