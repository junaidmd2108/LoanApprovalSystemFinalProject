package com.junaid.backend.service;

import com.junaid.backend.entity.LoanApplication;
import com.junaid.backend.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class LoanServiceImpl implements LoanService {

    private final LoanRepository loanRepository;

    @Autowired
    public LoanServiceImpl(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    @Override
    public String applyLoan(LoanApplication loan, MultipartFile file) {
        // Step 1: Basic validation
        if (loan.getAmount() <= 0 || loan.getTenure() <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Amount and tenure must be greater than zero"
            );
        }

        // Step 2: Attach uploaded file to loan object
        try {
            loan.setSupportingDocument(file.getBytes());
        } catch (IOException e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to upload file: " + e.getMessage()
            );
        }

        // Step 3: Generate mock credit score
        int generatedCreditScore = new Random().nextInt(301) + 600;

        // Step 4: Define credit score thresholds
        Map<String, Integer> requiredScores = new HashMap<>();
        requiredScores.put("home", 720);
        requiredScores.put("personal", 700);
        requiredScores.put("education", 680);
        requiredScores.put("business", 740);
        requiredScores.put("auto", 710);

        // Step 5: Check if applicant meets credit score requirement
        String loanType = loan.getLoanType().toLowerCase();
        int requiredScore = requiredScores.getOrDefault(loanType, 700);

        if (generatedCreditScore < requiredScore) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Your credit score is " + generatedCreditScore +
                            ", but the required score for a " + loanType + " loan is " +
                            requiredScore + ". Your application was rejected."
            );
        }

        // Step 6: Save the loan to database
        loanRepository.save(loan);

        // Step 7: Return success message
        return "Loan application submitted successfully. Your credit score is " + generatedCreditScore + ".";
    }
}