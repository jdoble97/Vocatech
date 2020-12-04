//ViewChild se usará para poder formatear el formulario en la vista
import { Component, OnInit, ViewChild } from '@angular/core';
//importar servicio
import {AuthenticationService} from '../../../services/authentication.service';
//Implementado Formulario reactivo
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Token} from '../../../shared/token';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('fform') formTemplate;
  registro: FormGroup;
  constructor(private http: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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
    this.register(usuario)
  }

  register(user): void{
    this.http.getTokenFromServer(user).subscribe(resp=>{
      if(resp['state']){
        this.http.setToken(resp);
        this.http.setTokenInLocalStorage();
        this.onSubmitSuccess();
      }else{
        this.onSubmitFail(resp['message']);
      }
    });
  }
  onSubmitSuccess(): void{
    this.registro.reset({
      username: '',
      email: '',
      pass: ''
    });
    //this.formTemplate.resetForm();
    console.log('Exito')
  }
  onSubmitFail(message: string): void{
    this.registro.reset({
      username: message,
      email: message,
      pass: message
    });
    this.formTemplate.resetForm();
    console.log('fail')
  }


}
