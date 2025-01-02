'use client'

import React, { useState, useEffect } from 'react';
import api from "@/api/route";
import { toast } from 'react-toastify';
import { provinces, getDistrictsByProvince } from "@/app/constants/Area";
import { getDSDivisionByDistrict } from "@/app/constants/dsDivisions";

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
    designation: '',
    samplePointName: '',
    time: '',
    weatherCondition: '',
    sampleNumber: ''
  });
  const [selectedDate, setSelectedDate] = useState("");
  const sampleDates = [
    "2024-01-01",
    "2024-02-14",
    "2024-03-17",
    "2024-04-01",
    "2024-05-25",
  ];
  const [wheatherCondition,setWheatherCondition] = useState([
    { id: 1, weatherCondition: "Sunny" },
    { id: 2, weatherCondition: "Cloudy" },
    { id: 3, weatherCondition: "Rainy" },
    { id: 4, weatherCondition: "Snowy" },
  ]);
  const handleSourceUpdateCondition = (index, newCondition) => {
    const updatedRows = [...wheatherCondition];
    updatedRows[index].weatherCondition = newCondition;
    setWheatherCondition(updatedRows);
  };

  const handleChangedropdown=()=>{
    setSelectedDate(event.target.value);
  }
  // Add tableData state
  const [tableData, setTableData] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
   
      const uniqueNumber = `${Math.floor(Math.random() * 1000)}`;
      setRandomNumber(Number(uniqueNumber));


  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Update the right column inputs to include value and onChange
  const rightColumnInputs = [
    { label: "Prepare Date", id: "prepareDate", type: "date" },
    { 
      label: "Sample Volume (ml)", 
      id: "volume", 
      type:"text",
      min: "0" // Add min attribute to prevent negative values
    },
    { label: "Sample Collector Designation", id: "designation" },
  ].map(({ label, id, type, min }) => (
    <div key={id} className="flex items-center">
      <label htmlFor={id} className="w-48 text-black font-medium dark:text-white">
        {label}
      </label>
      <input
        type={type || "text"}
        id={id}
        min={min}
        className="w-[70%] p-2 border rounded-md border-gray-950 dark:bg-slate-600 dark:text-white"
        value={formData[id]}
        onChange={handleChange}
      />
    </div>
  ));

  // Update handleSubmit to only display data in the table
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      // Validate required fields
      const requiredFields = ['rsc', 'region', 'source'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        toast.error(`Required fields missing: ${missingFields.join(', ')}`);
        return;
      }

      // Format the data to match the expected structure
     
  

      // Log the formatted data to verify values
      console.log('Displaying data:', formattedData);
      
      // Update the table data with the new entry
      setTableData(prev => [...prev, formattedData]);

      // Reset form data after submission
      const [formData, setFormData] = useState({
        rsc: '',
        region: '',
        scheme: '',
        source: '',
        sampleDate: '',
        collectorName: '',
        references: '',
        sampleGroup: '',
        prepareDate: null, // Match backend null default
        volume: null, // Match backend null default
        designation: '',
        samplePointName: '',
        time: null, // Match backend null default
        weatherCondition: null, // Match backend null default
        sampleNumber: null, // Match backend null default
      });

    } catch (error) {
      toast.error(error.message || 'Failed to display data');
      console.error('Display Error:', error);
    }
  };
  const formattedData = {
    rsc: formData.rsc,
    region: formData.region,
    source: formData.source,
    sampleDate: new Date().toISOString(),
    collectorName: formData.collectorName || null,
    references: formData.references || null,
    sampleGroup: formData.sampleGroup || null,
    prepareDate: formData.prepareDate
      ? new Date(formData.prepareDate).toISOString()
      : null,
    volume: formData.volume !== null ? parseInt(formData.volume, 10) : null,
    designation: formData.designation || null,
    samplePointName: formData.samplePointName || null,
    time: formData.time || null,
    weatherCondition: formData.weatherCondition || null,
    sampleNumber: formData.sampleNumber !== null 
      ? parseInt(formData.sampleNumber, 10) 
      : null,
  };
  // Add this function to fetch current time from API
  const getCurrentDateTime = async () => {
    try {
      const response = await fetch('https://timezone.abstractapi.com/v1/current_time/?api_key=deacf11f9e6643b19852505b221ad945&location=Colombo,Sri_Lanka');
      const data = await response.json();
      return new Date(data.datetime);
    } catch (error) {
      console.error('Error fetching time:', error);
      return new Date(); // Fallback to local time if API fails
    }
  };

  const handleAction = async (action) => {
    try {
      const lowerAction = action.toLowerCase();
  
      if (lowerAction === "save") {
        const data = {
          ...formData,
          sampleDate: new Date().toISOString(),
        };
  
        const response = await api.savewaterquality(data);
  
        if (response.success) {
          toast.success("Data saved successfully");
  
          // Optionally, update the table data if needed
          setTableData((prev) => [...prev, response.data]);
  
          // Reset form after save
          setFormData(
            Object.keys(formData).reduce((acc, key) => {
              acc[key] = null; // Reset to `null` for better backend compatibility
              return acc;
            }, {})
          );
        } else {
          throw new Error(response.message || "Failed to save data");
        }
      } else {
        // Handle other actions
        switch (lowerAction) {
          case "edit":
            // Enable form editing logic here
            console.info("Edit action triggered");
            break;
  
          case "view":
            // Handle view action logic here
            console.info("View action triggered");
            break;
  
          case "clear":
            setFormData(
              Object.keys(formData).reduce((acc, key) => {
                acc[key] = ""; // Clear form fields
                return acc;
              }, {})
            );
            toast.success("Form cleared successfully");
            break;
  
          case "close":
            // Handle modal close or navigation logic here
            console.info("Close action triggered");
            break;
  
          default:
            console.warn("Unknown action:", action);
            break;
        }
      }
    } catch (error) {
      if (action.toLowerCase() === "save") {
        toast.error("An error occurred while saving data");
      } else {
        toast.error(`Failed to perform "${action}" action`);
      }
      console.error(`Error during "${action}" action:`, error);
    }
  };
  
  

  // Add this new function before the return statement
  const handleSourceUpdate = async (index, newSource) => {
    try {
      const record = tableData[index];
      if (!record || !record._id) {
        toast.error('Record not found or missing ID');
        return; // Exit if the record or ID is not available
      }
      const response = await api.waterQualityUpdate(record._id, {
        ...record,
        source: newSource
      });
      
      if (response.success) {
        const updatedData = [...tableData];
        updatedData[index] = { ...record, source: newSource };
        setTableData(updatedData);
        toast.success('Source updated successfully'); // Success message
      } else {
        toast.error('Failed to update source'); // Error message if response is not successful
      }
    } catch (error) {
      toast.error('Failed to update source'); // Catch any errors
      console.error('Update Error:', error);
    }
  };

  return (
 
      <div className="flex flex-col items-center gap-6 p-6 bg-gray-50 min-h-screen dark:bg-slate-950 dark:text-white">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="w-[90%] bg-white rounded-md shadow-md p-6 border border-gray-950 dark:bg-slate-800 dark:text-white">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {[ 
               {
                label: "RSC",
                id: "rsc",
                type: "select",
                options: provinces.map(province => ({
                  value: province,
                  label: province
                })),
                required: true
              },
                { label: "Region", id: "region", type: "select", options: formData.rsc ? getDistrictsByProvince(formData.rsc) : [], required: true },
                { label: "Source", id: "source", type: "select", options: ["River", "Well", "Spring", "Stream"], required: true },
                { label: "Sample Point Name", id: "collectorName",type: "select",options: ["Ampara", "Kegalla", "Rathmalana", "Monaragala"], },
                { label: "Sample Date", id: "sampleDate", type: "date" },
                { label: "References", id: "references" },
                { label: "Sample Group", id: "sampleGroup", type: "select", options: ["Physical", "Chemical", "Biological"] },
              ].map(({ label, id, type, options, required }) => (
                <div key={id} className="flex items-center">
                  <label htmlFor={id} className="w-40 text-black font-medium dark:text-white">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                  </label>
                  {type === "select" ? (
                    <select
                      id={id}
                      className="w-[70%] p-2 border rounded-md border-gray-950 dark:bg-slate-600 dark:text-white"
                      required={required}
                      value={formData[id] || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {options.map((option, index) => (
                        <option key={index} value={typeof option === 'object' ? option.value : option}>
                          {typeof option === 'object' ? option.label : option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type || "text"}
                      id={id}
                      className="w-[70%] p-2 border rounded-md border-gray-950 dark:bg-slate-600 dark:text-white"
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
              {rightColumnInputs}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-start">
            <button type="submit" className="bg-black text-white px-6 py-2 rounded-md dark:bg-white dark:text-black dark:font-bold">
              Submit
            </button>
          </div>
        </form>

        {/* Updated Table Section */}
        <div className="w-[90%] bg-white rounded-md shadow-md p-6 border border-gray-950 overflow-x-auto dark:bg-slate-800 dark:text-white">
          <table className="w-full border-collapse border border-gray-950 dark:bg-slate-700 dark:text-white">
            <thead>
              <tr className="bg-gray-100 dark:bg-slate-800">
              <th className="border border-gray-950 px-4 py-2">Time</th>

             
              <th className="border border-gray-950 px-4 py-2">Sample Point Name</th>
              <th className="border border-gray-950 px-4 py-2">weather Condition</th>
                <th className="border border-gray-950 px-4 py-2">Sample Number</th>
                <th className="border border-gray-950 px-4 py-2">Sample Group</th>
             
             
             
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-gray-950 px-4 py-2">
                      {row.sampleDate ? new Date(row.sampleDate).toLocaleString('en-US', {
                        timeZone: 'Asia/Colombo',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      }) : 'N/A'}
                    </td>
                  
                    <td className="border border-gray-950 px-4 py-2">{row.collectorName}</td>
                    <td className="border border-gray-950 px-4 py-2">
                      <select 
                        className="w-full p-1 border rounded dark:bg-slate-600 dark:text-white"
                        value={row.weatherCondition}
                        onChange={(e) => handleSourceUpdateCondition(index, e.target.value|| '')}
                      >
                        {["Sunny", "Cloudy", "Rainy", "Snowy"].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-950 px-4 py-2">{`Sample Number: ${randomNumber}`}</td>
                    <td className="border border-gray-950 px-4 py-2">{row.sampleGroup}</td>
                  
                    
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="border border-gray-950 px-4 py-2 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Update Action Buttons */}
        <div className="mt-6 flex justify-start gap-4 w-[90%]">
          {["Save", "Edit", "View", "Close"].map((action) => (
            <button
              key={action}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors dark:bg-white dark:text-black dark:font-bold"
              onClick={() => handleAction(action)}
              type={action.toLowerCase() === 'save' ? 'submit' : 'button'}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
   
  );
};

export default WaterQualityPage;

