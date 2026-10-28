import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import AddExpenseForm from './components/AddExpenseForm';
import SummaryCards from './components/SummaryCards';
import SpendingBreakdown from './components/SpendingBreakdown';
import AllExpenses from './components/AllExpenses';
import BudgetAlert from './components/BudgetAlert';
import MonthFilter from './components/MonthFilter';
import { getExpenses, getSummary, createExpense, removeExpense, errorMessage } from './api';
import './App.css';

const EMPTY_SUMMARY = {
  monthlySpent: 0,
  budget: 0,
  remaining: 0,
  topCategory: 'No Data',
  categoryData: {},
};

// "yyyy-MM" of today, e.g. "2026-10"
const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

// "2026-10" -> "Oct 2026"
const formatMonth = (month) => {
  const [year, m] = month.split('-').map(Number);
  return new Date(year, m - 1).toLocaleString('en-IN', { month: 'short', year: 'numeric' });
};

function App() {
  const currentMonth = getCurrentMonth();
  const [month, setMonth] = useState(currentMonth);
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(EMPTY_SUMMARY);
  const [showAllExpenses, setShowAllExpenses] = useState(false);
  const [error, setError] = useState('');

  // Ref for auto scroll
  const allExpensesRef = useRef(null);

  // Load expenses + monthly summary from the backend
  const loadData = useCallback(async () => {
    try {
      const [expenseList, summaryData] = await Promise.all([getExpenses(month), getSummary(month)]);
      setExpenses(expenseList);
      setSummary(summaryData);
      setError('');
    } catch {
      setError('Cannot reach the server. It may be waking up, so wait a minute and refresh.');
    }
  }, [month]);

  // Reload whenever the selected month changes
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Auto scroll when All Expenses is opened
  useEffect(() => {
    if (showAllExpenses && allExpensesRef.current) {
      setTimeout(() => {
        allExpensesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showAllExpenses]);

  const addExpense = async (newExpense) => {
    try {
      await createExpense(newExpense);
      const expenseMonth = newExpense.date.slice(0, 7);
      if (expenseMonth !== month) {
        setMonth(expenseMonth); // jump to the month of the new expense (effect reloads data)
      } else {
        await loadData();
      }
      return true; // saved
    } catch (err) {
      alert(errorMessage(err));
      return false; // not saved
    }
  };

  const deleteExpense = async (id) => {
    try {
      await removeExpense(id);
      await loadData();
    } catch (err) {
      alert(errorMessage(err));
    }
  };

  const toggleAllExpenses = () => setShowAllExpenses((prev) => !prev);

  return (
    <div>
      <Navbar onAllExpensesClick={toggleAllExpenses} />

      <div className="container">
        {error && <div className="server-error">{error}</div>}

        <AddExpenseForm onAdd={addExpense} />

        {summary.monthlySpent > summary.budget && summary.budget > 0 && (
          <BudgetAlert spent={summary.monthlySpent} budget={summary.budget} />
        )}

        <MonthFilter month={month} onChange={setMonth} currentMonth={currentMonth} />

        <SummaryCards
          monthLabel={formatMonth(month)}
          spent={summary.monthlySpent}
          remaining={summary.remaining}
          budget={summary.budget}
          topCategory={summary.topCategory}
        />

        <SpendingBreakdown categoryData={summary.categoryData} />

        {/* All Expenses Section with Ref */}
        <div ref={allExpensesRef}>
          {showAllExpenses && <AllExpenses expenses={expenses} onDelete={deleteExpense} />}
        </div>
      </div>
    </div>
  );
}

export default App;