// ==============================================
// File: AuthController.java
// Role:
//   - This controller handles login/authentication requests.
//   - Accepts a POST request with username/password, and returns a JWT if valid.
//
// Why it matters:
//   - It connects the frontend login form with Spring Security's backend.
//   - Without this, users can't get tokens and access secured endpoints.
//
// Dependencies:
//   - AuthenticationManager: checks if credentials are correct
//   - JwtUtil: generates JWT token after login
//   - MyUserDetailsService: loads user from DB
//
// Related files:
//   - JwtUtil.java
//   - AuthenticationRequest.java / AuthenticationResponse.java
//   - SecurityConfig.java (registers this endpoint as public)
// ==============================================

package com.junaid.backend.controller; // Declares the Java package this class belongs to

import com.junaid.backend.model.AuthenticationRequest; // Model class to hold login data (username, password)
import com.junaid.backend.model.AuthenticationResponse; // Model class to return the generated JWT
import com.junaid.backend.service.MyUserDetailsService; // Service to load user details from DB
import com.junaid.backend.util.JwtUtil; // Utility class for JWT generation
import org.springframework.beans.factory.annotation.Autowired; // Allows Spring to inject dependencies
import org.springframework.http.ResponseEntity; // Used to return HTTP responses
import org.springframework.security.authentication.AuthenticationManager; // Main Spring Security interface to authenticate credentials
import org.springframework.security.authentication.BadCredentialsException; // Exception thrown when login fails
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; // Holds the username/password for authentication
import org.springframework.security.core.userdetails.UserDetails; // Represents user information used by Spring Security
import org.springframework.web.bind.annotation.*; // Provides REST API annotations

@RestController // Marks this class as a REST controller (returns JSON responses)
@RequestMapping("/api") // All endpoints in this controller will start with /api
public class AuthController { // Declares a class named AuthController

    @Autowired // Injects an instance of AuthenticationManager from Spring context
    private AuthenticationManager authenticationManager; // Used to authenticate credentials

    @Autowired // Injects custom user loading service
    private MyUserDetailsService userDetailsService; // Loads user info from DB

    @Autowired // Injects utility to generate JWTs
    private JwtUtil jwtUtil; // Used to generate tokens upon successful login

    @PostMapping("/authenticate") // Endpoint for user login, expects POST at /api/authenticate
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authRequest) { // Declares method that handles login
        try { // Try to validate credentials
            authenticationManager.authenticate( // Ask Spring Security to validate credentials
                    new UsernamePasswordAuthenticationToken( // Wraps username and password for validation
                            authRequest.getUsername(), // Gets username from request
                            authRequest.getPassword() // Gets password from request
                    )
            );
        } catch (BadCredentialsException e) { // If credentials are invalid
            return ResponseEntity.status(401).body("Incorrect username or password"); // Return 401 Unauthorized with message
        }

        // Load full user details by username
        final UserDetails userDetails =
                userDetailsService.loadUserByUsername(authRequest.getUsername());

        // Generate a JWT for the user
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        // Return the JWT in the response
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}