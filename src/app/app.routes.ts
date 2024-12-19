import { Routes } from '@angular/router';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { PokemonPageComponent } from './pages/pokemon-page/pokemon-page.component';

export const routes: Routes = [
    {path: '', component: PokedexComponent},
    {path: 'pokemon/:id', component: PokemonPageComponent}
];
