import { Component, Input } from '@angular/core';
import { Pokemon, Results } from '../../models/pokeAPI.interface';

@Component({
  selector: 'app-pokemon-box',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-box.component.html',
  styleUrl: './pokemon-box.component.css'
})
export class PokemonBoxComponent {
  @Input()
  pokemon !: Pokemon;

  //Standardise the id to 4 numbers
  idStandard(id ?: number) : String {
    return '#'+('000' + id).slice(-4);
  }
}
