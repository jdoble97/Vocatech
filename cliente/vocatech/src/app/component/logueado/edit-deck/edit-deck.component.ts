import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarajaService } from 'src/app/services/baraja.service';
import { ConfigurationRouteService } from 'src/app/services/configurationRoute';
import { UserService } from 'src/app/services/user.service';
import { Baraja } from 'src/app/shared/models/baraja';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.css']
})
export class EditDeckComponent implements OnInit {

  public deck: Baraja
  public numberCards: number
  constructor(private route: ActivatedRoute, private deckService: BarajaService, private userService: UserService) { 
    this.numberCards = 0;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID', id)
    this.deckService.selectBarajas(ConfigurationRouteService.url+`/baraja/${id}`, this.userService.getToken())
      .subscribe(result=>{
        console.log('respuesta', result['row']);
        if(result['row'].length>0){
          this.deck = result['row'][0];
        }
      })
  }

}
