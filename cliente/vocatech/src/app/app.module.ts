import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Componentes
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RegisterComponent } from './component/nologueado/register/register.component';
import { AddflashcardComponent } from './component/logueado/addflashcard/addflashcard.component';
import { FlashcardsComponent } from './component/logueado/flashcards/flashcards.component';
import { LoginComponent } from './component/nologueado/login/login.component';
//Importar RouterModule
import {RoutingModule} from './routing/routing.module';
import { AboutComponent } from './component/nologueado/about/about.component'
//Importar los servicios y ponerlos en providers
import {AuthenticationService} from './services/authentication.service';
//Para usar Httpclient, importar el modulo HTTP
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
//Configurar para usar formulario reactivo
import {ReactiveFormsModule} from '@angular/forms';
import { NavbarDesktopComponent } from './component/logueado/navbar-desktop/navbar-desktop.component';
import { ContenedorComponent } from './component/logueado/contenedor/contenedor.component';
import { UserService } from './services/user.service';
import { CardsComponent } from './component/logueado/cards/cards.component';
import { PresentationLetterComponent } from './component/nologueado/about/presentation-letter/presentation-letter.component';
import { MenuBeforeLoginComponent } from './component/nologueado/menu-before-login/menu-before-login.component';
import { NavbarMobileComponent } from './component/logueado/navbar-mobile/navbar-mobile.component';
import { DeckComponent } from './component/logueado/deck/deck.component';
import { FormsModule} from '@angular/forms';
import { ModifyDeckComponent } from './component/logueado/modify-deck/modify-deck.component';
import { EditDeckComponent } from './component/logueado/edit-deck/edit-deck.component';
import { BarajaService } from './services/baraja.service';
import { CartasService } from './services/cartas.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RegisterComponent,
    AddflashcardComponent,
    FlashcardsComponent,
    AboutComponent,
    LoginComponent,
    NavbarDesktopComponent,
    ContenedorComponent,
    CardsComponent,
    PresentationLetterComponent,
    MenuBeforeLoginComponent,
    NavbarMobileComponent,
    DeckComponent,
    ModifyDeckComponent,
    EditDeckComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthenticationService, UserService, BarajaService, CartasService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
