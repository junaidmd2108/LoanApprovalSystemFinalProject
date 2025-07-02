// ==========================================================
// File: UserServiceImpl.java
//
// ❖ ROLE:
//    - This class implements the `UserService` interface.
//    - It defines the actual logic to save, fetch, and check users using the UserRepository.
//
// ❖ WHY IT'S IMPORTANT:
//    - This is where your business logic for user operations lives.
//    - It separates the actual logic from the controller (MVC architecture).
//
// ❖ USED IN:
//    - UserController.java
//
// ❖ KEY SPRING CONCEPTS:
//    - @Service: Marks this class as a Spring-managed service bean.
//    - @Autowired: Injects the UserRepository bean automatically.
//
// ❖ OUTPUT:
//    - Stores new users, finds users by username, checks if user exists, returns all users.
// ==========================================================

package com.junaid.backend.service; // Defines the package where this class is located

// === Project-specific imports ===
import com.junaid.backend.entity.User; // Imports the User entity (represents the user table in DB)
import com.junaid.backend.repository.UserRepository; // Imports the repository interface that talks to the DB

// === Spring Framework imports ===
import org.springframework.beans.factory.annotation.Autowired; // Tells Spring to inject the dependency
import org.springframework.stereotype.Service; // Marks this class as a service component

// === Java collections ===
import java.util.List; // Java utility to represent a list of user objects

/**
 * This class implements the methods declared in UserService.java.
 * It uses the UserRepository to interact with the database.
 */
@Service // Spring will automatically detect and create an instance of this class
public class UserServiceImpl implements UserService {

    // The UserRepository is injected by Spring at runtime
    @Autowired
    private UserRepository userRepository;

    /**
     * Save a new user to the database.
     * This is typically called from the registration form.
     *
     * @param user The user object containing all user details
     * @return The saved user (with ID populated by DB)
     */
    @Override
    public User saveUser(User user) {
        return userRepository.save(user); // Save the user and return the saved object
    }

    /**
     * Retrieve a user by username from the database.
     * Called during login or profile view.
     *
     * @param username The unique username to search for
     * @return The matching user, or null if not found
     */
    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username); // Query DB for matching username
    }

    /**
     * Check if the given username is already used.
     * Called during registration to prevent duplicates.
     *
     * @param username The username to check
     * @return true if user exists, false otherwise
     */
    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username); // Uses Spring Data JPA magic method
    }

    /**
     * Optional method to list all users.
     * This is useful for admin features or debugging.
     *
     * @return List of all users from the database
     */
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll(); // Uses JPA method to fetch all user records
    }
}