package com.junaid.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "loan_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ← NEW: track which user submitted this
    @Column(nullable = false)
    private String username;

    @Column(name = "name_of_applicant", nullable = false)
    private String nameOfApplicant;

    @Column(nullable = false)
    private String loanType;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private int tenure;

    @Column(nullable = false)
    private double interestRate;

    @Lob
    @Column(name = "supporting document")
    private byte[] supportingDocument;
}