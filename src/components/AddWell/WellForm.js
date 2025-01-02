"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { provinces } from "@/app/constants/Area";
import { getDSDivisionByDistrict } from "@/app/constants/dsDivisions";
import API from "@/api/route";
import { getUserDataFromToken } from "@/utils/userValidation";
import { Worklocations } from "@/app/constants/WorkLocations";
import { ChemicalData, GeologyOverburden, GeologyRock, PumpInstall, RequestGeneral, Test, Drilling, Well } from "@/components/AddWell/index";

function Addwellmain() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  const router = useRouter();


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

  
 

  

  const [formData, setFormData] = useState({
    WELLNO: "",
    OLDWELLNO: "",
    NWELLNO: "",
    PROJOFFICE_CODE: "",
    PROVINCE_CODE: "",
    DISTRICT_CODE: "",
    DSDIV_CODE: "",
    DSDIV_NAME: "",
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
    IsLock: "",
    ScaleGeologyMap: "",
    RSCLocation: "",
    WellType: "",
    WellCondition: "",
    Elevation1: "",
    Elevation2: "",
  });

  const [isWellSaved, setIsWellSaved] = useState(false);
  const [savedWellId, setSavedWellId] = useState(null);
  const [ChangeTab, setChangeTab] = useState("ChemicalData");
  const [wellIdExists, setWellIdExists] = useState(false);

  const [selectedProvince,setSelectedProvince] =useState(null);
    const [selectedDistrict,setSelectedDistrict]=useState(null);
    const [setDSDivisions ,setSetDSDivisions ]=useState(null);
    const [selectedProjectOffice  ,setSelectedProjectOffice  ]=useState(null);
    const [districts, setDistricts] = useState([]);

    const handleChange = (e) => {
      if (!e || !e.target) {
        console.error("Invalid event passed to handleChange", e);
        return;
      }
    
      const { name, value } = e.target;
    
      if (!name) {
        console.error("Input field name is missing");
        return;
      }
    
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    
  

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
      DSDIV_NAME: formData.DSDIV_NAME,
      GSDIV: formData.GSDIV,
      ELECT_CODE: formData.ELECT_CODE,
      VILLAGE: formData.VILLAGE,
      LOCATION: formData.LOCATION,
      X_COORDINATE: formData.X_COORDINATE,
      Y_COORDINATE: formData.Y_COORDINATE,
      MAP_USED: formData.MAP_USED,
      MAP_SCALE: formData.MAP_SCALE,
      GEOLOGICAL_USED: formData.GEOLOGICAL_USED,
      GEOLOGICAL_SCALE: formData.GEOLOGICAL_SCALE,
      X_METRIC: formData.X_METRIC,
      Y_METRIC: formData.Y_METRIC,
      ELEVATIONMSL: formData.ELEVATIONMSL,
      USERTYPE: formData.USERTYPE,
      SCHEMENAME: formData.SCHEMENAME,
      SOURCE: formData.SOURCE,
      ELV_METHOD: formData.ELV_METHOD,
      DEP_SOIL: formData.DEP_SOIL,
      DEP_HW_ROCK: formData.DEP_HW_ROCK,
      DEP_W_ROCK: formData.DEP_W_ROCK,
      GEOL: formData.GEOL,
      IsLock: formData.IsLock,
      WellType: formData.WellType,
      WellCondition: formData.WellCondition,
      Elevation1: formData.Elevation1,
      Elevation2: formData.Elevation2,
    };

    try {
      console.log('Sending well data:', wellData);
      
      const response = await API.addwell(wellData);
      console.log('Add well response:', response);
      
      if (response && response.data) {
        console.log('Add well response:', response.data);
        setIsWellSaved(true);
        setSavedWellId(response.data.id);
        alert("Well data saved successfully!");
      } else {
        console.error("No data in response.");
        alert("Failed to save well data: No response data received.");
      }
    } catch (error) {
      console.error("Error saving well:", error);
      alert(`Error saving well data: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const tabData = formData[ChangeTab];
      const response = await API.updateWellData({
        wellId: savedWellId,
        tabName: ChangeTab,
        data: tabData,
      });

      console.log(`${ChangeTab} data saved`, response);
      alert(`${ChangeTab} data saved successfully!`);
      
      router.push('/waterProduction/wellinfo');
    } catch (error) {
      console.error(`Error saving ${ChangeTab} data:`, error);
      alert(`Error saving ${ChangeTab} data`);
    }
  };

  useEffect(() => {
    const checkWellId = async () => {
      try {
        const response = await API.viewallwells();
        const wellExists = response.data?.data?.some(
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
          <form onSubmit={handleWellSubmit}>
            <div className="-mt-5 border border-[#009990] w-[95%] shadow-xl mx-auto p-6 flex flex-col dark:bg-slate-800 dark:text-white">
              <button
                type="button"
                className="w-12 h-12 p-2 ml-auto text-3xl text-black rounded-full hover:bg-gray-300 hover:text-white focus:outline-none"
                onClick={() => router.push('/waterProduction')}
              >
                <ion-icon name="close-outline"></ion-icon>
              </button>
              <Well
                handleTypeChange={handleChange}
                wellIdExists={wellIdExists}
                handleChange={handleChange}
                Worklocations={Worklocations}
                provinces={provinces}
                setDsDivisions={setDSDivisions}
                selectedProjectOffice={selectedProjectOffice}
                setDistricts={setDistricts}
                formData={formData}
                handleWorkLocationChange={handleChange}
             
              />
              <div className="flex justify-end mt-4 gap-4">
                <button
                  type="button"
                  onClick={() => router.push('/waterProduction')}
                  className="text-white px-4 py-2 rounded-lg bg-[#074799] hover:[#044440]"
                >
                  Back to Dashboard
                </button>
                <button
                  disabled={wellIdExists}
                  type="submit"
                  className={`text-white px-4 py-2 rounded-lg ${wellIdExists ? "bg-gray-500 cursor-not-allowed" : "bg-[#009990] hover:bg-[#044440]"}`}
                >
                  Save Well Data
                </button>
              </div>
            </div>
          </form>
        ) : (
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
                  {ChangeTab === "ChemicalData" && <ChemicalData handleChange={handleChange} formData={formData} />}
                  {ChangeTab === "GeologyOverburden" && <GeologyOverburden handleChange={handleChange} formData={formData} />}
                  {ChangeTab === "GeologyRock" && <GeologyRock handleChange={handleChange} formData={formData} />}
                  {ChangeTab === "Drilling" && <Drilling handleChange={handleChange} formData={formData} />}
                  {ChangeTab === "PumpInstall" && <PumpInstall handleChange={handleChange} formData={formData} />}
                  {ChangeTab === "RequestGeneral" && <RequestGeneral handleChange={handleChange} formData={formData} />}
                  {ChangeTab === "Test" && <Test handleChange={handleChange} formData={formData} />}
                </div>
                <div className="flex justify-end mt-4 gap-4">
                  <button
                    type="button"
                    onClick={() => router.push('/waterProduction')}
                    className="p-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="p-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
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

export default Addwellmain;
