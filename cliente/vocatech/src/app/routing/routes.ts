import {Routes} from '@angular/router';
import {HomeComponent} from '../component/home/home.component';
import {AddflashcardComponent} from '../component/addflashcard/addflashcard.component';
import {FlashcardsComponent} from '../component/flashcards/flashcards.component';
import {RegisterComponent} from '../component/register/register.component';
import {AboutComponent} from '../component/about/about.component'

export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'addflashcard', component:AddflashcardComponent},
    {path:'flashcards', component: FlashcardsComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**',component: AboutComponent}
]