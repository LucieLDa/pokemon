import { Component, inject, Input } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { EvoChain } from '../../models/pokeAPI.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evolution-chain',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evolution-chain.component.html',
  styleUrl: './evolution-chain.component.css'
})
export class EvolutionChainComponent {
  @Input()
  evolutionUrl : string = "";

  private pokedexService = inject(PokemonService);
  allDataFetched: boolean = false;
  evoChain : EvoChain[] = [];
   
  ngOnInit() : void {
    this.pokedexService.getEvolutionChainByUrl(this.evolutionUrl).subscribe(data => {
      let evoData = data.chain;
      do {
        var evoDetails = evoData['evolution_details'][0];

        let numberOfEvolutions = evoData['evolves_to'].length;  

        this.evoChain.push({
          "species_name": evoData.species.name,
          "min_level": !evoDetails ? 1 : evoDetails.min_level,
          "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
          "item": !evoDetails ? null : evoDetails.item
        });

        if(numberOfEvolutions > 1) {
          for (let i = 1;i < numberOfEvolutions; i++) { 
            this.evoChain.push({
              "species_name": evoData.evolves_to[i].species.name,
              "min_level": !evoData.evolves_to[i]? 1 : evoData.evolves_to[i].min_level,
              "trigger_name": !evoData.evolves_to[i]? null : evoData.evolves_to[i].evolution_details[0].trigger.name,
              "item": !evoData.evolves_to[i]? null : evoData.evolves_to[i].evolution_details[0].item
           });
          }
        }
      
        evoData = evoData['evolves_to'][0];
      } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
    });
    console.log(this.evoChain)
  }
}
