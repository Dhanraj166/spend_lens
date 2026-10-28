package com.spendlens.controller;

import com.spendlens.dto.SummaryResponse;
import com.spendlens.model.Expense;
import com.spendlens.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    // GET /api/expenses            -> all expenses
    // GET /api/expenses?month=2026-10 -> only expenses of that month
    @GetMapping("/expenses")
    public List<Expense> getAll(
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM") YearMonth month) {
        return service.getAll(month);
    }

    // POST /api/expenses
    @PostMapping("/expenses")
    @ResponseStatus(HttpStatus.CREATED)
    public Expense add(@Valid @RequestBody Expense expense) {
        return service.add(expense);
    }

    // DELETE /api/expenses/{id}
    @DeleteMapping("/expenses/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // GET /api/summary?month=2026-10 (month optional, defaults to current month)
    @GetMapping("/summary")
    public SummaryResponse summary(
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM") YearMonth month) {
        return service.getMonthlySummary(month);
    }
}
