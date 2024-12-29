// src/components/ui/select.js
import React from 'react';

// Updated Select component with additional features
const Select = ({ options, label, onChange, value, ...props }) => {
  return (
    <div className="select-container">
      {label && <label className="select-label">{label}</label>} {/* Optional label for accessibility */}
      <select value={value} onChange={onChange} {...props} className="select-input">
        <option value="" disabled>Select an option</option> {/* Default disabled option */}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;