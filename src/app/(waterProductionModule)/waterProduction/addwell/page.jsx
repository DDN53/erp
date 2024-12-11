"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { provinces, getDistrictsByProvince } from "@/app/constants/Area";
import { getDSDivisionByDistrict } from "@/app/constants/dsDivisions";;
import API from "@/app/api/index";
import { getUserDataFromToken } from "@/app/utils/userValidation";
// import WellData from "@/components/AddWell/WellData";


import { Worklocations } from "@/app/constants/WorkLocations";
import { getRSCByNumber } from "@/app/constants/RSC";
import { Well, ChemicalData, GeologyOverburden, GeologyRock, PumpInstall, RequestGeneral, Test, Drilling } from "@/components/AddWell/index";



function AddWell() {
  const router = useRouter();
  const userData = getUserDataFromToken().result;
  const [user] = useState(userData);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "Are you sure you want to leave? You may lose unsaved data.";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  //Work location and rsc
  const [selectedWorkLocation, setSelectedWorkLocation] = useState("");
  const [selectedRSC, setSelectedRSC] = useState("");
  const [rscOptions, setRscOptions] = useState([]);

  const handleWorkLocationChange = (value) => {
    setSelectedWorkLocation(value);
    setSelectedRSC(""); // Reset selected RSC when work location changes
    if (value !== "") {
      const rscArray = getRSCByNumber(value);
      setRscOptions(rscArray || []);
    }
  };

  const handleRSCChange = (value) => {
    setSelectedRSC(value);
  };

  const [selectedWellType, setSelectedWellType] = useState("");
  const [UserType, setUserType] = useState("");
  const [selectedWellCondition, setSelectedWellCondition] = useState("");
  const [Methodofsurvey, setMethodofsurvey] = useState("");

  const handleTypeChange = (value) => {
    setSelectedWellType(value);
  };

  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  const handleWellConditionChange = (value) => {
    setSelectedWellCondition(value);
  };

  const handleMethodofsurveyChange = (value) => {
    setMethodofsurvey(value);
  };

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDSDivision, setSelectedDSDivision] = useState("");
  // Frontend example
  const [projectOffices, setProjectOffices] = useState([]);

 

  const handleProvinceChange = async (province) => {
    setSelectedProvince(province);
    setSelectedDistrict("");
    setSelectedDSDivision("");
    
    try {
      const districts = await getDistrictsByProvince(province);
      // Handle the districts data as needed
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    setSelectedDSDivision("");
  };

  useEffect(() => {
    if (selectedProvince) {
      setSelectedDistrict("");
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      setSelectedDSDivision("");
    }
  }, [selectedDistrict]);

  const handleDSDivisionChange = (value) => {
    setSelectedDSDivision(value);
  };

  const [ChangeTab, setChangeTab] = useState("ChemicalData");

  const initState = {
    WELLNO: "",
    OLDWELLNO: "",
    NWELLNO: "",
    PROJOFFICE_CODE: "",
    PROVINCE_CODE: "",
    DISTRICT_CODE: "",
    DSDIV_CODE: "",
    GSDIV: "",
    ELECT_CODE: "",
    VILLAGE: "",
    LOCATION: "",
    X_COORDINATE: "",
    Y_COORDINATE: "",
    MAP_USED: "",
    MAP_SCALE: "",
    GEOLOGICAL_USED: "",
    GEOLOGICAL_SCALE: "",
    X_METRIC: "",
    Y_METRIC: "",
    ELEVATIONMSL: "",
    USERTYPE: "",
    SCHEMENAME: "",
    SOURCE: "",
    ELV_METHOD: "",
    DEP_SOIL: "",
    DEP_HW_ROCK: "",
    DEP_W_ROCK: "",
    GEOL: "",
    IsLock: 0
  };
  const [formData, setFormData] = useState(initState);

  const handleChange = (e) => {
    const name = e.target?.name || e.name;
    let value = e.target?.value || e.value;

    // Handle drillDepth specifically
    if (name === 'drillDepth') {
      // Allow empty string or valid numbers only
      if (value === '' || !isNaN(parseFloat(value))) {
        value = value === '' ? '' : value;
      } else {
        return; // Invalid number input - don't update state
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const [isWellSaved, setIsWellSaved] = useState(false);
  const [savedWellId, setSavedWellId] = useState(null);

  // Add new function to handle Well data submission
  const handleWellSubmit = async (e) => {
    e.preventDefault();
    
    const wellData = {
      WELLNO: formData.WELLNO,
      NWELLNO: formData.NWELLNO,
      OLDWELLNO: formData.OLDWELLNO,
      PROJOFFICE_CODE: formData.PROJOFFICE_CODE,
      PROVINCE_CODE: formData.PROVINCE_CODE,
      DISTRICT_CODE: formData.DISTRICT_CODE,
      DSDIV_CODE: formData.DSDIV_CODE,
      GSDIV: formData.GSDIV,
      ELECT_CODE: formData.ELECT_CODE,
      VILLAGE: formData.VILLAGE,
      LOCATION: formData.LOCATION,
      X_COORDINATE: Number(formData.X_COORDINATE),
      Y_COORDINATE: Number(formData.Y_COORDINATE),
      MAP_USED: formData.MAP_USED,
      MAP_SCALE: formData.MAP_SCALE,
      GEOLOGICAL_USED: formData.GEOLOGICAL_USED,
      GEOLOGICAL_SCALE: formData.GEOLOGICAL_SCALE,
      X_METRIC: Number(formData.X_METRIC),
      Y_METRIC: Number(formData.Y_METRIC),
      ELEVATIONMSL: Number(formData.ELEVATIONMSL),
      USERTYPE: formData.USERTYPE,
      SCHEMENAME: formData.SCHEMENAME,
      SOURCE: formData.SOURCE,
      ELV_METHOD: formData.ELV_METHOD,
      DEP_SOIL: Number(formData.DEP_SOIL),
      DEP_HW_ROCK: Number(formData.DEP_HW_ROCK),
      DEP_W_ROCK: Number(formData.DEP_W_ROCK),
      GEOL: formData.GEOL,
      IsLock: Boolean(formData.IsLock),
      SSMA_TimeStamp: formData.SSMA_TimeStamp || new Date().toISOString()
    };

    try {
      const response = await API.addwell(wellData);
      console.log('add well response',response);
      setIsWellSaved(true);
      setSavedWellId(response.data.id); // Assuming the API returns the created well ID
      alert("Well data saved successfully!");
    } catch (error) {
      console.error("Error saving well:", error);
      alert("Error saving well data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert drillDepth to number or null before submission
    const wellData = {
      ...formData,
      selectedProvince,
      selectedDistrict, 
      selectedDSDivision,
      selectedWorkLocation,
      selectedRSC,
      selectedWellType,
      selectedWellCondition,
      UserType,
      Methodofsurvey,
      // Convert drillDepth to number or null
      drillDepth: formData.drillDepth ? parseFloat(formData.drillDepth) : null,
    };

    try {
      console.log(wellData);
      await API.addwell(wellData);
      router.push('/waterProduction/wellinfo');
    } catch (error) {
      console.error("Error adding well:", error);
    }
  };

  const [wellIdExists, setWellIdExists] = useState(false);
  useEffect(() => {
    const checkWellId = async () => {
      try {
        const response = await API.viewallwells();
        const wellExists = response.data?.data.some(
          (well) => well.WELLNO === formData.WELLNO
        );
        setWellIdExists(wellExists);
      } catch (error) {
        console.error("Error checking well ID:", error);
      }
    };

    if (formData.WELLNO) {
      checkWellId();
    }
  }, [formData.WELLNO]);

  return (
    <div className="min-h-full" style={{ minHeight: "calc(100vh - 347px)" }}>
      <div>
        {!isWellSaved ? (
          // Show only Well component form initially
          <form onSubmit={handleWellSubmit}>
            <div className="-mt-5 border border-gray-400 w-[95%] shadow-xl mx-auto p-6 flex flex-col dark:bg-slate-800 dark:text-white">
              <button
                type="button"
                className="w-12 h-12 p-2 ml-auto text-3xl text-black rounded-full hover:bg-gray-300 hover:text-white focus:outline-none"
                onClick={() => router.push('/waterProduction')}
              >
                <ion-icon name="close-outline"></ion-icon>
              </button>
              <Well
                handleTypeChange={handleTypeChange}
                wellIdExists={wellIdExists}
                handleChange={handleChange}
                formData={formData}
                selectedWellType={selectedWellType}
                selectedProvince={selectedProvince}
                handleProvinceChange={handleProvinceChange}
                provinces={provinces}
                selectedDistrict={selectedDistrict}
                handleDistrictChange={handleDistrictChange}
                getDistrictsByProvince={getDistrictsByProvince}
                selectedDSDivision={selectedDSDivision}
                handleDSDivisionChange={handleDSDivisionChange}
                getDSDivisionByDistrict={getDSDivisionByDistrict}
                selectedWorkLocation={selectedWorkLocation}
                handleWorkLocationChange={handleWorkLocationChange}
                Worklocations={Worklocations}
                selectedRSC={selectedRSC}
                handleRSCChange={handleRSCChange}
                rscOptions={rscOptions}
                handleWellConditionChange={handleWellConditionChange}
                handleUserTypeChange={handleUserTypeChange}
                UserType={UserType}
                handleMethodofsurveyChange={handleMethodofsurveyChange}
                Methodofsurvey={Methodofsurvey}
              />
              <div className="flex justify-end mt-4 gap-4">
                <button
                  type="button"
                  onClick={() => router.push('/waterProduction')}
                  className="text-white px-4 py-2 rounded-lg bg-red-500 hover:bg-red-700"
                >
                  Back to Dashboard
                </button>
                <button
                  disabled={wellIdExists}
                  type="submit"
                  className={`text-white px-4 py-2 rounded-lg ${
                    wellIdExists
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-700"
                  }`}
                >
                  Save Well Data
                </button>
              </div>
            </div>
          </form>
        ) : (
          // Show component selection and forms after Well is saved
          <div className="-mt-5 border border-gray-400 w-[95%] shadow-xl mx-auto p-6 flex flex-col dark:bg-slate-800 dark:text-white">
            <div className="mb-4">
              <label className="block mb-2 text-xl font-extrabold">
                Select Well Other Data:
              </label>
              <select
                value={ChangeTab}
                onChange={(e) => setChangeTab(e.target.value)}
                className="w-[30%] p-2 border-2 rounded dark:bg-slate-700"
              >
                
                <option value="ChemicalData">Chemical Data</option>
                <option value="GeologyOverburden">Geology Overburden</option>
                <option value="GeologyRock">Geology Rock</option>
                <option value="PumpInstall">Pump Install</option>
                <option value="RequestGeneral">Request General</option>
                <option value="Drilling">Drilling</option>
                <option value="Test">Test</option>
              </select>
            </div>

            {ChangeTab && (
              <form onSubmit={handleSubmit}>
                <div className="w-[100%] mt-4">
                  {ChangeTab === "ChemicalData" && (
                    <ChemicalData
                      handleChange={handleChange}
                      formData={formData}
                    />
                  )}
                  {ChangeTab === "GeologyOverburden" && (
                    <GeologyOverburden
                      handleChange={handleChange}
                      formData={formData}
                    />
                  )}
                  {ChangeTab === "GeologyRock" && (
                    <GeologyRock
                      handleChange={handleChange}
                      formData={formData}
                    />
                  )}
                  {ChangeTab === "Drilling" && (
                    <Drilling
                      handleChange={handleChange}
                      formData={formData}
                      addDrillLog={addDrillLog}
                      Solidsample={formData.Solidsample}
                      WaterSample={formData.WaterSample} 
                      Drillingsign={formData.Drillingsign}
                      OicSign={formData.OicSign}
                    />
                  )}
                  {ChangeTab === "PumpInstall" && (
                    <PumpInstall
                      handleChange={handleChange}
                      formData={formData}
                    />
                  )}
                  {ChangeTab === "RequestGeneral" && (
                    <RequestGeneral
                      handleChange={handleChange}
                      formData={formData}
                    />
                  )}
                  {ChangeTab === "Test" && (
                    <Test handleChange={handleChange} formData={formData} />
                  )}
                </div>
                <div className="flex justify-end mt-4 gap-4">
                  <button
                    type="button"
                    onClick={() => router.push('/waterProduction')}
                    className="p-2  bg-red-500  text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="p-2  bg-green-500  text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Save {ChangeTab}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddWell;
