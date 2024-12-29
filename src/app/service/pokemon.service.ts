import { inject, Injectable } from '@angular/core';
import { PokeAPI, Pokemon, PokemonSpecies} from '../models/pokeAPI.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokeApiUrl : string = 'https://pokeapi.co/api/v2/';

  private http = inject(HttpClient);

  constructor() { }

  //Get all the pokemons from the API

  getAllPokemon(offset: number, limit: number): Observable<PokeAPI> {
    return this.http
      .get<PokeAPI>(`${this.pokeApiUrl}pokemon?limit=${limit}&offset=${offset}`)
      .pipe(catchError(this.handleError<PokeAPI>('getAllPokemon')));
  }

  //Get all the pokemons species from the API

  getAllPokemonSpecies(offset: number, limit: number): Observable<PokeAPI> {
    return this.http
      .get<PokeAPI>(`${this.pokeApiUrl}pokemon-species?limit=${limit}&offset=${offset}`)
      .pipe(catchError(this.handleError<PokeAPI>('getAllPokemonSpecies')));
  }

  //Get a specific Pokemon by it's id

  getPokemonById(id: number): Observable<Pokemon>{
    return this.http
      .get<Pokemon>(`${this.pokeApiUrl}pokemon/${id}`)
      .pipe(catchError(this.handleError<Pokemon>('getPokemonById')));
  }

  //Get a specific Pokemon by it's name

  getPokemonByName(name: string): Observable<Pokemon>{
    return this.http
      .get<Pokemon>(`${this.pokeApiUrl}pokemon/${name}`)
      .pipe(catchError(this.handleError<Pokemon>('getPokemonById')));
  }

  //Get a specific Pokemon Species by it's id

  getPokemonSpeciesById(id: number): Observable<PokemonSpecies>{
    return this.http
      .get<PokemonSpecies>(`${this.pokeApiUrl}pokemon-species/${id}`)
      .pipe(catchError(this.handleError<PokemonSpecies>('getPokemonById')));
  }

  //Get a specific Pokemon Species by it's name

  getPokemonSpeciesByName(name: string): Observable<PokemonSpecies>{
    return this.http
      .get<PokemonSpecies>(`${this.pokeApiUrl}pokemon-species/${name}`)
      .pipe(catchError(this.handleError<PokemonSpecies>('getPokemonById')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
