// src/main/java/com/junaid/backend/service/LoanService.java
package com.junaid.backend.service;

import java.util.List;

import com.junaid.backend.entity.LoanApplication;
import org.springframework.web.multipart.MultipartFile;

public interface LoanService {
    /**
     * Validate and persist a loan application.
     * @param loan the loan application to process
     * @return a success message to return to the client
     */
    String applyLoan(LoanApplication loan, MultipartFile file);

    /**
     * Retrieve all loan applications submitted by a given user.
     * @param username the user’s username
     * @return list of that user’s LoanApplication records
     */
    List<LoanApplication> getByUsername(String username);
}