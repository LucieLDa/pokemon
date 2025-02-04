import { Component, inject, Input } from '@angular/core';
import { Pokemon, PokemonSpecies, Variety } from '../../models/pokeAPI.interface';
import { PokemonService } from '../../service/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs'; 
import { PokemonVarietyInfoComponent } from '../../components/pokemon-variety-info/pokemon-variety-info.component';
import { EvolutionChainComponent } from '../../components/evolution-chain/evolution-chain.component';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [CommonModule, MatTabsModule, PokemonVarietyInfoComponent, EvolutionChainComponent],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.scss'
})
export class PokemonPageComponent {
  //This page shows all the info of a pokemon species
  private pokedexService = inject(PokemonService);
  pokemonSpecies !: PokemonSpecies;
  selectedId !: any;
  allDataFetched: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(){
    this.selectedId = this.route.snapshot.paramMap.get('id');
    this.pokedexService.getPokemonSpeciesByName(this.selectedId).subscribe(data => {
      const findPokemon : PokemonSpecies | undefined = data;
      if(findPokemon !== undefined){
        this.pokemonSpecies = findPokemon;
        this.loadPokemonToVariety();
      }else{
        this.router.navigate(['']);
      }
    });
  }

  //Get pokemon info of each variety of a pokemon
  loadPokemonToVariety() {
    let total = this.pokemonSpecies.varieties.length;
    let count = 0;
    this.pokemonSpecies.varieties.forEach((variety) =>{
      this.pokedexService.getPokemonById(Number(variety.pokemon.url.split('/').slice(-2,-1)[0])).subscribe(data => {
        variety.pokemonInfo = data;
        count++;
        if(count == total){
          this.allDataFetched = true;
        }
      })
    });
  }

  //Get all games where the pokemon has a flavor text entry
  getAllVersionFlavorText() : string[]{
    let result : string[] = [];
    this.pokemonSpecies.flavor_text_entries.forEach((text) =>{
      if(!result.includes(text.version.name)){
        result.push(text.version.name);
      }
    });
    return result;
  }

  //Find the correct flavortext for a game version
  findFlavorText(version: string) : string | undefined {
    return this.pokemonSpecies.flavor_text_entries.find(x => x.language.name=='en' && x.version.name==version)?.flavor_text;
  }

  //Find the english form description
  findFormDescription() : string | undefined {
    return this.pokemonSpecies.form_descriptions.find(x => x.language.name=='en')?.description;
  }
}
