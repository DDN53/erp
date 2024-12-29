'use client'
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import API from "@/api/index";

export default function WellReport() {
  const [wellData, setWellData] = useState([]);

  useEffect(() => {
    fetchWellData();
  }, []);

  const fetchWellData = async () => {
    try {
      const response = await API.viewallwells(); 
      setWellData(response.data);
    } catch (error) {
      console.error('Error fetching well data:', error);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(wellData);

    
    const headerRange = XLSX.utils.decode_range(ws['!ref']);
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ c: C, r: 0 });
      if (!ws[cellAddress]) continue;
      ws[cellAddress].s = {
        fill: { fgColor: { rgb: "4CAF50" } }, 
        font: { bold: true, color: { rgb: "FFFFFF" } }, 
        alignment: { horizontal: "center", vertical: "center" }
      };
    }

    // Ensure the styles are applied by setting the worksheet's '!cols' property
   // Adjust column widths
   ws['!cols'] = [
    { wpx: 150 , s: { backgroundColor: "25be5c" } }, // Well Number
    { wpx: 150 , s: { backgroundColor: "25be5c" } }, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Start Time
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Start Time
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 , s: { backgroundColor: "25be5c" } }, // Well Number
    { wpx: 150 , s: { backgroundColor: "25be5c" } }, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Start Time
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Start Time
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 }, // Work Location
    { wpx: 150 , s: { backgroundColor: "25be5c" } }, // Well Number
    { wpx: 150 , s: { backgroundColor: "25be5c" } }, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Start Time
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Start Time
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 , s: { backgroundColor: "25be5c" } }, // Well Number
    { wpx: 150 , s: { backgroundColor: "25be5c" } }, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Start Time
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Start Time
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Drill Data
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Rod Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Start Time
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Well Number
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Province
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // RSC
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // District
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Work Location
    { wpx: 150 ,s: { backgroundColor: "25be5c" }}, // Project Office
    { wpx: 150 ,s: { backgroundColor: "25be5c" }},
    
  ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Well Report');
    XLSX.writeFile(wb, 'well_report.xlsx');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Well Report</h1>
        <button
          onClick={exportToExcel}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto dark:bg-slate-800 dark:text-white">
        <table className="min-w-full bg-white border border-gray-300 table-auto">
          <thead>
            <tr className="bg-slate-300 dark:bg-slate-800 dark:text-white">
              <th className="border p-4">Well Number</th>
              <th className="border p-4">Province</th>
              <th className="border p-4">RSC</th>
              <th className="border p-4">District</th>
              <th className="border p-4">Work Location</th>
              <th className="border p-4">Project Office</th>
              <th className="border p-4">Drill Data</th>
              <th className="border p-4">Solidsample</th>
            </tr>
          </thead>
          <tbody>
            {wellData.map((well, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:bg-slate-700 dark:text-white">
                <td className="border p-2 font-medium">{well.newWellNo}</td>
                <td className="border p-2">{well.selectedProvince}</td>
                <td className="border p-2">{well.selectedRSC}</td>
                <td className="border p-2">{well.selectedDistrict}</td>
                <td className="border p-2">{well.Location}</td>
                <td className="border p-2">{well.ProjectOffice}</td>
                <td className="border p-2">{well.DrillData}</td>
                <td className="border p-2">{well.Solidsample}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
