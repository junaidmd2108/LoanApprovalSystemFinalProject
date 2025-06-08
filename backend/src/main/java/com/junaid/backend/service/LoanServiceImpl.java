package com.junaid.backend.service;

// Importing necessary classes
import com.junaid.backend.entity.LoanApplication;
import com.junaid.backend.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service  // This tells Spring that this class contains business logic and should be managed as a service
public class LoanServiceImpl implements LoanService {

    private final LoanRepository loanRepository; // This connects to the database to save loan data

    // Constructor-based dependency injection (Spring injects LoanRepository here)
    @Autowired
    public LoanServiceImpl(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    // This method is called when a user submits a loan application
    @Override
    public String applyLoan(LoanApplication loan) {
        // ✅ Step 1: Basic validation - Check that loan amount and tenure are greater than zero
        if (loan.getAmount() <= 0 || loan.getTenure() <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Amount and tenure must be greater than zero"
            );
        }

        // ✅ Step 2: Generate a mock credit score for the applicant (for now, randomly generated)
        // Generates a score between 600 and 900
        int generatedCreditScore = new Random().nextInt(301) + 600;

        // ✅ Step 3: Define the required minimum credit score for each type of loan
        Map<String, Integer> requiredScores = new HashMap<>();
        requiredScores.put("home", 720);
        requiredScores.put("personal", 700);
        requiredScores.put("education", 680);
        requiredScores.put("business", 740);
        requiredScores.put("auto", 710);

        // ✅ Step 4: Get the loan type from the application and find the required score
        String loanType = loan.getLoanType().toLowerCase();  // Normalize to lowercase
        int requiredScore = requiredScores.getOrDefault(loanType, 700); // Default to 700 if type not matched

        // ✅ Step 5: Compare generated credit score with the required score
        if (generatedCreditScore < requiredScore) {
            // ❌ If credit score is too low, throw an error with a clear message
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Your credit score is " + generatedCreditScore +
                            ", but the required score for a " + loanType + " loan is " +
                            requiredScore + ". Your application was rejected."
            );
        }

        // ✅ Step 6: If score is acceptable, save the loan application to the database
        loanRepository.save(loan);

        // ✅ Step 7: Return a success message (shown to user)
        return "Loan application submitted successfully. Your credit score is " + generatedCreditScore + ".";
    }
}