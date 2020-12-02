import { Component, OnInit } from '@angular/core';
//importar servicio
import {AuthenticationService} from '../../services/authentication.service';
//Implementado Formulario reactivo
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {};
  registro: FormGroup;
  constructor(private http: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.register();
    this.createForm();
  }

  createForm(){
    this.registro = this.formBuilder.group({
      username: '',
      email: '',
      pass: ''
    });
  }

  onSubmit(){
    let valores = this.registro.value;
    console.log(valores);
    this.registro.reset();
  }

  register():void{
    //this.http.getToken().subscribe(books=>console.log(books));
    this.http.signup(this.user).subscribe(resp=>console.log(resp));
  }
}
