import React from 'react';
import { AlertTriangle } from 'lucide-react';
import '../styles/BudgetAlert.css';

const BudgetAlert = ({ spent, budget }) => {
  const excess = spent - budget;

  return (
    <div className="budget-alert">
      <AlertTriangle size={24} />
      <div>
        <h3>Budget Exceeded!</h3>
        <p>You've spent ₹{spent.toLocaleString('en-IN')} — ₹{excess.toLocaleString('en-IN')} over your ₹{budget.toLocaleString('en-IN')} limit.</p>
      </div>
    </div>
  );
};

export default BudgetAlert;