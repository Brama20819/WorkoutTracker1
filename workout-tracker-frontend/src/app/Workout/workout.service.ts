import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from './workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private apiUrl = '/api/workouts';

  constructor(private http: HttpClient) {
  }

  //Attaching the token to the request for authentication
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    //only adding token if it actually exists
    if (!token) return {};
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  //charts
  getExerciseProgress(exerciseName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/progress/${exerciseName}`);
  }


//My methods for getting,adding,deleting information about workouts.
  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.apiUrl);
  }

  addWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(this.apiUrl, workout);
  }
//had to fix this because I was getting errors in console
  deleteWorkout(id: number): Observable<string> {
    const headers = this.getAuthHeaders().headers;
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: headers,
      responseType: 'text'
    });
  }
}
