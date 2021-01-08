import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartasService } from 'src/app/services/cartas.service';
import { ConfigurationRouteService } from 'src/app/services/configurationRoute';
import { UserService } from 'src/app/services/user.service';
import { Baraja } from 'src/app/shared/models/baraja';
import { Carta } from 'src/app/shared/models/carta';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  title: string;
  displayedColumns: string[] = ['Palabra', 'Traducción', 'Guardar']
  endpoint: string;
  cards: Carta[] = [];
  public columnsToDisplay = ['Palabra', 'Traducción'];
  constructor(private dialogRef: MatDialogRef<CardsComponent>, @Inject(MAT_DIALOG_DATA) public deck: Baraja,
    private cartasService: CartasService, private userService: UserService) {
    this.endpoint = ConfigurationRouteService.url + `/cartas/${this.deck.ID}`;
    console.log('OBJETO RECIBIDO', this.deck)
  }

  ngOnInit(): void {
    console.log(this.deck);
    this.cartasService.getCartas(this.deck.ID, this.userService.getToken(), this.endpoint)
      .subscribe(cardsFromServer => {
        if (cardsFromServer['status']) {
          this.cards = cardsFromServer['data'];
          this.cards = this.cards.concat(this.cards);
        }
        console.log("Server decks", cardsFromServer);
      })
  }
  close() {
    this.dialogRef.close("Gracias por usar MatDialog");
  }

  allToggle(){

  }

  isAllSelected(){
    
  }
}
