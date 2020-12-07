//ViewChild se usará para poder formatear el formulario en la vista
import { Component, OnInit, ViewChild } from '@angular/core';
//importar servicio
import {AuthenticationService} from '../../../services/authentication.service';
//Implementado Formulario reactivo
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  @ViewChild('fform') formTemplate;

  registro: FormGroup;
  public messageError: boolean;
  message: string;
  private user: User;
  constructor(private http: AuthenticationService, private formBuilder: FormBuilder, private userService: UserService,
    private router: Router) { }

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
    this.register(usuario);
  }

  register(user): void{
    this.http.getTokenFromServer(user).subscribe(resp=>{
      if(resp['status']){
        this.onSubmitSuccess();
        this.userService.setUser(<User>resp);
        this.userService.sendState(true);
        this.userService.setUserInStorage();
        this.router.navigate(['home']);
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
    this.formTemplate.resetForm();
    console.log('Exito')
  }
  onSubmitFail(message: string): void{
    this.registro.reset({
      username: '',
      email: '',
      pass: ''
    });
    this.formTemplate.resetForm();
    this.message = message;
    this.messageError = true;
  }
}
