package com.spendlens.repository;

import com.spendlens.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // all expenses, newest first
    List<Expense> findAllByOrderByDateDescIdDesc();

    // expenses between two dates (inclusive), newest first
    List<Expense> findByDateBetweenOrderByDateDescIdDesc(LocalDate start, LocalDate end);
}
