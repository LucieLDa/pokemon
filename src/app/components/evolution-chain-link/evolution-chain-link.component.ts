import { Component, Input } from '@angular/core';
import { EvoChain } from '../../models/pokeAPI.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-evolution-chain-link',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './evolution-chain-link.component.html',
  styleUrl: './evolution-chain-link.component.scss'
})
export class EvolutionChainLinkComponent {
  @Input()
  evoChain !: EvoChain;
}
