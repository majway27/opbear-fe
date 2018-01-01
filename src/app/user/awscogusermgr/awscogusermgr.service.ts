import { environment } from '../../../environments/environment';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

import { Userprop } from '../userprop/userprop';

@Injectable()
export class AwscogusermgrService {
    
    region = environment.region;
    poolData = {
        UserPoolId : environment.userPoolId, // Your user pool id here
        ClientId : environment.clientId // Your client id here
    };
    userPool = new AmazonCognitoIdentity.CognitoUserPool(this.poolData);
    identityPoolId = environment.identityPoolId;

    authenticationData = {
        Username : localStorage.getItem('username'),
        Password : localStorage.getItem('password'),
    };
    authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(this.authenticationData);

    userData = {
        Username : '', // Set in addCognitoUser or startCognitoSession.  Barfs if this isn't a string type.
        Pool : this.userPool
    };
    cognitoUser = new AmazonCognitoIdentity.CognitoUser(this.userData);
    
    subject: Subject<Userprop[]> = new Subject<Userprop[]>();
    observableResp = new Array<Userprop>();
    
    constructor( private http: Http ) { }

    addCognitoUser(username, password): void {
        
        let myAuthenticationData = {
            Username : username,
            Password : password,
        };
        
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        
        AWSCognito.config.region = this.region;
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(this.poolData);
        var attributeList = [];
        var dataEmail = {
            Name : 'email',
            Value : myAuthenticationData.Username
        };
        /*var dataPhoneNumber = {
            Name : 'phone_number',
            Value : '+15555555555'
        };*/
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        //var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
        attributeList.push(attributeEmail);
        //attributeList.push(attributePhoneNumber);
        
        userPool.signUp(
            myAuthenticationData.Username, 
            myAuthenticationData.Password, 
            attributeList, 
            null, 
            function(err, result){
                if (err) {
                    alert(err);
                    return;
                }

                var cognitoUser = result.user
                console.log('user name is ' + cognitoUser.getUsername());
            }
        );
    }
    
    confirmCognitoUser(confirmationcode) {

        /*var userData = {
            Username : localStorage.getItem('username'),  // Should be set from addCognitoUser
            Pool : this.userPool
        };*/
        console.log("code: " + confirmationcode)
        
        //var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        this.cognitoUser.confirmRegistration(confirmationcode, true, function(err, result) {
            if (err) {
                alert(err);
                return;
            }
            console.log('call result: ' + result);
        });
    }

    startCognitoSession(username,password): void {
        
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        this.cognitoUser.username = localStorage.getItem('username');
        this.setPersistentSession();
        
        let myUserPool = this.userPool;  //cognitoUser.authenticateUser() callback support
        //var myCognitoUser = this.cognitoUser;
        var my_key = 'cognito-idp.' + this.region + '.amazonaws.com/' + this.poolData.UserPoolId
        this.cognitoUser.authenticateUser(this.getAuthenticationDetails(), {
            onSuccess: function (result) {
                
                localStorage.setItem('jwt_token', result.getAccessToken().getJwtToken());
                localStorage.setItem('username', myUserPool.getCurrentUser().getUsername());
                console.log("Localstorage currentuser: " + localStorage.getItem('username'));
                console.log("Localstorage getitem-jwt: " + localStorage.getItem('jwt_token'));

                AWSCognito.config.credentials = new AWSCognito.CognitoIdentityCredentials({
                    IdentityPoolId: this.identityPoolId, // your identity pool id here
                    Logins : {
                        // Change the key below according to the specific region your user pool is in.
                        my_key: result.getIdToken().getJwtToken()
                    }
                });
    
                //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                /*AWSCognito.config.credentials.refresh((error) => {
                    if (error) {
                         console.error(error);
                    } else {
                         // Instantiate aws sdk service objects now that the credentials have been updated.
                         // example: var s3 = new AWS.S3();
                         console.log('Successfully logged!');
                    }
                }); */
            
            },
    
            onFailure: function(err) {
                alert(err);
            },
        }); // end response
        console.log(this.cognitoUser.getSignInUserSession());
    }
    
    getCognitoUserDetails(): void {
        let selfob = this.observableResp;
        let selfsub = this.subject;
        
        selfob = []; //init if returning
        
        this.cognitoUser.getUserAttributes(function(err, result) {
            if (err) {
                alert(err);
                return;
            }
            for (let i = 0; i < result.length; i++) {
                let myProp = new Userprop(result[i].getName(),result[i].getValue());
                selfob.push(myProp);
            }
        });
        selfsub.next( selfob );
    }
    
    retOb(): Observable<Userprop[]> {
        return this.subject.asObservable();   
    }
    
    getAuthenticationDetails() {
        let authenticationData = {
            Username : localStorage.getItem('username'),
            Password : localStorage.getItem('password')
        };
        let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        return authenticationDetails;
    }
    
    checkSession() {
        if (!this.cognitoUser.getSignInUserSession()) {
            console.log("Need to refresh session")
            this.startCognitoSession(localStorage.getItem('username'),localStorage.getItem('password'));
            return false;
            //this.cacheMySession();
            //this.cognitoUser.refreshSession( localStorage.getItem('optimisticbearings.refreshToken'), function(result) {});
        } else {
            console.log(this.cognitoUser.getSignInUserSession());
            return true;
        }
        
    }
    
    setPersistentSession() {
        console.log("Persisting Session Info")
        
        let keyPrefix = `CognitoIdentityServiceProvider.${this.userPool.getClientId()}.${localStorage.getItem('username')}`;
        console.log('keyPrefix: ' + keyPrefix);
        
        let idTokenKey = `${keyPrefix}.idToken`;
        localStorage.setItem('optimisticbearings.idToken',  localStorage.getItem(idTokenKey));
        console.log('idToken: ' + localStorage.getItem('optimisticbearings.idToken'));
        
        let accessTokenKey = `${keyPrefix}.accessToken`;
        localStorage.setItem('optimisticbearings.accessToken', localStorage.getItem(accessTokenKey));
        console.log('accessToken: ' + localStorage.getItem('optimisticbearings.accessToken'));
        
        let refreshTokenKey = `${keyPrefix}.refreshToken`;
        localStorage.setItem('optimisticbearings.refreshToken', localStorage.getItem(refreshTokenKey));
        console.log('refreshToken: ' + localStorage.getItem('optimisticbearings.refreshToken'));
        
        let clockDriftKey = `${keyPrefix}.clockDrift`;
        localStorage.setItem('optimisticbearings.clockDrift', localStorage.getItem(clockDriftKey));
        console.log('clockDrift: ' + localStorage.getItem('optimisticbearings.clockDrift'));
        
    }
    
    cacheMySession() {
        console.log("Regenerating Local Session")
        
        let keyPrefix = `CognitoIdentityServiceProvider.${this.userPool.getClientId()}.${localStorage.getItem('username')}`;
        console.log('keyPrefix: ' + keyPrefix);
        
        let idTokenKey = `${keyPrefix}.idToken`;
        localStorage.setItem(idTokenKey,  localStorage.getItem('optimisticbearings.idToken'));
        console.log('idToken: ' + localStorage.getItem(idTokenKey));
        
        let accessTokenKey = `${keyPrefix}.accessToken`;
        localStorage.setItem(accessTokenKey, localStorage.getItem('optimisticbearings.accessToken'));
        console.log('accessToken: ' + localStorage.getItem(accessTokenKey));
        
        let refreshTokenKey = `${keyPrefix}.refreshToken`;
        localStorage.setItem(refreshTokenKey, localStorage.getItem('optimisticbearings.refreshToken'));
        console.log('refreshToken: ' + localStorage.getItem(refreshTokenKey));
        
        let clockDriftKey = `${keyPrefix}.clockDrift`;
        localStorage.setItem(clockDriftKey, localStorage.getItem('optimisticbearings.clockDrift'));
        console.log('clockDrift: ' + localStorage.getItem(clockDriftKey));
        
    }

}