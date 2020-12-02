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
import { LoginComponent } from './component/login/login.component';
//Importar RouterModule
import {RoutingModule} from './routing/routing.module';
import { AboutComponent } from './component/about/about.component'
//Importar los servicios y ponerlos en providers
import {AuthenticationService} from './services/authentication.service';
//Para usar Httpclient, importar el modulo HTTP
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
//Configurar para usar formulario reactivo
import {ReactiveFormsModule} from '@angular/forms';
import { NavbarDesktopComponent } from './component/navbar-desktop/navbar-desktop.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    RegisterComponent,
    HomeComponent,
    AddflashcardComponent,
    FlashcardsComponent,
    AboutComponent,
    LoginComponent,
    NavbarDesktopComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
