import { environment } from '../../../environments/environment';
import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable} from "rxjs/Observable";
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import Amplify, { API } from 'aws-amplify';

import { AuthService } from '../../user/services/auth.service';

import { List } from "../model/list";
import { Listitem } from "../model/listitem";


@Injectable()
export class ListService {
    
    apiName = 'setupApi';
    setup_path = '/setup/list';
    
    constructor(
        private http:Http,
        private authService:AuthService
        ) { Amplify.configure(environment.obamplify) }
    
    getAllMyLists(): Observable<any> {
        let myInit = { // OPTIONAL
            headers: {}, // OPTIONAL
            response: true // OPTIONAL (return entire response object instead of response.data)
        }
        const call$ = fromPromise(
            API.get(
                this.apiName, 
                this.setup_path,
                myInit
            )
        )
        return call$;
    }
    
    getMyList(listId:string): Observable<any> {
        let myInit = { // OPTIONAL
            headers: {}, // OPTIONAL
            response: true // OPTIONAL (return entire response object instead of response.data)
        }
        const call$ = fromPromise(
            API.get(
                this.apiName, 
                this.setup_path + '/' + listId,
                myInit
            )
        )
        return call$;
    }
    
    createMyList(myNewList: List) {
        let payload = {
            "listid": myNewList.listid,
            "name": myNewList.name,
            "longDescription": myNewList.longDescription,
            "listitems": myNewList.listitems
            }
        let myInit = { // OPTIONAL
            body: payload,
            headers: {}, // OPTIONAL
            response: true // OPTIONAL (return entire response object instead of response.data)
        }
        const call$ = fromPromise(
            API.post(
                this.apiName,
                this.setup_path,
                myInit
            )
        )
        return call$;
    }
    
    deleteMyList(listId:string) {
        let myInit = { // OPTIONAL
            headers: {}, // OPTIONAL
            response: true // OPTIONAL (return entire response object instead of response.data)
        }
        const call$ = fromPromise(
            API.del(
                this.apiName, 
                this.setup_path + '/' + listId,
                myInit
            )
        )
        return call$;
    }
    
    updateMyList(updateThisList: List) {
        let payload = 
            {
                "name": updateThisList.name,
                "longDescription": updateThisList.longDescription,
                "status": updateThisList.status,
                "listitems": updateThisList.listitems
            }
        let myInit = { // OPTIONAL
            body: payload,
            headers: {}, // OPTIONAL
            response: true // OPTIONAL (return entire response object instead of response.data)
        }
        // Since we have the complete list object at hand, pull id for uri build below.
        const call$ = fromPromise(
            API.put(
                this.apiName, 
                this.setup_path + '/' + updateThisList.listid,
                myInit
            )
        )
        return call$;
    }
}