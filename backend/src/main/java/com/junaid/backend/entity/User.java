// ==============================================
// File: User.java
// Role:
//   - This is a JPA entity class representing a user who registers in the system.
//   - Maps to the `users` table in PostgreSQL and holds personal + login details.
//
// Why it matters:
//   - This file defines the structure of user data (both login + profile).
//   - Used in registration, authentication, and loan ownership.
//
// Dependencies:
//   - @Entity, @Table: Tell Spring JPA to create table mappings.
//   - @Column: Define DB field names and constraints.
//   - Lombok: Reduces boilerplate (getters/setters/constructors).
//
// Related files:
//   - UserRepository.java (used to fetch/save User objects)
//   - UserController.java (handles /register endpoint)
// ==============================================

package com.junaid.backend.entity; // Declares the Java package this class belongs to

import jakarta.persistence.*; // Jakarta Persistence (JPA) import for database handling
import lombok.AllArgsConstructor; // Lombok: creates constructor with all fields
import lombok.Data; // Lombok: adds getters, setters, equals, hashCode, toString
import lombok.NoArgsConstructor; // Lombok: creates default constructor

import java.math.BigDecimal; // Used for precise currency/income calculations
import java.time.LocalDate; // Java 8 date type (used for DOB)

@Entity // Marks this class as a JPA entity (will become a DB table)
@Table(name = "users") // Map this entity to a table named "users"
@Data // Lombok: adds getters/setters/toString/equals/hashCode
@NoArgsConstructor // Lombok: adds no-arg constructor
@AllArgsConstructor // Lombok: adds constructor with all fields
public class User { // Declares the User class

    @Id // Marks this field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generates ID values in DB
    private Long id; // Unique identifier for each user

    // — Credentials —
    @Column(name = "username", nullable = false, unique = true) // Required + must be unique
    private String username; // Used for login

    @Column(name = "password", nullable = false) // Required field
    private String password; // Password will be encrypted before storing

    // — Profile fields —
    @Column(name = "first_name", nullable = false) // Cannot be null
    private String firstName; // User’s first name

    @Column(name = "middle_name") // Optional field
    private String middleName; // User’s middle name

    @Column(name = "last_name", nullable = false) // Cannot be null
    private String lastName; // User’s last name

    @Column(name = "contact_number", nullable = false) // Cannot be null
    private String contactNumber; // Phone number

    @Column(nullable = false, unique = true) // Must be present and unique
    private String email; // User’s email (used for communication or login)

    @Column(nullable = false) // Required field
    private String address; // Home address

    @Column(name = "date_of_birth", nullable = false) // Required DOB
    private LocalDate dob; // User’s date of birth

    @Column(name = "id_type", nullable = false) // Required field
    private String idType; // Type of ID: SSN, passport, etc.

    @Column(name = "id_number", nullable = false, unique = true) // Required and must be unique
    private String idNumber; // ID number (SSN, Aadhar, etc.)

    @Column(name = "employment_status", nullable = false) // Required field
    private String employmentStatus; // Employed, unemployed, student, etc.

    @Column(name = "annual_income") // Optional field
    private BigDecimal annualIncome; // User’s income (used for loan eligibility)
}