import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
// Compiler complains if this isnt included.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

public authLogin(email, password) {
    return this.http.get('http://localhost:3000/login?email='+email+'&password='+password ).map(
        (res) => res.json()
    );
}

public authSignup(email, password) {
    return this.http.get('http://localhost:3000/signup?email='+email+'&password='+password ).map(
        (res) => res.json()
    );
}

public authForgot(email) {
    return this.http.get('http://localhost:3000/forget?email='+email ).map(
        (res) => res.json()
    );
}


}
