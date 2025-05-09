import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Button } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatchupComponent } from './matchup/matchup.component';
import { ExplainerComponent } from './explainer/explainer.component';
import { FooterComponent } from './footer/footer.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatchupComponent,
    ExplainerComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    Button,
    InputSwitchModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
