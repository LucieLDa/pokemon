export interface PokeAPI {
    count: number;
    next: string;
    results: Results[];
}

export interface Results {
    name: string;
    url: string;
    pokemon?: Pokemon;
}

export interface Pokemon {
    id: number;
    name: string;
    weight: number;
}