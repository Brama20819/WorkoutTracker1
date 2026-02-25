package com.Brama20819.WorkoutTracker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name="users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


  @Column(unique=true, nullable = false)
  private String username;
  @Column(nullable = false)
  private String password;
@Column(unique = true, nullable = false)
private String email;
@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
private List <Workout> workouts;

}
