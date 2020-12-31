import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'vocatech';
  isLogin: boolean;
  
  constructor(private authServices: AuthenticationService, private userService: UserService ){
  }

  ngOnInit(){
    this.isLogin = this.userService.checkInit();
    this.userService.observerLogin.subscribe({
      next: (state)=> {
        this.isLogin = state
      }
    });

  }
}
