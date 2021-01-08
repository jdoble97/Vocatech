import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../shared/models/user';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BarajaService } from './baraja.service';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRouteService } from './configurationRoute';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = new User();
  observerLogin = new Subject<boolean>();
  public numberDecks: number;
  constructor(private router: Router, private barajaService: BarajaService, private http: HttpClient) {
  }

  public sendState(state: boolean): void {
    this.user.status = state;
    this.observerLogin.next(state);
  }

  public setUser(user: User): void {
    this.user = user
  }

  public getUser(): User {
    return this.user;
  }

  checkInit(): boolean {
    console.log('Checkinit')
    let user = localStorage.getItem('user')
    if (user) {
      this.user = JSON.parse(user);
      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.router.navigate([this.router.url])
        }
      });
      return true;
    }
    return false;
  }

  setUserInStorage() {
    localStorage.setItem('user', JSON.stringify(this.user))
  }

  logoutUser() {
    localStorage.clear();
    this.observerLogin.next(false);
    this.router.navigate(['/login'])
  }
  getToken() {
    return this.user.token;
  }

  getNumberDecks() {
    return this.http.get(ConfigurationRouteService.url + '/number-decks', {
      headers: {
        Authorization: `Bearer ${this.user.token}`
      }
    });
  }
  getUserCredentialsforPost(name: string){
    return JSON.stringify({FK_Email: this.user.email, Name: name});
  }
}
