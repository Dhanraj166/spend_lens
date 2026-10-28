package com.spendlens.dto;

import java.util.Map;

public record SummaryResponse(
        double monthlySpent,
        double budget,
        double remaining,
        String topCategory,
        Map<String, Double> categoryData
) {
}
