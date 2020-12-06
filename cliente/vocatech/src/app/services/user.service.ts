import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = new User();
  observerLogin= new Subject<boolean>();
  constructor() { 
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
}
