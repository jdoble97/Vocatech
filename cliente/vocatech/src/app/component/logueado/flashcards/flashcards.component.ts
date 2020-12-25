import { Component, OnInit } from '@angular/core';
import { BarajaService } from 'src/app/services/baraja.service';
import { UserService } from 'src/app/services/user.service';
import { Baraja } from 'src/app/shared/models/baraja';
//TODO: Permitir crear un dialog
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CardsComponent } from '../cards/cards.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {

  public barajas: Baraja[]= [new Baraja()];
  //
  public searchForm: FormGroup;
  constructor(private barajasService: BarajaService, private userService: UserService, private dialog: MatDialog,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.barajasService.selectBarajas(this.userService.getToken()).subscribe(barajas => {
      this.barajas = <Baraja[]>barajas['data'];
    })
    this.createForm();
  }

  seeDeckOfCards(id: number, name: string){
    console.log("ID: ", id, name)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: id,
      name: name
    }
    dialogConfig.height = "5000px";
    this.dialog.open(CardsComponent, dialogConfig);
  }
  //Cambios
  searchDeck(){
    //Buscar las paginas
    console.log();
  }

  createForm(){
    this.searchForm = this.fb.group({
      nameDeck: ["", [Validators.required, Validators.minLength(3)]]
    });
  }
}
