import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './service/pokemon.service';
import { PokeAPI, Pokemon } from './models/pokeAPI.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private pokedexService = inject(PokemonService);
  allDataFetched: boolean = false;

  pokeAPI : PokeAPI = {count : 0, next : "", results : []};
  pokemonExemple : Pokemon = {id: 0, name: "", weight: 0};

  ngOnInit() : void {
    this.pokedexService.getAllPokemon().subscribe(data => {
      this.pokeAPI = data;
      this.loadPokemonToList();
    });
    this.pokedexService.getPokemonById(132).subscribe(data => {
      this.pokemonExemple = data;
    });
  }

  loadPokemonToList() : void{
    this.pokeAPI.results.forEach((pokemon) =>{
      this.pokedexService.getPokemonByName(pokemon.name).subscribe(data => {
        pokemon.pokemon = data;
      });
    }
    );
    this.allDataFetched = true;
  }
}
