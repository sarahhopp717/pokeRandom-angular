export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  evolutions: string[];
  stats: { name: string; value: number }[];
}

export interface PokeApiResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  species: { url: string };
  stats: { base_stat: number; stat: { name: string } }[];
}

export interface PokemonSpeciesResponse {
  evolution_chain: { url: string };
}

export interface EvolutionChainLink {
  species: { name: string };
  evolves_to: EvolutionChainLink[];
}

export interface EvolutionChainResponse {
  chain: EvolutionChainLink;
}
