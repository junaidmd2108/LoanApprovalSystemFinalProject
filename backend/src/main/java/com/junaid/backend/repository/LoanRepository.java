package com.junaid.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.junaid.backend.entity.LoanApplication;

@Repository

public interface LoanRepository extends JpaRepository<LoanApplication, Long> {

}