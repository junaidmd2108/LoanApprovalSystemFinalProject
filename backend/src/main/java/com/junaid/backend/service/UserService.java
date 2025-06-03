package com.junaid.backend.service;

import com.junaid.backend.entity.User;
import java.util.List;

/**
 * Defines the operations your application needs on User objects.
 */
public interface UserService {

    /**
     * Save a new user (e.g., during registration).
     */
    User saveUser(User user);

    /**
     * Find a user by their username.
     */
    User getUserByUsername(String username);

    /**
     * Check if a given username already exists.
     */
    boolean existsByUsername(String username);

    /**
     * (Optional) List all users in the system.
     */
    List<User> getAllUsers();
}