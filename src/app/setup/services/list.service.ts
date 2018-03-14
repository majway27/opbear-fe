import { environment } from '../../../environments/environment';
import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/catch';

import { AuthService } from '../../user/services/auth.service';

import { List } from "../model/list";
import { Listitem } from "../model/listitem";


@Injectable()
export class ListService {
    
    lists_url = environment.setup_api_url + '/list';
    
    constructor(
        private http:Http,
        private authService:AuthService
        ) {}
    
    getAllMyLists(): Observable<List[]> {
        const myThis = this;
        const getAllMyListsCall$ = this.getAmplifyAuth().flatMap(
            function (session) {
                return myThis.getAllLists(
                    session.getSignInUserSession()
                        .getIdToken()
                            .getJwtToken(session))
            }
        );
        return getAllMyListsCall$;
    }
    
    getMyList(listId:string): Observable<List> {
        const myThis = this;
        const getMyListCall$ = this.getAmplifyAuth().flatMap(
            function (session) {
                return myThis.getList(
                    session.getSignInUserSession()
                        .getIdToken()
                            .getJwtToken(session),
                    listId
                )
            }
        );
        return getMyListCall$;
    }
    
    createMyList(myNewList: List) {
        const myThis = this;
        
        let payload = {
            "listid": myNewList.listid,
            "name": myNewList.name,
            "longDescription": myNewList.longDescription,
            "listitems": myNewList.listitems
            }
        
        const createMyListCall$ = this.getAmplifyAuth().flatMap(
            function (session) {
                return myThis.createList(
                    session.getSignInUserSession()
                        .getIdToken()
                            .getJwtToken(session),
                    payload
                )
            }
        );
        return createMyListCall$;
    }
    
    deleteMyList(listId:string) {
        const myThis = this;
        const deleteMyListCall$ = this.getAmplifyAuth().flatMap(
            function (session) {
                return myThis.deleteList(
                    session.getSignInUserSession()
                        .getIdToken()
                            .getJwtToken(session),
                    listId
                )
            }
        );
        return deleteMyListCall$;
    }
    
    updateMyList(updateThisList: List) {
        const myThis = this;
        // Since we have the complete list object at hand, pull id for uri build below.
        let setupListUpdateUrl = this.lists_url + '/' + updateThisList.listid;

        let payload = 
            {
                "name": updateThisList.name,
                "longDescription": updateThisList.longDescription,
                "status": updateThisList.status,
                "listitems": updateThisList.listitems
            }
        
        const updateMyListCall$ = this.getAmplifyAuth().flatMap(
            function (session) {
                return myThis.updateList(
                    session.getSignInUserSession()
                        .getIdToken()
                            .getJwtToken(session),
                    updateThisList.listid,
                    payload
                )
            }
        );
        return updateMyListCall$;
    }
    
    getAllLists(token: any): Observable<List[]> {
        return this.http.get(
            this.lists_url, 
            this.setupHeaders(token))
                .map(res => res.json())
                .catch(this.handleError);
    }
    
    private getList(token: any, listId:string): Observable<List> {
        return this.http.get(
            this.lists_url + '/' + listId, 
            this.setupHeaders(token))
                .map(res => res.json())
                .catch(this.handleError
            );
    }
    
    private createList(token: any, payload:any): Observable<List> {
        return this.http.post(
            this.lists_url,
            payload,
            this.setupHeaders(token))
                .map(res => res.json())
                .catch(this.handleError
            );
    }
    
    private deleteList(token: any, listId:string): Observable<List> {
        return this.http.delete(
            this.lists_url + '/' + listId, 
            this.setupHeaders(token))
                .map(res => res.json())
                .catch(this.handleError
            );
    }
    
    private updateList(token: any, listId:string, payload:any): Observable<List> {
        return this.http.put(
            this.lists_url + '/' + listId,
            payload,
            this.setupHeaders(token))
                .map(res => res.json())
                .catch(this.handleError
            );
    }
    
    private getAmplifyAuth(): Observable<any> {
        const auth$ = this.authService.isAuthenticated();
        return auth$;
    }
    
    private setupHeaders(token) {
        let opts = new RequestOptions();
        let headers = new Headers();  
        headers.append('Authorization', token);
        headers.append('Content-Type', 'application/json');
        opts.headers = headers;
        return opts
    }
    
    private handleError (error: Response | any) {
	    console.error(error.message || error);
	    return Observable.throw(error.status);
    }

}