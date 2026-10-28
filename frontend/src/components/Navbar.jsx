import React from 'react';
import { Wallet, Menu } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = ({ onAllExpensesClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-section">
          <div className="logo-icon">
            <Wallet size={32} />
          </div>
          <div>
            <h1 className="logo-title">SpendLens</h1>
            <p className="logo-subtitle">See where every rupee goes</p>
          </div>
        </div>

        <button className="all-expenses-btn" onClick={onAllExpensesClick}>
          <Menu size={20} />
          All Expenses
        </button>
      </div>
    </nav>
  );
};

export default Navbar;