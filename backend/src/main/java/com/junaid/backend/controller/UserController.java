package com.junaid.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.junaid.backend.entity.User;
import com.junaid.backend.repository.UserRepository;
import com.junaid.backend.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository; // for login only

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        userService.register(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        userService.login(loginRequest);
        return ResponseEntity.ok("Login successful.");
    }
}