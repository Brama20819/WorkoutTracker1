package com.Brama20819.WorkoutTracker.controller;

import com.Brama20819.WorkoutTracker.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {
@Autowired
    private UserRepository userRepository;
@PostMapping("/guest-login")
    public ResponseEntity<?> guestLogin(){
    return userRepository.findByUsername("guest_user")
            .map(user -> ResponseEntity.ok(Map.of(
                    "token", "TOKEN_GUEST",
                    "username", user.getUsername()
            )))
            .orElse(ResponseEntity.status(404).body(Map.of("error", "Guest user not found in DB")));
}
}


