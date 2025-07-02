// ==============================================
// File: LoanApplication.java
// Role:
//   - This is a JPA Entity class representing a single loan application.
//   - Each instance maps to a row in the `loan_applications` table in PostgreSQL.
//
// Why it matters:
//   - This file defines the structure of your loan data in the database.
//   - It is used throughout your app for saving, retrieving, and displaying loans.
//
// Dependencies:
//   - @Entity: Marks this class as a JPA entity.
//   - @Table: Specifies the DB table name.
//   - Lombok: @Data, @NoArgsConstructor, @AllArgsConstructor to reduce boilerplate.
//   - @Lob: Used to store large binary files like uploaded documents.
//
// Related files:
//   - LoanController.java (uses this class as input/output)
//   - LoanRepository.java (performs DB operations using this entity)
// ==============================================

package com.junaid.backend.entity; // Declares the Java package this class belongs to

import jakarta.persistence.*; // JPA annotations to define table and columns
import lombok.Data; // Lombok annotation to generate getters, setters, toString, equals, hashCode
import lombok.NoArgsConstructor; // Lombok annotation to generate a no-arg constructor
import lombok.AllArgsConstructor; // Lombok annotation to generate an all-args constructor

@Entity // Tells JPA this class represents a DB table
@Table(name = "loan_applications") // Maps this class to the "loan_applications" table in DB
@Data // Lombok: Generates getters/setters/toString/etc.
@NoArgsConstructor // Lombok: Needed for JPA (no-arg constructor)
@AllArgsConstructor // Lombok: Generates constructor with all fields
public class LoanApplication { // Declares a class to hold loan application data

    @Id // Marks this field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID in DB
    private Long id; // Unique ID for each loan application

    @Column(nullable = false) // Field must not be null in DB
    private String username; // Username of the applicant (links to authenticated user)

    @Column(name = "name_of_applicant", nullable = false) // DB column name + cannot be null
    private String nameOfApplicant; // Full name of the person applying

    @Column(nullable = false) // Cannot be null
    private String loanType; // Type of loan: personal, home, etc.

    @Column(nullable = false) // Cannot be null
    private double amount; // Amount requested

    @Column(nullable = false) // Cannot be null
    private int tenure; // Loan duration in months or years

    @Column(nullable = false) // Cannot be null
    private double interestRate; // Interest rate associated with the loan

    @Lob // Large object — used to store large files
    @Column(name = "supporting document") // Custom name for the column
    private byte[] supportingDocument; // Uploaded file as byte array (PDFs, images, etc.)
}