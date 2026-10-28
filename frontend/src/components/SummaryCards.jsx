import React from 'react';
import '../styles/SummaryCards.css';

const SummaryCards = ({ spent, remaining, budget, topCategory, monthLabel }) => {
  const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

  return (
    <div className="summary-container">
      
      {/* Spent This Month */}
      <div className="summary-card">
        <p className="card-label">SPENT IN {monthLabel.toUpperCase()}</p>
        <h2 className="amount">₹{spent.toLocaleString('en-IN')}</h2>
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ 
              width: `${percentage}%`,
              background: spent > budget ? '#ef4444' : '#6366f1'
            }}
          ></div>
        </div>
        <p className="percentage">{percentage.toFixed(0)}% of ₹{budget.toLocaleString('en-IN')} budget</p>
      </div>

      {/* Remaining */}
      <div className="summary-card">
        <p className="card-label">REMAINING</p>
        <h2 className={`amount ${remaining < 0 ? 'negative' : ''}`}>
          ₹{Math.abs(remaining).toLocaleString('en-IN')}
        </h2>
        <p className={`status ${remaining < 0 ? 'over' : 'available'}`}>
          {remaining < 0 ? 'Over budget' : 'Still available'}
        </p>
      </div>

      {/* Top Category */}
      <div className="summary-card">
        <p className="card-label">TOP CATEGORY</p>
        <h2 className="amount">{topCategory}</h2>
        <p className="category-note">{monthLabel}</p>
      </div>

    </div>
  );
};

export default SummaryCards;