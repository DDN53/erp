"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import API from "@/app/api/index";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';

// Dynamically import components
const PumpDetails = dynamic(() => import('@/components/viewMonthData/PumpDetails'), { 
  ssr: false // Disable server-side rendering for this component
});

// If the above doesn't work, try importing them individually:
import PumpDetails from '@/components/viewMonthData/PumpDetails';
import ChemicalData from '@/components/viewMonthData/ChemicalData';


function MonthlyInfo(props) {
  const router = useRouter();
  const [monthlyData, setMonthlyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    year: "",
    month: "",
    wellNo: ""
  });

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        setLoading(true);
       
        const response = await API.viewallmonthlydata(); 
     
        
        if (!Array.isArray(response.data)) {
          console.error('Response data is not an array:', response.data);
          setError("Invalid data format received");
          return;
        }
        
        setMonthlyData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        console.error("Error loading monthly data:", err);
        setError(`Failed to load monthly data from ${API.viewallmonthlydata}: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, []);

  useEffect(() => {
    // Apply filters whenever filters state changes
    const applyFilters = () => {
      let filtered = [...monthlyData];
      
      // Debug log to see the data structure
   
      
      if (filters.year && filtered.length > 0) {
        filtered = filtered.filter(item => {
          if (!item || !item.SampleDate) {
            console.warn('Invalid item structure:', item);
            return false;
          }
          const itemYear = new Date(item.SampleDate).getFullYear();
          return itemYear.toString() === filters.year.toString();
        });
      }
      
      if (filters.month && filtered.length > 0) {
        filtered = filtered.filter(item => {
          if (!item || !item.SampleDate) {
            console.warn('Invalid item structure:', item);
            return false;
          }
          const itemMonth = new Date(item.SampleDate).getMonth() + 1;
          return itemMonth.toString() === filters.month.toString();
        });
      }
      
      if (filters.wellNo && filtered.length > 0) {
        
        
        filtered = filtered.filter(item => {
          if (!item || !item.newWellNo) {
            console.warn('Invalid item structure:', item);
            return false;
          }
          const matches = item.newWellNo.toString().toLowerCase().includes(filters.wellNo.toLowerCase());

          return matches;
        });
        
      
      }
      
      setFilteredData(filtered);
    };

    applyFilters();
  }, [filters, monthlyData]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({
      year: "",
      month: "",
      wellNo: ""
    });
  };

  const navigateBack = () => {
    router.push('/waterProduction');
  };

  const handleEditClick = (record) => {
    setEditingRecord(record);
    setShowEditModal(true);
  };

  const handleDeleteRecord = async (item) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        console.log('Delete request for record:', item);
        console.log('API endpoint:', API.removemonthlydata);

        const recordId = item.mid || item.id;
        if (!recordId) {
          throw new Error('No valid ID found for record');
        }

        const response = await API.removemonthlydata(recordId);
        console.log('Delete response:', response);
        
        const refreshResponse = await API.viewallmonthlydata();
        setMonthlyData(refreshResponse.data);
        setFilteredData(refreshResponse.data);
        toast.success('Record deleted successfully');
      } catch (error) {
        console.error("Error deleting record:", error);
        console.error("Error details:", {
          endpoint: API.removemonthlydata,
          recordData: item
        });
        toast.error(`Failed to delete record: ${error.message}`);
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting to edit record:', editingRecord);
      
      // Format the data for the API call
      const formattedData = {
        ...editingRecord,
        SampleDate: new Date(editingRecord.SampleDate).toISOString().split('T')[0]
      };

     
      
      
      // Close the edit modal
      setShowEditModal(false);
      
      // Refresh the data
      const refreshResponse = await API.viewallmonthlydata();
      setMonthlyData(refreshResponse.data);
      setFilteredData(refreshResponse.data);
      
      // Show success message
      toast.success('Record updated successfully');
      
    } catch (error) {
      console.error('Error updating monthly data:', error);
      toast.error(`Failed to update record: ${error.message}`);
    }
  };

  const handleFormChange = (field, value) => {
    console.log('Updating field:', field, 'with value:', value);
    setEditingRecord(prev => {
      const updated = {
        ...prev,
        [field]: value
      };
      console.log('Updated record:', updated);
      return updated;
    });
  };

  const handleNestedFormChange = (category, field, value) => {
    console.log('Updating nested field:', category, field, 'with value:', value);
    setEditingRecord(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleGeneratePDF = async (record) => {
    try {
      // Extract wellNo from the record
      const wellNo = record.newWellNo;
      if (!wellNo) {
        toast.error('Well number not found in record');
        return;
      }

      const response = await API.monthlyDataReportPDF(wellNo);
      
      // Create and trigger download
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      
      // Format date for filename
      const date = new Date(record.SampleDate);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      
      link.setAttribute('download', `monthly-report-${wellNo}-${month}-${year}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('PDF generated successfully');
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error(`Failed to generate PDF: ${error.message}`);
    }
  };

  const getMonthlyDataWithLineHeights = (data) => {
    const newData = data.map((item) => {
      const newItem = {
        ...item,
        lineHeights: {
          SampleDate: 1.5,
          SampleDepth: 1.5,
          SampleTime: 1.5,
          Color: 1.5,
          Turbidity: 1.5,
          Odor: 1.5,
          Taste: 1.5,
          PH: 1.5,
          Elecon: 1.5,
          Chlorides: 1.5,
          Sulphates: 1.5,
          TotalDissolvedSolids: 1.5,
          Totalk: 1.5,
          FreeAmonia: 1.5,
          Manganese: 1.5,
          Nitrate: 1.5,
          Nitrite: 1.5,
          Fluoride: 1.5,
          TotalHardness: 1.5,
          Calcium: 1.5,
          Magnesium: 1.5,
          FecalColiform: 1.5,
          TotalColiform: 1.5,
          BacteriaCount: 1.5,
          Geologist: 1.5,
          X: 1.5,
          Y: 1.5,
          Elevation: 1.5,
          LocalMetric1: 1.5,
          LocalMetric2: 1.5,
          Methodofsurvey: 1.5,
        }
      };
      return newItem;
    });
    return newData;
  };

  const handleGenerateExcel = async (record) => {
    try {
      // Extract wellNo from the record
      const wellNo = record.newWellNo;
      if (!wellNo) {
        toast.error('Well number not found in record');
        return;
      }

      const response = await API.monthlyDataReportExcel(wellNo);
      
      // Create and trigger download
      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Format date for filename
      const date = new Date(record.SampleDate);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      
      link.setAttribute('download', `monthly-report-${wellNo}-${month}-${year}.xlsx`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Excel file generated successfully');
    } catch (error) {
      console.error("Error generating Excel:", error);
      toast.error(`Failed to generate Excel file: ${error.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  console.log('Filtered Data Length:', filteredData?.length);
  console.log('Filtered Data Content:', filteredData);

  return (
    <div className="min-h-full" style={{ minHeight: "calc(100vh - 347px)" }}>
      <ToastContainer />
      <div className="-mt-5 border border-gray-400 w-[95%] shadow-xl mx-auto p-6 flex flex-col dark:bg-slate-800 dark:text-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Monthly Information</h1>
          <button
            onClick={navigateBack}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </button>
        </div>

        {/* Filters */}
        <div className="mb-4 bg-gray-100 p-4 rounded-lg dark:bg-slate-800 dark:text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
            >
              <option value="">Select Year</option>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={filters.month}
              onChange={(e) => handleFilterChange('month', e.target.value)}
              className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
            >
              <option value="">Select Month</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Well No"
              value={filters.wellNo}
              onChange={(e) => handleFilterChange('wellNo', e.target.value)}
              className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
            />
          </div>
          <button 
            onClick={clearFilters}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Clear Filters
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white border border-gray-300 dark:bg-slate-700 dark:text-white">
            <thead>
              <tr className="bg-gray-100 dark:bg-slate-600 dark:text-white">
                <th className="py-2 px-4 border-b text-left">Well No</th>
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Ground Water Level</th>
                <th className="py-2 px-4 border-b text-left">Water Supply Scheme</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-4 px-4 text-center border-b">
                    No data available
                  </td>
                </tr>
              ) : (
                filteredData.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-slate-600">
                    <td className="py-2 px-4 border-b">{record.newWellNo}</td>
                    <td className="py-2 px-4 border-b">{record.SampleDate}</td>
                    <td className="py-2 px-4 border-b">{record.GroundWaterLevel}</td>
                    <td className="py-2 px-4 border-b">{record.WaterSupplyScheme}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClick(record)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => handleDeleteRecord(record)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>

                        <button
                          onClick={() => handleGeneratePDF(record)}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                          title="Export PDF"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586L7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                          </svg>
                        </button>

                        <button
                          onClick={() => handleGenerateExcel(record)}
                          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          title="Export Excel"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0-4a1 1 0 011-1h4a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {showEditModal && editingRecord && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 ">
            <div className="relative top-20 mx-auto p-5 border w-[80%] shadow-lg rounded-md bg-white dark:bg-slate-800 dark:text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold ml-[1rem]">Edit Monthly Record</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className='flex flex-col ml-[1rem]'>
                    <label className="block text-gray-700 font-bold mb-2 dark:text-white">Well Number:</label>
                    <input
                      type="text"
                      value={editingRecord.newWellNo || ''}
                      onChange={(e) => handleFormChange('newWellNo', e.target.value)}
                      className="w-[50%] p-2 border rounded dark:bg-slate-700 dark:text-white"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2 dark:text-white">Sample Date:</label>
                    <input
                      type="date"
                      value={editingRecord.SampleDate ? new Date(editingRecord.SampleDate).toISOString().split('T')[0] : ''}
                      onChange={(e) => handleFormChange('SampleDate', e.target.value)}
                      className="w-[50%] p-2 border rounded dark:bg-slate-700 dark:text-white"
                    />
                  </div>
                </div>

                <ChemicalData 
                  formData={editingRecord} 
                  handleChange={handleFormChange}
                  handleNestedChange={handleNestedFormChange}
                />
                
                <PumpDetails 
                  formData={editingRecord}
                  handleChange={handleFormChange}
                  handleNestedChange={handleNestedFormChange}
                />
                
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MonthlyInfo;