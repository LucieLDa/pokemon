import { Component, inject, Input } from '@angular/core';
import { Ability } from '../../models/pokeAPI.interface';
import { PokemonService } from '../../service/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ability-info-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ability-info-box.component.html',
  styleUrl: './ability-info-box.component.css'
})
export class AbilityInfoBoxComponent {
  @Input()
  abilityLink!: string;
  ability!: Ability;

  private pokedexService = inject(PokemonService);
  allDataFetched: boolean = false;

  ngOnInit() : void {
    this.pokedexService.getAbilityByUrl(this.abilityLink).subscribe(data => {
      this.ability = data;
      this.allDataFetched = true;
    });
  }

  //Find the english description of the ability
  findAbilityDescription() : string | undefined {
    return this.ability.flavor_text_entries.find(x => x.language.name=='en')?.flavor_text;
  }
}
