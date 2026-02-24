package com.Brama20819.WorkoutTracker.controller;
import com.Brama20819.WorkoutTracker.Repository.WorkoutRepository;

import com.Brama20819.WorkoutTracker.entity.Workout;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "http://localhost:4200")
public class WorkoutController {

    private final WorkoutRepository workoutRepository;

    public WorkoutController(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }


    @GetMapping
    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }


    @PostMapping
    public Workout createWorkout(@RequestBody Workout workout) {

        if (workout.getExercises() != null) {
            workout.getExercises().forEach(ex -> {
                ex.setWorkout(workout);
                if (ex.getSets() != null) {
                    ex.getSets().forEach(set -> set.setExercise(ex));
                }
            });
        }
        return workoutRepository.save(workout);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWorkout(@PathVariable Long id) {
        if (workoutRepository.existsById(id)) {
            workoutRepository.deleteById(id);
            return ResponseEntity.ok("Workout deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Workout not found");
        }
    }

}