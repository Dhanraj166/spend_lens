import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import '../styles/AddExpenseForm.css';

// Today's date in the user's local time, as "yyyy-MM-dd"
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const AddExpenseForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    date: today(),
    category: 'Food',
    amount: '',
  });

  const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount) return alert("Enter the Amount!");

    const saved = await onAdd({
      date: form.date,
      category: form.category,
      amount: parseFloat(form.amount),
    });

    // Clear the form only if the expense was saved
    if (saved) {
      setForm({
        date: today(),
        category: 'Food',
        amount: '',
      });
    }
  };

  return (
    <div className="add-form">
      <h2>ADD EXPENSE</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label>Date</label>
            <div className="date-wrapper">
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              <Calendar size={20} />
            </div>
          </div>

          <div>
            <label>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label>Amount (₹)</label>
            <input
              type="number"
              placeholder="250"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>

          <button type="submit" className="add-btn">+ Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;