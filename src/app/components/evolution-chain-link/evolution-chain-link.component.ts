import { Component, Input } from '@angular/core';
import { EvoChain } from '../../models/pokeAPI.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evolution-chain-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evolution-chain-link.component.html',
  styleUrl: './evolution-chain-link.component.css'
})
export class EvolutionChainLinkComponent {
  @Input()
  evoChain !: EvoChain;
}
