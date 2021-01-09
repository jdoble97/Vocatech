import {Routes} from '@angular/router';
import {AddflashcardComponent} from '../component/logueado/addflashcard/addflashcard.component';
import {FlashcardsComponent} from '../component/logueado/flashcards/flashcards.component';
import {RegisterComponent} from '../component/nologueado/register/register.component';
import {AboutComponent} from '../component/nologueado/about/about.component'
import { LoginComponent } from '../component/nologueado/login/login.component';
import { UserGuard } from '../auth/user.guard';
import { EditDeckComponent } from '../component/logueado/edit-deck/edit-deck.component';
import { DefaultGuard } from '../auth/default.guard';

export const routes: Routes = [
    {path:'barajas', component: FlashcardsComponent, canActivate: [UserGuard]},
    {path:'administrar-barajas', component:AddflashcardComponent, canActivate: [UserGuard]},
    {path:'', redirectTo:'/administrar-barajas', pathMatch:'full'},
    {path: 'registrar', component: RegisterComponent, canActivate:[DefaultGuard]},
    {path:'about', component: AboutComponent, canActivate:[DefaultGuard]},
    {path: 'login', component: LoginComponent, canActivate:[DefaultGuard]},
    {path:'editar/:id', component: EditDeckComponent, canActivate: [UserGuard]},
    {path: '**', redirectTo:'/barajas', pathMatch:'full'}
]