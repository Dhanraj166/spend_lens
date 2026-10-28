import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../styles/SpendingBreakdown.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const SpendingBreakdown = ({ categoryData }) => {
  const colors = [
    '#6366f1', // indigo
    '#10b981', // emerald
    '#ec4899', // pink
    '#3b82f6', // blue
    '#f59e0b', // amber
    '#ef4444'  // red
  ];

  const labels = Object.keys(categoryData);
  const amounts = Object.values(categoryData);

  const chartData = {
    labels: labels.length > 0 ? labels : ['No Data'],
    datasets: [{
      data: amounts.length > 0 ? amounts : [1],
      backgroundColor: colors,
      borderColor: '#0a0a0a',
      borderWidth: 3,
      hoverOffset: 15,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // We show custom legend below
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#e5e5e5',
        bodyColor: '#e5e5e5',
        padding: 12,
      }
    }
  };

  // Custom Legend
  const legendItems = labels.map((label, index) => ({
    label,
    amount: amounts[index] || 0,
    color: colors[index % colors.length]
  }));

  return (
    <div className="breakdown-card">
      <h2 className="section-title">SPENDING BREAKDOWN</h2>
      
      <div className="chart-container">
        <div className="pie-chart">
          <Pie data={chartData} options={options} />
        </div>

        {/* Legend */}
        <div className="legend">
          {legendItems.map((item, index) => (
            <div key={index} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: item.color }}></div>
              <div>
                <span className="legend-label">{item.label}</span>
                <span className="legend-amount">₹{item.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdown;