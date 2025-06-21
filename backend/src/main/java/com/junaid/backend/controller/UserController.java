package com.junaid.backend.controller;

import com.junaid.backend.entity.User;
import com.junaid.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // 1) Check for duplicates
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(409).body("Username already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(409).body("Email already registered");
        }
        if (userRepository.existsByIdNumber(user.getIdNumber())) {
            return ResponseEntity.status(409).body("ID number already registered");
        }

        // 2) Hash the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 3) Persist full profile
        userRepository.save(user);

        return ResponseEntity.ok("Registration successful");
    }
}