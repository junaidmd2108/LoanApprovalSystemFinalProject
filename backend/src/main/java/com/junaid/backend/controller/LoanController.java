package com.junaid.backend.controller;

import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;
import com.junaid.backend.entity.LoanApplication; // Import the entity that represents a loan application
import com.junaid.backend.service.LoanService;    // Import the service layer that handles the logic

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import java.io.IOException;

/**
 * This controller handles HTTP requests related to loan applications.
 * It delegates the business logic to the service layer.
 */
@RestController // Marks this class as a REST controller that returns JSON
@RequestMapping("/api") // All endpoints in this controller will start with /api
public class LoanController {

    @Autowired
    private LoanService loanService; // Inject the service that contains loan processing logic
    @Autowired
    private ParameterNamesModule parameterNamesModule;

    /**
     * Endpoint to submit a loan application.
     * This is a POST request to /api/apply-loan with a JSON body containing loan data.
     *
     * @param loan the loan application payload coming from the frontend
     * @return ResponseEntity containing the success or rejection message
     */

    @PostMapping(value = "/apply-loan", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> applyLoan(
            @RequestPart("loan") LoanApplication loan,
            @RequestPart("file") MultipartFile file
    )
    {
        try {
            loan.setSupportingDocument(file.getBytes());

            String result = loanService.applyLoan(loan, file);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());

        }
    }
}