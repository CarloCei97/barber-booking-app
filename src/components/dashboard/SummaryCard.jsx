// src/components/dashboard/SummaryCard.jsx
import React from 'react';

const SummaryCard = ({ title, children }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default SummaryCard;
