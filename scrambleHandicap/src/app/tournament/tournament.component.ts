import { Component } from '@angular/core';
import { Golfer } from 'src/interfaces/golfer';

interface TournamentGroup {
  label: string;
  players: Golfer[];
}

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
})
export class TournamentComponent {
  readonly maxPlayers = 40;

  players: Golfer[] = [
    { name: '', handicap: 0 },
    { name: '', handicap: 0 },
    { name: '', handicap: 0 },
    { name: '', handicap: 0 },
  ];

  groups: TournamentGroup[] = [];
  teamA: Golfer[] = [];
  teamB: Golfer[] = [];
  teamATotal = 0;
  teamBTotal = 0;
  teamDiff = 0;
  showResults = false;

  get canAddPlayer(): boolean {
    return this.players.length < this.maxPlayers;
  }

  addPlayer(): void {
    if (this.canAddPlayer) {
      this.players.push({ name: '', handicap: 0 });
    }
    this.showResults = false;
  }

  removePlayer(index: number): void {
    this.players.splice(index, 1);
    this.showResults = false;
  }

  inputChange(): void {
    this.showResults = false;
  }

  createTournament(): void {
    const sorted = [...this.players].sort((a, b) => a.handicap - b.handicap);

    // Build A/B/C/D groups — always 4 groups, split as evenly as possible
    const numGroups = 4;
    const groupLabels = ['A', 'B', 'C', 'D'];
    this.groups = groupLabels.map(label => ({ label, players: [] }));

    sorted.forEach((player, i) => {
      const groupIndex = Math.min(
        Math.floor((i * numGroups) / sorted.length),
        numGroups - 1
      );
      this.groups[groupIndex].players.push(player);
    });

    // Remove empty groups
    this.groups = this.groups.filter(g => g.players.length > 0);

    // Split into two equal-size teams using snake-draft order
    // Sort ascending (best = lowest handicap first), then snake: 1, 2, 2, 1, 1, 2, 2, 1...
    const sortedAsc = [...this.players].sort((a, b) => a.handicap - b.handicap);
    this.teamA = [];
    this.teamB = [];

    sortedAsc.forEach((player, i) => {
      // Snake pattern repeats every 4 picks: A, B, B, A
      const pos = i % 4;
      if (pos === 0 || pos === 3) {
        this.teamA.push(player);
      } else {
        this.teamB.push(player);
      }
    });

    const sumA = this.teamA.reduce((s, g) => s + g.handicap, 0);
    const sumB = this.teamB.reduce((s, g) => s + g.handicap, 0);
    this.teamATotal = Math.round(sumA * 10) / 10;
    this.teamBTotal = Math.round(sumB * 10) / 10;
    this.teamDiff = Math.round(Math.abs(sumA - sumB) * 10) / 10;
    this.showResults = true;
  }

  displayName(player: Golfer, index: number): string {
    return player.name?.trim() || `Player ${index + 1}`;
  }
}
