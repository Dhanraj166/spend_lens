import React from 'react';
import { CalendarDays } from 'lucide-react';
import '../styles/MonthFilter.css';

const MonthFilter = ({ month, onChange, currentMonth }) => {
  return (
    <div className="month-filter">
      <label htmlFor="month-input">
        <CalendarDays size={16} />
        Showing month
      </label>
      <input
        id="month-input"
        type="month"
        value={month}
        onChange={(e) => e.target.value && onChange(e.target.value)}
      />
      {month !== currentMonth && (
        <button type="button" className="month-reset" onClick={() => onChange(currentMonth)}>
          Current month
        </button>
      )}
    </div>
  );
};

export default MonthFilter;
