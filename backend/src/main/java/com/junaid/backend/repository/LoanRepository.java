package com.junaid.backend.repository;

// Importing Spring Data JPA's base interface for repositories
import org.springframework.data.jpa.repository.JpaRepository;

// Marks this interface as a Spring-managed repository component
import org.springframework.stereotype.Repository;

// Importing the LoanApplication entity class
import com.junaid.backend.entity.LoanApplication;

/**
 * LoanRepository allows Spring Data JPA to automatically create
 * all basic CRUD operations (save, findById, findAll, deleteById, etc.)
 * for LoanApplication without writing any implementation code.
 */
@Repository
public interface LoanRepository extends JpaRepository<LoanApplication, Long> {
    // JpaRepository<T, ID> means:
    // T = Entity type → LoanApplication
    // ID = Primary key type → Long

    // Right now this interface inherits all basic operations.
    // You can add custom query methods later if needed, e.g.:
    // List<LoanApplication> findByLoanType(String loanType);
}