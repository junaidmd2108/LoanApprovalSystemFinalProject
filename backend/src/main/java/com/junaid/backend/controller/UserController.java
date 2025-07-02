// ==============================================
// File: UserController.java
// Role:
//   - Handles user registration logic and exposes /register endpoint.
//   - Validates uniqueness of username, email, and ID number.
//   - Encrypts password before saving the user to the database.
//
// Why it matters:
//   - Without this, users can’t sign up in your system.
//   - It prevents duplicate entries and ensures password security.
//
// Dependencies:
//   - UserRepository to interact with the DB
//   - PasswordEncoder to hash passwords
//   - @RestController, @RequestMapping for defining REST API
//
// Related files:
//   - User.java (Entity being saved)
//   - UserRepository.java (JPA interface for User)
//   - SecurityConfig.java (allows public access to /register)
// ==============================================

package com.junaid.backend.controller; // Declares the Java package this class belongs to

import com.junaid.backend.entity.User; // Entity representing the user
import com.junaid.backend.repository.UserRepository; // Repository interface to perform DB operations
import org.springframework.beans.factory.annotation.Autowired; // Lets Spring inject dependencies automatically
import org.springframework.http.ResponseEntity; // Used to build structured HTTP responses
import org.springframework.security.crypto.password.PasswordEncoder; // For password encryption
import org.springframework.web.bind.annotation.*; // REST API annotations like @PostMapping, @RequestBody

@RestController // Declares this class as a REST API controller
@RequestMapping("/api") // All endpoints here will be under /api
@CrossOrigin(origins = "http://localhost:3000") // Allows frontend at this origin to access this controller
public class UserController { // Declares the controller class

    @Autowired // Spring injects a UserRepository bean here
    private UserRepository userRepository; // Used to check existing users and save new ones

    @Autowired // Spring injects PasswordEncoder bean here
    private PasswordEncoder passwordEncoder; // Used to hash the password before storing

    @PostMapping("/register") // POST endpoint for user registration
    public ResponseEntity<?> registerUser(@RequestBody User user) { // Method that handles registration logic

        // 1) Check if username already exists in DB
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(409).body("Username already exists"); // Return conflict status if true
        }

        // 2) Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(409).body("Email already registered"); // Conflict if true
        }

        // 3) Check if ID number already exists
        if (userRepository.existsByIdNumber(user.getIdNumber())) {
            return ResponseEntity.status(409).body("ID number already registered"); // Conflict if true
        }

        // 4) Hash the password securely using BCrypt
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 5) Save the user object to the database
        userRepository.save(user);

        // 6) Return success response
        return ResponseEntity.ok("Registration successful");
    }
}