import { Component, inject } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { PokeAPI, Pokemon } from '../../models/pokeAPI.interface';
import { CommonModule } from '@angular/common';
import { PokemonBoxComponent } from '../../components/pokemon-box/pokemon-box.component';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, PokemonBoxComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent {
  private pokedexService = inject(PokemonService);
  allDataFetched: boolean = false;

  pokeAPI : PokeAPI = {count : 0, next : "", results : []};

  ngOnInit() : void {
    this.pokedexService.getAllPokemon().subscribe(data => {
      this.pokeAPI = data;
      this.loadPokemonToList();
      this.allDataFetched = true;
    });
  }

  loadPokemonToList() {
    this.pokeAPI.results.forEach((pokemon) =>{
      this.pokedexService.getPokemonByName(pokemon.name).subscribe(data => {
        pokemon.pokemon = data;
      });
    }
    );
  }
}
