import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatchupComponent } from './matchup/matchup.component';
import { ExplainerComponent } from './explainer/explainer.component';
import { FooterComponent } from './footer/footer.component';
import { CookieService } from 'ngx-cookie-service';
import { FoursomeComponent } from './foursome/foursome.component';
import { RouterModule } from '@angular/router';
import { TournamentComponent } from './tournament/tournament.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatchupComponent,
    ExplainerComponent,
    FooterComponent,
    FoursomeComponent,
    TournamentComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    InputSwitchModule,
    TabViewModule,
    RouterModule.forRoot([
      { path: '', component: FoursomeComponent },
      { path: 'tournament', component: TournamentComponent },
    ])
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
