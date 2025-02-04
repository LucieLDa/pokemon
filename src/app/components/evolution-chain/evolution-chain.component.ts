import { Component, inject, Input } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { EvoChain } from '../../models/pokeAPI.interface';
import { CommonModule } from '@angular/common';
import { EvolutionChainLinkComponent } from '../evolution-chain-link/evolution-chain-link.component';

@Component({
  selector: 'app-evolution-chain',
  standalone: true,
  imports: [CommonModule, EvolutionChainLinkComponent],
  templateUrl: './evolution-chain.component.html',
  styleUrl: './evolution-chain.component.scss'
})
export class EvolutionChainComponent {
  @Input()
  evolutionUrl : string = "";

  private pokedexService = inject(PokemonService);
  allDataFetched: boolean = false;
  evoChain ?: EvoChain;
   
  ngOnInit() : void {
    this.pokedexService.getEvolutionChainByUrl(this.evolutionUrl).subscribe(data => {
      this.evoChain = this.test(data.chain);
    });
  }

  test(evoData : any) : EvoChain {
    var evoDetails = evoData['evolution_details'][0];
    let result : EvoChain = {
      "species_name": evoData.species.name,
      "min_level": !evoDetails ? 1 : evoDetails.min_level,
      "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
      "item": !evoDetails ? null : evoDetails.item,
      "evolves_to": []
    };
    if(evoData['evolves_to'].length > 0){
      evoData['evolves_to'].forEach((evo: any) => {
        result.evolves_to?.push(this.test(evo));
      });
    }
    return result;
  }

}