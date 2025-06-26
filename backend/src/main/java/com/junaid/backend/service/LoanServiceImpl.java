// src/main/java/com/junaid/backend/service/LoanServiceImpl.java
package com.junaid.backend.service;

import com.junaid.backend.entity.LoanApplication;
import com.junaid.backend.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
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
        if (loan.getAmount() <= 0 || loan.getTenure() <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Amount and tenure must be greater than zero"
            );
        }

        try {
            loan.setSupportingDocument(file.getBytes());
        } catch (IOException e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to upload file: " + e.getMessage()
            );
        }

        int generatedCreditScore = new Random().nextInt(301) + 600;
        Map<String, Integer> requiredScores = new HashMap<>();
        requiredScores.put("home", 720);
        requiredScores.put("personal", 700);
        requiredScores.put("education", 680);
        requiredScores.put("business", 740);
        requiredScores.put("auto", 710);

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

        loanRepository.save(loan);
        return "Loan application submitted successfully. Your credit score is " + generatedCreditScore + ".";
    }

    @Override
    @Transactional(readOnly = true)
    public List<LoanApplication> getByUsername(String username) {
        // Runs in a read-only transaction so LOBs can be streamed
        return loanRepository.findByUsername(username);
    }
}