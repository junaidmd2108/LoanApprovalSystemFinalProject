// ==============================================
// File: UserRepository.java
// Role:
//   - This interface defines all user-related database operations.
//   - It extends JpaRepository, giving you built-in CRUD methods for free.
//   - Also defines custom finder methods for username, email, and ID number.
//
// Why it matters:
//   - It's essential for user registration and login validation.
//   - Spring Data JPA automatically creates SQL queries based on method names.
//
// Dependencies:
//   - JpaRepository: Provides CRUD and pagination methods.
//   - @Repository: Tells Spring this is a data access layer component.
//
// Related files:
//   - UserController.java (uses this interface to save & validate users)
//   - User.java (the entity this repository manages)
// ==============================================

package com.junaid.backend.repository; // Declares the package this interface belongs to

import com.junaid.backend.entity.User; // Imports the User entity class (used in this repository)
import org.springframework.data.jpa.repository.JpaRepository; // Spring Data JPA interface for CRUD operations
import org.springframework.stereotype.Repository; // Tells Spring this interface is a repository

@Repository // Tells Spring to manage this interface as a bean for dependency injection
public interface UserRepository extends JpaRepository<User, Long> {
    // JpaRepository provides methods like save(), findAll(), findById(), deleteById(), etc.
    // User is the entity this repository handles, and Long is the type of its primary key

    // === CUSTOM QUERY METHODS ===

    // Checks if a user with the given username exists in the DB
    boolean existsByUsername(String username);

    // Finds and returns a User object based on the given username
    User findByUsername(String username);

    // Checks if a user with the given email exists
    boolean existsByEmail(String email);

    // Checks if a user with the given ID number exists (like SSN or Passport)
    boolean existsByIdNumber(String idNumber);
}