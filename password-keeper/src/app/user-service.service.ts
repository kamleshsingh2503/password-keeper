import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http : HttpClient) { }

  createUrl = "http://localhost:3000/app/user"

  createUser(data): Observable<any> {
      debugger;
    return this.http.post(this.createUrl , data);
    // this.loggedIn();
  }

  authUrl = "http://localhost:3000/app/user/auth";
  
  authUser(data): Observable<any> {
        debugger;
        return this.http.post(this.authUrl , data);
        // this.loggedIn();
    }

    websiteUrl = "http://localhost:3000/app/sites/list";

  getSites(data) : Observable<any> {
    return this.http.get(`${this.websiteUrl}/${data}`, {headers : new HttpHeaders({})});
  }

  loginSites = 'http://localhost:3000/app/sites'
  getLogins(data, userObject): Observable<any> {
      console.log(userObject);
    return this.http.post(`${this.loginSites}/${data}`, userObject);
  }

  
}
