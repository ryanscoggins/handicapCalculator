import { Component, Input } from '@angular/core';
import { Pairing } from 'src/interfaces/pairing';

@Component({
  selector: 'app-matchup',
  templateUrl: './matchup.component.html'
})
export class MatchupComponent {
  @Input() matchups!: Pairing[];

  ngOnInit() {
    this.calculateHandicapDiff();
    this.matchups = this.sortMatchups(this.matchups);
  }

  calculateHandicapDiff() {
    this.matchups.forEach(matchup => {
      matchup.handicapDiff = Math.round(Math.abs(matchup.teams[0].handicap! - matchup.teams[1].handicap!));
    });
  }

  sortMatchups(matchups: Pairing[]): Pairing[] {
    return matchups.sort((a, b) => {
      if (a.handicapDiff == null) return 1;
      if (b.handicapDiff == null) return -1;
      return a.handicapDiff - b.handicapDiff;
    });
  }

  getLabel(index: number): string {
    const diffs = this.matchups.map(m => m.handicapDiff ?? 0);
    if (index === 0) return 'Best';
    if (index === 2) return 'Worst';
    // index 1: ties with best → "Best", ties with worst → "Worst", else "Good"
    if (diffs[0] === diffs[1]) return 'Best';
    if (diffs[1] === diffs[2]) return 'Worst';
    return 'Good';
  }

  getCardClass(index: number): string {
    const label = this.getLabel(index);
    if (label === 'Best') return 'matchup-card-best';
    if (label === 'Worst') return 'matchup-card-worst';
    return 'matchup-card-good';
  }

  getLabelClass(index: number): string {
    const label = this.getLabel(index);
    if (label === 'Best') return 'matchup-label-best';
    if (label === 'Worst') return 'matchup-label-worst';
    return 'matchup-label-good';
  }
}
