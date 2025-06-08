package com.junaid.backend.controller;

import com.junaid.backend.entity.LoanApplication; // Import the entity that represents a loan application
import com.junaid.backend.service.LoanService;    // Import the service layer that handles the logic

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * This controller handles HTTP requests related to loan applications.
 * It delegates the business logic to the service layer.
 */
@RestController // Marks this class as a REST controller that returns JSON
@RequestMapping("/api") // All endpoints in this controller will start with /api
public class LoanController {

    @Autowired
    private LoanService loanService; // Inject the service that contains loan processing logic

    /**
     * Endpoint to submit a loan application.
     * This is a POST request to /api/apply-loan with a JSON body containing loan data.
     *
     * @param loan the loan application payload coming from the frontend
     * @return ResponseEntity containing the success or rejection message
     */
    @PostMapping("/apply-loan")
    public ResponseEntity<String> applyLoan(@RequestBody LoanApplication loan) {
        // Call the service layer to handle business logic like validation, credit score check, and saving
        String msg = loanService.applyLoan(loan);

        // Send the result (approved or rejected message) back to the frontend
        return ResponseEntity.ok(msg);
    }
}