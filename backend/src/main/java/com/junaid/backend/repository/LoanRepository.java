// ==============================================
// File: LoanRepository.java
// Role:
//   - This interface extends JpaRepository to perform CRUD operations for LoanApplication entity.
//   - Allows fetching loan data by username (custom finder method).
//
// Why it matters:
//   - Without this repository, you would have to manually write SQL queries.
//   - Spring Data JPA generates everything you need automatically using this interface.
//
// Dependencies:
//   - JpaRepository: Enables basic CRUD methods like save(), findAll(), findById(), deleteById(), etc.
//   - @Repository: Marks this interface as a Spring-managed repository bean.
//
// Related files:
//   - LoanApplication.java (the entity it operates on)
//   - LoanController.java (calls this interface to get data)
// ==============================================

package com.junaid.backend.repository; // Declares the package this interface belongs to

import java.util.List; // Java utility class used to represent a list of LoanApplication objects

import org.springframework.data.jpa.repository.JpaRepository; // JPA-specific Spring interface for CRUD DB operations
import org.springframework.stereotype.Repository; // Marks this interface as a Spring repository component

import com.junaid.backend.entity.LoanApplication; // The entity this repository will manage

@Repository // Informs Spring to treat this interface as a repository bean
public interface LoanRepository extends JpaRepository<LoanApplication, Long> {
    // Extends JpaRepository with entity type = LoanApplication and ID type = Long

    /**
     * Custom finder method:
     * - Spring will generate a SQL query like:
     *   SELECT * FROM loan_applications WHERE username = ?
     * - This works because your entity class (LoanApplication) has a field named 'username'.
     */
    List<LoanApplication> findByUsername(String username); // Fetches all loan applications for a specific username
}