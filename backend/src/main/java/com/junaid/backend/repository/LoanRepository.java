// src/main/java/com/junaid/backend/repository/LoanRepository.java
package com.junaid.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.junaid.backend.entity.LoanApplication;

@Repository
public interface LoanRepository extends JpaRepository<LoanApplication, Long> {

    /**
     * Fetch all LoanApplication records for a given username.
     * Spring Data JPA will generate the implementation automatically
     * as long as your LoanApplication entity has a `username` field.
     */
    List<LoanApplication> findByUsername(String username);
}