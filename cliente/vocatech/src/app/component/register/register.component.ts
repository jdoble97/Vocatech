import { Component, OnInit } from '@angular/core';
//importar servicio
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {};
  constructor(private http: AuthenticationService) { }

  ngOnInit(): void {
    this.register();
  }

  register():void{
    //this.http.getToken().subscribe(books=>console.log(books));
    this.http.signup(this.user).subscribe(resp=>console.log(resp));
  }
}
