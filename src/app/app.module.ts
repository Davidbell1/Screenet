import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionsService } from './services/questions/questions.service';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { QuestionnaireComponent } from './views/questionnaire/questionnaire.component';
import { ResultsComponent } from './views/results/results.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'results', component: ResultsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionnaireComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB93fKBqB2tVEJh3PBA3LV0n4Jl8bJIL3w '
    })
  ],
  providers: [
    QuestionsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
