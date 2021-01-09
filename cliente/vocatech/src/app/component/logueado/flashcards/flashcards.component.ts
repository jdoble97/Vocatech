import { Component, OnInit } from '@angular/core';
import { BarajaService } from 'src/app/services/baraja.service';
import { UserService } from 'src/app/services/user.service';
import { Baraja } from 'src/app/shared/models/baraja';
import { ConfigurationRouteService } from '../../../services/configurationRoute';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {

  public barajas: Baraja[] = [];
  public numberDecks: number;
  public temporaryDecks: number;
  public actualDecks: number
  public urlDecks: string;
  public idLater: number;

  constructor(private barajasService: BarajaService, private userService: UserService) {
    this.idLater = 0;
    this.actualDecks = 0;
    this.numberDecks = 0;
    this.urlDecks = ConfigurationRouteService.url + '/barajas/' + this.idLater;
  }

  ngOnInit(): void {

    this.userService.getNumberDecks().subscribe(resp => {
      this.numberDecks = resp['number'];
      if (this.numberDecks > 0) {
        this.barajasService.selectBarajas(this.urlDecks, this.userService.getToken()).subscribe(barajas => {
          this.barajas = <Baraja[]>barajas['data'];
          if (this.barajas.length > 0) {
            this.actualDecks = this.barajas.length;
            this.temporaryDecks = this.actualDecks;
          }
        })
      }
    });
  }

  nextDecks() {
    if (this.actualDecks < this.numberDecks) {
      this.idLater = this.barajas[this.barajas.length - 1].ID
      this.barajasService.selectBarajas(ConfigurationRouteService.url + `/barajas-order/${this.idLater}`, this.userService.getToken())
        .subscribe(response => {
          this.barajas = response['data']
          this.actualDecks += this.barajas.length
          window.scroll(0, 0)
        })
    }
  }
  lastDecks() {
    if(this.actualDecks>this.temporaryDecks){
      this.idLater = this.barajas[0].ID
      this.barajasService.selectBarajas(ConfigurationRouteService.url+`/barajas-last/${this.idLater}`, this.userService.getToken())
        .subscribe(response=>{
          this.actualDecks -= this.barajas.length;
          this.barajas = response['data'].reverse();
          console.log(this.barajas);
          window.scroll(0,0)
        })
    }
  }
}
