import { Component, Input } from '@angular/core';
import { Pokemon, Results } from '../../models/pokeAPI.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-box',
  standalone: true,
  imports: [RouterLink, CommonModule],
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

  ngOnInit(){
  
  }
}
