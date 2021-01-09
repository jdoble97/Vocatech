import { Component, Input, OnInit } from '@angular/core';
import { Baraja } from 'src/app/shared/models/baraja';
//Modal
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CardsComponent } from '../cards/cards.component';
import { EditDeckComponent } from '../edit-deck/edit-deck.component';


@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  @Input() public deck: Baraja;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public seeCards(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = this.deck;
    dialogConfig.panelClass = "cardsModal";
    this.dialog.open(CardsComponent, dialogConfig);
  }

  public editCard(id){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'editDialog';
    dialogConfig.disableClose = true;
    dialogConfig.data = id
    this.dialog.open(EditDeckComponent,dialogConfig) 
  }

}
