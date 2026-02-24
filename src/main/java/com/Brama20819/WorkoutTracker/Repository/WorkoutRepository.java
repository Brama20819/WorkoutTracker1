package com.Brama20819.WorkoutTracker.Repository;

import com.Brama20819.WorkoutTracker.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {}
