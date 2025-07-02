// ==============================================
// File: LoanService.java
// Role:
//   - This is a service layer **interface** that defines business logic operations related to loan applications.
//   - It separates the business logic from the controller (LoanController).
//
// Why it matters:
//   - It allows the controller to use loan-related functions without worrying about implementation details.
//   - Helps maintain a clean MVC (Model-View-Controller) architecture.
//   - Promotes testability and scalability.
//
// Dependencies:
//   - MultipartFile (Spring's interface to represent uploaded files)
//   - LoanApplication (custom entity that maps to database table)
//
// Related files:
//   - LoanServiceImpl.java (implements this interface)
//   - LoanController.java (calls methods defined here)
// ==============================================

package com.junaid.backend.service; // Declares this class is part of the 'service' package

import java.util.List; // Java collection interface to represent a list of loan applications
import com.junaid.backend.entity.LoanApplication; // Imports the entity class that holds loan data
import org.springframework.web.multipart.MultipartFile; // Used to handle uploaded files (e.g., PDFs, ID proofs)

public interface LoanService { // Defines an interface — only method signatures, no implementation here

    /**
     * Handles a loan application request.
     * This method should validate the request and then store it in the database.
     *
     * @param loan the LoanApplication object from the user
     * @param file the supporting document uploaded by the user
     * @return a message indicating success or failure
     */
    String applyLoan(LoanApplication loan, MultipartFile file); // Method to apply for a loan

    /**
     * Fetches all loan records submitted by a specific user.
     *
     * @param username the username of the person whose loans should be fetched
     * @return a list of LoanApplication objects linked to that username
     */
    List<LoanApplication> getByUsername(String username); // Method to retrieve loan history for a given user
}