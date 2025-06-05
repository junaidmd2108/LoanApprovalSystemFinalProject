package com.junaid.backend.controller;

import com.junaid.backend.entity.LoanApplication;
import com.junaid.backend.service.LoanService;          // ← import the service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/api")
public class LoanController {

    @Autowired
    private LoanService loanService;                   // ← inject your service, not the repo

    @PostMapping("/apply-loan")
    public ResponseEntity<String> applyLoan(@RequestBody LoanApplication loan) {
        // delegate all validation + saving to your service
        String msg = loanService.applyLoan(loan);
        return ResponseEntity.ok(msg);
    }
}