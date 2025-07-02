// ==========================================================
// File: MyUserDetailsService.java
//
// ❖ ROLE:
//    - This class integrates your user data with Spring Security.
//    - It retrieves user details (like username and password) from your database.
//
// ❖ WHY IT'S IMPORTANT:
//    - When a user tries to log in, Spring Security calls this class.
//    - Without this, Spring Security wouldn't know how to find your users.
//
// ❖ USED IN:
//    - AuthController.java (indirectly, during login)
//    - Security configuration
//
// ❖ OUTPUT:
//    - Returns a Spring Security User object with username, password, and roles
//
// ❖ SPRING CONCEPTS:
//    - @Service: Used to define this as a service layer class.
//    - UserDetailsService: Built-in interface to be implemented for authentication.
//    - @Autowired: Injects the UserRepository automatically.
//
// ❖ FLOW:
//    1. Spring Security calls `loadUserByUsername()`
//    2. We fetch user from database
//    3. Return Spring Security User object (used internally by Spring)
// ==========================================================

package com.junaid.backend.service; // This line declares the Java package this class belongs to

// === Project-specific imports ===
import com.junaid.backend.entity.User; // Import your User entity (from your DB)
import com.junaid.backend.repository.UserRepository; // Import your repository to access the DB

// === Spring Security and Framework imports ===
import org.springframework.beans.factory.annotation.Autowired; // Enables Spring to inject objects like UserRepository
import org.springframework.security.core.userdetails.UserDetails; // Interface that represents user information used by Spring Security
import org.springframework.security.core.userdetails.UserDetailsService; // Interface you must implement for login handling
import org.springframework.security.core.userdetails.UsernameNotFoundException; // Exception thrown if user not found
import org.springframework.stereotype.Service; // Tells Spring this is a service class

/**
 * This class is used by Spring Security to load user details from your database.
 */
@Service // Spring will treat this class as a Service component and manage it
public class MyUserDetailsService implements UserDetailsService {

    // Spring will automatically inject the UserRepository instance here
    @Autowired
    private UserRepository userRepository;

    // This method is called when a user tries to log in
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Try to find the user in the database using the provided username
        User userEntity = userRepository.findByUsername(username);

        // If no user was found, throw an exception
        if (userEntity == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        // If user is found, return a Spring Security user object
        return org.springframework.security.core.userdetails.User // Fully qualified class name to avoid ambiguity
                .withUsername(userEntity.getUsername()) // Set the username
                .password(userEntity.getPassword())     // Set the encoded password
                .authorities("ROLE_USER")               // Give the user a default role
                .build();                               // Build and return the UserDetails object
    }
}