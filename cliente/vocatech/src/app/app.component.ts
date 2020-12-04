import { Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'vocatech';
  login = {state:true};
  
  constructor(private authServices: AuthenticationService){}

  ngOnInit(){
    console.log('Dentro del app')
  }

  changeLogin(state: boolean){
    this.login.state = false;
    console.log("El emmit sirve")
  }

}
