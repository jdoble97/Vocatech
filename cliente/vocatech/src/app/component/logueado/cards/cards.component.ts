import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartasService } from 'src/app/services/cartas.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  title: string;
  constructor(private dialogRef: MatDialogRef<CardsComponent>, @Inject(MAT_DIALOG_DATA) private datos: any,
    private cartasService: CartasService, private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.datos)
    this.title = this.datos.name
    this.cartasService.getCartas(this.datos.name, this.userService.getToken())
      .subscribe(cartas=>{
        console.log('La respuesta es:', cartas)
      })
  }
  close(){
    this.dialogRef.close("Gracias por usar MatDialog");
  }
}
