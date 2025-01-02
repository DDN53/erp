import React, { useEffect, useState } from "react";
import API from "../../api/route"; 
import { getRSCByNumber } from "../../app/constants/RSC";

function WellData(props) {
  const [rscOptions, setRscOptions] = useState([]);

  useEffect(() => {
    if (props.formData.selectedWorkLocation) {
      const rscArray = getRSCByNumber(props.formData.selectedWorkLocation);
      setRscOptions(rscArray || []);
    }
  }, [props.formData.selectedWorkLocation]);

  const handleSelectChange = (name, value, clearFields = []) => {
    props.handleChange({ target: { name, value } });
    
    clearFields.forEach(field => {
      props.handleChange({ target: { name: field, value: "" } });
    });

    if (name === "selectedWorkLocation") {
      const rscArray = value ? getRSCByNumber(value) : [];
      setRscOptions(rscArray || []);
      props.handleChange({ target: { name: "selectedRSC", value: "" } });
    }
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
                className="p-2 border border-gray-500 rounded-md dark:bg-slate-600 dark:text-white text-black"
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
                className="p-2 border border-gray-500 rounded-md dark:bg-slate-600 dark:text-white text-black"
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
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
              />
            </div>
            {/* User Type */}
            <div className="flex items-center mb-1">
              <p className="block mb-2">User Type : </p>
              <select
                value={props.formData.UserType || ''}
                onChange={(e) => handleSelectChange("UserType", e.target.value)}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                onChange={(e) => handleSelectChange("WellType", e.target.value)}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                onChange={(e) => handleSelectChange("WellCondition", e.target.value)}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                className="items-end p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                onChange={(e) => handleSelectChange("selectedProvince", e.target.value, [
                  "selectedDistrict",
                  "selectedDSDivision"
                ])}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                onChange={(e) => handleSelectChange("selectedDistrict", e.target.value, [
                  "selectedDSDivision"
                ])}
                disabled={!props.formData.selectedProvince}
                className="p-2 ml-auto border border-gray-500 rounded-md  w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                onChange={(e) => handleSelectChange("selectedDSDivision", e.target.value, [
                  "selectedDistrict"
                ])}
                disabled={!props.formData.selectedDistrict}
                className="p-2 ml-auto border border-gray-500 rounded-md  w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                className="p-2 ml-auto border border-gray-500 rounded-md dark:bg-slate-600 dark:text-white text-black"
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
                className="p-2 ml-auto border border-gray-500 rounded-md dark:bg-slate-600 dark:text-white text-black"
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
                  handleSelectChange("selectedWorkLocation", e.target.value);
                }}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                onChange={(e) => handleSelectChange("selectedRSC", e.target.value)}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px] mt-[1rem] dark:bg-slate-600 dark:text-white text-black"
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
                className="p-2 ml-auto border border-gray-500 rounded-md w-[220px]  mt-[0.7rem] dark:bg-slate-600 dark:text-white text-black"
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
                    className=" p-2 ml-2 border border-gray-500 rounded-md w-24 dark:bg-slate-600 dark:text-white text-black"
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
                    className=" p-2 ml-2 border border-gray-500 rounded-md w-24 dark:bg-slate-600 dark:text-white text-black"
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
                className=" p-2 ml-2 border border-gray-500 rounded-md w-24 dark:bg-slate-600 dark:text-white text-black"
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
                className=" p-2 ml-2 border border-gray-500 rounded-md w-24 dark:bg-slate-600 dark:text-white text-black"
              />
              <input
                placeholder="LocalMetric2"
                name="LocalMetric2"
                value={props.formData.LocalMetric2 || ''}
                onChange={props.handleChange}
                type="text"
                className="w-24 p-2 ml-2 border border-gray-500 rounded-md dark:bg-slate-600 dark:text-white text-black"
              />
            </div>

            <div className="flex mt-2">
              <p>Method of survey</p>
              <select
                value={props.formData.Methodofsurvey || ''}
                onChange={(e) => handleSelectChange("Methodofsurvey", e.target.value)}
                className="p-2 ml-2 border border-gray-500 rounded-md w-[220px] dark:bg-slate-600 dark:text-white text-black"
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
