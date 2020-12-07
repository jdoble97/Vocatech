import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../shared/models/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = new User();
  observerLogin= new Subject<boolean>();
  constructor(private router: Router) { 
  }

  public sendState(state: boolean): void{
    this.user.status = state;
    this.observerLogin.next(state);
  }

  public setUser(user: User): void{
    this.user = user
  }

  public getUser(): User{
    return this.user;
  }

  checkInit(): boolean{
    console.log('Checkinit')
    let user = localStorage.getItem('user')
    if(user){
      this.user = JSON.parse(user);
      this.router.navigate(['home'])
      return true;
    }
    return false;
  }

  setUserInStorage(){
    localStorage.setItem('user', JSON.stringify(this.user))
  }

  logoutUser(){
    localStorage.clear();
    this.observerLogin.next(false);
    this.router.navigate(['/'])
  }
}
