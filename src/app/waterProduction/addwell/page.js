"use client"
import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import './styles.css'; 
import { motion } from "framer-motion";
import { MoonLoader } from "react-spinners";
import { Suspense } from 'react';

const LoadingAnimation = () => (
  <motion.div
    className="flex flex-col items-center justify-center h-32"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <MoonLoader size={30} color="#4B5563" />
    <p className="mt-4 text-gray-500">Loading...</p>
  </motion.div>
);
const WellForm = dynamic(() => import("@/components/AddWell/WellForm"), {
  ssr: false,
  loading: () => <LoadingAnimation />
});
import { Button } from '@/components/ui/button'
import API from "@/api/index"


export default function page() {
  const [isFormVisible, setFormVisible] = useState(false)
  const [isCancelVisible, setCancelVisible] = useState(true)
  const [isTableVisible, setTableVisible] = useState(false)
  const [wellData, setWellData] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingTimeout, setLoadingTimeout] = useState(true)
  const [currentPage, setCurrentPage] = useState(1); 
  const rowsPerPage = 100; 
  const [searchTerm, setSearchTerm] = useState("");
  const [projectOfficeFilter, setProjectOfficeFilter] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("");

  const getProjectOfficeNameByCode = (code) => {
    const provinceMap = {
      'EMB': 'Embilipitiya',
      'RSC(S)': 'REGIONAL SUPPORT CENTER-SOUTHERN', 
      'RSC(C)': 'Colombo',
      'HO': 'Head Office',
      'INV': 'Investigation Section / HO',
      'MON': 'Monaragala',
      'ANU':'Anuradhapura',
      'HAM': 'Hambantota',
     
    };
    
    if (!code) return 'N/A';
    
    const result = provinceMap[code.toString().toUpperCase()] || code;
    console.log(`Project Office Code: ${code}, Result: ${result}`);
    return result;
  };
  const getProvinceNameByCode = (code) => {
    const provinceMap = {
      'WES': 'Westernprovince',
      'CEN': 'Centralprovince', 
      'SOU': 'Southernprovince',
      'NOR': 'Northernprovince',
      'EST': 'Easternprovince',
      'NWN': 'NorthWesternprovince',
      'NCE': 'NorthCentralprovince',
      'UVA': 'Uvaprovince',
      'SAB': 'Sabaragamuwaprovince',
      'EAS': 'Easternprovince'
      
    };
    
    if (!code) return 'N/A';
    
    const result = provinceMap[code.toString().toUpperCase()] || code;
    console.log(`Province Code: ${code}, Result: ${result}`);
    return result;
  };
  const getDistrictNameByCode = (code) => {
    const districtMap = {
      'AMPARA': 'Ampara',
      'KUR': 'Kurunegala', 
      'COL': 'Colombo',
      'KAN': 'Kandy',
      'BAD': 'Badulla',
      'GAL': 'Galle',
      'KEG': 'Kegalle',
      'JAF': 'Jaffna',
      'ANU': 'Anuradhapura',
      'MTL': 'Matale',
      'NUE': 'NuwaraEliya', 
      'RAT': 'Ratnapura',
      'POL': 'Polonnaruwa',
      'TRI': 'Trincomalee',
      'BAT': 'Batticaloa',
      'MTR': 'Matara',
      'HAM': 'Hambantota',
      'MUL': 'Mullaitivu',
      'AMP': 'Ampan',
      'KIL': 'Kilinochchi', 
      'MAN': 'Mannar',
      'KAL': 'Kalutara',
      'GAM': 'Gampaha',
      'PUT': 'Puttalam',
      'VAU': 'Vavuniya',
      'MON': 'Monaragala',
      'EMB':'Ebilipitiya'
      
    };
    
 
    if (!code) return 'N/A';
    
  
    const result = districtMap[code.toString().toUpperCase()] || code;
    console.log(`District Code: ${code}, Result: ${result}`);
    return result;
  };
  const getDivisionNameByCode = (code) => {
    const dsDivisionMap = {
      'NUWARAGAM PALATHA CENTRAL': 'Ampara',
      'THISSAMAHARAMA': 'Kurunegala', 
      'KATARAGAMA': 'Colombo',
      'TANGALLE': 'Kandy',
      'WEERAKETIYA': 'Badulla',
      'AMBALANTOTA': 'Galle',
      'THISSAMAHARAMA': 'Kegalle',
      'HAMBANTOTA': 'Jaffna',
      'NOCHCHIYAGAMA': 'Anuradhapura',
      'THIRAPPANE': 'Matale',
      'KARUWALAGASWEWA': 'NuwaraEliya', 
      'ANAMADUWA': 'Ratnapura',
      'THIRAPPANE': 'Polonnaruwa',
      'NAWAGATTEGAMA': 'Trincomalee',
      'MIHINTALE': 'Batticaloa',
      'ANAMADUWA': 'Matara',
      'WANATHAVILLUWA': 'Hambantota',
      'MAHAWA': 'Mullaitivu',
      'RATHMALANA': 'Head Office',
      'MADULLA': 'Kilinochchi', 
      'SIYAMBALANDUWA': 'Mannar',
      
    };
    

    if (!code) return 'N/A';
    
  
    return dsDivisionMap[code.toString().toUpperCase()] || code;
  };
  
  useEffect(() => {
    const fetchWellData = async () => {
      try {
        setLoading(true); // Set loading true when fetching data
        const response = await API.viewallwells();
        console.log("Fetched Well Data:", response);
        
        setWellData(response.data || []);
        setTableVisible(response.data && response.data.length > 0);
      } catch (error) {
        console.error("Error fetching well data:", error);
        setWellData([]); // Fallback in case of error
      } finally {
        setLoading(false);
      }
    };

    
    setLoadingTimeout(true);
    const timeoutId = setTimeout(() => {
      setLoadingTimeout(false);
    }, 3000); 

    fetchWellData().finally(() => clearTimeout(timeoutId));

    return () => clearTimeout(timeoutId); 
  }, []);

  const handleAddWell = () => {
    setFormVisible(true)
    setCancelVisible(false)
    setTableVisible(true)
  }

  const handleCloseForm = () => {
    setFormVisible(false)
    setCancelVisible(true)
    setSearchTerm("");
    if (wellData.length > 0) {
      setTableVisible(true)
    } else {
      setTableVisible(false)
    }
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(wellData.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedWells = wellData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage); 

  const filteredWells = displayedWells.filter(well => 
    well.wellNo.toLowerCase().includes(searchTerm.toLowerCase()) &&
    getProjectOfficeNameByCode(well.projOfficeCode).toLowerCase().includes(projectOfficeFilter.toLowerCase()) &&
    getProvinceNameByCode(well.districtCode).toLowerCase().includes(provinceFilter.toLowerCase()) &&
    getDistrictNameByCode(well.provinceCode).toLowerCase().includes(districtFilter.toLowerCase()) &&
    getDivisionNameByCode(well.dsDivision).toLowerCase().includes(divisionFilter.toLowerCase())
  );

  console.log("Well Data:", wellData);

  return (
    <div className="main-container">
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="button-container">
      {!isFormVisible &&(
          <div className="relative search-container float-end p-4 border-slate-800  text-lg -mt-7">
            <label htmlFor="wellNumberSearch" className="sr-only">Search by Well Number</label>
            <input 
              id="wellNumberSearch"
              type="text" 
              placeholder="Search by Well Number" 
              className="search-input border border-slate-800 rounded-full pl-10 py-2 bg-white ml-5 text-gray-950 font-bold"
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <span className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-500">
              🔍 
            </span>
          </div>
      )}
          {!isFormVisible ? (
            <>
            
              <Button onClick={handleAddWell} className="mb-10 add-well-button">Add Well Data</Button>
              <div className="pagination">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1} className="left-arrow mr-3">Previous</Button>
        <span>Page {currentPage} of {Math.ceil(wellData.length / rowsPerPage)}</span>
        <Button onClick={handleNextPage} disabled={currentPage === Math.ceil(wellData.length / rowsPerPage)} className="rigth-arrow ml-2">Next</Button>
        <div className="filter-container  mt-[1.10rem]  ">
        <input 
          type="text" 
          placeholder="Filter by Project Office" 
          value={projectOfficeFilter} 
          className="p-2  border-slate-800 mt-2 rounded-2xl border-2 mr-12"
          onChange={(e) => setProjectOfficeFilter(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Filter by Province" 
          value={provinceFilter} 
           className="p-2 mr-12  border-slate-800 mt-2 rounded-2xl border-2"
          onChange={(e) => setProvinceFilter(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Filter by District" 
          value={districtFilter} 
           className="p-2 mr-12  border-slate-800 mt-2 rounded-2xl border-2"
          onChange={(e) => setDistrictFilter(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Filter by Division" 
          value={divisionFilter} 
           className="p-2 mr-12  border-slate-800 mt-2 rounded-2xl border-2"
          onChange={(e) => setDivisionFilter(e.target.value)} 
        />
      </div>
      </div>
              {isTableVisible ? (
                
                <table className="well-data-table modern-table ">
                  <thead>
                    <tr>
                      <th className='p-5'>wellNo</th>
                      <th className='p-5 whitespace-nowrap'>ProjectOffice</th>
                      <th className='p-5 whitespace-nowrap'>Province</th>
                      <th className='p-5 whitespace-nowrap'>District</th>
                      <th className='px-5 whitespace-nowrap'>Dsdivition</th>
                      <th className='p-5 ml-4'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWells.map((well, index) => {
                      console.log("Well Data Row:", well);
                      return (
                        <tr key={`${well.wellNo}-${index}`}>
                          <td className='px-5'>{well.wellNo}</td>
                          <td className='px-5'>{getProjectOfficeNameByCode(well.projOfficeCode)}</td>
                          <td className='px-5'>{getProvinceNameByCode(well.districtCode)}</td>
                          <td className='px-5'>{getDistrictNameByCode(well.provinceCode)}</td>
                          <td className='p-5'>{getDivisionNameByCode(well.dsDivision)}</td>
                          <td className='p-5'>
                            <Button onClick={() => handleView(well)} className="action-button view-button">👁️ View</Button>
                            <Button onClick={() => handleEdit(well)} className="action-button edit-button">✏️ Edit</Button>
                            <Button onClick={() => handleDelete(well)} className="action-button delete-button">🗑️ Delete</Button>
                            <Button onClick={() => handleExportPDF(well)} className="action-button export-pdf-button">📄 Export PDF</Button>
                            <Button onClick={() => handleExportExcel(well)} className="action-button export-excel-button">📊 Export Excel</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : loading ? (
                <div className="spinner-container">
                  <div className="spinner"></div>
                  <Suspense fallback="Loading..."/>
                </div>
              ) : loadingTimeout ? (
                <p>Loading is taking longer than expected. Please check your connection.</p>
              ) : (
                <p>No well data available.</p>
              )}
            </>
          ) : (
            <Button onClick={handleCloseForm} className="mb-10 close-form-button">Close Form</Button>
          )}
        </div>
      )}
      {isFormVisible && (
        <div className="popup ">
          <WellForm className="mt-[0.75rem] absolute" onAddWell={handleAddWell} onCancel={handleCloseForm} />
          {isCancelVisible && (
            <Button onClick={handleCloseForm}>Cancel</Button>
          )}
        </div>
      )}
     
    </div>
  )
}
