import { environment } from '../../../environments/environment';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

import { Userprop } from '../userprop/userprop';

@Injectable()
export class AwscogusermgrService {

    constructor( private http: Http ) {}
    
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

        var userData = {
            Username : localStorage.getItem('username'),  // Should be set from addCognitoUser
            Pool : this.userPool
        };
        console.log("code: " + confirmationcode)
        console.log("cogUser-username: " + this.cognitoUser.username)
        
        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        cognitoUser.confirmRegistration(confirmationcode, true, function(err, result) {
            if (err) {
                alert(err);
                return;
            }
            console.log('call result: ' + result);
        });
    }

    startCognitoSession(username: string, password:string): void {
        
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        this.cognitoUser.username = localStorage.getItem('username');
        this.setPersistentSession();
        
        let myUserPool = this.userPool;  //cognitoUser.authenticateUser() callback support
        this.cognitoUser.authenticateUser(this.getAuthenticationDetails(), {
            onSuccess: function (result) {
                
                localStorage.setItem('token', result.getAccessToken().getJwtToken());
                localStorage.setItem('username', myUserPool.getCurrentUser().getUsername());
                localStorage.setItem('sts_token', result.getIdToken().getJwtToken())
                //console.log("Localstorage currentuser: " + localStorage.getItem('username'));

                AWS.config.region = environment.region;
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: environment.identityPoolId,
                    //Logins : {
                    Logins: {}
                        // Change the key below according to the specific region your user pool is in.
                        //: result.getIdToken().getJwtToken()
                       //'cognito-idp.us-west-2.amazonaws.com/us-west-2_3O2OnecGV' : result.getIdToken().getJwtToken()
                       //'cognito-idp.' + environment.region + '.amazonaws.com/' + environment.userPoolId : result.getIdToken().getJwtToken()
                    //}
                });
                let my_key = 'cognito-idp.' + environment.region + '.amazonaws.com/' + environment.userPoolId;
                AWS.config.credentials.params.Logins[my_key] = result.getIdToken().getJwtToken()
                //console.log(AWSCognito.config.credentials.params)
                //console.log("Localstorage getitem-jwt: " + localStorage.getItem('sts_token'))
                
                //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                AWS.config.credentials.refresh((error) => {
                    if (error) {
                         console.error(error);
                    } else {
                        // Instantiate aws sdk service objects now that the credentials have been updated.
                        /*var s3 = new AWS.S3();
                         
                        var params = {
                          Bucket: "test-app.optimisticbearings.majway.com", 
                          MaxKeys: 50
                         };
                        s3.listObjects(params, function(err, data) {
                            if (err) {
                                console.log(err, err.stack); // an error occurred
                            } else {     
                                console.log(data);           // successful response
                            }
                        });*/
                        console.log('Successfully logged!');
                    }
                });
            },
            onFailure: function(err) {
                alert(err);
            },
        }); // end response
        //console.log(this.cognitoUser.getSignInUserSession());
    }
    
    getCognitoUserDetails(): void {
        
        console.log("Requesting Attributes");
        
        let myCognitoUser = this.checkSession();
        
        let selfob = this.observableResp;
        let selfsub = this.subject;
        
        selfob = []; //init if returning
        
        myCognitoUser.getUserAttributes(function(err, result) {
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
    
    getUser() {
        if (this.cognitoUser.username == "") {
            console.log("cognitoUser was empty")
            var cognitoUser = this.userPool.getCurrentUser();
            console.log("Returning cognitoUser")
            console.log(cognitoUser)
            return cognitoUser
        } else {
            console.log("cognitoUser was set, returning")
            console.log(this.cognitoUser)
            return this.cognitoUser
        }
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
        let myCognitoUser = this.getUser();
        console.log("myCognitoUser.signInUserSession:")
        console.log(myCognitoUser.signInUserSession)
        
        // Do we need to login again due to full page refresh?
        if (myCognitoUser.signInUserSession) {
            myCognitoUser.getSession(function(err, session) {
                if (err) {
                    alert("Error getting session: " + err);
                    return;
                }
                console.log('session validity: ' + session.isValid());
            });
            return myCognitoUser;
        } else {
            console.log("No signInUserSession, logging in.");
            myCognitoUser.getSignInUserSession();
            console.log("myCognitoUser.signInUserSession:");
            console.log(myCognitoUser.signInUserSession);
            myCognitoUser.getSession(function(err, session) {
                if (err) {
                    alert("Error getting session: " + err);
                    return;
                }
                console.log('session validity: ' + session.isValid());
            });
            return myCognitoUser;
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

    s3Test() {
        
        AWS.config.region = environment.region;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId,
            //Logins : {
            Logins: {}
                // Change the key below according to the specific region your user pool is in.
                //: result.getIdToken().getJwtToken()
               //'cognito-idp.us-west-2.amazonaws.com/us-west-2_3O2OnecGV' : result.getIdToken().getJwtToken()
               //'cognito-idp.' + environment.region + '.amazonaws.com/' + environment.userPoolId : result.getIdToken().getJwtToken()
            //}
        });
        let my_key = 'cognito-idp.' + environment.region + '.amazonaws.com/' + environment.userPoolId;
        AWS.config.credentials.params.Logins[my_key] = localStorage.getItem('sts_token')
        //console.log("Localstorage getitem-jwt: " + localStorage.getItem('token'));
        
        AWS.config.credentials.refresh((error) => {
            if (error) {
                console.error(error);
            } else {
                var s3 = new AWS.S3();
                 
                var params = {
                  Bucket: "test-app.optimisticbearings.majway.com", 
                  MaxKeys: 50
                };
                s3.listObjects(params, function(err, data) {
                    if (err) {
                        console.log(err, err.stack); // an error occurred
                    } else {     
                        console.log(data);           // successful response
                    }
                });
            } // End if/else
        }); // End refresh
    } //End S3 Test

    logoutUser() {
        if (this.cognitoUser != null) {
            this.cognitoUser.signOut();
            console.log("Logging Out");
            localStorage.removeItem('token');
            localStorage.removeItem('sts_token');
            localStorage.removeItem('current_user');
        }
    }
    
    firstLogin(username:string,password:string, callback:any) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        this.cognitoUser.username = localStorage.getItem('username');
        this.setPersistentSession();
        
        let myUserPool = this.userPool;  //cognitoUser.authenticateUser() callback support
        this.cognitoUser.authenticateUser(this.getAuthenticationDetails(), {
            onSuccess: function (result) {
                
                localStorage.setItem('token', result.getAccessToken().getJwtToken());
                localStorage.setItem('username', myUserPool.getCurrentUser().getUsername());
                localStorage.setItem('sts_token', result.getIdToken().getJwtToken())
                //console.log("Localstorage currentuser: " + localStorage.getItem('username'));

                AWS.config.region = environment.region;
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: environment.identityPoolId,
                    //Logins : {
                    Logins: {}
                        // Change the key below according to the specific region your user pool is in.
                        //: result.getIdToken().getJwtToken()
                       //'cognito-idp.us-west-2.amazonaws.com/us-west-2_3O2OnecGV' : result.getIdToken().getJwtToken()
                       //'cognito-idp.' + environment.region + '.amazonaws.com/' + environment.userPoolId : result.getIdToken().getJwtToken()
                    //}
                });
                let my_key = 'cognito-idp.' + environment.region + '.amazonaws.com/' + environment.userPoolId;
                AWS.config.credentials.params.Logins[my_key] = result.getIdToken().getJwtToken()
                //console.log(AWSCognito.config.credentials.params)
                //console.log("Localstorage getitem-jwt: " + localStorage.getItem('sts_token'))
                
                //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                AWS.config.credentials.refresh((error) => {
                    if (error) {
                         console.error(error);
                    } else {
                        // Instantiate aws sdk service objects now that the credentials have been updated.
                        /*var s3 = new AWS.S3();
                         
                        var params = {
                          Bucket: "test-app.optimisticbearings.majway.com", 
                          MaxKeys: 50
                         };
                        s3.listObjects(params, function(err, data) {
                            if (err) {
                                console.log(err, err.stack); // an error occurred
                            } else {     
                                console.log(data);           // successful response
                            }
                        });*/
                        console.log('Successfully logged!');
                    }
                });
                callback.goHome();
            
            },
    
            onFailure: function(err) {
                alert(err);
            },
        }); // end response
        //console.log(this.cognitoUser.getSignInUserSession());
    }
}