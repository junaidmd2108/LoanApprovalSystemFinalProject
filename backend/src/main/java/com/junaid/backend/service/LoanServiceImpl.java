// ==========================================================
// File: LoanServiceImpl.java
//
// ❖ ROLE:
//    - This file contains the real business logic for applying loans.
//    - It implements the LoanService interface.
//    - It handles validations, uploads documents, checks credit score,
//      and saves or rejects the loan based on criteria.
//
// ❖ WHY IT'S IMPORTANT:
//    - This is the heart of your Loan Application backend logic.
//    - It talks to the database using LoanRepository.
//    - It separates controller logic from business logic (MVC structure).
//
// ❖ USED IN:
//    - Called by LoanController.java
//
// ❖ OUTPUT:
//    - Stores loans in DB
//    - Returns status message to frontend
//
// ❖ KEY CONCEPTS:
//    - Spring @Service
//    - Random credit score generation
//    - File upload handling (MultipartFile)
//    - Business rules using HashMap
//    - Custom error handling using ResponseStatusException
// ==========================================================

package com.junaid.backend.service; // Declares this class belongs to the 'service' package in your project

// === Project-level dependencies ===
import com.junaid.backend.entity.LoanApplication; // Import the LoanApplication class (your loan data model)
import com.junaid.backend.repository.LoanRepository; // Import LoanRepository interface for DB interaction

// === Spring Framework dependencies ===
import org.springframework.beans.factory.annotation.Autowired; // Enables Spring to inject dependencies automatically
import org.springframework.http.HttpStatus; // Represents HTTP status codes like 200, 400, etc.
import org.springframework.stereotype.Service; // Marks this class as a Spring @Service (business logic layer)
import org.springframework.transaction.annotation.Transactional; // Used to manage DB transactions
import org.springframework.web.multipart.MultipartFile; // Represents uploaded files like ID proof, PDF, etc.
import org.springframework.web.server.ResponseStatusException; // Allows throwing custom HTTP response errors

// === Java standard libraries ===
import java.io.IOException; // Used to catch errors related to file handling
import java.util.HashMap; // A map implementation that stores key-value pairs (e.g., loanType -> score)
import java.util.List; // Represents a list of loan applications
import java.util.Map; // General interface for all maps
import java.util.Random; // Used to generate a random credit score

// This annotation tells Spring that this class contains business logic
@Service
public class LoanServiceImpl implements LoanService { // This class implements the LoanService interface

    // This field will allow us to interact with the database using JPA methods
    private final LoanRepository loanRepository;

    // Constructor: Spring injects LoanRepository automatically here
    @Autowired
    public LoanServiceImpl(LoanRepository loanRepository) {
        this.loanRepository = loanRepository; // Assign the injected object to this class's field
    }

    // This method is called when a user applies for a loan
    @Override
    public String applyLoan(LoanApplication loan, MultipartFile file) {
        // Step 1: Basic validation — amount and tenure should not be zero or negative
        if (loan.getAmount() <= 0 || loan.getTenure() <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, // Return HTTP 400 Bad Request
                    "Amount and tenure must be greater than zero"
            );
        }

        // Step 2: Convert the uploaded file into bytes and attach it to the loan object
        try {
            loan.setSupportingDocument(file.getBytes()); // File as byte[] to be stored in DB
        } catch (IOException e) {
            // If file conversion fails, return HTTP 500 error
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to upload file: " + e.getMessage()
            );
        }

        // Step 3: Generate a fake credit score between 600 and 900
        int generatedCreditScore = new Random().nextInt(301) + 600;

        // Step 4: Define required credit scores for different loan types
        Map<String, Integer> requiredScores = new HashMap<>();
        requiredScores.put("home", 720);
        requiredScores.put("personal", 700);
        requiredScores.put("education", 680);
        requiredScores.put("business", 740);
        requiredScores.put("auto", 710);

        // Step 5: Normalize input loanType to lowercase for comparison
        String loanType = loan.getLoanType().toLowerCase();

        // Step 6: Get the required credit score for this loan type; default is 700
        int requiredScore = requiredScores.getOrDefault(loanType, 700);

        // Step 7: Compare user's generated credit score with required score
        if (generatedCreditScore < requiredScore) {
            // If score is too low, reject the application
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Your credit score is " + generatedCreditScore +
                            ", but the required score for a " + loanType + " loan is " +
                            requiredScore + ". Your application was rejected."
            );
        }

        // Step 8: Save the valid loan application to the database
        loanRepository.save(loan);

        // Step 9: Return a success message back to the frontend
        return "Loan application submitted successfully. Your credit score is " + generatedCreditScore + ".";
    }

    // This method returns a list of loan applications submitted by a specific user
    @Override
    @Transactional(readOnly = true) // We mark this method as read-only to improve DB performance
    public List<LoanApplication> getByUsername(String username) {
        return loanRepository.findByUsername(username); // Call repository method to fetch user's loan history
    }
}
