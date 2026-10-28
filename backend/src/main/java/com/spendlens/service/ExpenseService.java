package com.spendlens.service;

import com.spendlens.dto.SummaryResponse;
import com.spendlens.model.Expense;
import com.spendlens.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.YearMonth;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseService {

    private final ExpenseRepository repository;
    private final double monthlyBudget;

    public ExpenseService(ExpenseRepository repository,
                          @Value("${app.monthly-budget}") double monthlyBudget) {
        this.repository = repository;
        this.monthlyBudget = monthlyBudget;
    }

    // month == null -> every expense; otherwise only that month
    public List<Expense> getAll(YearMonth month) {
        if (month == null) {
            return repository.findAllByOrderByDateDescIdDesc();
        }
        return repository.findByDateBetweenOrderByDateDescIdDesc(month.atDay(1), month.atEndOfMonth());
    }

    public Expense add(Expense expense) {
        expense.setId(null); // always let the DB generate the id
        return repository.save(expense);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found: " + id);
        }
        repository.deleteById(id);
    }

    // month == null -> current month
    public SummaryResponse getMonthlySummary(YearMonth month) {
        YearMonth selected = (month != null) ? month : YearMonth.now();
        List<Expense> expenses = getAll(selected);

        Map<String, Double> byCategory = new LinkedHashMap<>();
        double spent = 0;
        for (Expense e : expenses) {
            spent += e.getAmount();
            byCategory.merge(e.getCategory(), e.getAmount(), Double::sum);
        }

        String topCategory = byCategory.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("No Data");

        return new SummaryResponse(spent, monthlyBudget, monthlyBudget - spent, topCategory, byCategory);
    }
}
