package com.junaid.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // — Credentials —
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    // — Profile fields —
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "contact_number", nullable = false)
    private String contactNumber;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String address;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dob;

    @Column(name = "id_type", nullable = false)
    private String idType;

    @Column(name = "id_number", nullable = false, unique = true)
    private String idNumber;

    @Column(name = "employment_status", nullable = false)
    private String employmentStatus;

    @Column(name = "annual_income")
    private BigDecimal annualIncome;
}