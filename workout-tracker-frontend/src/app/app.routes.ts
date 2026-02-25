import { Routes } from '@angular/router';
import { LoginComponent } from './Authentication/Login/login.component';
import { WorkoutComponent } from './Workout/workout.component';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },


  { path: 'login', component: LoginComponent },


  { path: 'workouts', component: WorkoutComponent },


  { path: '**', redirectTo: 'login' }
];
