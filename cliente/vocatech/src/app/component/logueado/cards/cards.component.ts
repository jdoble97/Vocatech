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
  endpoint: string;
  cards: Carta[] = [];
  constructor(private dialogRef: MatDialogRef<CardsComponent>, @Inject(MAT_DIALOG_DATA) public deck: Baraja,
    private cartasService: CartasService, private userService: UserService) {
    this.endpoint = ConfigurationRouteService.url + `/cartas/${this.deck.ID}`;
  }

  ngOnInit(): void {
    this.cartasService.getCartas(this.endpoint, this.userService.getToken())
      .subscribe(cardsFromServer => {
        if (cardsFromServer['status']) {
          this.cards = cardsFromServer['data'];
        }
      })
  }
}
