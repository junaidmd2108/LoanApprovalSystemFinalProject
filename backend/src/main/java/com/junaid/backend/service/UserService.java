// ==========================================================
// File: UserService.java
//
// ❖ ROLE:
//    - This is a **service layer interface** that defines the operations you want to perform on `User` objects.
//    - Think of it as a "contract" for user-related business logic.
//
// ❖ WHY IT'S IMPORTANT:
//    - It separates business logic from the controller.
//    - It makes the app modular, testable, and easier to manage.
//    - Allows us to have different implementations if needed (e.g., for testing).
//
// ❖ USED IN:
//    - UserServiceImpl.java (implements this interface)
//    - UserController.java (calls methods declared here)
//
// ❖ KEY SPRING CONCEPTS:
//    - Interface-based programming
//    - Dependency Injection
//
// ❖ OUTPUT:
//    - Declares methods to:
//        - Register users
//        - Check for duplicates
//        - Retrieve users
// ==========================================================

package com.junaid.backend.service; // This line defines the package (folder structure) this file belongs to

// === Project-specific import ===
import com.junaid.backend.entity.User; // This imports the User class, which is your entity representing user data

// === Java Collection import ===
import java.util.List; // Java's built-in List interface, used for returning a list of users

/**
 * This interface declares the actions that can be done on a User.
 * It doesn't implement the logic — that's done in UserServiceImpl.
 */
public interface UserService {

    /**
     * Save a new user to the database.
     * This is typically called when a user registers.
     *
     * @param user The User object containing username, password, name, etc.
     * @return The saved User object (usually with an ID assigned)
     */
    User saveUser(User user);

    /**
     * Fetch a single user by their username.
     * This is useful when someone logs in, or for profile pages.
     *
     * @param username The unique username to search for
     * @return The User object, or null if not found
     */
    User getUserByUsername(String username);

    /**
     * Check whether a username already exists in the database.
     * Useful to prevent duplicate registrations.
     *
     * @param username The username to check
     * @return true if the username already exists, false otherwise
     */
    boolean existsByUsername(String username);

    /**
     * Optional: List all users registered in the system.
     * This is mostly used by admins or managers.
     *
     * @return A list of all User objects in the database
     */
    List<User> getAllUsers();
}