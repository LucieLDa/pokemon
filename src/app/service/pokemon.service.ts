import { inject, Injectable } from '@angular/core';
import { PokeAPI, Pokemon} from '../models/pokeAPI.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokeApiUrl : string = 'https://pokeapi.co/api/v2/pokemon';

  private http = inject(HttpClient);

  constructor() { }

  //Get all the pokemons from the API

  getAllPokemon(): Observable<PokeAPI> {
    return this.http
      .get<PokeAPI>(this.pokeApiUrl)
      .pipe(catchError(this.handleError<PokeAPI>('getAllPokemon')));
    //.get<PokeAPI>(`${this.pokeApiUrl}?limit=100000&offset=0`)
  }

  //Get a specific Pokemon by it's id

  getPokemonById(id: number): Observable<Pokemon>{
    return this.http
      .get<Pokemon>(`${this.pokeApiUrl}/${id}`)
      .pipe(catchError(this.handleError<Pokemon>('getPokemonById')));
  }

  //Get a specific Pokemon by it's name

  getPokemonByName(name: string): Observable<Pokemon>{
    return this.http
      .get<Pokemon>(`${this.pokeApiUrl}/${name}`)
      .pipe(catchError(this.handleError<Pokemon>('getPokemonById')));
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
