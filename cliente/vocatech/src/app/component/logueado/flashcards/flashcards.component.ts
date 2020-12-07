import { Component, OnInit } from '@angular/core';
import { BarajaService } from 'src/app/services/baraja.service';
import { UserService } from 'src/app/services/user.service';
import { Baraja } from 'src/app/shared/models/baraja';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {

  public barajas: Baraja[]= [new Baraja()];
  constructor(private barajasService: BarajaService, private userService: UserService) { }

  ngOnInit(): void {
    this.barajasService.getBrajas(this.userService.getToken(), 'http://localhost:7777/api/barajas').subscribe(barajas => {
      this.barajas = <Baraja[]>barajas['data'];
    })
  }
}
