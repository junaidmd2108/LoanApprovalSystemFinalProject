package com.junaid.backend.entity;  // Package where this class lives in your backend project

// Importing required JPA and Lombok annotations
import jakarta.persistence.*;           // For mapping this class to a table
import lombok.Data;                    // Lombok annotation to auto-generate getters/setters
import lombok.NoArgsConstructor;       // Generates a no-argument constructor
import lombok.AllArgsConstructor;      // Generates an all-argument constructor

// Marks this class as a JPA entity mapped to a table in the database
@Entity

// Specifies the actual name of the database table: loan_applications
@Table(name = "loan_applications")

// Lombok annotations to avoid boilerplate
@Data                      // Automatically adds getters, setters, toString, equals, and hashCode
@NoArgsConstructor         // Adds default constructor (needed by Spring JPA)
@AllArgsConstructor        // Adds constructor with all fields (used for testing/debugging)
public class LoanApplication {

    // Primary key of the table — auto-generated by the database (e.g., 1, 2, 3...)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Stores the name of the applicant applying for the loan
    @Column(name = "name_of_applicant", nullable = false)
    private String nameOfApplicant;

    // Type of loan selected by user (e.g., personal, home, education, etc.)
    @Column(nullable = false)
    private String loanType;

    // Total amount the user is requesting in the loan
    @Column(nullable = false)
    private double amount;

    // Duration of the loan in months (e.g., 12, 24, 60)
    @Column(nullable = false)
    private int tenure;

    // The interest rate (%) applied to this loan (e.g., 0.04 = 4%)
    @Column(nullable = false)
    private double interestRate;

    @Lob
    @Column(name = "supporting document")
    private byte[] supportingDocument;
}