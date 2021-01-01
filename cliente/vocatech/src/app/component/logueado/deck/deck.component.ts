import { Component, Input, OnInit } from '@angular/core';
import { Baraja } from 'src/app/shared/models/baraja';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  @Input() public deck: Baraja;
  constructor() { }

  ngOnInit(): void {
  }

}
