import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { MainComponent } from './component/main/main.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AddflashcardComponent } from './component/addflashcard/addflashcard.component';
import { FlashcardsComponent } from './component/flashcards/flashcards.component';
//Importar RouterModule
import {RoutingModule} from './routing/routing.module'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    RegisterComponent,
    HomeComponent,
    AddflashcardComponent,
    FlashcardsComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
