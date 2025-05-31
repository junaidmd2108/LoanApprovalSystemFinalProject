package com.junaid.backend.service;

import com.junaid.backend.entity.LoanApplication;

public interface LoanService {
    /**
     * Validate and persist a loan application.
     * @param loan the loan application to process
     * @return a success message to return to the client
     */
    String applyLoan(LoanApplication loan);
}