import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Token} from '../shared/token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  getTokenFromServer(user){
    let misHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    const url = 'http://localhost:7777/api/signup'
    return this.http.post(url, user,{headers: misHeaders});
  }

  sendCredentials(user) {
    let url = 'http://localhost:7777/api/login'
    let misHeaders = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post(url, user, {headers: misHeaders});
  }

}
