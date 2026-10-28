import React from 'react';
import { Trash2 } from 'lucide-react';
import '../styles/AllExpenses.css';

const AllExpenses = ({ expenses, onDelete }) => {
  return (
    <div className="all-expenses-card">
      <h2 className="section-title">ALL EXPENSES</h2>
      
      {expenses.length === 0 ? (
        <p className="no-data">No expenses yet. Add some!</p>
      ) : (
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>
                  <span className="category-badge">{expense.category}</span>
                </td>
                <td className="amount-cell">₹{expense.amount.toLocaleString('en-IN')}</td>
                <td>
                  <button 
                    className="delete-btn"
                    onClick={() => onDelete(expense.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllExpenses;