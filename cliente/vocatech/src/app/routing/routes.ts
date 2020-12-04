import {Routes} from '@angular/router';
import {HomeComponent} from '../component/logueado/home/home.component';
import {AddflashcardComponent} from '../component/logueado/addflashcard/addflashcard.component';
import {FlashcardsComponent} from '../component/logueado/flashcards/flashcards.component';
import {RegisterComponent} from '../component/nologueado/register/register.component';
import {AboutComponent} from '../component/nologueado/about/about.component'
import { LoginComponent } from '../component/nologueado/login/login.component';
import { ErrorComponent } from '../component/error/error.component';
import { GameComponent } from '../component/logueado/game/game.component';

export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'addflashcard', component:AddflashcardComponent},
    {path:'flashcards', component: FlashcardsComponent},
    {path: 'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},
    {path:'about', component: AboutComponent},
    {path: 'game', component: GameComponent},
    {path: '**',component: ErrorComponent}
]