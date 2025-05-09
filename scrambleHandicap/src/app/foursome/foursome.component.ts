import { Component } from '@angular/core';
import { Golfer } from 'src/interfaces/golfer';
import { Team } from 'src/interfaces/team';
import { Pairing } from 'src/interfaces/pairing';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-foursome',
  templateUrl: './foursome.component.html',
})
export class FoursomeComponent {
  golfer1: Golfer = { name: 'Golfer 1', handicap: 0 };
  golfer2: Golfer = { name: 'Golfer 2', handicap: 0 };
  golfer3: Golfer = { name: 'Golfer 3', handicap: 0 };
  golfer4: Golfer = { name: 'Golfer 4', handicap: 0 };
  allGolfers: Golfer[] = [ this.golfer1, this.golfer2, this.golfer3, this.golfer4 ]

  friendlyFormat: boolean = true;
  teams: Team[] = []; 
  matchup1: Pairing = { teams: [] };
  matchup2: Pairing = { teams: [] };
  matchup3: Pairing = { teams: [] };
  matchups: Pairing[] = [];
  showMatchups: boolean = false;

  constructor(private cookieService: CookieService) {}


  ngOnInit() {
    const storedGolfers = localStorage.getItem('golfers');
    if (storedGolfers) {
      const parsed: Golfer[] = JSON.parse(storedGolfers);

      // Assign stored data to current golfers
      this.allGolfers.forEach((golfer, i) => {
        if (parsed[i]) {
          golfer.name = parsed[i].name;
          golfer.handicap = parsed[i].handicap;
        }
      });
    }
   }


  inputChange() {
    this.showMatchups = false;
  }


  createTeams() {
    let team1: Team = {golfers: [this.golfer1, this.golfer2]}
    let team2: Team = {golfers: [this.golfer3, this.golfer4]}
    this.matchup1 = {teams: [team1, team2]}

    let team3: Team = {golfers: [this.golfer1, this.golfer3]}
    let team4: Team = {golfers: [this.golfer2, this.golfer4]}
    this.matchup2 = {teams: [team3, team4]}

    let team5: Team = {golfers: [this.golfer1, this.golfer4]}
    let team6: Team = {golfers: [this.golfer2, this.golfer3]}
    this.matchup3 = {teams: [team5, team6]}
    // form different combinations of teams
    this.teams = [team1, team2, team3, team4, team5, team6]

    this.matchups = [this.matchup1, this.matchup2, this.matchup3] 
  }


  calculateTeamHandicap(): void {
    for (let team of this.teams) {
      let totalHandicap = 0;
      switch (this.friendlyFormat) {
        case true:
          for (let golfer of team.golfers) {
            totalHandicap += golfer.handicap;
          }
          totalHandicap = totalHandicap / 4
          break;
        case false:
          let lowerHandicap = Math.min(team.golfers[0].handicap, team.golfers[1].handicap);
          let higherHandicap = Math.max(team.golfers[0].handicap, team.golfers[1].handicap);
          totalHandicap = (lowerHandicap * 0.35) + (higherHandicap * 0.15);
          break;
      }
      // round to nearest tenth
      team.handicap = Math.round(totalHandicap * 10) / 10; 
    }
    for (let matchup of this.matchups) {
      matchup.teams.sort((a, b) => a.handicap! - b.handicap!)
    }
    this.showMatchups = true;

    localStorage.setItem('golfers', JSON.stringify(this.allGolfers));
  }

}
