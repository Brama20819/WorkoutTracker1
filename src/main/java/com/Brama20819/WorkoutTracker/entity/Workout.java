package com.Brama20819.WorkoutTracker.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
@Column(nullable = false)
    private String name="";
    @Column(nullable = false)
    private String description="";
    @Column(nullable = false)
    private int duration ;
    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Exercise> exercises=new ArrayList<>();
}