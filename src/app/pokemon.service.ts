import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import {
  Pokemon,
  PokeApiResponse,
  PokemonSpeciesResponse,
  EvolutionChainResponse,
  EvolutionChainLink,
} from './pokemon.model';

const POKE_API_BASE = 'https://pokeapi.co/api/v2/pokemon';
const MAX_POKEMON_ID = 1025;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getRandomPokemon(): Observable<Pokemon> {
    const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;

    return this.http.get<PokeApiResponse>(`${POKE_API_BASE}/${randomId}`).pipe(
      switchMap((raw) =>
        this.http.get<PokemonSpeciesResponse>(raw.species.url).pipe(
          switchMap((species) =>
            this.http
              .get<EvolutionChainResponse>(species.evolution_chain.url)
              .pipe(
                map((evoData) => {
                  const evolutions: string[] = [];
                  let current: EvolutionChainLink | null = evoData.chain;
                  while (current) {
                    evolutions.push(current.species.name);
                    current =
                      current.evolves_to.length > 0
                        ? current.evolves_to[0]
                        : null;
                  }
                  return {
                    id: raw.id,
                    name: raw.name,
                    sprite: raw.sprites.front_default,
                    types: raw.types.map((t) => t.type.name),
                    evolutions,
                    stats: raw.stats.map((s) => ({
                      name: s.stat.name,
                      value: s.base_stat,
                    })),
                  };
                }),
              ),
          ),
        ),
      ),
    );
  }
}
