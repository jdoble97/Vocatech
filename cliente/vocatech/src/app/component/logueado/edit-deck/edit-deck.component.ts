import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarajaService } from 'src/app/services/baraja.service';
import { CartasService } from 'src/app/services/cartas.service';
import { ConfigurationRouteService } from 'src/app/services/configurationRoute';
import { UserService } from 'src/app/services/user.service';
import { Baraja } from 'src/app/shared/models/baraja';
import { Carta } from 'src/app/shared/models/carta';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.css']
})
export class EditDeckComponent implements OnInit {
  // 
  public id: string;
  public deck: Baraja
  public cards: Carta[];
  private temporaryCard: Carta;
  public numberCards: number
  constructor(private route: ActivatedRoute, private deckService: BarajaService, private userService: UserService,
    private cardService: CartasService,@Inject(MAT_DIALOG_DATA) public data: number ) {
    this.id = data.toString();
    this.numberCards = 0;
    this.cards = [];
  }
  // 
  ngOnInit(): void {
    this.deckService.selectBarajas(ConfigurationRouteService.url + `/baraja/${this.id}`, this.userService.getToken())
    .subscribe(result => {
      if (result['row'].length > 0) {
        this.deck = result['row'][0];
        this.cardService.getCartas(ConfigurationRouteService.url + `/cartas/${this.deck.ID}`, this.userService.getToken())
          .subscribe(response => {
            this.numberCards = response['data'].length;
            this.cards = response['data'];
          })
      }
    })
  }
  // 
  changeName() {
    Swal.fire({
      title: 'Escribe el nuevo nombre para tu baraja',
      input: 'text',
      confirmButtonText: 'Cambiar nombre',
      showDenyButton: true,
      denyButtonText: 'Cancelar'
      // 
    })
      .then(name => {
        if (name.isConfirmed && name.value.length >= 3) {
          this.deck.Name = name.value;
          this.updateName(name.value);
        }
        else if (name.isConfirmed && name.value.length < 3) {
          Swal.fire({
            icon: 'info',
            title: 'El nuevo nombre debe tener por lo menos tres caracteres'
          });
        }
      })
  }
  // 
  addCard() {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Siguiente &rarr;',
      showCancelButton: true,
      cancelButtonColor: '#d14529',
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Palabra',
        text: 'Escribe la palabra en español',
      },
      {
        title: 'Traducción',
        text: 'Escribe su traducción'
      }
    ]).then((result) => {
      // 
      if (result['value']) {
        if (result['value'][0].length > 0 && result['value'][1].length > 0 && result['value'][0].length < 30 && result['value'][1].length < 30) {
          this.addCardCorrect(result['value']);
        } else {
          this.addCardIncorrect();
        }
      }
    })
  }
  // 
  updateName(name: string) {
    this.deckService.updateBaraja(ConfigurationRouteService.url + '/baraja', this.deck, this.userService.getToken())
      .subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Cambio de nombre correcto'
        });
      })
  }
  // 
  addCardCorrect(words: string[]) {
    let cardToInsert: Carta = { FK_DeckID: this.deck.ID, SpanishName: words[0], EnglishName: words[1] }
    this.cardService.insertCarta(ConfigurationRouteService.url + '/carta', cardToInsert, this.userService.getToken())
      .subscribe(response => {
        this.temporaryCard = { FK_DeckID: this.deck.ID, ID: response['insertId'], SpanishName: words[0], EnglishName: words[1] };
        this.cards.unshift(this.temporaryCard);
        this.numberCards++;
        Swal.fire({
          icon: 'success',
          title: 'Carta creada correctamente'
        });
      })
    // 
  }
  addCardIncorrect() {
    Swal.fire({
      icon: 'info',
      text: 'Cada palabra debe tener por lo menos una letra o menos de 30 letras'
    })
  }
  //////
  changeWord(word: Carta, lang: string) {
    Swal.fire({
      title: 'Palabra a cambiar',
      text: word[lang],
      confirmButtonText: 'Cambiar',
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      input: 'text',
      inputPlaceholder: word[lang]
    })
      .then(response => {
        if (response.isConfirmed) {
          if (response.value.length > 0) {
            this.temporaryCard = word;
            this.temporaryCard[lang] = response.value
            this.updateWord(this.temporaryCard);
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Debes escribir por lo menos una palabra'
            });
          }
        }
      })
  }

  updateWord(word: Carta) {
    this.cardService.updateCarta(ConfigurationRouteService.url + '/carta', word, this.userService.getToken())
      .subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Se ha cambiado la palabra correctamente'
        })
      })
  }

  deleteCard(card: Carta) {
    Swal.fire({
      icon: 'info',
      title: '¿Estás seguro de querer eliminar la carta?',
      showDenyButton: true,
      denyButtonText: 'Cancelar'
    })
      .then(response => {
        if (response.isConfirmed) {
          const index = this.cards.indexOf(card);
          this.cards.splice(index, 1);
          --this.numberCards;
          this.cardService.deleteCarta(ConfigurationRouteService.url + `/carta/${card.ID}`, this.userService.getToken())
            .subscribe(response => {
            })
        }
      })
  }

  
}
