import { Component, inject } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { PokeAPI, Pokemon, Results } from '../../models/pokeAPI.interface';
import { CommonModule } from '@angular/common';
import { PokemonBoxComponent } from '../../components/pokemon-box/pokemon-box.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LocalService } from '../../service/local.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [FormsModule, CommonModule, PokemonBoxComponent, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss'
})
export class PokedexComponent {
  //API Data
  private pokedexService = inject(PokemonService);
  pokeAPI : PokeAPI = {count : 0, next : "", results : []};
  filteredPokemonList : Results[] = [];
  currentPokemonToShow : Results[] = [];
  allDataFetched: boolean = false;

  //Pagination
  currentPage: number = 0;
  itemsPerPage: number = 30;
  totalItems: number = 1000;
  pageSizeOptions = [10, 30, 50, 100];

  constructor(private localStorage: LocalService) {}

  ngOnInit() : void {
    if(this.localStorage.getData('pokedexPage')){
      this.currentPage = Number(this.localStorage.getData('pokedexPage'));
    }

    if(this.localStorage.getData('pokedexItemPerPage')){
      this.itemsPerPage = Number(this.localStorage.getData('pokedexItemPerPage'));
    }

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
    this.filteredPokemonList = this.pokeAPI.results;
  }

  onPageChange(e: any) : void {
    this.currentPage = e.pageIndex;
    this.localStorage.saveData('pokedexPage', e.pageIndex);
    this.itemsPerPage = e.pageSize;
    this.localStorage.saveData('pokedexItemPerPage', e.pageSize);
    this.currentPokemonToShow = this.filteredPokemonList.slice(this.currentPage * this.itemsPerPage, this.currentPage * this.itemsPerPage + this.itemsPerPage);
  }

  filterResults(searchInput : String) : void {
    this.filteredPokemonList = this.pokeAPI.results.filter(
      pokemon => pokemon.name.toLocaleLowerCase().includes(searchInput.toLowerCase())
    );
    this.currentPokemonToShow = this.filteredPokemonList.slice(this.currentPage * this.itemsPerPage, this.currentPage * this.itemsPerPage + this.itemsPerPage);
    this.totalItems = this.filteredPokemonList.length;
  }
}
