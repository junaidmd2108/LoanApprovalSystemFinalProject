package com.junaid.backend.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * This service is a mock (fake) credit score checker.
 * In a real project, you'd replace this with a real 3rd-party API call.
 */
@Service
public class MockCreditScoreService {

    private final Random random = new Random();

    // Minimum required credit score for each loan type
    private static final Map<String, Integer> minimumScoreMap = new HashMap<>();

    // Initialize loan-specific score requirements
    static {
        minimumScoreMap.put("home", 720);
        minimumScoreMap.put("personal", 700);
        minimumScoreMap.put("education", 680);
        minimumScoreMap.put("business", 710);
        minimumScoreMap.put("auto", 690);
    }

    /**
     * Generates a random credit score and checks if it's eligible based on the loan type.
     *
     * @param loanType the type of loan the user selected (e.g., "home", "personal", etc.)
     * @return a map containing the generated credit score, required score, and approval status
     */
    public Map<String, Object> checkEligibility(String loanType) {
        // Generate a random score between 600 and 850
        int generatedScore = 600 + random.nextInt(251);

        // Get required score for this loan type
        int requiredScore = minimumScoreMap.getOrDefault(loanType.toLowerCase(), 700);

        // Check if user qualifies
        boolean eligible = generatedScore >= requiredScore;

        // Return the result as a map (like a mini JSON)
        Map<String, Object> result = new HashMap<>();
        result.put("score", generatedScore);
        result.put("requiredScore", requiredScore);
        result.put("eligible", eligible);

        return result;
    }
}