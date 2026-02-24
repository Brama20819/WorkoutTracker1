import { Component } from '@angular/core';
import { WorkoutComponent } from './Workout/workout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorkoutComponent, HttpClientModule, FormsModule],
  template: `
    <h1>Workout Tracker</h1>
    <app-exercise></app-exercise>
  `
})
export class AppComponent {}
