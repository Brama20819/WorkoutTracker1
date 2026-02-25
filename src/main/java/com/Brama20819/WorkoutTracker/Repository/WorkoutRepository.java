package com.Brama20819.WorkoutTracker.Repository;

import com.Brama20819.WorkoutTracker.DTO.ChartDataDTO;
import com.Brama20819.WorkoutTracker.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    @Query("SELECT new com.Brama20819.WorkoutTracker.DTO.ChartDataDTO(" +
            "CAST(s.timestamp AS string), MAX(s.weight)) " +
            "FROM Workout w JOIN w.exercises e JOIN e.sets s " +
            "WHERE e.name = :exerciseName " +
            "GROUP BY s.timestamp " +
            "ORDER BY s.timestamp ASC")
    List<ChartDataDTO> getExerciseProgress(@Param("exerciseName") String exerciseName);
}
