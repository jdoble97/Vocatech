import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-navbar-desktop',
  templateUrl: './navbar-desktop.component.html',
  styleUrls: ['./navbar-desktop.component.css']
})
export class NavbarDesktopComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  logout(): void {
    Swal.fire({
      title: '¿Estás seguro que quieres salir?',
      text: "Tu sesión se cerrará",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Salir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.logoutUser();
        Swal.fire(
          'Sesión cerrada',
          'Has cerrado la sesión correctamente',
          'success'
        )
      }
    })

  }

}
