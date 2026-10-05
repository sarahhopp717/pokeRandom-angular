import { Component, input, computed } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import { UpperCasePipe } from '@angular/common';

const TYPE_COLORS: Record<string, string> = {
  fire: '#FDDCB5',
  water: '#C5E8FF',
  grass: '#C8F0C8',
  electric: '#FFF4B0',
  poison: '#E8C8F0',
  rock: '#E8E0C8',
  ground: '#F0E4C0',
  psychic: '#FFD0E0',
  ice: '#D0F0F8',
  dragon: '#C8C8FF',
  dark: '#D0C8C0',
  fairy: '#FFD0E8',
  fighting: '#F0C8C0',
  ghost: '#C8C0E0',
  bug: '#D8ECC0',
  steel: '#D8D8E8',
  flying: '#D8E8FF',
  normal: '#F0F0F0',
};

@Component({
  selector: 'app-pokemon-card',
  imports: [UpperCasePipe],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();

  cardColor = computed(() => TYPE_COLORS[this.pokemon().types[0]] ?? '#ffffff');
}
