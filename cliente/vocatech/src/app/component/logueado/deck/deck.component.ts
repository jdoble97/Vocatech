import { Component, Input, OnInit } from '@angular/core';
import { Baraja } from 'src/app/shared/models/baraja';
//Modal
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CardsComponent } from '../cards/cards.component';


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

  public seeCards(id: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.deck;
     dialogConfig.height = "5000px";
     this.dialog.open(CardsComponent, dialogConfig);
  }

}
