import React from 'react'

export default function ChemicalData({ formData, handleChange, handleNestedChange }) {
  return (
    <div className="p-4">
      <div className="flex justify-center bg-gray-300 rounded-md dark:bg-slate-700 h-12">
        <h3 className="text-lg font-semibold align-items-center mt-2">Chemical Data</h3>
      </div>
    
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {/* Chemical Properties */}
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Color:</label>
            <input
              type="text"
              name="Color"
              value={formData.Color || ''}
              onChange={(e) => handleChange('Color', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Turbidity:</label>
            <input
              type="text"
              name="Turbidity"
              value={formData.Turbidity || ''}
              onChange={(e) => handleChange('Turbidity', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">pH:</label>
            <input
              type="text"
              name="PH"
              value={formData.PH || ''}
              onChange={(e) => handleChange('PH', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Electrical Conductivity:</label>
            <input
              type="text"
              name="Elecon"
              value={formData.Elecon || ''}
              onChange={(e) => handleChange('Elecon', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
        </div>

        {/* Chemical Compounds */}
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Chlorides:</label>
            <input
              type="text"
              name="Chlorides"
              value={formData.Chlorides || ''}
              onChange={(e) => handleChange('Chlorides', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Total Alkalinity:</label>
            <input
              type="text"
              name="Totalk"
              value={formData.Totalk || ''}
              onChange={(e) => handleChange('Totalk', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Free Ammonia:</label>
            <input
              type="text"
              name="FreeAmonia"
              value={formData.FreeAmonia || ''}
              onChange={(e) => handleChange('FreeAmonia', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Albuminoid Ammonia:</label>
            <input
              type="text"
              name="Albamonia"
              value={formData.Albamonia || ''}
              onChange={(e) => handleChange('Albamonia', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
        </div>

        {/* Additional Parameters */}
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Nitrates:</label>
            <input
              type="text"
              name="Nitrates"
              value={formData.Nitrates || ''}
              onChange={(e) => handleChange('Nitrates', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Nitrite:</label>
            <input
              type="text"
              name="Nitrite"
              value={formData.Nitrite || ''}
              onChange={(e) => handleChange('Nitrite', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Fluorides:</label>
            <input
              type="text"
              name="Fluorides"
              value={formData.Fluorides || ''}
              onChange={(e) => handleChange('Fluorides', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Phosphate:</label>
            <input
              type="text"
              name="Phosphate"
              value={formData.Phosphate || ''}
              onChange={(e) => handleChange('Phosphate', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
        </div>

        {/* Water Properties */}
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Total Dissolved Solids:</label>
            <input
              type="text"
              name="Totdissol"
              value={formData.Totdissol || ''}
              onChange={(e) => handleChange('Totdissol', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Total Hardness:</label>
            <input
              type="text"
              name="Tothard"
              value={formData.Tothard || ''}
              onChange={(e) => handleChange('Tothard', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Calcium Hardness:</label>
            <input
              type="text"
              name="Calchard"
              value={formData.Calchard || ''}
              onChange={(e) => handleChange('Calchard', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Magnesium:</label>
            <input
              type="text"
              name="Magnesium"
              value={formData.Magnesium || ''}
              onChange={(e) => handleChange('Magnesium', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
        </div>

        {/* Iron Related */}
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Total Iron:</label>
            <input
              type="text"
              name="Totiron"
              value={formData.Totiron || ''}
              onChange={(e) => handleChange('Totiron', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Dissolved Iron:</label>
            <input
              type="text"
              name="Dissiron"
              value={formData.Dissiron || ''}
              onChange={(e) => handleChange('Dissiron', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Filtered Iron:</label>
            <input
              type="text"
              name="Filtiron"
              value={formData.Filtiron || ''}
              onChange={(e) => handleChange('Filtiron', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Fixed Iron:</label>
            <input
              type="text"
              name="Fixediron"
              value={formData.Fixediron || ''}
              onChange={(e) => handleChange('Fixediron', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
        </div>

        {/* Biological Parameters */}
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Total Coliform:</label>
            <input
              type="text"
              name="Totcoli"
              value={formData.Totcoli || ''}
              onChange={(e) => handleChange('Totcoli', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Faecal Coliform:</label>
            <input
              type="text"
              name="Faecalcoli"
              value={formData.Faecalcoli || ''}
              onChange={(e) => handleChange('Faecalcoli', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Dissolved Oxygen:</label>
            <input
              type="text"
              name="Oxygen"
              value={formData.Oxygen || ''}
              onChange={(e) => handleChange('Oxygen', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Hydrogen Sulfide:</label>
            <input
              type="text"
              name="Hysul"
              value={formData.Hysul || ''}
              onChange={(e) => handleChange('Hysul', e.target.value)}
              className="border rounded px-2 py-1 w-1/2 dark:bg-slate-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
