import React, { useState } from "react";
import { getRSCByNumber } from "../../app/constants/RSC";
import { Worklocations } from '../../app/constants/WorkLocations';

function Well(props) {
  const [rscOptions, setRscOptions] = useState([]);
  const [projectOffices, setProjectOffices] = useState(Worklocations);

  const handleWorkLocationChange = (value) => {
    props.handleWorkLocationChange(value);
    
    if (value !== "") {
      const rscArray = getRSCByNumber(value);
      setRscOptions(rscArray || []);
    } else {
      setRscOptions([]);
    }
  };

  const handleRSCChange = (value) => {
    props.handleRSCChange(value);
  };

  const handleTypeChange = (value) => {
    props.handleTypeChange(value);
    props.handleChange({ target: { name: "WellType", value } });
  };

  const handleUserTypeChange = (value) => {
    props.handleUserTypeChange(value);
    props.handleChange({ target: { name: "USERTYPE", value } });
  };

  const handleWellConditionChange = (value) => {
    props.handleWellConditionChange(value);
    props.handleChange({ target: { name: "WellCondition", value } });
  };

  const handleMethodOfSurveyChange = (value) => {
    props.handleMethodofsurveyChange(value);
    props.handleChange({ target: { name: "Methodofsurvey", value } });
  };

  return (
    <div className="well-data-container">
      <div>
        <div className="border-b border-gray-400 dark:border-gray-600">
          <div className="flex">
            <div className="w-[50%]  p-3 flex items-center -mt-9 mb-6">
              <p className="block mb-2">New Well No : </p>
              <input
                required
                placeholder="New Well No"
                name="WELLNO"
                value={props.formData.WELLNO}
                onChange={props.handleChange}
                type="text"
                className="p-2 border border-gray-500 rounded-md dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="w-[50%]  p-3 flex items-center -mt-9 mb-6">
              <p className="block mb-2">Old Well No : </p>
              <input
                placeholder="Old Well No"
                name="OLDWELLNO"
                value={props.formData.OLDWELLNO}
                onChange={props.handleChange}
                type="text"
                className="p-2 border border-gray-500 rounded-md dark:bg-slate-700 dark:text-white  "
              />
            </div>
          </div>
           {props.wellIdExists && (
            <span className="ml-2 text-red-500">Well ID already exists!</span>
          )} 
        </div>

        <div className="flex flex-row-reverse">
          {/* 1st row */}
          <div className="w-[50%] border-r border-gray-400 p-[64px] ml-auto -mt-10 dark:bg-slate-800 dark:text-white">
         
            {/* Location */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Location : </p>
              <input
                placeholder="Location"
                name="LOCATION"
                value={props.formData.LOCATION}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              />
            </div>
            {/* Electorate */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Electorate : </p>
              <input
                placeholder="Electorate"
                name="ELECT_CODE"
                value={props.formData.ELECT_CODE}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              />
            </div>
            {/* Village */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Village : </p>
              <input
                placeholder="Village"
                name="VILLAGE"
                value={props.formData.VILLAGE}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              />
            </div>
            {/* User Type */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">User Type : </p>
              <select
                value={props.UserType}
                onChange={(e) => handleUserTypeChange(e.target.value)}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              >
                <option value="">Select User Type</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Domestic">Domestic</option>
                <option value="Tourism">Tourism</option>
                <option value="Water Supply Scheme">Water Supply Scheme</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>
            {/* Well Type */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Well Type: </p>
              <select
                value={props.selectedWellType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              >
                <option value="">Select Well Type</option>
                <option value="Deep Tube Well">Deep Tube Well</option>
                <option value="Shallow Tube Well">Shallow Tube Well</option>
                <option value="Dug Well">Dug Well</option>
                <option value="Other..">Other..</option>
              </select>
            </div>
            {/* Well Condition */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Well Condition: </p>
              <select
                value={props.selectedWellCondition}
                onChange={(e) => handleWellConditionChange(e.target.value)}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              >
                <option value="">Select Well Condition</option>
                <option value="Pumping">Pumping</option>
                <option value="abandoned">abandoned</option>
              </select>
            </div>
            {/* Topo sheet */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Topo Sheet : </p>
              <input
                placeholder="Topo Sheet"
                name="TopoSheet"
                value={props.formData.TopoSheet}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              />
            </div>
            {/* Scale Topo Sheet */}
            <div className="flex items-center mb-1">
              <p className="block mt-2">Scale Topo Sheet : </p>
              <input
                placeholder="Scale Topo Sheet"
                name="ScaleTopoSheet"
                value={props.formData.ScaleTopoSheet}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              />
            </div>
            {/* Geology Map */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Geology Map : </p>
              <input
                placeholder="Geology Map"
                name="GEOLOGICAL_USED"
                value={props.formData.GEOLOGICAL_USED}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="flex items-center mb-1">
              <p className="block mb-2">Weathered Rock : </p>
              <input
                placeholder="Weathered Rock"
                name="DEP_W_ROCK"
                value={props.formData.DEP_W_ROCK}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              />
            </div>
            {/* Geologist */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Geologist : </p>
              <input
                placeholder="Geologist"
                name="Geologist"
                value={props.formData.Geologist || ''} 
                onChange={props.handleChange}
                type="text"
                className="items-end p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="flex items-center mb-1">
              <p className="block mb-2">Geologist Used : </p>
              <input
                placeholder="Geologist Used"
                name="GEOLOGICAL_USED"
                value={props.formData.GEOLOGICAL_USED || ''} 
                onChange={props.handleChange}
                type="text"
                className="items-end p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>
          {/* 2nd row */}
          <div className="w-[50%] border-r border-gray-400 p-[64px] -mt-10">
            {/* Province */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Province : </p>
              <select
                value={props.DISTRICT_CODE}
                onChange={(e) => props.handleProvinceChange(e.target.value)}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              >
                <option value="">Select Province</option>
                {props.provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
            {/* District */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">District : </p>
              <select
                value={props.selectedDistrict}
                onChange={(e) => props.handleDistrictChange(e.target.value)}
                disabled={!props.selectedProvince}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              >
                <option value="">Select District</option>
                {props.selectedProvince && props.getDistrictsByProvince && 
                  props.getDistrictsByProvince(props.selectedProvince)?.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
              </select>
            </div>
            {/* DS Division */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">DS Division : </p>
              <select
                value={props.formData.DSDIV_CODE}
                onChange={(e) => {
                  props.handleDSDivisionChange(e.target.value);
                  props.handleChange({ target: { name: "DSDIV_CODE", value: e.target.value } });
                }}
                disabled={!props.selectedDistrict}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              >
                <option value="">Select DS Division</option>
                {props.selectedDistrict && props.getDSDivisionByDistrict && 
                  props.getDSDivisionByDistrict(props.selectedDistrict)?.map((dsDivision) => (
                    <option key={dsDivision} value={dsDivision}>
                      {dsDivision}
                    </option>
                  ))}
              </select>
            </div>
            {/* GS Division */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">GS Division : </p>
              <input
                placeholder="GS Division"
                name="GSDivision"
                value={props.formData.GSDIV}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md dark:bg-slate-700 dark:text-white"
              />
            </div>

            {/* Scheme Name */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Scheme Name : </p>
              <input
                placeholder="Scheme Name"
                name="SchemeName"
                value={props.formData.SCHEMENAME}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md dark:bg-slate-700 dark:text-white"
              />
            </div>

            {/* Work locations */}
            <div className="flex items-center mb-1">
              <p className="block mb-2"> Project Office</p>
              <select
                required
                value={props.selectedWorkLocation}
                onChange={(e) => {
                  const selectedOption = props.Worklocations.find(
                    loc => loc.id === e.target.value
                  );
                  handleWorkLocationChange(e.target.value, selectedOption?.name);
                }}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              >
                <option value="">Select Project Office</option>
                {props.Worklocations.map((workLocation) => (
                  <option key={workLocation.id} value={workLocation.id}>
                    {workLocation.name}
                  </option>
                ))}
              </select>
            </div>

            {/* RSC locations */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">RSC locations: </p>
              <select
                required
                value={props.selectedRSC}
                onChange={(e) => handleRSCChange(e.target.value)}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
                disabled={!props.selectedWorkLocation}
              >
                <option value="">Select RSC Location</option>
                {rscOptions.map((rscLocation) => (
                  <option key={rscLocation.id} value={rscLocation.costCentreName}>
                    {rscLocation.costCentreName}
                  </option>
                ))}
              </select>
            </div>
            {rscOptions.length === 0 && props.selectedWorkLocation && (
              <p className="text-red-500">No RSC locations available for this work location.</p>
            )}
            {/* Scale Geology Map */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Scale Geology Map : </p>
              <input
                placeholder="Scale Geology Map"
                name="MAP_USED"
                value={props.formData.MAP_USED}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              />
            </div>
            {/* Depth to Bottom of Soil Layer */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Depth to The Bottom of Soil Layer : </p>
              <input
                placeholder="Depth to The Bottom of Soil Layer"
                name="DEP_SOIL"
                value={props.formData.DEP_SOIL}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] mt-[1rem] dark:bg-slate-700 dark:text-white"
              />
            </div>
            {/* Highly Weathered Rock */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Highly Weathered Rock : </p>
              <input
                placeholder="Highly Weathered Rock"
                name="DEP_HW_ROCK"
                value={props.formData.DEP_HW_ROCK}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]  mt-[0.7rem] dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="flex items-center mb-1">
              <p className="block mb-2">Map Scale : </p>
              <input
                placeholder="Highly Weathered Rock"
                name="MAP_SCALE"
                value={props.formData.MAP_SCALE}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]  mt-[0.7rem] dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>
        </div>
       
        {/* geo location info */}
        <div className="flex py-3 border-t border-gray-500">
          {/* 1st row */}
          <div className="w-[50%] ">
            <div className="flex">
              <p className="dark:text-white">Co-ordinates Geographic</p>
              <div className="flex ml-8">
                <div className="flex items-center ">
                  <p>X : </p>
                  <input
                    placeholder="X"
                    name="X_COORDINATE"
                    value={props.formData.X_COORDINATE}
                    onChange={props.handleChange}
                    type="text"
                    className=" p-2 ml-2 border border-gray-500 rounded-md w-24 dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <div className="flex items-center ml-3">
                  <p>Y : </p>
                  <input
                    placeholder="Y"
                    name="Y_COORDINATE"
                    value={props.formData.Y_COORDINATE}
                    onChange={props.handleChange}
                    type="text"
                    className=" p-2 ml-2 border border-gray-500 rounded-md w-24 dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-3">
              <p className="dark:text-white">Co-ordinates Metric</p>
              <div className="flex ml-8">
                <div className="flex items-center ml-[2.30rem]">
                  <p>X : </p>
                  <input
                    placeholder="X"
                    name="X_METRIC"
                    value={props.formData.X_METRIC}
                    onChange={props.handleChange}
                    type="text"
                    className=" p-2 ml-2 border border-gray-500 rounded-md w-24 dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <div className="flex items-center ml-3">
                  <p>Y : </p>
                  <input
                    placeholder="Y"
                    name="Y_METRIC"
                    value={props.formData.Y_METRIC}
                    onChange={props.handleChange}
                    type="text"
                    className=" p-2 ml-2 border border-gray-500 rounded-md w-24 dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <p>Elevation</p>
              <input
                placeholder="Elevation"
                name="ELV_METHOD"
                value={props.formData.ELV_METHOD}
                onChange={props.handleChange}
                type="text"
                className=" p-2 ml-2 border border-gray-500 rounded-md w-24 dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>
          {/* 2nd row */}
          <div className="w-[50%] ">
            <div className="flex items-center">
              <p>Local Metric</p>
              <input
                placeholder="LocalMetric1"
                name="LocalMetric1"
                value={props.formData.LocalMetric1}
                onChange={props.handleChange}
                type="text"
                className=" p-2 ml-2 border border-gray-500 rounded-md w-24 dark:bg-slate-700 dark:text-white"
              />
              <input
                placeholder="LocalMetric2"
                name="LocalMetric2"
                value={props.formData.LocalMetric2}
                onChange={props.handleChange}
                type="text"
                className="w-24 p-2 ml-2 border border-gray-500 rounded-md dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div className="flex mt-2">
              <p>Method of survey</p>
              <select
                value={props.formData.SOURCE}
                onChange={(e) => handleMethodOfSurveyChange(e.target.value)}
                className="p-2 ml-2 border border-gray-500 rounded-md w-[220px] dark:bg-slate-700 dark:text-white"
              >
                <option value="">Select Method of survey</option>
                <option value="GPS">GPS</option>
                <option value="Map">Map</option>
                <option value="Survey">Survey</option>
                <option value="USGS">USGS</option>
              </select>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  );
}

export default Well;
