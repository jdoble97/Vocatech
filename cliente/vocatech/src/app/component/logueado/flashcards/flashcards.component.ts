import { Component, OnInit } from '@angular/core';
import { BarajaService } from 'src/app/services/baraja.service';
import { UserService } from 'src/app/services/user.service';
import { Baraja } from 'src/app/shared/models/baraja';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigurationRouteService } from '../../../services/configurationRoute';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {

  public barajas: Baraja[]= [];
  public searchForm: FormGroup;
  public numberDecks: number;
  public urlDecks: string;
  public idLater: number;

  constructor(private barajasService: BarajaService, private userService: UserService,
    private fb:FormBuilder) { 
      console.log("Las baarajas",this.barajas.length)
      this.idLater = 0;
      this.urlDecks = ConfigurationRouteService.url+'/barajas/'+this.idLater;
    }

  ngOnInit(): void {
    this.barajasService.selectBarajas(this.userService.getToken(), this.urlDecks).subscribe(barajas => {
      this.barajas = <Baraja[]>barajas['data'];
    })
    this.userService.getNumberDecks().subscribe(resp=>{
      this.numberDecks = resp['number'];
    });
    this.createForm();
  }
  searchDeck(){
    //Buscar las paginas
    console.log();
  }

  createForm(){
    this.searchForm = this.fb.group({
      nameDeck: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  getDecks(){
    if(this.numberDecks > this.barajas.length){
      this.idLater = this.barajas[this.barajas.length-1].ID;
      this.urlDecks = ConfigurationRouteService.url+`/barajas/${this.idLater}`;
      this.barajasService.selectBarajas(this.userService.getToken(), this.urlDecks).subscribe(barajas => {
        this.barajas =this.barajas.concat(<Baraja[]>barajas['data']);
        console.log(this.barajas.length)
      })
    }else{
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: "No tienes más barajas, puedes añadir más."
      })
    }
  }
}
