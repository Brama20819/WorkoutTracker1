import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutService } from './workout.service';
import { Workout } from './workout.model';
import { WorkoutForm } from './workoutForm.model';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})

export class WorkoutComponent implements OnInit {
  @ViewChild('myChart')chartCanvas!:ElementRef;
  workouts: Workout[] = [];
  chart:any;
  Name:string='';
  Weight:number=0;
  newWorkout: WorkoutForm = {name: '', description: '', duration: 0,  };

  constructor(private exerciseService: WorkoutService) {
  }

  ngOnInit(): void {
    this.loadWorkouts();
  }
  loadProgress(exerciseName: string): void {
    if (!exerciseName) {
      console.error("Cannot load progress: Exercise name is empty");
      return;
    }


    this.exerciseService.getExerciseProgress(exerciseName).subscribe({
      next: (data) => {
        const labels = data.map(d => new Date(d.date).toLocaleDateString());
        const weights = data.map(d => d.weight);

        if (this.chart) {
          this.chart.destroy();
        }

        this.chart = new Chart(this.chartCanvas.nativeElement, {
          type: 'line',
          data: {labels: labels, datasets: [{label: `Progress: ${exerciseName}`, data: weights, borderColor: '#007bff', backgroundColor: 'rgba(0, 123, 255, 0.1)', fill: true, tension: 0.3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      },
      error: (err) => console.error('Error loading chart data', err)
    });
  }




  loadWorkouts(): void {
    this.exerciseService.getWorkouts().subscribe({
      next: data => this.workouts = data,
      error: err => console.error('Error loading workouts', err)
    });
  }



  addWorkout(): void {
    const workoutWithData = {
      ...this.newWorkout,
      exercises: [{
        name: this.Name,
        sets: [{ weight: this.Weight, repetitions: 0, setNumber: 1, timestamp: new Date().toISOString() }]
      }]
    };

    this.exerciseService.addWorkout(workoutWithData as any).subscribe({
      next: workoutFromBackend => {
        this.workouts.push({ ...workoutFromBackend });
        this.newWorkout = { name: '', description: '', duration: 0,  };
        this.Name = '';
        this.Weight = 0;
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

