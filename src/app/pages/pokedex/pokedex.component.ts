import { Component, inject } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { PokeAPI, Pokemon, Results } from '../../models/pokeAPI.interface';
import { CommonModule } from '@angular/common';
import { PokemonBoxComponent } from '../../components/pokemon-box/pokemon-box.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, PokemonBoxComponent, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent {
  //API Data
  private pokedexService = inject(PokemonService);
  pokeAPI : PokeAPI = {count : 0, next : "", results : []};
  currentPokemonToShow : Results[] = [];
  allDataFetched: boolean = false;

  //Pagination
  currentPage: number = 0;
  itemsPerPage: number = 30;
  totalItems: number = 1000;
  pageSizeOptions = [10, 30, 50, 100];

  ngOnInit() : void {
    this.fetchData();
  }

  fetchData() {
    //We need the pokemon specie name, but also some basic info of the default variety of each pokemon
    this.pokedexService.getAllPokemonSpecies(0, 100000).subscribe(data => {
      this.pokeAPI = data;
      this.totalItems = data.count;
      this.loadPokemonToList();
    });
  }

  //Add info of the individual pokemons to the results obtained from api

  loadPokemonToList() {
    this.pokeAPI.results.forEach((pokemon) =>{
      //extract the id from the url
      this.pokedexService.getPokemonById(Number(pokemon.url.split('/').slice(-2,-1)[0])).subscribe(data => {
        pokemon.pokemon = data;
        pokemon.pokemon.specie_name = pokemon.name;
        if(data.id >= this.totalItems) {
          this.currentPokemonToShow = this.pokeAPI.results.slice(this.currentPage * this.itemsPerPage, this.currentPage * this.itemsPerPage + this.itemsPerPage);
          this.allDataFetched = true;
        }
      });
    });
  }

  onPageChange(e: any): void {
    this.currentPage = e.pageIndex;
    this.itemsPerPage = e.pageSize;
    this.currentPokemonToShow = this.pokeAPI.results.slice(this.currentPage * this.itemsPerPage, this.currentPage * this.itemsPerPage + this.itemsPerPage);
  }
}
