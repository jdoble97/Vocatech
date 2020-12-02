import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/observable';
import {Token} from '../shared/token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token: Token;

  constructor(private http: HttpClient) { }

  getTokenFromServer(user){
    let misHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    //TODO: sustituir el body por el user que reciba el usuario
    // let body = JSON.stringify({
    //   username: 'jorge gonzalez',
    //   email: 'jorge@gmail.com',
    //   pass: '123456'
    // })
    const url = 'http://localhost:7777/api/signup'
    return this.http.post(url, user,{headers: misHeaders});
  }
  setToken(respToken): void{
    this.token= <Token> respToken;
  }
  setTokenInLocalStorage():void{
    console.log(this.token)
    localStorage.setItem('user', JSON.stringify(this.token))
  }
  
  getTokenFromLocalStorage(): boolean{
    if(localStorage.getItem('user')==null){
      return false;
    }
    this.token = JSON.parse(localStorage.getItem('user'));
    return true;
  }
  getToken(): Token{
    return this.token;
  }
  clearLocalStorage(): void{
    localStorage.clear();
  }
  
  checkTokenValidate(){
    let misHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token.myToken}`});
    let url = 'http://localhost:7777/api/check-token';
    this.http.get(url,{headers:misHeaders})
  }
}
