import { Component } from '@angular/core';
import { Golfer } from 'src/interfaces/golfer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  golfer1: Golfer = { name: 'Golfer 1', handicap: 0 };
  golfer2: Golfer = { name: 'Golfer 2', handicap: 0 };
  golfer3: Golfer = { name: 'Golfer 3', handicap: 0 };
  golfer4: Golfer = { name: 'Golfer 4', handicap: 0 };

  createTeams() {
    let team1: Golfer[] = [this.golfer1, this.golfer2];
    let team2: Golfer[] = [this.golfer3, this.golfer4];
  }

}
