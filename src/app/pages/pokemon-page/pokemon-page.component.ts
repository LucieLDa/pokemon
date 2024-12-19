import { Component, inject, Input } from '@angular/core';
import { Pokemon } from '../../models/pokeAPI.interface';
import { PokemonService } from '../../service/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css'
})
export class PokemonPageComponent {
  //This page shows all the info of a pokemon species
  private pokedexService = inject(PokemonService);
  pokemon !: Pokemon;
  selectedId !: any;

  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(){
    this.selectedId = this.route.snapshot.paramMap.get('id');
    this.pokedexService.getPokemonByName(this.selectedId).subscribe(data => {
      const findPokemon : Pokemon | undefined = data;
      if(findPokemon !== undefined){
        this.pokemon = findPokemon;
      }else{
        this.router.navigate(['']);
      }
    });
  }
}
