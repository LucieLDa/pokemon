import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokeAPI.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-variety-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-variety-info.component.html',
  styleUrl: './pokemon-variety-info.component.css'
})
export class PokemonVarietyInfoComponent {
  @Input()
  pokemon !: Pokemon;
}
