export interface PokeAPI {
    count: number;
    next: string;
    results: Results[];
}

export interface Results {
    name: string;
    url: string;
    pokemon: Pokemon;
}

export interface Pokemon {
    id: number;
    name: string;
    specie_name: string;
    weight: number;
    sprites: Sprites;
    types: Types[];
    stats: Stat[];
    abilities: AbilityResult[];
}

export interface PokemonSpecies {
    id: number;
    name: String;
    varieties: Variety[];
    evolution_chain: {
        url:string
    };
}

export interface Variety {
    is_default: boolean;
    pokemon: Results;
    pokemonInfo: Pokemon;
}

export interface Sprites {
    front_default: string;
}

export interface Types {
    slot: number;
    type: Type;
}

export interface Type {
    name: string;
}

export interface Stat {
    base_stat: Number;
}

export interface AbilityResult {
    is_hidden: boolean;
    slot: number;
    ability: {name: string, url: string};
}

export interface Ability {
    name: string;
    effect_entries: {effect: string, language: LanguageResult}[];
}

export interface LanguageResult {
    name: string;
    url: string;
}

export interface EvoChain {
    species_name : string;
    min_level : number;
    trigger_name : null | string;
    item : {
        name : string;
        url : string;
    };
    evolves_to ?: null | EvoChain[];
}