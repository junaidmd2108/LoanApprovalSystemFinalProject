package com.junaid.backend.service;

import com.junaid.backend.entity.LoanApplication;
import com.junaid.backend.repository.LoanRepository;
import com.junaid.backend.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LoanServiceImpl implements LoanService {

    private final LoanRepository loanRepository;

    @Autowired
    public LoanServiceImpl(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    @Override
    public String applyLoan(LoanApplication loan) {
        // Basic server-side validation
        if (loan.getAmount() <= 0 || loan.getTenure() <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Amount and tenure must be greater than zero"
            );
        }

        // Persist the loan application
        loanRepository.save(loan);

        return "Loan application submitted successfully.";
    }
}