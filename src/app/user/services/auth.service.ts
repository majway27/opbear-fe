import { environment } from '../../../environments/environment';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

import Amplify, { Auth, Cache } from 'aws-amplify';

@Injectable()
export class AuthService {
    
    //isLoggedIn = false;
    public isLoggedIn: Subject<boolean>;
    // store the URL so we can redirect after logging in
    redirectUrl: string;
    
    constructor( private router: Router, private zone:NgZone ) { 
        Amplify.configure(environment.obamplify)
        this.isLoggedIn = new Subject<boolean>();
        
        // Cover edge case of when browser has hard refresh by logged in user.
        /*if (localStorage.getItem('ob.username')) {
            console.log("Initializing Logged in User");
            this.login(
                localStorage.getItem('ob.username'),
                localStorage.getItem('ob.password'));
        }*/
    }
    
    signup(email, password) {
        let email_as_username = email;
        fromPromise(Auth.signUp(
            email_as_username,
            password,
            email
            )).subscribe(
                result => {
                    // Save these if cognito is happy with them
                    // Used later for auth-login
                    localStorage.setItem('ob.username', email);
                    localStorage.setItem('ob.password', password);
                    this.router.navigate(['confirmation']);
                },
                error => {
                    console.log(error);
                    console.log("Error: There was a problem with the submitted values.")
                    this.router.navigate(['signup']);
                });
    }
    
    confirm(confirmationCode) {
        fromPromise(Auth.confirmSignUp(
            localStorage.getItem('ob.username'),
            confirmationCode
            )).subscribe(
                result => {
                    console.log('Confirmation successful, logging in.')
                    //this.router.navigate(['login']);
                    this.login(localStorage.getItem('ob.username'),localStorage.getItem('ob.password'))
                },
                error => {
                    console.log(error);
                    alert("Error: There was a problem with the submitted code. Please try the 'Resend Code' link on this page.");
                    this.router.navigate(['confirmation']);
                });
    }
    
    regenerateConfirmationCode() {
        fromPromise(Auth.resendSignUp(
            localStorage.getItem('ob.username')
            )).subscribe(
                result => {
                    console.log('New confirmation code request successful, check email');
                    alert("New confirmation code request successful, please check your email and enter new code.")
                },
                error => {
                    console.log(error);
                    alert("Error: There was a problem with the request for a new code.");
                    this.router.navigate(['confirmation']);
                });
    }

    login(email, password) {
        fromPromise(Auth.signIn(email, password))
            .subscribe(
                result => {
                    //this.isLoggedIn = true;
                    this.isLoggedIn.next(true);
                    /*// Hang onto these in case page has full refresh.
                    // Also capture on each successful login in case this is a new device.
                    localStorage.setItem('ob.username', email);
                    localStorage.setItem('ob.password', password); */
                    this.zone.run(() => this.router.navigate(['/']));
                },
                error => {
                    console.log(error);
                });
    }
    
    googleLogin(response:any,userAttributesObj:any) {
        fromPromise(Auth.federatedSignIn(
            "google",
            response,
            userAttributesObj
            )).subscribe(
                result => {
                    //console.log("Google Login, go home")
                    //this.isLoggedIn = true;  
                    this.isLoggedIn.next(true);
                    // Fix for ngInit() not being fired on router load post gapi, gauth action.
                    this.zone.run(() => this.router.navigate(['/']));
                },
                error => {
                    console.log(error);
                });
    }
    
    myUserDetails(): any {
        return fromPromise(Auth.currentUserInfo());
    }
    
    logout() {
        fromPromise(Auth.signOut())
            .subscribe(
                result => {
                    //this.isLoggedIn = false;
                    this.isLoggedIn.next(false);
                    // Clear these
                    /*localStorage.removeItem('ob.username');
                    localStorage.removeItem('ob.password');*/
                    this.router.navigate(['/login']);
                },
                error => console.log(error)
            );
    }
    
    refreshCredentials(): Observable<any> {
        return fromPromise(Auth.currentCredentials());
    }
    
    isAuthenticated(): Observable<any> {
        //console.log("Checking currentAuthenticatedUser, current credentials source: " + Auth.credentials_source)
        return fromPromise(Auth.currentAuthenticatedUser());
    }
    
    returnSessionSubject(): Observable<boolean> {
        return this.isLoggedIn.asObservable();   
    }
    
    userFromLocalStorage() {
        const federatedInfo = Cache.getItem('federatedInfo');
        if (federatedInfo) {
            console.log("Google User was set locally");
            //this.isLoggedIn = true;
            this.isLoggedIn.next(true);
            this.goHome();  
        } else {
            const cognitoStorage$ = fromPromise(Auth.currentUserPoolUser())
            cognitoStorage$.subscribe(
                result => {
                    console.log("Cog User was set locally")
                    //this.isLoggedIn = true;
                    this.isLoggedIn.next(true);
                    this.goHome();
                },
                error => {
                    console.log("No locally stored user for any identity provider");
                }
            );
        }
    }
    
    goHome() {
        this.router.navigate(['dashboard']);
    }
    
}
