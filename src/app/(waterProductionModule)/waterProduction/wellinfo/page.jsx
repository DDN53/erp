"use client"

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import API from "@/app/api/index";
import MainLayout from '@/components/WaterProductLayout/MainLayout';
import { provinces, getDistrictsByProvince } from "@/app/constants/Area";
import { getRSCByNumber } from "@/app/constants/RSC";
import { Worklocations } from "@/app/constants/WorkLocations";
import { WellTypes, WellConditions } from "@/app/constants/WellTypes";
import { Well, ChemicalData, GeologyOverburden, GeologyRock, PumpInstall, RequestGeneral, Test, Drilling } from "@/components/editwell";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Add this helper function near the top of your component, after the state declarations
const getProvinceNameByCode = (code) => {
  const provinceMap = {
    'WES': 'WesternProvince',
    'CEN': 'CentralProvince', 
    'SOU': 'SouthernProvince',
    'NOR': 'NorthernProvince',
    'EST': 'EasternProvince',
    'NWN': 'NorthWesternProvince',
    'NCE': 'NorthCentralProvince',
    'UVA': 'UvaProvince',
    'SAB': 'SabaragamuwaProvince',
    'EAS': 'EasternProvince'
  };
  
  // Handle null/undefined cases
  if (!code) return 'N/A';
  
  // Return mapped province name with proper spacing, or original code if not found
  return provinceMap[code.toString().toUpperCase()] || code;
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
    
  };
  
  // Handle null/undefined cases
  if (!code) return 'N/A';
  
  // Return mapped province name with proper spacing, or original code if not found
  return districtMap[code.toString().toUpperCase()] || code;
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
  
  // Handle null/undefined cases
  if (!code) return 'N/A';
  
  // Return mapped province name with proper spacing, or original code if not found
  return dsDivisionMap[code.toString().toUpperCase()] || code;
};
function WellInfo() {
  const router = useRouter();
  const [wells, setWells] = useState([]);
  const [filteredWells, setFilteredWells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [showAddWellModal, setShowAddWellModal] = useState(false);
  const [newWell, setNewWell] = useState({
    newWellNo: "",
    Location: "",
    selectedProvince: "",
    selectedDistrict: "",
    selectedRSC: "",
    selectedWorkLocation: "",
    selectedWellType: "",
    selectedWellCondition: ""
  });

  // Filter states
  const [filters, setFilters] = useState({
    province: "",
    district: "", 
    workLocation: "",
    rsc: ""
  });

  // Timeout for filter visibility
  const [filterTimeout, setFilterTimeout] = useState(null);

  const [rscOptions, setRscOptions] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingWell, setEditingWell] = useState(null);

  const [searchWellNo, setSearchWellNo] = useState("");

  const hideFilters = useCallback(() => {
    setShowFilters(false);
  }, []);

  const resetFilterTimeout = useCallback(() => {
    if (filterTimeout) clearTimeout(filterTimeout);
  }, [filterTimeout, hideFilters]);

  useEffect(() => {
    const fetchWells = async () => {
      try {
        setLoading(true);
        const response = await API.viewallwells();
        setWells(response.data);
        setFilteredWells(response.data);
      } catch (err) {
        setError("Failed to load well data");
        console.error("Error loading wells:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWells();
  }, []);

  useEffect(() => {
    filterWells();
    resetFilterTimeout();
  }, [filters, resetFilterTimeout]);

  useEffect(() => {
    return () => {
      if (filterTimeout) clearTimeout(filterTimeout);
    };
  }, [filterTimeout]);

  const filterWells = () => {
    let filtered = wells;

    if (filters.province) {
      filtered = filtered.filter(well => {
        // Convert the province code to full name for comparison
        const wellProvinceName = getProvinceNameByCode(well.PROVINCE_CODE);
        return wellProvinceName === filters.province;
      });
    }
    if (filters.district) {
      filtered = filtered.filter(well => {
        // Fix: Use getDistrictNameByCode instead of getDistrictsByProvince
        const wellDistrictName = getDistrictNameByCode(well.DISTRICT_CODE);
        return wellDistrictName === filters.district;
      });
    }
    if (filters.rsc) {
      filtered = filtered.filter(well => well.DSDIV_CODE === filters.rsc);
    }
    if (filters.workLocation) {
      filtered = filtered.filter(well => {
        // Fix: Compare with WORK_LOCATION_CODE instead of selectedWorkLocation
        return well.WORK_LOCATION_CODE === filters.workLocation;
      });
    }

    setFilteredWells(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setShowFilters(true);
    resetFilterTimeout();
  };

  const clearFilters = () => {
    setFilters({
      province: "",
      district: "",
      workLocation: "",
      rsc: ""
    });
    setShowFilters(true);
    resetFilterTimeout();
  };

  const navigateBack = () => {
    router.push('/waterProduction');
  };

  const handleAddWell = async (e) => {
    e.preventDefault();
    try {
      await API.addwell(newWell);
      setShowAddWellModal(false);
      // Refresh the well list
      const response = await API.viewallwells();
      setWells(response.data);
      setFilteredWells(response.data);
      toast.success('Well added successfully!'); 
    } catch (error) {
      console.error("Error adding well:", error);
      toast.error('Failed to add well. Please try again.'); // Toast message for error
    }
  };

  const handleNewWellChange = (e) => {
    const { name, value } = e.target;
    setNewWell(prev => ({ ...prev, [name]: value }));
  };

  const handleWorkLocationChange = (value) => {
    if (value !== "") {
      const selectedLocation = Worklocations.find(loc => loc.id === value);
      const rscArray = getRSCByNumber(value);
      setRscOptions(rscArray || []);
      // Reset RSC when work location changes
      setFilters(prev => ({ 
        ...prev, 
        workLocation: value,
        rsc: "" 
      }));
    } else {
      setRscOptions([]);
      setFilters(prev => ({ 
        ...prev, 
        workLocation: "", 
        rsc: "" 
      }));
    }
  };

  const handleEditClick = (well) => {
    setEditingWell(well);
    setShowEditModal(true);
  };

  const handleDeleteWell = async (newWellNo) => {
    if (window.confirm('Are you sure you want to delete this well?')) {
      try {
        await API.removewell(newWellNo);
        
        // Refresh the well list
        const response = await API.viewallwells();
        setWells(response.data);
        setFilteredWells(response.data);
        toast.success('Well deleted successfully!');
      } catch (error) {
        console.error("Error deleting well:", error);
        toast.error('Failed to delete well. Please try again.'); 
      }
    }
  };

  const handleEditWell = async (e) => {
    e.preventDefault();
    try {
      if (!editingWell || !editingWell.newWellNo) {
        throw new Error('Well Number is missing');
      }

      // Create a clean payload by removing any undefined or null values
      const cleanPayload = Object.fromEntries(
        Object.entries(editingWell).filter(([_, value]) => value != null)
      );
      
      await API.editwell(editingWell.newWellNo, cleanPayload);

      setShowEditModal(false);
      
      // Refresh the well list
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

  const handleGenerateWellPDF = async (well) => {
    try {
      // Format the well data with styling information
      const formattedData = {
        wellData: {
          // Map all properties from the well object
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
            primary: '#1E40AF', // Deep blue
            secondary: '#059669', // Green
            accent: '#DC2626', // Red
            background: '#F3F4F6', // Light gray
            text: '#111827' // Dark gray/black
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

  const handleGenerateWellExcel = async (well) => {
    try {
      // Format the well data according to the required structure
      const formattedData = {
        wellData: {
          // Map all properties from the well object
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

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchWellNo(searchValue);
    
    let filtered = wells;
    
    // Apply well number search
    if (searchValue) {
      filtered = filtered.filter(well => 
        well.WELLNO.toString().toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    
    // Apply existing filters
    if (filters.province) {
      filtered = filtered.filter(well => {
        const wellProvinceName = getProvinceNameByCode(well.PROVINCE_CODE);
        return wellProvinceName === filters.province;
      });
    }
    if (filters.district) {
      filtered = filtered.filter(well => {
        const wellDistrictName = getDistrictNameByCode(well.DISTRICT_CODE);
        return wellDistrictName === filters.district;
      });
    }
    if (filters.rsc) {
      filtered = filtered.filter(well => well.DSDIV_CODE === filters.rsc);
    }
    if (filters.workLocation) {
      filtered = filtered.filter(well => well.WORK_LOCATION_CODE === filters.workLocation);
    }

    setFilteredWells(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="min-h-full" style={{ minHeight: "calc(100vh - 347px)" }}>
      <ToastContainer />
      <div className="-mt-5 border border-gray-400 w-[95%] shadow-xl mx-auto p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Well Information</h1>
          <div className="flex gap-2">
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
        </div>


        {/* Filter section */}
        {showFilters && (
          <div className="mb-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-w-full">
              <select
                value={filters.province}
                onChange={(e) => handleFilterChange('province', e.target.value)}
                className="w-full p-2 border rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="">All Provinces</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>

              <select
                value={filters.district}
                onChange={(e) => handleFilterChange('district', e.target.value)}
                className="w-full p-2 border rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="">All Districts</option>
                {filters.province && getDistrictsByProvince(filters.province).map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Search by Well Number..."
                value={searchWellNo}
                onChange={handleSearch}
                className="w-full p-2 border rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />

              <button 
                onClick={clearFilters}
                className="w-3/4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full dark:bg-slate-900 bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700">
                <th className="py-2 px-4 border-b text-left">Well No</th>
                <th className="py-2 px-5 border-b text-left">Province</th>
                <th className="py-2 px-4 border-b text-left">District</th>
               
               
               
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWells.map((well) => (
                <tr key={well.WELLNO} className="hover:bg-gray-50 dark:hover:bg-slate-800 dark:bg-slate-900">
                  <td className="py-2 px-4 border-b text-left">{well.WELLNO}</td>
                 
                  <td className="py-2 px-5 border-b text-left">{getProvinceNameByCode(well.PROVINCE_CODE)}</td>
                  <td className="py-2 px-4 border-b text-left">{getDistrictNameByCode(well.DISTRICT_CODE)}</td>
                
                
                
                  <td className="py-2 px-4 border-b text-left">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(well)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => handleDeleteWell(well.WELLNO)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleGenerateWellPDF(well)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        title="Export PDF"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586L7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleGenerateWellExcel(well)}
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
              ))}
            </tbody>
          </table>
        </div>

        {showAddWellModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-slate-800">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Add New Well</h3>
              <form onSubmit={handleAddWell}>
                <input
                  type="text"
                  name="WELLNO"
                  value={newWell.WELLNO}
                  onChange={handleNewWellChange}
                  placeholder="Well No"
                  className="w-full p-2 mb-2 border rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  required
                />
                <input
                  type="text"
                  name="LOCATION"
                  value={newWell.LOCATION}
                  onChange={handleNewWellChange}
                  placeholder="LOCATION"
                  className="w-full p-2 mb-2 border rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  required
                />
                <select
                  name="selectedProvince"
                  value={newWell.selectedProvince}
                  onChange={handleNewWellChange}
                  className="w-full p-2 mb-2 border rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
                <select
                  name="selectedDistrict"
                  value={newWell.selectedDistrict}
                  onChange={handleNewWellChange}
                  className="w-full p-2 mb-2 border rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select District</option>
                  {newWell.selectedProvince && getDistrictsByProvince(newWell.selectedProvince).map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
               
                <select
                  name="selectedRSC"
                  value={newWell.selectedRSC}
                  onChange={handleNewWellChange}
                  className="w-full p-2 mb-2 border rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select RSC</option>
                  {newWell.selectedWorkLocation && getRSCByNumber(newWell.selectedWorkLocation).map((rsc) => (
                    <option key={rsc.value} value={rsc.value}>{rsc.label}</option>
                  ))}
                </select>
                <select
                  name="selectedWellType"
                  value={newWell.selectedWellType}
                  onChange={handleNewWellChange}
                  className="w-full p-2 mb-2 border rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select Well Type</option>
                  {WellTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <select
                  name="selectedWellCondition"
                  value={newWell.selectedWellCondition}
                  onChange={handleNewWellChange}
                  className="w-full p-2 mb-2 border rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select Well Condition</option>
                  {WellConditions.map((condition) => (
                    <option key={condition.value} value={condition.value}>{condition.label}</option>
                  ))}
                </select>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddWellModal(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Add Well
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showEditModal && editingWell && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-[80%] mt-2 shadow-lg rounded-md bg-white dark:bg-slate-800">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Edit Well</h3>
              <form onSubmit={handleEditWell} className="text-gray-900 dark:text-white">
                <div className="w-full h-12 bg-gray-200 dark:bg-slate-700 mb-4 justify-center flex items-center rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">Well Data</h2>
                </div>
                <Well 
                  formData={editingWell}
                  handleChange={(e) => {
                    const { name, value } = e.target;
                    setEditingWell(prev => ({
                      ...prev,
                      [name]: value
                    }));
                  }}
                  handleProvinceChange={(value) => {
                    setEditingWell(prev => ({
                      ...prev,
                      selectedProvince: value,
                      selectedDistrict: '',
                      selectedDSDivision: ''
                    }));
                  }}
                  handleDistrictChange={(value) => {
                    setEditingWell(prev => ({
                      ...prev,
                      selectedDistrict: value,
                      selectedDSDivision: ''
                    }));
                  }}
                  handleDSDivisionChange={(value) => {
                    setEditingWell(prev => ({
                      ...prev,
                      selectedDSDivision: value
                    }));
                  }}
                  handleWorkLocationChange={(value) => {
                    setEditingWell(prev => ({
                      ...prev,
                      selectedWorkLocation: value,
                      selectedRSC: ''
                    }));
                  }}
                  handleRSCChange={(value) => {
                    setEditingWell(prev => ({
                      ...prev,
                      selectedRSC: value
                    }));
                  }}
                  handleTypeChange={(value) => {
                    setEditingWell(prev => ({
                      ...prev,
                      WellType: value
                    }));
                  }}
                  handleWellConditionChange={(value) => {
                    setEditingWell(prev => ({
                      ...prev,
                      WellCondition: value
                    }));
                  }}
                  provinces={provinces}
                  getDistrictsByProvince={getDistrictsByProvince}
                  Worklocations={Worklocations}
                />
                <div className="w-full h-12 bg-gray-200 dark:bg-slate-700 mb-4 justify-center flex items-center rounded-lg">
                  <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Chemical Data</h2>
                </div>
                <ChemicalData 
                  formData={editingWell}
                  handleChange={(e) => {
                    const { name, value } = e.target;
                    setEditingWell(prev => ({
                      ...prev,
                      [name]: value
                    }));
                  }}
                  
                />
                <div className="mt-7 w-full h-12 bg-gray-200 dark:bg-slate-700 mb-4 justify-center flex items-center rounded-lg">
                  <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">GeologyOverburden</h2>
                </div>
                <GeologyOverburden 
                  formData={editingWell}
                  handleChange={(e) => {
                    const { name, value } = e.target;
                    setEditingWell(prev => ({
                      ...prev,
                      [name]: value
                    }));
                  }}
                />
                <div className="mt-2 w-full h-12 bg-gray-200 dark:bg-slate-700 mb-4 justify-center flex items-center rounded-lg">
                  <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">GeologyRock</h2>
                </div>
                <GeologyRock 
                  formData={editingWell}
                  handleChange={(e) => {
                    const { name, value } = e.target;
                    setEditingWell(prev => ({
                      ...prev,
                      [name]: value
                    }));
                  }}
                />
                <div className="mt-2 w-full h-12 bg-gray-200 dark:bg-slate-700 mb-4 justify-center flex items-center rounded-lg">
                  <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">PumpInstall</h2>
                </div>
                <PumpInstall 
                  formData={editingWell}
                  handleChange={(e) => {
                    const { name, value } = e.target;
                    setEditingWell(prev => ({
                      ...prev,
                      [name]: value
                    }));
                  }}
                />
                <div className="mt-2 w-full h-12 bg-gray-200 dark:bg-slate-700 mb-4 justify-center flex items-center rounded-lg">
                  <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">RequestGeneral</h2>
                </div>
                <RequestGeneral 
                  formData={editingWell}
                  handleChange={(e) => {
                    const { name, value } = e.target;
                    setEditingWell(prev => ({
                      ...prev,
                      [name]: value
                    }));
                  }}
                />
                <div className="mt-2 w-full h-12 bg-gray-200 dark:bg-slate-700 mb-4 justify-center flex items-center rounded-lg">
                  <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Test</h2>
                </div>
                <Test 
                  formData={editingWell}
                  handleChange={(e) => {
                    const { name, value } = e.target;
                    setEditingWell(prev => ({
                      ...prev,
                      [name]: value
                    }));
                  }}
                />
                <div className="mt-2 w-full h-12 bg-gray-200 dark:bg-slate-700 justify-center flex items-center rounded-lg">
                  <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Drilling</h2>
                </div>
                <Drilling 
                  formData={editingWell}
                  handleChange={(e) => {
                    const { name, value } = e.target;
                    setEditingWell(prev => ({
                      ...prev,
                      [name]: value
                    }));
                  }}
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 mr-2"
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

export default WellInfo;
