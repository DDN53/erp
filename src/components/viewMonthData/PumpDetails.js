import React from 'react'

export default function PumpDetails({ formData, handleChange, handleNestedChange}) {
  return (
    <div className="p-4">
      <div className="flex justify-center bg-gray-300 rounded-md dark:bg-slate-700 h-12">
        <h3 className="text-lg font-semibold align-items-center mt-2">Pump Details</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
        {/* Pump Specifications */}
        <div className="p-2">
          <h4 className="mb-3 font-bold">Pump Specifications</h4>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Pump Type:</label>
            <input
              type="text"
              name="PumpType"
              value={formData.PumpType || ''}
              onChange={(e) => handleChange('PumpType', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Pump Capacity:</label>
            <input
              type="text"
              name="PumpCapacity"
              value={formData.PumpCapacity || ''}
              onChange={(e) => handleChange('PumpCapacity', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Pump Control Unit:</label>
            <input
              type="text"
              name="PumpControlUnit"
              value={formData.PumpControlUnit || ''}
              onChange={(e) => handleChange('PumpControlUnit', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Flow Meter Available:</label>
            <select
              name="AvailabilityofFlowMeter"
              value={formData.AvailabilityofFlowMeter || false}
              onChange={(e) => handleChange('AvailabilityofFlowMeter', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>

        {/* Operation Details */}
        <div className="p-2">
          <h4 className="font-bold mb-3">Operation Details</h4>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Daily Operation Hours:</label>
            <input
              type="text"
              name="DailyOperationHours"
              value={formData.DailyOperationHours || ''}
              onChange={(e) => handleChange('DailyOperationHours', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Monthly Operation Hours:</label>
            <input
              type="text"
              name="MonthlyOperationHours"
              value={formData.MonthlyOperationHours || ''}
              onChange={(e) => handleChange('MonthlyOperationHours', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Power Consumption:</label>
            <input
              type="text"
              name="PowerConsumption"
              value={formData.PowerConsumption || ''}
              onChange={(e) => handleChange('PowerConsumption', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Maintenance Status:</label>
            <input
              type="text"
              name="MaintenanceStatus"
              value={formData.MaintenanceStatus || ''}
              onChange={(e) => handleChange('MaintenanceStatus', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
        </div>

        {/* Well Details */}
        <div className="p-2">
          <h4 className="font-bold mb-3">Well Information</h4>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Observed Well Available:</label>
            <select
              name="AvailabilityofObservedWell"
              value={formData.AvailabilityofObservedWell || false}
              onChange={(e) => handleChange('AvailabilityofObservedWell', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Well Maintenance Program:</label>
            <select
              name="AvailabilityofWelllMaintenanceProgram"
              value={formData.AvailabilityofWelllMaintenanceProgram || false}
              onChange={(e) => handleChange('AvailabilityofWelllMaintenanceProgram', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Catchment Protection:</label>
            <select
              name="ImplementedofCatchmetProtecttoWell"
              value={formData.ImplementedofCatchmetProtecttoWell || false}
              onChange={(e) => handleChange('ImplementedofCatchmetProtecttoWell', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>

        {/* Notes Section */}
        <div className="p-2">
          <h4 className="font-bold mb-3">Additional Notes</h4>
          <textarea
            name="Note"
            value={formData.Note || ''}
            onChange={(e) => handleChange('Note', e.target.value)}
            className="w-full h-32 p-2 border rounded dark:bg-slate-700"
            placeholder="Enter notes here..."
          />
        </div>
      </div>
    </div>
  )
}
