//ViewChild se usará para poder formatear el formulario en la vista
import { Component, OnInit, ViewChild } from '@angular/core';
//importar servicio
import {AuthenticationService} from '../../../services/authentication.service';
//Implementado Formulario reactivo
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { ConfigurationRouteService } from 'src/app/services/configurationRoute';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  @ViewChild('fform') formTemplate;

  registro: FormGroup;
  constructor(private http: AuthenticationService, private formBuilder: FormBuilder, private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.registro = this.formBuilder.group({
      Name: ['',Validators.required],
      EMAIL: ['',[Validators.required, Validators.email]],
      Pass: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  onSubmit(){
    let usuario = this.registro.value;
    this.register(usuario);
  }

  register(user:any): void{
    const url = ConfigurationRouteService.url+'/signup'
    this.http.getTokenFromServer(user, url).subscribe(resp=>{
      if(resp['status']){
        this.onSubmitSuccess();
        let userRegistered: User = {status: true, email: user['EMAIL'], name: user['Name'], pass: user['Pass']};
        this.userService.setUser(<User>resp);
        this.userService.sendState(true);
        this.userService.setUserInStorage();
        this.router.navigate(['home']);
      }else{
        this.onSubmitFail(resp['message'])
      }
    })
  }
  onSubmitSuccess(): void{
    this.registro.reset({
      Name: '',
      EMAIL: '',
      Pass: ''
    });
    this.formTemplate.resetForm();
  }
  onSubmitFail(message: string): void{
    this.registro.reset({
      Name: '',
      EMAIL: '',
      Pass: ''
    });
    this.formTemplate.resetForm();
    Swal.fire({
      icon: 'error',
      title: 'Aviso',
      text: message
    });
  }
}
