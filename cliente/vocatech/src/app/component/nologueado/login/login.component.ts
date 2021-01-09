import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
//Formulario
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
//
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin;
  //El nombre del FormGroup debe coincidir con el del template
  login: FormGroup;

  constructor(private http: AuthenticationService, private formBuilder: FormBuilder,
    private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.createLogin();
  }

  createLogin(): void{
    this.login = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void{
    let user = JSON.stringify(this.login.value);
    this.http.sendCredentials(user).subscribe(resp=>{
      if(resp['status']){
        this.onSubmitSuccess(<User>resp);
      }
      else{
        this.onSubmitError(resp['message']);
      }
    })
  }

  onSubmitSuccess(user:User): void{
    this.userService.setUser(user);
    this.userService.sendState(true);
    this.login.reset({
      email:'',
      pass: ''
    });
    this.formLogin.resetForm();
    this.userService.setUserInStorage();
    this.router.navigate(['home']);
  }
  onSubmitError(message: string): void{
    this.login.reset({
      email: '',
      pass: ''
    });
    this.formLogin.resetForm();
    this.errorModal(message);
  }

  errorModal(message: string){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    })
  }
}
