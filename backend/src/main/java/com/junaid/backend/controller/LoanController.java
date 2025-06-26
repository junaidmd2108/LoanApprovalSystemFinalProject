package com.junaid.backend.controller;

import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;
import com.junaid.backend.entity.LoanApplication;
import com.junaid.backend.service.LoanService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @Autowired
    private ParameterNamesModule parameterNamesModule;

    /**
     * Endpoint to submit a loan application.
     */
    @PostMapping(value = "/apply-loan", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> applyLoan(
            @RequestPart("loan") LoanApplication loan,
            @RequestPart("file") MultipartFile file,
            Principal principal              // ← NEW: get logged-in user
    ) {
        try {
            // ← NEW: assign submitting user before saving
            loan.setUsername(principal.getName());

            loan.setSupportingDocument(file.getBytes());
            String result = loanService.applyLoan(loan, file);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/loans/my-applications")
    public ResponseEntity<List<LoanApplication>> myApplications(Principal principal) {
        List<LoanApplication> apps = loanService.getByUsername(principal.getName());
        return ResponseEntity.ok(apps);
    }
}