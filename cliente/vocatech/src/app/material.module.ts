import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Aquí vamos a importar los modulos necesarios para angular material
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
//MatDialog
import {MatDialogModule} from '@angular/material/dialog';



const material = [MatFormFieldModule,MatInputModule, MatButtonModule, MatTabsModule, MatDialogModule,MatButtonModule,MatCardModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    material
  ],
  exports: [material],

})
export class MaterialModule { }
