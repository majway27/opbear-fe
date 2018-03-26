import { Injectable, OnDestroy }   from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                       from '@angular/router';

import { Observable }   from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthService }  from './user/services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    
    loggedIn = false;
    sessionSubscription: Subscription
    
    constructor( 
        private authService: AuthService,
        private router: Router ) { 
            this.sessionSubscription = this.authService.returnSessionSubject()
                .subscribe(flag => { this.loggedIn = flag; });
        }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        if (!this.loggedIn) {
            this.router.navigate(['/login']);
        }
        // Should only get here if user is logged in
        return true;
    }
    
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.sessionSubscription.unsubscribe();
    }

}