import { Component, OnInit } from '@angular/core';
import { BarajaService } from 'src/app/services/baraja.service';
import { UserService } from 'src/app/services/user.service';
import { Baraja } from 'src/app/shared/models/baraja';
//TODO: Permitir crear un dialog
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CardsComponent } from '../cards/cards.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigurationRouteService } from '../../../services/configurationRoute';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {

  public barajas: Baraja[]= [new Baraja()];
  public searchForm: FormGroup;
  public numberDecks: number;
  public urlDecks: string;
  public pages: number;
  public idLater: number;

  constructor(private barajasService: BarajaService, private userService: UserService, private dialog: MatDialog,
    private fb:FormBuilder) { 
      this.idLater = 0;
      this.urlDecks = ConfigurationRouteService.url+'/barajas/'+this.idLater;
    }

  ngOnInit(): void {
    this.barajasService.selectBarajas(this.userService.getToken(), this.urlDecks).subscribe(barajas => {
      this.barajas = <Baraja[]>barajas['data'];
      console.log(this.barajas)
    })
    this.userService.getNumberDecks().subscribe(resp=>{
      this.numberDecks = resp['number'];
      this.pages =Math.ceil(this.numberDecks/9);
      console.log(this.pages)
      console.log(this.numberDecks)
    });
    this.createForm();
  }

  // seeDeckOfCards(id: number, name: string){
  //   console.log("ID: ", id, name)
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.data = {
  //     id: id,
  //     name: name
  //   }
  //   dialogConfig.height = "5000px";
  //   this.dialog.open(CardsComponent, dialogConfig);
  // }
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

  getDecks(){
    this.idLater = this.barajas[this.barajas.length-1].ID;
    this.urlDecks = ConfigurationRouteService.url+`/barajas/${this.idLater}`;
    this.barajasService.selectBarajas(this.userService.getToken(), this.urlDecks).subscribe(barajas => {
      this.barajas =this.barajas.concat(<Baraja[]>barajas['data']);
      console.log(this.barajas)
    })
  }
}
