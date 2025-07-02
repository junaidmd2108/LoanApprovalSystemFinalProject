// ==============================================
// File: AuthenticationRequest.java
// Role:
//   - This is a simple Plain Old Java Object (POJO) that captures login credentials (username and password).
//   - It is used when a user sends a login request to the backend.
//   - This class gets automatically populated when the frontend sends a POST request with a JSON body.
//
// Why it matters:
//   - This class acts as a data transfer object (DTO) to capture input from users.
//   - It is used inside AuthController’s /authenticate endpoint.
//
// Dependencies:
//   - None (no annotations or Spring dependencies)
//
// Related files:
//   - AuthenticationResponse.java (sent back after successful login)
//   - AuthController.java (uses this as input for /authenticate)
// ==============================================

package com.junaid.backend.model; // Declares that this class is part of the 'model' package

public class AuthenticationRequest { // Declares a public class named AuthenticationRequest

    private String username; // Stores the username submitted from frontend during login
    private String password; // Stores the corresponding password

    public AuthenticationRequest() { } // Default no-argument constructor (required for JSON deserialization)

    // Getter method for the username
    public String getUsername() {
        return username; // Returns the current value of username
    }

    // Setter method for the username (called automatically by Spring when mapping JSON request body)
    public void setUsername(String username) {
        this.username = username; // Assigns incoming value to the instance variable
    }

    // Getter method for the password
    public String getPassword() {
        return password; // Returns the current value of password
    }

    // Setter method for the password
    public void setPassword(String password) {
        this.password = password; // Assigns incoming value to the instance variable
    }
}