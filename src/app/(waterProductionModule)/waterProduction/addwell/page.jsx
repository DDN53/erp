"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { provinces, getDistrictsByProvince } from "@/app/constants/Area";
import { getDSDivisionByDistrict } from "@/app/constants/dsDivisions";;
import API from "@/app/api/index";
import { getUserDataFromToken } from "@/app/utils/userValidation";
// import WellData from "@/components/AddWell/WellData";
import MainLayout from '@/components/MainLayout';

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

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
    setSelectedDistrict("");
    setSelectedDSDivision("");
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
    newWellNo: "",
    WorkLocation: "",
    OldWellNo: "",
    ProjectOffice: "",
    RSCLocation: "",
    Location: "",
    Electorate: "",
    Village: "",
    UserType: "",
    WellType: "",
    selectedProvince: "",
    selectedDistrict: "",
    selectedDSDivision: "",
    GSDivision: "",
    SchemeName: "",
    TopoSheet: "",
    ScaleTopoSheet: "",
    GeologyMap: "",
    ScaleGeologyMap: "",
    DepthtoTheBottomofSoilLayer: "",
    HighlyWeatheredRock: "",
    WeatheredRock: "",
    Geologist: "",
    X: "",
    Y: "",
    Elevation: "",
    LocalMetric1: "",
    LocalMetric2: "",
    Methodofsurvey: "",
    SampleDate: "",
    SampleDepth: "",
    SampleTime: "",
    Color: "",
    Turbidity: "",
    Odor: "",
    Taste: "",
    PH: "",
    Elecon: "",
    Chlorides: "",
    Sulphates: "",
    TotalDissolvedSolids: "",
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
    SWL: "",
    InstalledDatePedestal: "",
    InstalledDatePump: "",
    PumpType: "",
    PumpHeadNo: "",
    CylinderType: "",
    CylinderDepth: "",
    RiserPipeType: "",
    RiserPipeLength: "",
    ConnecRodType: "",
    ConnecRodLength: "",
    Remarks: "",
    RequestMode: "",
    Fundingcriteria: "",
    WellCategory: "",
    AgentName: "",
    ProjectName: "",
    ContactOrderNo: "",
    DistancetoNearestPublicPerinialWell: "",
    NoOfHousesWithin500M: "",
    ConcentOfPSForMaintenance: "",
    ConsumerSocietyFormed: "",
    NameofCareTaker: "",
    AddressofCareTakerline1: "",
    AddressofCareTakerline2: "",
    AddressofCareTakerline3: "",
    TestDate: "",
    Step1one: "",
    Step1two: "",
    Step2one: "",
    Step2two: "",
    Step3one: "",
    Step3two: "",
    Step4one: "",
    Step4two: "",
    Step5one: "",
    Step5two: "",
    TestDate2: "",
    EndDate2: "",
    PumpInstallationDepth: "",
    PumpInstallationDepth2: "",
    AvarageDischargeRate: "",
    waterlevelatendoftherecovery: "",
    PumingDuration: "",
    StatisticWaterLevel: "",
    StaticWaterLevel: "",
    PumpingWaterLevelattheEndofthetest: "",
    Storativity: "",
    RecoveryPeriod: "",
    Transmassvity: "",
    B: "",
    C: "",
    TestDate3: "",
    PumpInstallationDepth3: "",
    DischargeRate: "",
    PumpingWaterLevel: "",
    PumpingDuration: "",
    RecomendationBasedon: "",
    GeologyRock: "",
    GeologyOverburden: "",
    selectedWorkLocation: "",
    selectedRSC: "",
    selectedWellType: "",
    selectedWellCondition: "",
    DrillData: "",
    RodNo: "",
    Starttime: "",
    FinishTime: "",
    Duration: "",
    drillBitNo: "",
    DrillBitandHammerType: "",
    drillDepth: "",
    yield: "",
    EC: "",
    Fracture: "",
    Description: "",
    Solidsample: "",
    WaterSample: "",
    Drillingsign: "",
    OicSign: "",
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

  const [drillLogs, setDrillLogs] = useState([]);

  const addDrillLog = (log) => {
    setDrillLogs((prevLogs) => [
      ...prevLogs,
      {
        DrillData: log.DrillData,
        RodNo: log.RodNo,
        Starttime: log.Starttime,
        FinishTime: log.FinishTime,
        Duration: log.Duration,
        DrillBitandHammerType: log.DrillBitandHammerType,
        drillDepth: log.drillDepth,
        yield: log.yield,
        EC: log.EC,
        Fracture: log.Fracture,
        Description: log.Description,
        Solidsample: log.Solidsample,
        Watersample: log.Watersample,
        DrillerSignature: log.DrillerSignature,
        OicSignature: log.OicSignature
      }
    ]);
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
        const data = await API.viewallwells();
        const wellExists = data?.data.some(
          (well) => well.newWellNo === formData.newWellNo
        );
        setWellIdExists(wellExists);
      } catch (error) {
        console.log(error);
      }
    };
    checkWellId();
  }, [formData.newWellNo]);

  return (
    <div className="min-h-full" style={{ minHeight: "calc(100vh - 347px)" }}>
      <div>
        <MainLayout>
          <form onSubmit={handleSubmit}>
            <div className="-mt-5 border border-gray-400 w-[95%] h-[500%] shadow-xl mx-auto p-6 flex flex-col">
              <button
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

              {/* Selection section */}
              <div className="py-3 border-t border-gray-500">
                <div className="w-[100%] justify-center flex">
                  <div className="flex">
                    {["ChemicalData", "GeologyOverburden", "GeologyRock", "PumpInstall", "RequestGeneral", "Drilling", "Test"].map((tab) => (
                      <div
                        key={tab}
                        className={`p-2 text-white border border-white ${
                          ChangeTab === tab
                            ? "bg-gray-500"
                            : "bg-gray-700 hover:bg-gray-500"
                        } ${
                          tab === "ChemicalData"
                            ? "rounded-l-2xl"
                            : tab === "Test"
                            ? "rounded-r-2xl"
                            : ""
                        }`}
                        onClick={() => setChangeTab(tab)}
                      >
                        {tab}
                      </div>
                    ))}
                  </div>
                </div>
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
              </div>
            </div>
            <div className="flex w-[100%] my-5 px-10">
              <div
                onClick={() => router.push('/waterProduction')}
                className="flex justify-center w-32 p-2 ml-auto mr-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Cancel
              </div>
              <button
                disabled={wellIdExists}
                type="submit"
                className={`flex justify-center p-2 text-white rounded-lg w-44 ${
                  wellIdExists
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-700"
                }`}
              >
                Add Well
              </button>
            </div>
          </form>
        </MainLayout>
      </div>
    </div>
  );
}

export default AddWell;
