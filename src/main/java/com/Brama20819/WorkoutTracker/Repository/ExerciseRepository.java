package com.Brama20819.WorkoutTracker.Repository;

import com.Brama20819.WorkoutTracker.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {}
