import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
//Formulario
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('formLogin') formLogin;
  //El nombre del FormGroup debe coincidir con el del template
  login: FormGroup;
  constructor(private http: AuthenticationService, private formBuilder: FormBuilder,
              private router: Router) { }

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
    console.log('Prueba del emitter')
    this.emitStateLogin(false)
    //this.router.navigate(['home']);
  }

  emitStateLogin(stateLogin: boolean){
    this.change.emit(stateLogin);
  }
}
