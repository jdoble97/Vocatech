import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartasService } from 'src/app/services/cartas.service';
import { ConfigurationRouteService } from 'src/app/services/configurationRoute';
import { UserService } from 'src/app/services/user.service';
import { Baraja } from 'src/app/shared/models/baraja';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  title: string;
  numberCards: number;
  endpoint: string;
  public columnsToDisplay = ['Palabra','Traducción'];
  constructor(private dialogRef: MatDialogRef<CardsComponent>, @Inject(MAT_DIALOG_DATA) private deck: Baraja,
    private cartasService: CartasService, private userService: UserService) {
      this.endpoint = ConfigurationRouteService.url+`/cartas/${this.deck.ID}`;
      console.log("ID DEL OBJETO", this.deck.ID, 'La ruta->',this.endpoint)
    }

  ngOnInit(): void {
    console.log(this.deck);
    this.cartasService.getCartas(this.deck.ID, this.userService.getToken(),this.endpoint)
      .subscribe(cardsFromServer=>{
        console.log(cardsFromServer);
      })
  }
  close(){
    this.dialogRef.close("Gracias por usar MatDialog");
  }
}
