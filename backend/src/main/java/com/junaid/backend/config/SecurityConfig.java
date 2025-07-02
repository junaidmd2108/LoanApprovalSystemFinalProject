// ==============================================
// File: SecurityConfig.java
// Role:
//   - Configures Spring Security for the application.
//   - Sets up which routes are public and which require authentication.
//   - Integrates JWT-based stateless authentication.
//   - Defines CORS policy, disables CSRF, configures session management.
//   - Hooks up your custom JwtRequestFilter and MyUserDetailsService.
//
// Why it matters:
//   - This file is the core of your security setup.
//   - Without it, Spring Boot will use default login form security, which is not suitable for your project.
//
// Dependencies:
//   - @EnableWebSecurity and @EnableMethodSecurity to activate security features.
//   - SecurityFilterChain to define request-level security rules.
//   - DaoAuthenticationProvider + BCryptPasswordEncoder for user authentication.
//   - JwtRequestFilter to read JWTs from requests.
//
// Related files:
//   - JwtRequestFilter.java (the filter that checks tokens)
//   - MyUserDetailsService.java (loads user credentials)
//   - AuthController.java (provides /authenticate endpoint to get token)
// ==============================================
// src/main/java/com/junaid/backend/config/SecurityConfig.java

package com.junaid.backend.config; // Package declaration for namespace grouping

import com.junaid.backend.filter.JwtRequestFilter; // Import custom JWT filter class
import com.junaid.backend.service.MyUserDetailsService; // Import custom user service
import org.springframework.context.annotation.Bean; // Marks a method as a Spring bean
import org.springframework.context.annotation.Configuration; // Declares this class as a Spring configuration
import org.springframework.http.HttpMethod; // Enum to define HTTP methods like POST/GET
import org.springframework.security.authentication.AuthenticationManager; // Handles authentication logic
import org.springframework.security.authentication.dao.DaoAuthenticationProvider; // Provider to validate username/password using DB
import org.springframework.security.config.Customizer; // Simplifies method customization
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration; // Gets AuthenticationManager
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity; // Enables method-level security annotations
import org.springframework.security.config.annotation.web.builders.HttpSecurity; // Used to build security rules
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; // Enables Spring Security for web
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer; // Used to disable CSRF
import org.springframework.security.config.http.SessionCreationPolicy; // Controls how sessions are created
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // Provides password hashing
import org.springframework.security.crypto.password.PasswordEncoder; // Interface for password encoding
import org.springframework.security.web.SecurityFilterChain; // Defines the filter chain logic
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; // Adds filters before/after login
import org.springframework.web.cors.CorsConfiguration; // CORS config class
import org.springframework.web.cors.CorsConfigurationSource; // CORS configuration interface
import org.springframework.web.cors.UrlBasedCorsConfigurationSource; // Map CORS configs to URLs

import java.util.List; // Java List used for allowed origins/methods/headers

@Configuration // Marks this class as a Spring configuration
@EnableWebSecurity // Enables Spring Security for web applications
@EnableMethodSecurity // Enables method-level @PreAuthorize, @Secured, etc.
public class SecurityConfig { // Security configuration class

    private final MyUserDetailsService userDetailsService; // Inject custom user detail service
    private final JwtRequestFilter jwtRequestFilter; // Inject JWT request filter

    // Constructor-based dependency injection
    public SecurityConfig(MyUserDetailsService userDetailsService,
                          JwtRequestFilter jwtRequestFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean // Marks this method as a Spring-managed bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults()) // Enable CORS using our settings
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF (we’re using JWT, not cookies)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/register",
                                "/api/authenticate",
                                "/api/login"
                        ).permitAll() // Allow open access to these endpoints
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow pre-flight CORS
                        .anyRequest().authenticated() // All other requests require authentication
                )
                .sessionManagement(sm -> sm
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Do not use session — use JWT
                )
                .authenticationProvider(authenticationProvider()) // Hook up custom user service
                .addFilterBefore(
                        jwtRequestFilter, // Add our custom JWT filter
                        UsernamePasswordAuthenticationFilter.class // Place it before Spring's default login filter
                );

        return http.build(); // Return the security chain
    }

    @Bean // Create a DAO-based authentication provider bean
    public DaoAuthenticationProvider authenticationProvider() {
        var provider = new DaoAuthenticationProvider(); // Instance of authentication provider
        provider.setUserDetailsService(userDetailsService); // Use our user lookup logic
        provider.setPasswordEncoder(passwordEncoder()); // Use BCrypt encoder
        return provider; // Return configured provider
    }

    @Bean // Create and expose AuthenticationManager bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager(); // Get manager from config object
    }

    @Bean // Create a bean for encoding passwords
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Use BCrypt algorithm
    }

    @Bean // Create a CORS configuration source bean
    public CorsConfigurationSource corsConfigurationSource() {
        var cors = new CorsConfiguration(); // New CORS config
        cors.setAllowedOrigins(List.of("http://localhost:3000")); // Allow frontend origin
        cors.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allowed HTTP methods
        cors.setAllowedHeaders(List.of("Authorization", "Content-Type")); // Allowed headers
        cors.setAllowCredentials(true); // Allow sending cookies/auth headers

        var source = new UrlBasedCorsConfigurationSource(); // URL mapping config
        source.registerCorsConfiguration("/**", cors); // Apply CORS to all endpoints
        return source; // Return the configuration
    }
}