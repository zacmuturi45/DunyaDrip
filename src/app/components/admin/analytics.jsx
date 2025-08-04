'use client';
import React from 'react';

export default function Analytics() {
  return (
    <div className="admin-section analytics-section">
      <h2 className="section-title">Analytics</h2>
      <p>Detailed sales, user behavior, conversion rates, etc.</p>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h4>Monthly Revenue</h4>
          <p>$10,500</p>
        </div>
        <div className="analytics-card">
          <h4>Conversion Rate</h4>
          <p>3.2%</p>
        </div>
        <div className="analytics-card">
          <h4>Cart Abandonment</h4>
          <p>24%</p>
        </div>
      </div>

      <div className="analytics-chart">
        {/* Placeholder for advanced chart */}
        <p>📈 Advanced behavior chart or heatmap</p>
      </div>
    </div>
  );
}
