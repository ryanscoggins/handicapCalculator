import { Component, Input } from '@angular/core';
import { Pairing } from 'src/interfaces/pairing';

@Component({
  selector: 'app-matchup',
  templateUrl: './matchup.component.html',
  styleUrl: './matchup.component.css'
})
export class MatchupComponent {
  @Input() matchups!: Pairing[];

}
