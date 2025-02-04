import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokeAPI.interface';
import { CommonModule } from '@angular/common';
import { AbilityInfoBoxComponent } from '../ability-info-box/ability-info-box.component';

@Component({
  selector: 'app-pokemon-variety-info',
  standalone: true,
  imports: [CommonModule, AbilityInfoBoxComponent],
  templateUrl: './pokemon-variety-info.component.html',
  styleUrl: './pokemon-variety-info.component.scss'
})
export class PokemonVarietyInfoComponent {
  @Input()
  pokemon !: Pokemon;

  ngOnInit() : void {

  }
}
