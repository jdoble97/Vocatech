import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/observable';
import {Token} from '../shared/token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  getToken(){
    const url = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get(url);
  }
  signup(user){
    let misHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    //TODO: sustituir el body por el user que reciba el usuario
    let body = JSON.stringify({
      username: 'jorge gonzalez',
      email: 'jorge@gmail.com',
      pass: '123456'
    })
    const url = 'http://localhost:7777/api/signup'
    return this.http.post(url, body,{headers: misHeaders});

  }
}
