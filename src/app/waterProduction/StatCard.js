import React from 'react';

const StatCard = ({ title, value, subtext, icon, trend }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
        {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
      </div>
      <div className="text-3xl opacity-80">{icon}</div>
    </div>
  </div>
);

export default StatCard;
