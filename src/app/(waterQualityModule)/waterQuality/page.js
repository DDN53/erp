'use client'

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import api from '@/app/api';

const WaterQualityPage = () => {
  // Add state management for form data
  const [formData, setFormData] = useState({
    rsc: '',
    region: '',
    scheme: '',
    source: '',
    sampleDate: '',
    collectorName: '',
    references: '',
    sampleGroup: '',
    prepareDate: '',
    volume: '',
    designation: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.waterQuality(formData);
      console.log('Success:', response);
      // Add success notification or redirect logic here
      
    } catch (error) {
      console.error('Error:', error);
      // Add error handling logic here
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center gap-6 p-6 bg-gray-50 min-h-screen">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="w-[90%] bg-white rounded-md shadow-md p-6 border border-gray-300">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {[ 
                { label: "RSC", id: "rsc", type: "select", options: ["Option 1", "Option 2", "Option 3"], required: true },
                { label: "Region", id: "region", type: "select", options: ["Option 1", "Option 2", "Option 3"], required: true },
                { label: "Scheme", id: "scheme", type: "select", options: ["Option 1", "Option 2", "Option 3"], required: true },
                { label: "Source", id: "source", type: "select", options: ["Option 1", "Option 2", "Option 3"], required: true },
                { label: "Sample Date", id: "sampleDate", type: "date" },
                { label: "Sample Collector Name", id: "collectorName" },
                { label: "References", id: "references" },
                { label: "Sample Group", id: "sampleGroup", type: "select", options: ["Group 1", "Group 2"] },
              ].map(({ label, id, type, options, required }) => (
                <div key={id} className="flex items-center">
                  <label htmlFor={id} className="w-40 text-black font-medium">
                    {label}
                    {required && <span className="text-red-500">*</span>} {/* Red asterisk */}
                  </label>
                  {type === "select" ? (
                    <select
                      id={id}
                      className="w-[70%] p-2 border rounded-md border-gray-300"
                      required
                      value={formData[id]}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type || "text"}
                      id={id}
                      className="w-[70%] p-2 border rounded-md border-gray-300"
                      required={required}
                      value={formData[id]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {[ 
                { label: "Prepare Date", id: "prepareDate", type: "date" },
                { label: "Sample Volume (ml)", id: "volume" },
                { label: "Sample Collector Designation", id: "designation" },
              ].map(({ label, id, type }) => (
                <div key={id} className="flex items-center">
                  <label htmlFor={id} className="w-48 text-black font-medium">
                    {label}
                  </label>
                  <input
                    type={type || "text"}
                    id={id}
                    className="w-[70%] p-2 border rounded-md border-gray-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-start">
            <button className="bg-black text-white px-6 py-2 rounded-md">
              Submit
            </button>
          </div>
        </form>

        {/* Table Section */}
<div className="w-[90%] bg-white rounded-md shadow-md p-6 border border-gray-300">
  <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 px-4 py-2">Sample Point Name</th>
        <th className="border border-gray-300 px-4 py-2">Time</th>
        <th className="border border-gray-300 px-4 py-2">Weather Condition</th>
        <th className="border border-gray-300 px-4 py-2">Sample Group</th>
        <th className="border border-gray-300 px-4 py-2">Sample Number</th>
      </tr>
    </thead>
    <tbody>
      {/* Sample Row - You can populate this dynamically */}
      <tr>
        <td className="border border-gray-300 px-4 py-2"></td>
        <td className="border border-gray-300 px-4 py-2"></td>
        <td className="border border-gray-300 px-4 py-2"></td>
        <td className="border border-gray-300 px-4 py-2"></td>
        <td className="border border-gray-300 px-4 py-2"></td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-4 py-2"></td>
        <td className="border border-gray-300 px-4 py-2"></td>
        <td className="border border-gray-300 px-4 py-2"></td>
        <td className="border border-gray-300 px-4 py-2"></td>
        <td className="border border-gray-300 px-4 py-2"></td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-4 py-2"></td>
        <td className="border border-gray-300 px-4 py-2"></td>
        <td className="border border-gray-300 px-4 py-2"></td>
        <td className="border border-gray-300 px-4 py-2"></td>
        <td className="border border-gray-300 px-4 py-2"></td>
      </tr>
    </tbody>
  </table>
</div>

{/* Action Buttons */}
<div className="mt-6 flex justify-start gap-4 w-[90%]">
  {["Save", "Edit", "Clear", "Close"].map((action) => (
    <button
      key={action}
      className="bg-black text-white px-6 py-2 rounded-md"
    >
      {action}
    </button>
  ))}
</div>
      </div>
    </MainLayout>
  );
};

export default WaterQualityPage;
