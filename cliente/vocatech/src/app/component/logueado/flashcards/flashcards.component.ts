import { Component, OnInit } from '@angular/core';
import { BarajaService } from 'src/app/services/baraja.service';
import { UserService } from 'src/app/services/user.service';
import { Baraja } from 'src/app/shared/models/baraja';
//TODO: Permitir crear un dialog
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {

  public barajas: Baraja[]= [new Baraja()];
  constructor(private barajasService: BarajaService, private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.barajasService.selectBarajas(this.userService.getToken()).subscribe(barajas => {
      this.barajas = <Baraja[]>barajas['data'];
    })
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
}
