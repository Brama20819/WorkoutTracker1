import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutService } from './workout.service';
import { Workout } from './workout.model';
import { WorkoutForm } from './workoutForm.model';
@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  workouts: Workout[] = [];
  newWorkout: WorkoutForm = {name: '', description: '', duration: 0,  };
  constructor(private exerciseService: WorkoutService) {
  }
  ngOnInit(): void {
    this.loadWorkouts();
  }
  loadWorkouts(): void {
    this.exerciseService.getWorkouts().subscribe({
      next: data => this.workouts = data,
      error: err => console.error('Error loading workouts', err)
    });
  }
  addWorkout(): void {
    this.exerciseService.addWorkout(this.newWorkout as Workout).subscribe({
      next: workoutFromBackend => {
        this.workouts.push({ ...workoutFromBackend });
        this.newWorkout = { name: '', description: '', duration: 0,  };
      },
      error: err => console.error('Error adding workout', err)
    });
  }
  deleteWorkout(id: number | undefined): void {
    if (!id) return;
    this.workouts = this.workouts.filter(w => w.id !== id);
    this.exerciseService.deleteWorkout(id).subscribe({
      next: () => console.log(`Deleted workout ${id}`),
      error: err => {
        console.error('Error deleting workout', err);
        this.loadWorkouts();
      }
    });
  }
}

