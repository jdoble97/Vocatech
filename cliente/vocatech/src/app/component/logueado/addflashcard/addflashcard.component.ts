import { Component, OnInit } from '@angular/core';
import { ConfigurationRouteService } from 'src/app/services/configurationRoute';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
//Dialog
import {MatDialog} from '@angular/material/dialog';
import { ModifyDeckComponent } from '../modify-deck/modify-deck.component';
import { BarajaService } from 'src/app/services/baraja.service';
import { Baraja } from 'src/app/shared/models/baraja';


@Component({
  selector: 'app-addflashcard',
  templateUrl: './addflashcard.component.html',
  styleUrls: ['./addflashcard.component.css']
})
export class AddflashcardComponent implements OnInit {

  constructor(private userService: UserService, private dialog: MatDialog, private deckService: BarajaService) { }

  ngOnInit(): void {
  }

  addDeck(): void {
    Swal.fire({
      title: 'Escriba el nombre de la baraja',
      input: 'text',
      inputPlaceholder: 'Nombre de la baraja',
      confirmButtonText: 'Crear baraja',
      showDenyButton: true,
      denyButtonText: 'Cancelar'
    })
      .then(name=>{        
        if(name.isConfirmed){
          if(name.value.length<3){
            Swal.fire({
              icon: 'info',
              title: 'Debes escribir por lo menos 3 caracteres'
            });
          }else{
            this.createDeck(name.value);
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

  createDeck(name: string){
    let temporaryDeck: Baraja = {Name: name}    
    this.deckService.insertBaraja(ConfigurationRouteService.url+'/baraja',temporaryDeck, this.userService.getToken())
      .subscribe(response=>{        
        Swal.fire({
          icon: 'success',
          title: 'Baraja creada correctamente'
        })        
      })
    
    
  }
}