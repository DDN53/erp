'use client'
import React, { useState } from 'react';

// Sample options for dropdowns (replace with actual data)
const locations = ["Location 1", "Location 2", "Location 3"];
const costCenters = ["Cost Center 1", "Cost Center 2"];
const dsDivisions = ["DS Division 1", "DS Division 2"];
const gsDivisions = ["GS Division 1", "GS Division 2"];
const villages = ["Village 1", "Village 2"];
const electionCodes = ["Election Code 1", "Election Code 2"];

export default function Page() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCostCenter, setSelectedCostCenter] = useState('');
  const [selectedDSDivision, setSelectedDSDivision] = useState('');
  const [selectedGSDivision, setSelectedGSDivision] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedElectionCode, setSelectedElectionCode] = useState('');

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">New Well Request</h1>
      
      <div className="mb-4">
        <label className="block mb-2">Location</label>
        <select 
          value={selectedLocation} 
          onChange={(e) => setSelectedLocation(e.target.value)} 
          className="border p-2 w-full"
        >
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Cost Center</label>
        <select 
          value={selectedCostCenter} 
          onChange={(e) => setSelectedCostCenter(e.target.value)} 
          className="border p-2 w-full"
        >
          <option value="">Select Cost Center</option>
          {costCenters.map((costCenter) => (
            <option key={costCenter} value={costCenter}>{costCenter}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">DS Division</label>
        <select 
          value={selectedDSDivision} 
          onChange={(e) => setSelectedDSDivision(e.target.value)} 
          className="border p-2 w-full"
        >
          <option value="">Select DS Division</option>
          {dsDivisions.map((division) => (
            <option key={division} value={division}>{division}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">GS Division</label>
        <select 
          value={selectedGSDivision} 
          onChange={(e) => setSelectedGSDivision(e.target.value)} 
          className="border p-2 w-full"
        >
          <option value="">Select GS Division</option>
          {gsDivisions.map((division) => (
            <option key={division} value={division}>{division}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Village</label>
        <select 
          value={selectedVillage} 
          onChange={(e) => setSelectedVillage(e.target.value)} 
          className="border p-2 w-full"
        >
          <option value="">Select Village</option>
          {villages.map((village) => (
            <option key={village} value={village}>{village}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Election Code</label>
        <select 
          value={selectedElectionCode} 
          onChange={(e) => setSelectedElectionCode(e.target.value)} 
          className="border p-2 w-full"
        >
          <option value="">Select Election Code</option>
          {electionCodes.map((code) => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
      </div>

      <button className="bg-blue-500 text-white p-2 rounded">Submit Request</button>
    </div>
  );
}
