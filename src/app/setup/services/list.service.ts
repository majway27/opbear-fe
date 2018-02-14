import { environment } from '../../../environments/environment';
import {Injectable} from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable} from "rxjs/Observable";
import { map } from "rxjs/operators";
import 'rxjs/add/operator/catch';

import { AwscogusermgrService } from '../../user/awscogusermgr/awscogusermgr.service';

import { List } from "../model/list";
//import {Course} from "../model/course";

@Injectable()
export class ListService {
    
    lists_url = environment.setup_api_url + 'list/';
    
    constructor(
        private http:Http,
        private awscogusermgrService:AwscogusermgrService
        ) {}
    
    getAllMyLists(): Observable<List[]> {
        return this.http.get(this.lists_url, this.setup_opts())
	        .map(this.extractData)
	        .catch(this.handleError);
    }
    
    createList(myNewList: List) {
        let payload = {
            "name": myNewList.name,
            "longDescription": myNewList.longDescription
        }
        
        const network$ = this.http.post(this.lists_url, 
            //JSON.stringify({myNewList}),
            payload,
            this.setup_opts());

        network$.subscribe(
            () => console.log('HTTP post successful !'),
            err => console.error(err),
            () => console.log('monitoring completed ...')

        );

        return network$;
    }
    
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
        return auth
    }
    
    private extractData(res: Response): Observable<List[]> {
	    let body = res.json();
	    //console.log(body)
        return body;
    }
    
    private handleError (error: Response | any) {
	    console.error(error.message || error);
	    return Observable.throw(error.status);
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