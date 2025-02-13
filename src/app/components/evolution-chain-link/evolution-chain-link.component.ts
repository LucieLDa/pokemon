import { Component, inject, Input } from '@angular/core';
import { EvoChain } from '../../models/pokeAPI.interface';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../service/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evolution-chain-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evolution-chain-link.component.html',
  styleUrl: './evolution-chain-link.component.scss'
})
export class EvolutionChainLinkComponent {
  @Input()
  evoChain !: EvoChain;

  private pokedexService = inject(PokemonService);
  pokemonImage : String = "";
  onThisPage : boolean = false;

  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit() : void {
    this.onThisPage = this.route.snapshot.paramMap.get('id')==this.evoChain.species_name;
    this.pokedexService.getPokemonById(this.evoChain.species_id).subscribe(data => {
      this.pokemonImage = data.sprites.front_default;
    });
  }
}
