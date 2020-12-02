import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Aquí vamos a importar los modulos necesarios para angular material
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';

//TODO: aplicar css en vez del modulo  matgridlist
const material = [MatFormFieldModule,MatInputModule, MatButtonModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    material
  ],
  exports: [material],
})
export class MaterialModule { }
