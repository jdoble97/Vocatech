import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/logueado/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MainComponent } from './component/logueado/main/main.component';
import { RegisterComponent } from './component/nologueado/register/register.component';
import { HomeComponent } from './component/logueado/home/home.component';
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
import { EntrarComponent } from './component/nologueado/entrar/entrar.component';
import { ContenedorComponent } from './component/logueado/contenedor/contenedor.component';
import { ErrorComponent } from './component/error/error.component';
import { GameComponent } from './component/logueado/game/game.component';
import { LogoutComponent } from './component/logueado/logout/logout.component';
import { UserService } from './services/user.service';


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
    NavbarDesktopComponent,
    EntrarComponent,
    ContenedorComponent,
    ErrorComponent,
    GameComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
