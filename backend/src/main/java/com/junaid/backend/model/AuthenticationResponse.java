// ==============================================
// File: AuthenticationResponse.java
// Role:
//   - This class is used to return the JWT token back to the frontend after successful login.
//   - It holds the token securely and makes it easy to return in a JSON response.
//
// Why it matters:
//   - After authenticating a user, the backend needs to send a signed token to the frontend.
//   - This class wraps that token neatly as a JSON object: { "jwt": "..." }
//
// Dependencies:
//   - None (This is a simple POJO — Plain Old Java Object)
//
// Related files:
//   - AuthenticationRequest.java (used to receive login credentials)
//   - AuthController.java (uses this as return type for /authenticate)
// ==============================================

package com.junaid.backend.model; // Declares the Java package this class belongs to

public class AuthenticationResponse { // Declares a public class named AuthenticationResponse

    private final String jwt; // Stores the generated JWT token (marked final since it won’t change)

    // Constructor that sets the JWT token field
    public AuthenticationResponse(String jwt) {
        this.jwt = jwt; // Assigns the input JWT value to the field
    }

    // Getter method to retrieve the JWT token
    public String getJwt() {
        return jwt; // Returns the token value
    }
}