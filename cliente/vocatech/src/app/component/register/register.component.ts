//ViewChild se usará para poder formatear el formulario en la vista
import { Component, OnInit, ViewChild } from '@angular/core';
//importar servicio
import {AuthenticationService} from '../../services/authentication.service';
//Implementado Formulario reactivo
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Token} from '../../shared/token';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('fform') formTemplate;
  user = {};
  registro: FormGroup;
  constructor(private http: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.register();
    this.createForm();
  }

  createForm(){
    this.registro = this.formBuilder.group({
      username: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      pass: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  onSubmit(){
    let usuario = JSON.stringify(this.registro.value);
    this.registro.reset({
      username: '',
      email: '',
      pass: ''
    });
    this.formTemplate.resetForm();
  }

  register():void{
    //this.http.getToken().subscribe(books=>console.log(books));
    let miToken: Token;
    this.http.signup(this.user).subscribe(resp=>console.log(resp['message']));
  }
}
