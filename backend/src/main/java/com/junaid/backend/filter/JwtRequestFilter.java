// ==============================================
// File: JwtRequestFilter.java
// Role:
//   - This filter is responsible for intercepting every HTTP request to check for a JWT.
//   - If a token is found and valid, it sets the authentication in the Spring Security context.
//
// Why it matters:
//   - It's essential for enabling stateless JWT-based authentication across your secured endpoints.
//   - Without it, your token won't be recognized after login.
//
// Dependencies:
//   - JwtUtil: For extracting and validating the JWT.
//   - MyUserDetailsService: Loads the user from the database.
//   - SecurityContextHolder: Holds the security context (like a thread-local user session).
//   - OncePerRequestFilter: Ensures the filter is executed once per request.
// ==============================================

package com.junaid.backend.filter; // Declares that this file belongs to the 'filter' package in the project

// === IMPORTS (Each serves a specific purpose in JWT filtering) ===

import com.junaid.backend.service.MyUserDetailsService; // Custom service class that loads user details from DB (used to fetch user for token validation)
import com.junaid.backend.util.JwtUtil; // Custom utility class to generate, extract, and validate JWTs

import org.springframework.beans.factory.annotation.Autowired; // Enables automatic injection of dependencies by Spring
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; // Represents authentication token used by Spring Security
import org.springframework.security.core.context.SecurityContextHolder; // Holds the security context across the current request thread
import org.springframework.security.core.userdetails.UserDetails; // Represents the authenticated user's details (username, password, authorities)
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource; // Builds additional authentication details from HttpServletRequest
import org.springframework.stereotype.Component; // Marks the class as a Spring-managed component (bean)
import org.springframework.web.filter.OncePerRequestFilter; // Base class for filters that should be executed only once per request

import jakarta.servlet.FilterChain; // Used to continue the filter chain execution
import jakarta.servlet.ServletException; // Exception thrown during servlet processing
import jakarta.servlet.http.HttpServletRequest; // Represents the incoming HTTP request
import jakarta.servlet.http.HttpServletResponse; // Represents the outgoing HTTP response

import java.io.IOException; // Exception thrown when an IO operation fails (used here for filter execution)

// === MAIN CLASS ===

@Component // Marks this class as a Spring component to be managed and auto-registered as a bean
public class JwtRequestFilter extends OncePerRequestFilter { // This class is a filter that runs ONCE per request

    @Autowired // Injects an instance of JwtUtil at runtime
    private JwtUtil jwtUtil; // Utility to extract and validate JWT token

    @Autowired // Injects an instance of MyUserDetailsService at runtime
    private MyUserDetailsService userDetailsService; // Service to load user from the database

    @Override // Overrides the method from OncePerRequestFilter
    protected void doFilterInternal(HttpServletRequest request, // Represents the current HTTP request
                                    HttpServletResponse response, // Represents the HTTP response
                                    FilterChain filterChain) // Allows the request to proceed to the next filter or controller
            throws ServletException, IOException { // Declares potential exceptions

        String uri = request.getRequestURI(); // Gets the URI of the current request
        String authorizationHeader = request.getHeader("Authorization"); // Retrieves the value of the 'Authorization' header

        System.out.println(">>> [JwtFilter] Request URI: " + uri); // Logs the URI being requested
        System.out.println(">>> [JwtFilter] Authorization header: " + authorizationHeader); // Logs the Authorization header

        String username = null; // Placeholder for the extracted username
        String jwt = null; // Placeholder for the extracted JWT

        // Check if the Authorization header is present and starts with "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Extract the JWT by removing the "Bearer " prefix
            System.out.println(">>> [JwtFilter] Extracted JWT: " + jwt);
            try {
                username = jwtUtil.extractUsername(jwt); // Extracts the username from the JWT
                System.out.println(">>> [JwtFilter] Extracted username: " + username);
            } catch (Exception e) {
                System.out.println(">>> [JwtFilter] Error extracting username: " + e.getMessage()); // Log any issues with extracting the username
            }
        }

        // If we got a username and there's no authentication yet in the context
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username); // Load full user details from DB
            System.out.println(">>> [JwtFilter] Loaded userDetails: " + userDetails.getUsername());

            boolean valid = jwtUtil.validateToken(jwt, userDetails.getUsername()); // Validate the JWT against the username
            System.out.println(">>> [JwtFilter] Token valid? " + valid);

            if (valid) {
                // Create an authentication token
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, // Principal (user info)
                                null, // No credentials needed since we already have JWT
                                userDetails.getAuthorities() // User roles and permissions
                        );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); // Attach extra request details
                SecurityContextHolder.getContext().setAuthentication(authToken); // Set authentication in the security context
                System.out.println(">>> [JwtFilter] Authentication set in context");
            }
        }

        filterChain.doFilter(request, response); // Continue the filter chain
    }
}