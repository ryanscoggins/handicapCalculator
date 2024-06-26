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
        matchup.handicapDiff = Math.round(Math.abs(matchup.teams[0].handicap! - matchup.teams[1].handicap!))
    });
  }


  sortMatchups(matchups: Pairing[]): Pairing[] {
    return matchups.sort((a, b) => {
      if (a.handicapDiff == null || a.handicapDiff == undefined) {
        return 1
      }
      if (b.handicapDiff == null || b.handicapDiff == undefined) {
        return -1
      }
        return a.handicapDiff - b.handicapDiff
    })
  }
}
