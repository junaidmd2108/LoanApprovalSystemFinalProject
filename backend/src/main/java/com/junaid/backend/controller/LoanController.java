// ==============================================
// File: LoanController.java
// Role:
//   - Exposes endpoints for submitting and viewing loan applications.
//   - Handles file uploads and links loan data to the logged-in user.
//
// Why it matters:
//   - This is the core controller for loan-related actions in your app.
//   - It securely links user identity to loan records (via JWT).
//
// Dependencies:
//   - @RestController, @RequestMapping for routing
//   - LoanService for business logic
//   - MultipartFile for handling file uploads
//   - Principal to get the currently authenticated user
//
// Related files:
//   - LoanApplication.java (Entity)
//   - LoanService.java (Service logic)
//   - LoanRepository.java (Database access)
// ==============================================

package com.junaid.backend.controller; // Declares the Java package this class belongs to

import com.fasterxml.jackson.module.paramnames.ParameterNamesModule; // Used by Jackson to deserialize constructor arguments
import com.junaid.backend.entity.LoanApplication; // Imports the loan entity class
import com.junaid.backend.service.LoanService; // Business logic for loans

import org.springframework.beans.factory.annotation.Autowired; // Allows Spring to inject dependencies automatically
import org.springframework.http.ResponseEntity; // Used to build API responses
import org.springframework.web.bind.annotation.*; // REST controller annotations (e.g., @PostMapping, @GetMapping)
import org.springframework.web.multipart.MultipartFile; // Handles file upload from frontend
import org.springframework.http.MediaType; // Specifies media type for file upload requests

import java.io.IOException; // Handles IO exceptions (e.g., from file reading)
import java.security.Principal; // Represents the currently authenticated user
import java.util.List; // Java List collection

@RestController // Marks this class as a REST controller that returns JSON
@RequestMapping("/api") // All routes in this class will be prefixed with /api
public class LoanController { // Defines the controller class

    @Autowired // Injects LoanService bean
    private LoanService loanService; // Service class for loan business logic

    @Autowired // Injects Jackson helper bean
    private ParameterNamesModule parameterNamesModule; // Optional: helps deserialize objects with constructors

    /**
     * Endpoint to submit a loan application.
     * Accepts both form data and a file.
     */
    @PostMapping(value = "/apply-loan", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) // POST endpoint to apply for loan with file upload
    public ResponseEntity<String> applyLoan( // Method to handle loan submission
                                             @RequestPart("loan") LoanApplication loan, // Reads the loan form data part
                                             @RequestPart("file") MultipartFile file, // Reads the uploaded file part
                                             Principal principal              // Captures the logged-in user's identity from JWT
    ) {
        try {
            loan.setUsername(principal.getName()); // Set the username on the loan from JWT's authenticated user
            loan.setSupportingDocument(file.getBytes()); // Convert uploaded file to byte[] and set on the entity

            String result = loanService.applyLoan(loan, file); // Call service layer to process the application
            return ResponseEntity.ok(result); // Return success response
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage()); // Return error if file fails
        }
    }

    // Endpoint to view all loan applications submitted by current user
    @GetMapping("/loans/my-applications") // GET request to fetch only user’s own applications
    public ResponseEntity<List<LoanApplication>> myApplications(Principal principal) {
        List<LoanApplication> apps = loanService.getByUsername(principal.getName()); // Call service to fetch from DB
        return ResponseEntity.ok(apps); // Return the list of loans
    }
}