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
    //First id not included, need to be a value -1 from intended
    const firstId : number = 0;
    const lastId : number = 151;
    this.pokedexService.getAllPokemonSpecies(firstId, lastId).subscribe(data => {
      this.pokeAPI = data;
      this.loadPokemonToList(lastId);
    });
  }

  //Add info of the individual pokemons to the results obtained from api

  loadPokemonToList(lastId : number) {
    this.pokeAPI.results.forEach((pokemon) =>{
      //extract the id from the url
      this.pokedexService.getPokemonById(Number(pokemon.url.split('/').slice(-2,-1)[0])).subscribe(data => {
        pokemon.pokemon = data;
        if(data.id >= lastId) {
          this.allDataFetched = true;
        }
      });
    }
    );
  }
}
