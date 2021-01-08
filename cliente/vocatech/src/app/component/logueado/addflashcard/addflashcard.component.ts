import { Component, OnInit } from '@angular/core';
import { ConfigurationRouteService } from 'src/app/services/configurationRoute';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
//Dialog
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ModifyDeckComponent } from '../modify-deck/modify-deck.component';


@Component({
  selector: 'app-addflashcard',
  templateUrl: './addflashcard.component.html',
  styleUrls: ['./addflashcard.component.css']
})
export class AddflashcardComponent implements OnInit {

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addDeck(): void {
    Swal.fire({
      title: 'Escriba el nombre de la baraja',
      input: 'text',
      inputPlaceholder: 'Nombre de la baraja',
      confirmButtonText: 'Crear baraja',
      showCancelButton: true
    })
      .then(value => {
        console.log(value);
        if (value.isConfirmed) {
          if (value.value.length < 3) {
            Swal.fire({
              icon: 'error',
              title: 'Debes escribir por lo menos tres caracteres',
            })
          } else {
            fetch(`${ConfigurationRouteService.url}/baraja`, {
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this.userService.getToken()}`
              },
              method: 'POST',
              body: this.userService.getUserCredentialsforPost(value.value),
            })
              .then(response => response.json())
              .then(data => {
                if (data.status) {
                  Swal.fire({
                    icon: 'success',
                    title: `${data.message}`
                  })
                }
              })
              .catch(err => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error de conexión'
                })
              })
          }
        }
      })
  }

  modifyDeck(): void {
    this.dialog.open(ModifyDeckComponent, {
      panelClass: 'dialogModify',
      //disableClose: true
    });
  }
}