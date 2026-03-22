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

    // Split into two balanced teams using greedy algorithm
    // Sort descending and assign each player to the team with the lower current total
    const sortedDesc = [...this.players].sort((a, b) => b.handicap - a.handicap);
    this.teamA = [];
    this.teamB = [];
    let sumA = 0;
    let sumB = 0;

    for (const player of sortedDesc) {
      if (sumA <= sumB) {
        this.teamA.push(player);
        sumA += player.handicap;
      } else {
        this.teamB.push(player);
        sumB += player.handicap;
      }
    }

    this.teamATotal = Math.round(sumA * 10) / 10;
    this.teamBTotal = Math.round(sumB * 10) / 10;
    this.teamDiff = Math.round(Math.abs(sumA - sumB) * 10) / 10;
    this.showResults = true;
  }

  displayName(player: Golfer, index: number): string {
    return player.name?.trim() || `Player ${index + 1}`;
  }
}
