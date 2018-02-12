import { environment } from '../../../environments/environment';
import {Injectable} from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";

import { AwscogusermgrService } from '../../user/awscogusermgr/awscogusermgr.service';

import { List } from "../model/list";
//import {Course} from "../model/course";

@Injectable()
export class ListService {
    
    //setup_url = environment.setup_api_url;
    lists_url = environment.setup_api_url + 'list/';
    
    constructor(
        private http:Http,
        private awscogusermgrService:AwscogusermgrService
        ) {}
    
    getMyLists(): Observable<List[]> {
        console.log("GET WITH HEADERS");
        return this.http.get(this.lists_url, this.setup_opts())
            .pipe(
                map(res => res['payload'])
            );
    }
    /*
    getBooksWithObservable(): Observable<Book[]> {
        let uri = ""
        console.log("GET WITH HEADERS");
        return this.http.get(this.url + uri, this.setup_opts())
            .map(this.extractData)
	        .catch(this.handleErrorObservable);
    }
    */
    private setup_headers() {
        let headers = new Headers();  
        headers.append('Authorization', this.getAuth());
        headers.append('Content-Type', 'application/json');
        return headers
    }
    
    private setup_opts() {
        let opts = new RequestOptions();
        opts.headers = this.setup_headers();
        return opts
    }
    
    private getAuth() {
        let auth = '';
        // pull from local if valid, otherwise reauth.
        let myCognitoUser = this.awscogusermgrService.checkSession();
        auth = myCognitoUser.signInUserSession.getIdToken().getJwtToken();
        //auth = 'eyJraWQiOiJNMnZnMmdjQ2ZyZndCa0VRSnNUdTNjVlhOSDRcL250Nk9ZS2JCaVNZMmFyQT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiYWQwYjliYi02YWY4LTRhYmMtYjViYS0xYTMyMzczM2VlNDUiLCJhdWQiOiJkYTJqcGV0aXI3YXE2dW50b281M2FmbWRvIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV2ZW50X2lkIjoiNTNlMjFjNDQtMGU4MC0xMWU4LTkzNWItOGIwNjU4OGU5ZGI4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1MTgyODA0OTYsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yXzBvdzBiM0l6biIsImNvZ25pdG86dXNlcm5hbWUiOiJyb2JlcnQucC5tYXlAZ21haWwuY29tIiwiZXhwIjoxNTE4Mjg0MDk2LCJpYXQiOjE1MTgyODA0OTYsImVtYWlsIjoicm9iZXJ0LnAubWF5QGdtYWlsLmNvbSJ9.OkBGtzt_b0cGTS6lr6prqIeyCiTmSrPAFiRw8naMccArE96ee9odL1U3twomEtsvJniMh6p439HD7kXbrzBJeNtpWaJWVejQBzea5lkAW1R0W-hOlrfafA3A7EJN_86QszKZUdJZPUI2ART7oBMqkA7e3QRxPXA4i34U_exlcQ7nSqNIlIxm8kSr6jJRDgQM877Nj1G3NutpPh13ZzfVbOkXb_0M52vIli9mfThp4N9AiVi-iQJlExzrCROTU17pMi8vh5HdJxicai0fi-aDO_oOvwCBUU7va23YAsu3bGWlFowceHn2mJhaZ2Z2bD6wdtbE69gVQWGFH17g4hVkEw'
        return auth
    }
    
/*
    findCourseById(courseId: number): Observable<Course> {
        return this.http.get<Course>(`/api/courses/${courseId}`);
    }

    findAllCourses(): Observable<Course[]> {
        return this.http.get('/api/courses')
            .pipe(
                map(res => res['payload'])
            );
    }

    findAllCourseLessons(courseId:number): Observable<Lesson[]> {
        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('pageNumber', "0")
                .set('pageSize', "1000")
        }).pipe(
            map(res =>  res["payload"])
        );
    }

    findLessons(
        courseId:number, filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3):  Observable<Lesson[]> {

        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res =>  res["payload"])
        );
    }
*/
}