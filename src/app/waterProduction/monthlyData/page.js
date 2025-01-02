"use client"
import MainLayout from '@/components/WaterProductLayout/MainLayout'
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

import API from "@/api/route";
import { getUserDataFromToken } from "@/utils/userValidation";
import Select from "react-select";

import WellData from "@/components/ViewWell/WellData";


import { Worklocations } from "@/app/constants/WorkLocations";
import { allRSC, getRSCByNumber, getRSCById } from "@/app/constants/RSC";
import { useRouter } from 'next/navigation';

// Dynamically import components
const ChemicalData = dynamic(() => import('@/components/AddWell/ChemicalData'), { ssr: false });
const MonthlyInfo = dynamic(() => import('@/components/AddMonthlyInfo/MonthlyInfo'), { ssr: false });
const PumpDetails = dynamic(() => import('@/components/AddMonthlyInfo/PumpDetails'), { ssr: false });
const OtherDetails = dynamic(() => import('@/components/AddMonthlyInfo/OtherDetails'), { ssr: false });
const WHPA4GW = dynamic(() => import('@/components/AddMonthlyInfo/WHPA4GW'), { ssr: false });

export default function Page() {
  const router = useRouter();
  const userData = getUserDataFromToken().result;
  const [user, setUser] = useState(userData);
  // for page relaod
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message =
        "Are you sure you want to leave? You may lose unsaved data.";
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Cleanup the event listener when the component is unmounted
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // for use nav
 

  //RSC and Work Location
  const [selectedWorkLocation, setSelectedWorkLocation] = useState("");
  const [selectedRSC, setSelectedRSC] = useState("");
  const [isRSCDisabled, setIsRSCDisabled] = useState(true);
  const [rscOptions, setRscOptions] = useState([]);

  const handleWorkLocationChange = (value) => {
    setSelectedWorkLocation(value);
    setSelectedRSC("");
    setIsRSCDisabled(value === "");

    if (value !== "") {
      const rscArray = getRSCByNumber(value);
      setRscOptions(rscArray || []);
    }
  };

  const handleRSCChange = (value) => {
    setSelectedRSC(value);
  };

  //for Availability of Flow Meter
  const [AvailabilityofFlowMeter, setAvailabilityofFlowMeter] = useState("");

  const handleAvailabilityofFlowMeterChange = (value) => {
    setAvailabilityofFlowMeter(value);
  };
  //for Pump Control Unit
  const [PumpControlUnit, setPumpControlUnit] = useState("");

  const handlePumpControlUnitChange = (value) => {
    setPumpControlUnit(value);
  };
  //for Availability of Observed Well
  const [AvailabilityofObservedWell, setAvailabilityofObservedWell] =
    useState("");

  const handleAvailabilityofObservedWellChange = (value) => {
    setAvailabilityofObservedWell(value);
  };
  //for Availability of Welll Maintenance Program
  const [
    AvailabilityofWelllMaintenanceProgram,
    setAvailabilityofWelllMaintenanceProgram,
  ] = useState("");

  const handleAvailabilityofWelllMaintenanceProgramChange = (value) => {
    setAvailabilityofWelllMaintenanceProgram(value);
  };
  //for Implemented of Catchmet Protect to Well
  const [
    ImplementedofCatchmetProtecttoWell,
    setImplementedofCatchmetProtecttoWell,
  ] = useState("");

  const handleImplementedofCatchmetProtecttoWellChange = (value) => {
    setImplementedofCatchmetProtecttoWell(value);
  };

  //for form data
  const initState = {
    newWellNo: "",
    SampleDate: "",
    SampleDepth: "",
    SampleTime: "",
    Color: "",
    Turbidity: "",
    PH: "",
    Elecon: "",
    Chlorides: "",
    Totalk: "",
    FreeAmonia: "",
    Albamonia: "",
    Nitrates: "",
    Nitrite: "",
    Fluorides: "",
    Phosphate: "",
    Totdissol: "",
    Tothard: "",
    Calchard: "",
    Totiron: "",
    Magnesium: "",
    Sulphate: "",
    Manganese: "",
    Dissiron: "",
    Totcoli: "",
    Faecalcoli: "",
    Filtiron: "",
    Totresidue: "",
    Calcium: "",
    Oxygen: "",
    Hysul: "",
    Fixediron: "",
    GroundWaterExtraction: "",
    GroundWaterLevel: "",
    Note: "",
    WaterSupplyScheme: "",
    AvailabilityofFlowMeter: "",
    ControlValve: "",
    NonReturnValve: "",
    PumpControlUnit: "",
    DiameterofPumpingmain: "",
    CapacityofthePump: "",
    AvailabilityofObservedWell: "",
    AvailabilityofWelllMaintenanceProgram: "",
    LastDateofWellFlushed: "",
    LastDateofPumpingTestDone: "",
    PossibilityForeNewWEllConstruct: "",
    ImplementedofCatchmetProtecttoWell: "",
    PerimeterProtectareatotheWell: "",
    ActivitiesDoneforGWRecharge: "",
    AvailabilityofPolletsSourcesAroundtheWell: "",
  };
  const [formData, setFormData] = useState(initState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!selectedWell?.value) {
      alert("Please select a well number");
      return;
    }

    if (!wellData) {
      alert("Well data not loaded properly. Please try again.");
      return;
    }

    try {
      // Prepare data object with all form fields
      const monthlyData = {
        ...formData,
        wellId: wellData?.id || null,
        newWellNo: selectedWell.value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: user?.id || null,
        updatedBy: user?.id || null
      };

      // Send data to API
      const response = await API.addmonthlydata(monthlyData);

      if (response) {
        alert("Monthly data added successfully!");
        router.push("/waterProduction/monthlyinfo");
      } else {
        throw new Error("Failed to save monthly data");
      }
    } catch (error) {
      console.error("Error saving monthly data:", error);
      alert("Failed to save monthly data. Please try again.");
    }
  };
  const [selectedWell, setSelectedWell] = useState("");
  const [wellData, setwellData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      if (selectedWell) {
        try {
          const response = await API.viewwell(selectedWell.value);
          setwellData(response.data);
        
      
          setFormData(prevState => ({
            ...prevState,
            ...response.data,
            newWellNo: selectedWell.value
          }));
        } catch (error) {
          console.error("Error fetching well data:", error);
        }
      }
    };

    fetchData();
  }, [selectedWell]);

  const [wells2, setWells2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.viewallwells();
        const sortedData = response?.data.sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
        setWells2(sortedData);
      } catch (error) {
        console.error("Error fetching well data:", error);
      }
    };

    fetchData();
  }, []);
  const wells = wells2
    .filter(
      (well) =>
        selectedWorkLocation === "" ||
        well.selectedWorkLocation === selectedWorkLocation
    )
    .filter((well) => selectedRSC === "" || well.selectedRSC === selectedRSC);

  const [wellInfo, setWellInfo] = useState(false);

  const handleWellSelect = (selectedOption) => {
    setSelectedWell(selectedOption);
  };

  const wellOptions = wells.map((well) => {
    const rscData = getRSCById(parseInt(well.selectedRSC));
   
    const rscName = rscData ? rscData.costCentreName : "Unknown RSC";

    return {
      value: well.newWellNo,
      label: well.newWellNo + " - " + rscName,
    };
  });

//   const allowedRoles = ["Super", "Editor", "Admin"];
//   if (!allowedRoles.includes(user.userRole)) {
//     return <Navigate to="/404" />;
//   }
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 200,
      height: 42,
      backgroundColor: 'var(--bg-color, white)',
      color: 'var(--text-color, black)',
      borderColor: state.isFocused ? '#4f46e5' : '#374151',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--bg-color, white)',
      color: 'var(--text-color, black)',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#4f46e5' : 'var(--bg-color, white)',
      color: state.isFocused ? 'white' : 'var(--text-color, black)',
      '&:hover': {
        backgroundColor: '#4f46e5',
        color: 'white',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--text-color, black)',
    }),
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="dark:bg-slate-800 dark:text-white mt-2">
        <div className="border border-gray-400 w-[95%] h-[500%] shadow-xl mx-auto p-6 flex flex-col dark:bg-slate-800 dark:text-white dark:border-gray-600">
          <button
            className="w-12 h-12 p-2 ml-auto text-3xl text-black rounded-full hover:bg-gray-300 hover:text-white focus:outline-none"
            onClick={() => router.push("/monthlyinfo")}
          >
          </button>
          <div className="">
            <div className="flex">
              <div className="w-[50%] p-3">
                <div className="flex items-center whitespace-nowrap">
                  <p className="mr-2">New Well No : </p>
                  <Select
                    options={wellOptions}
                    className="dark:bg-slate-800 dark:text-white"
                    styles={customStyles}
                    value={selectedWell}
                    onChange={handleWellSelect}
                    placeholder="Select Well Number"
                    isSearchable
                    required
                  />
                </div>
                {/* ... existing code ... */}
                <div
                  onClick={() => {
                    handleWorkLocationChange("");
                    setSelectedWell(""); // Reset New Well No to default
                  }}
                  className=" flex justify-center w-32 p-1 -mt-10 ml-auto text-white bg-red-500 rounded-lg hover:bg-red-700"
                >
                  Reset
                </div>
                {/* ... existing code ... */}
                <div className="flex items-center mt-5">
                  Can't Find Well Number?
                  <div
                    className="ml-2 text-blue-500 underline hover:text-blue-900"
                  >
                    Add Well
                  </div>
                </div>
              </div>
              {/* <div className="w-[50%] p-3"></div> */}

              <div className="w-[40%] mx-auto flex-col justify-end py-3 p-3 mr-3 border mb-3 border-gray-300 rounded-lg">
                <div className="mb-2 text-sm font-medium text-gray-600">
                  Filter Well ID Selection by:
                </div>
                {/*  */}
                <div className="flex items-center mb-1">
                  <p className="mr-2">Work locations: </p>
                  <select
                    value={selectedWorkLocation}
                    onChange={(e) => handleWorkLocationChange(e.target.value)}
                    className="p-2 ml-auto border border-gray-500 rounded-md w-[200px] dark:bg-slate-700 dark:text-white dark:border-gray-600"
                  >
                    <option value="">Select Work Location</option>
                    {Worklocations.map((workLocation) => (
                      <option key={workLocation.id} value={workLocation.id}>
                        {workLocation.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/*  */}
                <div className="flex items-center mb-1">
                  <p className="mr-2">RSC locations: </p>
                  <select
                    value={selectedRSC}
                    onChange={(e) => handleRSCChange(e.target.value)}
                    className="p-2 ml-auto border border-gray-500 rounded-md w-[200px] dark:bg-slate-700 dark:text-white dark:border-gray-600"
                    disabled={isRSCDisabled}
                  >
                    <option value="">Select RSC Location</option>
                    {rscOptions.map((rscLocation) => (
                      <option key={rscLocation.id} value={rscLocation.id}>
                        {rscLocation.costCentreName}
                      </option>
                    ))}
                  </select>
                </div>
                {/*  */}
                <div
                  onClick={() => {
                    handleWorkLocationChange("");
                  }}
                  className="flex justify-center w-32 p-1 mt-3 ml-auto text-white bg-red-500 rounded-lg hover:bg-red-700"
                >
                  Reset
                </div>
              </div>
            </div>
          </div>

          {selectedWell && (
            <div className="mt-4">
              <div className="flex items-center w-full p-3 bg-gray-300 rounded-t-lg dark:bg-slate-600 dark:text-white">
                <span className="font-medium">
                  Well Information | Well Number: {selectedWell.value}
                </span>
                <button 
                  onClick={() => setWellInfo(!wellInfo)}
                  className="flex items-center justify-center w-8 h-8 ml-auto rounded-full hover:bg-slate-400 transition-colors"
                  aria-label={wellInfo ? "Collapse well information" : "Expand well information"}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`w-6 h-6 transform transition-transform ${wellInfo ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </button>
              </div>
              
              {wellInfo && (
                <div className="p-4 border border-t-0 border-gray-300 rounded-b-lg bg-gray-100 dark:bg-slate-700 dark:text-white dark:border-gray-600">
                  <WellData formData={wellData} />
                </div>
              )}
            </div>
          )}

          {/* Monthly Info */}
          <div className="py-3 border-t border-gray-500">
            <div className="w-[100%] justify-center flex"></div>
            <div className="w-[30%] mt-4">
              {/*  */}
              <MonthlyInfo formData={formData} handleChange={handleChange} />
            </div>
          </div>
          <div className="py-3 border-t border-gray-500">
            <div className="w-[100%] mt-4">
              <ChemicalData handleChange={handleChange} formData={formData} />
            </div>
          </div>
          <div className="py-3 border-t border-gray-500">
            <div className="w-[100%] mt-4">
              <PumpDetails
                handleChange={handleChange}
                formData={formData}
                AvailabilityofFlowMeter={AvailabilityofFlowMeter}
                handleAvailabilityofFlowMeterChange={
                  handleAvailabilityofFlowMeterChange
                }
                PumpControlUnit={PumpControlUnit}
                handlePumpControlUnitChange={handlePumpControlUnitChange}
              />
            </div>
          </div>
          <div className="py-3 border-t border-gray-500">
            <div className="w-[100%] mt-4">
              <OtherDetails
                handleChange={handleChange}
                formData={formData}
                AvailabilityofObservedWell={AvailabilityofObservedWell}
                handleAvailabilityofObservedWellChange={
                  handleAvailabilityofObservedWellChange
                }
                AvailabilityofWelllMaintenanceProgram={
                  AvailabilityofWelllMaintenanceProgram
                }
                handleAvailabilityofWelllMaintenanceProgramChange={
                  handleAvailabilityofWelllMaintenanceProgramChange
                }
              />
            </div>
          </div>
          <div className="py-3 border-t border-gray-500">
            <div className="w-[100%] mt-4">
              <WHPA4GW
                handleChange={handleChange}
                formData={formData}
                ImplementedofCatchmetProtecttoWell={
                  ImplementedofCatchmetProtecttoWell
                }
                handleImplementedofCatchmetProtecttoWellChange={
                  handleImplementedofCatchmetProtecttoWellChange
                }
              />
            </div>
          </div>
          <div className="py-3 border-t border-gray-500">
            <div className="w-[100%] justify-center flex"></div>
            <div className="w-[100%] mt-4">
              <textarea
                placeholder="Note"
                name="Note"
                value={formData.Note}
                onChange={handleChange}
                type="text"
                className="w-full h-[300px] p-2 border border-gray-500 rounded-md dark:bg-slate-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>
        </div>
        <div className="flex w-[100%] my-5 px-10">
          <div
            onClick={() => router.push("/waterProduction/monthlyinfo")}
            className="flex justify-center w-32 p-2 ml-auto mr-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800"
          >
            Cancel
          </div>
          <button
            type="submit"
            className="flex justify-center p-2 text-white rounded-lg w-44 bg-green-500 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-800"
          >
            Add Monthly Data
          </button>
        </div>
      </form>
    </div>
  );
}
