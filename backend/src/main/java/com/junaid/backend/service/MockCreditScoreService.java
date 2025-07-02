// ==========================================================
// File: MockCreditScoreService.java
//
// ❖ ROLE:
//    - This is a mock (fake) service that simulates a credit score check.
//    - It randomly generates a credit score and checks if it's enough for a given loan type.
//
// ❖ WHY IT'S IMPORTANT:
//    - It separates the logic for credit checking from the rest of the loan logic.
//    - In real life, this would connect to an external service like Experian or Equifax.
//    - For now, we use it for testing purposes.
//
// ❖ USED IN:
//    - LoanServiceImpl.java or anywhere else that wants to simulate credit score checks
//
// ❖ OUTPUT:
//    - A map containing:
//        - score: generated credit score
//        - requiredScore: threshold for that loan type
//        - eligible: true/false if score meets requirement
//
// ❖ SPRING CONCEPTS:
//    - @Service: Spring automatically detects this class as a service bean
//
// ❖ JAVA CONCEPTS:
//    - Random: used to generate scores
//    - Map: used to return structured data
// ==========================================================

package com.junaid.backend.service; // Declares this class is part of the service package

// === Spring dependency for marking this as a service class ===
import org.springframework.stereotype.Service; // Allows Spring to recognize and manage this class as a service

// === Java utility imports ===
import java.util.HashMap; // Used to store key-value pairs (loanType -> score)
import java.util.Map;     // The Map interface, which HashMap implements
import java.util.Random;  // Used to generate random numbers (for the mock score)

// Marks this class as a service so it can be injected and managed by Spring
@Service
public class MockCreditScoreService {

    // Random number generator to create fake credit scores
    private final Random random = new Random();

    // Static map that holds minimum required scores for different loan types
    private static final Map<String, Integer> minimumScoreMap = new HashMap<>();

    // Static block runs once when the class is loaded — used here to populate our map
    static {
        minimumScoreMap.put("home", 720);      // Home loan requires 720+
        minimumScoreMap.put("personal", 700);  // Personal loan requires 700+
        minimumScoreMap.put("education", 680); // Education loan requires 680+
        minimumScoreMap.put("business", 710);  // Business loan requires 710+
        minimumScoreMap.put("auto", 690);      // Auto loan requires 690+
    }

    /**
     * This method generates a credit score and checks whether it's eligible for the selected loan type.
     * @param loanType The type of loan being applied for (e.g., "home", "auto", etc.)
     * @return A map with three keys:
     *         - "score": the generated score (random between 600–850)
     *         - "requiredScore": minimum score needed for the loan
     *         - "eligible": boolean true/false if score >= required
     */
    public Map<String, Object> checkEligibility(String loanType) {
        // Generate a random score between 600 and 850
        int generatedScore = 600 + random.nextInt(251); // 600 + (0 to 250)

        // Look up the required score for the given loanType; use 700 as default
        int requiredScore = minimumScoreMap.getOrDefault(loanType.toLowerCase(), 700);

        // Check if the user qualifies based on the score
        boolean eligible = generatedScore >= requiredScore;

        // Prepare a response map (like a small JSON)
        Map<String, Object> result = new HashMap<>();
        result.put("score", generatedScore);
        result.put("requiredScore", requiredScore);
        result.put("eligible", eligible);

        // Return the result map
        return result;
    }
}