import { Component, signal } from '@angular/core';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [PokemonCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  pokemon = signal<Pokemon | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private pokemonService: PokemonService) {}

  fetchRandomPokemon(): void {
    this.loading.set(true);
    this.error.set(null);

    this.pokemonService.getRandomPokemon().subscribe({
      next: (result) => {
        this.pokemon.set(result);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.error.set(
            'Pokemon not found (404) — this ID does not exist in the PokeAPI.',
          );
        } else if (err.status === 429) {
          this.error.set(
            'Too many requests (429) — please wait a moment and try again.',
          );
        } else {
          this.error.set('Could not load a Pokémon. Try again.');
        }
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
