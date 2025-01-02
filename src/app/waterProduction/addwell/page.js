"use client"

import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import './styles.css'; 
import { motion } from "framer-motion";
import { MoonLoader } from "react-spinners";
import { Suspense } from 'react';
import { toast } from 'react-toastify';

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
import API from "@/api/route"


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
  const [selectedOption, setSelectedOption] = useState("");
  const handleGenerateWellPDF = async (well) => {
    try {
      const formattedData = {
        wellData: {
          newWellNo: well.WELLNO || "",
          WorkLocation: well.WorkLocation || "",
          OldWellNo: well.OldWellNo || "",
          ProjectOffice: well.ProjectOffice || "",
          RSCLocation: well.RSCLocation || "",
          Location: well.LOCATION || "",
          Electorate: well.Electorate || "",
          Village: well.Village || "",
          UserType: well.UserType || "",
          WellType: well.WellType || "",
          selectedProvince: well.selectedProvince || "",
          selectedDistrict: well.selectedDistrict || "",
          selectedDSDivision: well.selectedDSDivision || "",
          GSDivision: well.GSDivision || "",
          SchemeName: well.SchemeName || "",
          TopoSheet: well.TopoSheet || "",
          ScaleTopoSheet: well.ScaleTopoSheet || "",
          GeologyMap: well.GeologyMap || "",
          ScaleGeologyMap: well.ScaleGeologyMap || "",
          DepthtoTheBottomofSoilLayer: well.DepthtoTheBottomofSoilLayer || "",
          HighlyWeatheredRock: well.HighlyWeatheredRock || "",
          WeatheredRock: well.WeatheredRock || "",
          Geologist: well.Geologist || "",
          X: well.X || "",
          Y: well.Y || "",
          Elevation: well.Elevation || "",
          LocalMetric1: well.LocalMetric1 || "",
          LocalMetric2: well.LocalMetric2 || "",
          Methodofsurvey: well.Methodofsurvey || "",
          //Chemical Data
          SampleDate: well.SampleDate || "",
          SampleDepth: well.SampleDepth || "",
          SampleTime: well.SampleTime || "",
          Color: well.Color || "",
          Turbidity: well.Turbidity || "",
          Odor: well.Odor || "",
          Taste: well.Taste || "",
          PH: well.PH || "",
          Elecon: well.Elecon || "",
          Chlorides: well.Chlorides || "",
          Sulphates: well.Sulphates || "",
          TotalDissolvedSolids: well.TotalDissolvedSolids || "",
          Totalk: well.Totalk || "",
          FreeAmonia: well.FreeAmonia || "",
          Albamonia: well.Albamonia || "",
          Nitrates: well.Nitrates || "",
          Nitrite: well.Nitrite || "",
          Fluorides: well.Fluorides || "",
          Phosphate: well.Phosphate || "",
          Totdissol: well.Totdissol || "",
          Tothard: well.Tothard || "",
          Calchard: well.Calchard || "",
          Totiron: well.Totiron || "",
          Magnesium: well.Magnesium || "",
          Sulphate: well.Sulphate || "",
          Manganese: well.Manganese || "",
          Dissiron: well.Dissiron || "",
          Totcoli: well.Totcoli || "",
          Faecalcoli: well.Faecalcoli || "",
          Filtiron: well.Filtiron || "",
          Totresidue: well.Totresidue || "",
          Calcium: well.Calcium || "",
          Oxygen: well.Oxygen || "",
          Hysul: well.Hysul || "",
          Fixediron: well.Fixediron || "",
          //Pump Install
          SWL: well.SWL || "",
          InstalledDatePedestal: well.InstalledDatePedestal || "",
          InstalledDatePump: well.InstalledDatePump || "",
          PumpType: well.PumpType || "",
          PumpHeadNo: well.PumpHeadNo || "",
          CylinderType: well.CylinderType || "",
          CylinderDepth: well.CylinderDepth || "",
          RiserPipeType: well.RiserPipeType || "",
          RiserPipeLength: well.RiserPipeLength || "",
          ConnecRodType: well.ConnecRodType || "",
          ConnecRodLength: well.ConnecRodLength || "",
          Remarks: well.Remarks || "",
          //Request General
          RequestMode: well.RequestMode || "",
          Fundingcriteria: well.Fundingcriteria || "",
          WellCategory: well.WellCategory || "",
          AgentName: well.AgentName || "",
          ProjectName: well.ProjectName || "",
          ContactOrderNo: well.ContactOrderNo || "",
          DistancetoNearestPublicPerinialWell: well.DistancetoNearestPublicPerinialWell || "",
          NoOfHousesWithin500M: well.NoOfHousesWithin500M || "",
          ConcentOfPSForMaintenance: well.ConcentOfPSForMaintenance || "",
          ConsumerSocietyFormed: well.ConsumerSocietyFormed || "",
          NameofCareTaker: well.NameofCareTaker || "",
          AddressofCareTakerline1: well.AddressofCareTakerline1 || "",
          AddressofCareTakerline2: well.AddressofCareTakerline2 || "",
          AddressofCareTakerline3: well.AddressofCareTakerline3 || "",
          TestDate: well.TestDate || "",
          Step1one: well.Step1one || "",
          Step1two: well.Step1two || "",
          Step2one: well.Step2one || "",
          Step2two: well.Step2two || "",
          Step3one: well.Step3one || "",
          Step3two: well.Step3two || "",
          Step4one: well.Step4one || "",
          Step4two: well.Step4two || "",
          Step5one: well.Step5one || "",
          Step5two: well.Step5two || "",
          TestDate2: well.TestDate2 || "",
          EndDate2: well.EndDate2 || "",
          PumpInstallationDepth: well.PumpInstallationDepth || "",
          PumpInstallationDepth2: well.PumpInstallationDepth2 || "",
          AvarageDischargeRate: well.AvarageDischargeRate || "",
          waterlevelatendoftherecovery: well.waterlevelatendoftherecovery || "",
          PumingDuration: well.PumingDuration || "",
          StatisticWaterLevel: well.StatisticWaterLevel || "",
          StaticWaterLevel: well.StaticWaterLevel || "",
          PumpingWaterLevelattheEndofthetest: well.PumpingWaterLevelattheEndofthetest || "",
          Storativity: well.Storativity || "",
          RecoveryPeriod: well.RecoveryPeriod || "",
          Transmassvity: well.Transmassvity || "",
          B: well.B || "",
          C: well.C || "",
          TestDate3: well.TestDate3 || "",
          PumpInstallationDepth3: well.PumpInstallationDepth3 || "",
          DischargeRate: well.DischargeRate || "",
          PumpingWaterLevel: well.PumpingWaterLevel || "",
          PumpingDuration: well.PumpingDuration || "",
          RecomendationBasedon: well.RecomendationBasedon || "",
          GeologyRock: well.GeologyRock || "",
          GeologyOverburden: well.GeologyOverburden || "",
          selectedWorkLocation: well.selectedWorkLocation || "",
          selectedRSC: well.selectedRSC || "",
          selectedWellType: well.selectedWellType || "",
          selectedWellCondition: well.selectedWellCondition || "",
          //Drilling Data
          DrillData: well.DrillData || "",
          RodNo: well.RodNo || "",
          Starttime: well.Starttime || "",
          FinishTime: well.FinishTime || "",
          Duration: well.Duration || "",
          drillBitNo: well.drillBitNo || "",
          DrillBitandHammerType: well.DrillBitandHammerType || "",
          drillDepth: well.drillDepth || "",
          yield: well.yield || "",
          EC: well.EC || "",
          Fracture: well.Fracture || "",
          Description: well.Description || "",
          Solidsample: well.Solidsample || "",
          WaterSample: well.WaterSample || "",
          Drillingsign: well.Drillingsign || "",
          OicSign: well.OicSign || ""
        },
        styling: {
          colors: {
            primary: '#1E40AF', 
            secondary: '#059669', 
            accent: '#DC2626', 
            background: '#F3F4F6', 
            text: '#111827' 
          },
          fonts: {
            header: 'Helvetica-Bold',
            body: 'Helvetica'
          },
          sections: {
            header: {
              backgroundColor: '#1E40AF',
              textColor: '#FFFFFF',
              padding: 20
            },
            subHeader: {
              backgroundColor: '#E5E7EB',
              textColor: '#1F2937',
              padding: 10
            },
            content: {
              backgroundColor: '#FFFFFF',
              textColor: '#374151',
              padding: 15
            }
          },
          table: {
            headerBgColor: '#1E40AF',
            headerTextColor: '#FFFFFF',
            rowBgColor: '#FFFFFF',
            rowAltBgColor: '#F3F4F6',
            borderColor: '#D1D5DB'
          },
          logo: {
            width: 150,
            height: 60,
            position: { x: 50, y: 50 }
          }
        }
      };

      const response = await API.generateWellReportPDF(formattedData);

      const pdfBlob = new Blob(
        [response.data || response],
        { type: 'application/pdf' }
      );
      
      const url = window.URL.createObjectURL(pdfBlob);
      const filename = `well-${well.WELLNO}-report.pdf`;
      downloadFile(url, filename);
      
      toast.success('PDF generated successfully');
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error(
        error.response?.data?.message || 
        'Failed to generate PDF report. Please try again.'
      );
    }
  };

  

  // Helper function to handle file downloads
  const downloadFile = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    // Clean up the URL object
    window.URL.revokeObjectURL(url);
  };
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
   
  const handleEditWell = async (e) => {
    e.preventDefault();
    try {
      if (!editingWell || !editingWell.newWellNumber) {
        throw new Error('Well Number is missing');
      }

      const cleanPayload = Object.fromEntries(
        Object.entries(editingWell).filter(([_, value]) => value != null)
      );
      
      await API.editwell(editingWell.newWellNumber, cleanPayload);

      setShowEditModal(false);
      
    
      const response = await API.viewallwells();
      setWells(response.data);
      setFilteredWells(response.data);
      toast.success('Well updated successfully!');
    } catch (error) {
      console.error("Error updating well:", error);
      
      // Enhanced error message handling
      let errorMessage = 'Failed to update well: ';
      if (error.response) {
        errorMessage += error.response.data?.message || 
      `Server error (${error.response.status})`;
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        errorMessage += 'No response from server';
      } else {
        errorMessage += error.message || 'Unknown error occurred';
      }

      // Show error message to user
      alert(errorMessage);
      toast.error(errorMessage);
    }
  };
  const handleGenerateWellExcel = async (well) => {
    try {
     
      const formattedData = {
        wellData: {
          WellNumber: well.wellNo || "",
          OldWellNo: well.OldWellNo || "",
          NewWellNumer:well.nWellNo || "",
          Province:(well.provinceCode || ""),
          District:(well.districtCode || ""),
          Projectoffice:(well.projOfficeCode || ""),
          DSdivition:(well.dsDivision || ""),
          GsDivition:well.gsDivision || "",
          ElectorateDivition:well.electDivision || "",
          Village:well.village || "",
          Location:well.location || "",
          XCoordination:well.xCoordinate || "",
          YCoordination:well.yCoordinate || "",
          MapUsed:well.mapUsed || "",
          MapScale:well.mapScale || "",
          Geolocation:well.geologicalUsed || "",
          GeologicalScale:well.geologicalScale || "",
          XMetric:well.xMetric || "",
          YMetric:well.yMetric || "",
          ElevationMSL:well.elevationMsl || "",
          UserType:well.userType || "",
          SchemeName:well.schemeName || "",
          Source:well.source || "",
          ElevationMethod:well.elvMethod || "",
          DeepSoil:well.depSoil || "",
          DeepHwRock:well.depHwRock || "",
          DeepRock:well.depWRock || "",
          Geol:well.geol || "",
          lock:well.isLock || "",
          RSLocation:well.RSCLocation || "",
          ScaleGeologyMap:well.ScaleGeologyMap || "",
          WellType:well.WellType || "",
          WellCondition:well.WellCondition || "",
          ScaleGeologyMap:well.ScaleGeologyMap || "",
        },
      };

      const response = await API.generateWellReportExcel(formattedData);
      
      const url = window.URL.createObjectURL(
        new Blob([response.data], { 
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        })
      );
      const filename = `well-${well.WELLNO}-report.xlsx`;
      downloadFile(url, filename);
      
      toast.success('Excel generated successfully');
    } catch (error) {
      console.error("Error generating Excel:", error);
      toast.error(
        error.response?.data?.message || 
        'Failed to generate Excel report. Please try again.'
      );
    }
  };
  
  useEffect(() => {
    const fetchWellData = async () => {
      try {
        setLoading(true); 
        const response = await API.viewallwells();
        console.log("Fetched Well Data:", response);
        
        setWellData(response.data || []);
        setTableVisible(response.data && response.data.length > 0);
      } catch (error) {
        console.error("Error fetching well data:", error);
        setWellData([]); 
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
        <Button onClick={handleNextPage} disabled={currentPage === Math.ceil(wellData.length / rowsPerPage)} className="rigth-arrow ml-2 bg-[#087069]">Next</Button>
        <div className="filter-container  mt-[1.10rem]  mb-5 ">
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
                            <Button onClick={() => handleEditWell(well)} className="action-button edit-button">✏️ Edit</Button>
                            <Button onClick={() => handleDelete(well)} className="action-button delete-button">🗑️ Delete</Button>
                            <Button onClick={() => handleGenerateWellPDF(well)} className="action-button export-pdf-button">📄 Export PDF</Button>
                            <Button onClick={() => handleGenerateWellExcel(well)} className="action-button export-excel-button">📊 Export Excel</Button>
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
