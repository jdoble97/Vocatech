import {Routes} from '@angular/router';
import {HomeComponent} from '../component/logueado/home/home.component';
import {AddflashcardComponent} from '../component/logueado/addflashcard/addflashcard.component';
import {FlashcardsComponent} from '../component/logueado/flashcards/flashcards.component';
import {RegisterComponent} from '../component/nologueado/register/register.component';
import {AboutComponent} from '../component/nologueado/about/about.component'
import { LoginComponent } from '../component/nologueado/login/login.component';
import { ErrorComponent } from '../component/error/error.component';
import { GameComponent } from '../component/logueado/game/game.component';
import { UserGuard } from '../auth/user.guard';
import { ModifyDeckComponent } from '../component/logueado/modify-deck/modify-deck.component';
import { EditDeckComponent } from '../component/logueado/edit-deck/edit-deck.component';

export const routes: Routes = [
    {path:'home', component:HomeComponent, canActivate: [UserGuard]},
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'addflashcard', component:AddflashcardComponent, canActivate: [UserGuard]},
    {path:'flashcards', component: FlashcardsComponent, canActivate: [UserGuard]},
    {path: 'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},
    {path:'about', component: AboutComponent},
    {path: 'game', component: GameComponent, canActivate: [UserGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'modificar-baraja', component: ModifyDeckComponent, canActivate: [UserGuard]},
    {path:'editar/:id', component: EditDeckComponent, canActivate: [UserGuard]},
    {path: '**', redirectTo:'/home', pathMatch:'full'}
]