// ==========================================================
// File: JwtUtil.java
//
// ❖ ROLE:
//    - Handles generation, validation, and decoding of JWT tokens.
//    - Used by the authentication system to secure user sessions.
//
// ❖ WHY IT'S IMPORTANT:
//    - JWT (JSON Web Token) is used for stateless authentication.
//    - Once a user logs in, this utility helps encode the token and later validate it.
//
// ❖ USED IN:
//    - AuthController.java (to generate token on login)
//    - JwtRequestFilter.java (to decode and validate token on every request)
//
// ❖ SPRING CONCEPTS:
//    - @Component: Makes this class available for dependency injection
//    - @Value: Injects values from application.properties
//
// ❖ JWT CONCEPTS:
//    - subject: stores username
//    - issuedAt and expiration: used for time-limited sessions
//
// ❖ OUTPUT:
//    - Generates and validates JWTs
// ==========================================================

package com.junaid.backend.util; // This file is inside the 'util' package

// === JWT Library Imports ===
import io.jsonwebtoken.Claims; // Represents all the claims (data) stored in the JWT token
import io.jsonwebtoken.Jwts; // Main class for creating and parsing JWT tokens
import io.jsonwebtoken.SignatureAlgorithm; // Enum for which algorithm to use (HS256 is used here)

// === Spring Imports ===
import org.springframework.beans.factory.annotation.Value; // Used to inject property values from application.properties
import org.springframework.stereotype.Component; // Makes this class injectable by Spring (like a helper utility)

// === Java Standard Libraries ===
import java.util.Date; // Used to represent issue time and expiration time of tokens
import java.util.function.Function; // Functional interface used to extract specific claims from token

/**
 * This class handles everything related to JWT tokens.
 * It generates them, reads them, and validates them.
 */
@Component // Marks this class as a Spring-managed bean so it can be injected where needed
public class JwtUtil {

    @Value("${jwt.secret}") // Injects the secret key from application.properties
    private String secret;

    @Value("${jwt.expirationMs}") // Injects the expiration duration from application.properties
    private long jwtExpirationMs;

    // === Extract a claim: username ===
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject); // Get the subject field (usually the username)
    }

    // === Extract a claim: expiration date ===
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration); // Get the expiration time from token
    }

    // === Generic method to extract any claim using a function ===
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token); // Get all claims
        return claimsResolver.apply(claims); // Apply the function to get specific value
    }

    // === Helper method to decode and return all token claims ===
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder() // Start building the parser
                .setSigningKey(secret.getBytes()) // Use the secret key to decode
                .build() // Finish building parser
                .parseClaimsJws(token) // Parse the JWT string
                .getBody(); // Return the claims inside it
    }

    // === Check if token is expired ===
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date()); // Compare expiration with current time
    }

    // === Generate a token given the username ===
    public String generateToken(String username) {
        Date now = new Date(); // Current timestamp
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs); // Add expiration duration

        return Jwts.builder() // Start building token
                .setSubject(username)         // Store username
                .setIssuedAt(now)             // Set issue time
                .setExpiration(expiryDate)    // Set expiry time
                .signWith(SignatureAlgorithm.HS256, secret.getBytes()) // Use HS256 algorithm and secret
                .compact(); // Finalize and get token string
    }

    // === Validate token ===
    public Boolean validateToken(String token, String userDetailsUsername) {
        final String username = extractUsername(token); // Get username from token
        return (username.equals(userDetailsUsername) && !isTokenExpired(token)); // Match + not expired = valid
    }
}