import React, { useEffect, useState } from "react";
import API from "../../api/route"; 
import { getRSCByNumber } from "../../app/constants/RSC";

function WellData(props) {
  const [rscOptions, setRscOptions] = useState([]);

  useEffect(() => {
    // Set RSC options when component mounts if work location exists
    if (props.formData.selectedWorkLocation) {
      const rscArray = getRSCByNumber(props.formData.selectedWorkLocation);
      setRscOptions(rscArray || []);
    }
  }, [props.formData.selectedWorkLocation]);

  const handleWorkLocationChange = (value, name) => {
    props.handleChange({ target: { name: "selectedWorkLocation", value } });
    
    if (value !== "") {
      const rscArray = getRSCByNumber(value);
      setRscOptions(rscArray || []);
      // Clear RSC when work location changes
      props.handleChange({ target: { name: "selectedRSC", value: "" } });
    } else {
      setRscOptions([]);
    }
  };

  const handleRSCChange = (value) => {
    props.handleChange({ target: { name: "selectedRSC", value } });
  };

  const handleTypeChange = (value) => {
    props.handleChange({ target: { name: "WellType", value } });
  };

  const handleUserTypeChange = (value) => {
    props.handleChange({ target: { name: "UserType", value } });
  };

  const handleWellConditionChange = (value) => {
    props.handleChange({ target: { name: "WellCondition", value } });
  };

  const handleMethodOfSurveyChange = (value) => {
    props.handleChange({ target: { name: "Methodofsurvey", value } });
  };

  const handleProvinceChange = (value) => {
    props.handleChange({ target: { name: "selectedProvince", value } });
    // Clear dependent fields
    props.handleChange({ target: { name: "selectedDistrict", value: "" } });
    props.handleChange({ target: { name: "selectedDSDivision", value: "" } });
  };

  const handleDistrictChange = (value) => {
    props.handleChange({ target: { name: "selectedDistrict", value } });
    // Clear dependent field
    props.handleChange({ target: { name: "selectedDSDivision", value: "" } });
  };

  const handleDSDivisionChange = (value) => {
    props.handleChange({ target: { name: "selectedDSDivision", value } });
  };

  return (
    <div>
      <div>
        <div className="border-b border-gray-400 mt-11">
          <div className="flex ">
            <div className="w-[50%]  p-3 flex items-center -mt-9 mb-6">
              <p className="block mb-2">New Well No : </p>
              <input
                required
                placeholder="New Well No"
                name="newWellNo"
                value={props.formData.newWellNo || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 border border-gray-500 rounded-md"
              />
            </div>
            <div className="w-[50%]  p-3 flex items-center -mt-9 mb-6">
              <p className="block mb-2">Old Well No : </p>
              <input
                placeholder="Old Well No"
                name="OldWellNo"
                value={props.formData.OldWellNo || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 border border-gray-500 rounded-md"
              />
            </div>
          </div>
          {props.wellIdExists && (
            <span className="ml-2 text-red-500">Well ID already exists!</span>
          )}
        </div>

        <div className="flex">
          {/* 1st row */}
          <div className="w-[50%] border-r border-gray-400 p-[64px] ml-auto -mt-10">
            {/* project office */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Project Office : </p>
              <input
                placeholder="Project Office"
                name="ProjectOffice"
                value={props.formData.ProjectOffice || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
              />
            </div>
            {/* Location */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Location : </p>
              <input
                placeholder="Location"
                name="Location"
                value={props.formData.Location || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
              />
            </div>
            {/* Electorate */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Electorate : </p>
              <input
                placeholder="Electorate"
                name="Electorate"
                value={props.formData.Electorate || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
              />
            </div>
            {/* Village */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Village : </p>
              <input
                placeholder="Village"
                name="Village"
                value={props.formData.Village || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
              />
            </div>
            {/* User Type */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">User Type : </p>
              <select
                value={props.formData.UserType || ''}
                onChange={(e) => handleUserTypeChange(e.target.value)}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
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
                value={props.formData.WellType || ''}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
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
                value={props.formData.WellCondition || ''}
                onChange={(e) => handleWellConditionChange(e.target.value)}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
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
                value={props.formData.TopoSheet || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
              />
            </div>
            {/* Scale Topo Sheet */}
            <div className="flex items-center mb-1">
              <p className="block mt-2">Scale Topo Sheet : </p>
              <input
                placeholder="Scale Topo Sheet"
                name="ScaleTopoSheet"
                value={props.formData.ScaleTopoSheet || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
              />
            </div>
            {/* Geology Map */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Geology Map : </p>
              <input
                placeholder="Geology Map"
                name="GeologyMap"
                value={props.formData.GeologyMap || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
              />
            </div>
            <div className="flex items-center mb-1">
              <p className="block mb-2">Weathered Rock : </p>
              <input
                placeholder="Weathered Rock"
                name="WeatheredRock"
                value={props.formData.WeatheredRock || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
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
                className="items-end p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
              />
            </div>
          </div>
          {/* 2nd row */}
          <div className="w-[50%] border-r border-gray-400 p-[64px] -mt-10">
            {/* Province */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Province : </p>
              <select
                value={props.formData.selectedProvince || ''}
                onChange={(e) => handleProvinceChange(e.target.value)}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
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
                value={props.formData.selectedDistrict || ''}
                onChange={(e) => handleDistrictChange(e.target.value)}
                disabled={!props.formData.selectedProvince}
                className="p-2 ml-auto border border-gray-500 rounded-md  w-[220px]"
              >
                <option value="">Select District</option>
                {props.getDistrictsByProvince(props.formData.selectedProvince).map((district) => (
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
                value={props.formData.selectedDSDivision || ''}
                onChange={(e) => handleDSDivisionChange(e.target.value)}
                disabled={!props.formData.selectedDistrict}
                className="p-2 ml-auto border border-gray-500 rounded-md  w-[220px]"
              >
                <option value="">Select DS Division</option>
                {/* {props.getDSDivisionByDistrict(props.formData.selectedDistrict).map((dsDivision) => (
                  <option key={dsDivision} value={dsDivision}>
                    {dsDivision}
                  </option>
                ))} */}
              </select>
            </div>
            {/* GS Division */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">GS Division : </p>
              <input
                placeholder="GS Division"
                name="GSDivision"
                value={props.formData.GSDivision || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md"
              />
            </div>

            {/* Scheme Name */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Scheme Name : </p>
              <input
                placeholder="Scheme Name"
                name="SchemeName"
                value={props.formData.SchemeName || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md"
              />
            </div>

            {/* Work locations */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Work locations: </p>
              <select
                required
                value={props.formData.selectedWorkLocation || ''}
                onChange={(e) => {
                  const selectedOption = props.Worklocations.find(
                    loc => loc.id === e.target.value
                  );
                  handleWorkLocationChange(e.target.value, selectedOption?.name);
                }}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
              >
                <option value="">Select Work Location</option>
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
                value={props.formData.selectedRSC || ''}
                onChange={(e) => handleRSCChange(e.target.value)}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
                disabled={!props.formData.selectedWorkLocation}
              >
                <option value="">Select RSC Location</option>
                {rscOptions.map((rscLocation) => (
                  <option key={rscLocation.id} value={rscLocation.costCentreName}>
                    {rscLocation.costCentreName}
                  </option>
                ))}
              </select>
            </div>
            {rscOptions.length === 0 && props.formData.selectedWorkLocation && (
              <p className="text-red-500">No RSC locations available for this work location.</p>
            )}
            {/* Scale Geology Map */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Scale Geology Map : </p>
              <input
                placeholder="Scale Geology Map"
                name="ScaleGeologyMap"
                value={props.formData.ScaleGeologyMap || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]"
              />
            </div>
            {/* Depth to Bottom of Soil Layer */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Depth to The Bottom of Soil Layer : </p>
              <input
                placeholder="Depth to The Bottom of Soil Layer"
                name="DepthtoTheBottomofSoilLayer"
                value={props.formData.DepthtoTheBottomofSoilLayer || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] mt-[1rem]"
              />
            </div>
            {/* Highly Weathered Rock */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">Highly Weathered Rock : </p>
              <input
                placeholder="Highly Weathered Rock"
                name="HighlyWeatheredRock"
                value={props.formData.HighlyWeatheredRock || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]  mt-[0.7rem]"
              />
            </div>
          </div>
        </div>
        {/* geo location info */}
        <div className="flex py-3 border-t border-gray-500">
          {/* 1st row */}
          <div className="w-[50%] ">
            <div className="flex">
              <p>Co-ordinates Geographic</p>
              <div className="flex ml-8">
                <div className="flex items-center">
                  <p>X : </p>
                  <input
                    placeholder="X"
                    name="X"
                    value={props.formData.X || ''}
                    onChange={props.handleChange}
                    type="text"
                    className=" p-2 ml-2 border border-gray-500 rounded-md w-24"
                  />
                </div>
                <div className="flex items-center ml-3">
                  <p>Y : </p>
                  <input
                    placeholder="Y"
                    name="Y"
                    value={props.formData.Y || ''}
                    onChange={props.handleChange}
                    type="text"
                    className=" p-2 ml-2 border border-gray-500 rounded-md w-24"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <p>Elevation</p>
              <input
                placeholder="Elevation"
                name="Elevation"
                value={props.formData.Elevation || ''}
                onChange={props.handleChange}
                type="text"
                className=" p-2 ml-2 border border-gray-500 rounded-md w-24"
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
                value={props.formData.LocalMetric1 || ''}
                onChange={props.handleChange}
                type="text"
                className=" p-2 ml-2 border border-gray-500 rounded-md w-24"
              />
              <input
                placeholder="LocalMetric2"
                name="LocalMetric2"
                value={props.formData.LocalMetric2 || ''}
                onChange={props.handleChange}
                type="text"
                className="w-24 p-2 ml-2 border border-gray-500 rounded-md "
              />
            </div>

            <div className="flex mt-2">
              <p>Method of survey</p>
              <select
                value={props.formData.Methodofsurvey || ''}
                onChange={(e) => handleMethodOfSurveyChange(e.target.value)}
                className="p-2 ml-2 border border-gray-500 rounded-md w-[220px]"
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

export default WellData;
