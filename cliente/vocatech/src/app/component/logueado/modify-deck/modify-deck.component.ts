import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BarajaService } from 'src/app/services/baraja.service';
import { ConfigurationRouteService } from 'src/app/services/configurationRoute';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { EditDeckComponent } from '../edit-deck/edit-deck.component';

@Component({
  selector: 'app-modify-deck',
  templateUrl: './modify-deck.component.html',
  styleUrls: ['./modify-deck.component.css']
})
export class ModifyDeckComponent implements OnInit {

  public idLast: number;
  public idTemporary: number
  public numberDecks: number;
  public numberActual: number;
  public numberTemporary: number
  public decks: string[] = [];

  constructor(private deckService: BarajaService, private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {    
    this.deckService.getNumberDecks(this.userService.getToken())
      .subscribe(response => {        
        if (response['status']) {
          this.numberDecks = response['number']
          if (this.numberDecks > 0) {
            this.checkDecks();
          }
        }
      })

  }

  lastDecks() {
    if (this.numberActual > this.numberTemporary) {
      this.deckService.listDecks(ConfigurationRouteService.url + `/list-decks-before/${this.idTemporary}`, this.userService.getToken())
        .subscribe(response => {
          if (response['status']) {
            this.numberActual -= this.decks.length;
            this.decks = response['data'].reverse();
            this.idLast = this.decks[this.decks.length - 1]['ID'];
            this.idTemporary = this.decks[0]['ID'];
          }
        });
    }
  }
  nextDecks() {
    if (this.numberActual < this.numberDecks) {
      this.deckService.listDecks(ConfigurationRouteService.url + `/list-decks/${this.idLast}`, this.userService.getToken())
        .subscribe(response => {
          if (response['status']) {
            this.decks = response['data'];
            this.idTemporary = this.decks[0]['ID'];
            this.idLast = this.decks[this.decks.length - 1]['ID'];
            this.numberActual += this.decks.length;
          }
        });
    }
  }

  deleteDeck(deckInfo) {
    Swal.fire({
      title: '¿Quieres eliminar la baraja ?',
      text: deckInfo.Name,
      confirmButtonText: 'Borrar',
      showDenyButton: true,
      denyButtonText: 'Cancelar'
    })
      .then(result => {
        if (result.isConfirmed) {
          this.delete(deckInfo)
        }
      })
  }
  delete(deckInfo) {
    this.decks.splice(this.decks.indexOf(deckInfo), 1)
    this.deckService.deleteBaraja(ConfigurationRouteService.url + `/baraja/${deckInfo['ID']}`, this.userService.getToken())
      .subscribe(response => {
        this.updateCountDecks();
      })
  }

  updateCountDecks() {
    this.deckService.getNumberDecks(this.userService.getToken())
      .subscribe(response => {
        this.numberDecks = response['number'];
        this.checkDecks();
      })
  }

  checkDecks() {
    this.deckService.listDecks(ConfigurationRouteService.url + `/list-decks/0`, this.userService.getToken())
      .subscribe(response => {
        if (response['status'] && this.numberDecks>0) {
          this.decks = response['data'];
          this.numberActual = this.decks.length;
          this.numberTemporary = this.numberActual;
          this.idLast = this.decks[this.decks.length - 1]['ID'];
        }
      })
  }

  edit(id){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'editDialog';
    dialogConfig.disableClose = true;
    dialogConfig.data = id
    this.dialog.open(EditDeckComponent,dialogConfig)     
  }
}
