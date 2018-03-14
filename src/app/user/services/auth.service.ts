import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import Amplify, { Auth } from 'aws-amplify';

@Injectable()
export class AuthService {
    
    isLoggedIn = false;
    // store the URL so we can redirect after logging in
    redirectUrl: string;
    
    constructor( private router: Router ) { 
        Amplify.configure(environment.obamplify)
        
        // Cover edge case of when browser has hard refresh by logged in user.
        if (localStorage.getItem('ob.username')) {
            console.log("Initializing Logged in User");
            this.login(
                localStorage.getItem('ob.username'),
                localStorage.getItem('ob.password'));
        }
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
                    this.router.navigate(['login']);
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

    /* ToDo: Refactor for a "Remember Me" checkbox.  
      Better for users who might close the window 
      instead of logging out, for public machines, etc.
    */
    
    /* ToDo: Snackbars for each successful state change.  
      Also for rememberme execution, notifying user to 
      logout to clear creds on pub machine, etc.
    */
    
    /* ToDo: Improve validation on signup.
      min 8 char
      lowercase letter
      Need to provide guidance and feedback on entering valid password
    */
    
    /* ToDo: add updateAttributes functionality to enable changing email address */
    
    rememberme() {
        fromPromise(Auth.signIn(
            localStorage.getItem('ob.username'),
            localStorage.getItem('ob.password')
            )).subscribe(
                result => {
                    this.isLoggedIn = true;    
                    this.goHome();
                },
                error => {
                    console.log(error);
                    console.log("There was a problem with the Auth Service or local cached credentials");
                    // Prevent a look condition.  Annoying if Cognito is down(unlikely).
                    localStorage.removeItem('ob.username');
                    localStorage.removeItem('ob.password');
                    this.router.navigate(['login']);
                });
    }
    
    login(email, password) {
        fromPromise(Auth.signIn(email, password))
            .subscribe(
                result => {
                    this.isLoggedIn = true;    
                    // Hang onto these in case page has full refresh.
                    // Also capture on each successful login in case this is a new device.
                    localStorage.setItem('ob.username', email);
                    localStorage.setItem('ob.password', password);
                    this.goHome();
                },
                error => {
                    console.log(error);
                });
    }
    
    googleLogin() { return true }
    
    myUserDetails(cognitoUser): any {
        return fromPromise(Auth.userAttributes(cognitoUser));
    }
    
    logout() {
        fromPromise(Auth.signOut())
            .subscribe(
                result => {
                    this.isLoggedIn = false;
                    // Clear these
                    localStorage.removeItem('ob.username');
                    localStorage.removeItem('ob.password');
                    this.router.navigate(['/login']);
                },
                error => console.log(error)
            );
    }
    
    isAuthenticated(): Observable<any> {
        console.log("Checking currentAuthenticatedUser")
        return fromPromise(Auth.currentAuthenticatedUser());
    }
    
    /*getUserName(): Observable<any> {
        return fromPromise(Auth.currentUserInfo());
    }*/
    
    goHome() {
        this.router.navigate(['dashboard']);
    }
    
}
