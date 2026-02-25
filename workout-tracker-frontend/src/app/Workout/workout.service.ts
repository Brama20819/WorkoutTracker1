import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from './workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private apiUrl = 'http://localhost:8080/api/workouts';
  constructor(private http: HttpClient) {}

  //Attaching the token to the request for authentication
  private getAuthHeaders(){
    const token=localStorage.getItem('token');
    //only adding token if it actually exists
    if (!token) return{};
    return {
      headers:new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }


//My methods for getting,adding,deleting information about workouts.
  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.apiUrl);
  }
  addWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(this.apiUrl, workout);
  }
  deleteWorkout(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

