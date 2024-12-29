'use client'
import React, { useState, useEffect } from "react";
import { getRSCByNumber } from "../../app/constants/RSC";
import { Worklocations } from '../../app/constants/WorkLocations';
import { locationData } from "@/app/constants/LocationData";
import {WellTypes,WellConditions} from "@/app/constants/WellTypes"
function Well(props) {
 
  

 const [wellIdExists, setWellIdExists] = useState(false);
   const[setDistricts,setSelectedDistricts]=useState([]);
   const [selectedProvince,setSelectedProvince] =useState(null);
     const [selectedDistrict,setSelectedDistrict]=useState(null);
     
     const [selectedProjectOffice  ,setSelectedProjectOffice  ]=useState(null);
     const [setFormData,setSelectFormData] =useState([]);
     const [rscOptions, setRscOptions] = useState([]);
     const [dsDivisions, setDSDivisions] = useState([]);

  const provinces = locationData.provinces;

  const getDistricts = (provinceId) =>{
    const province = provinces.find(p => p.Id === parseInt(provinceId));
    return province ? province.districts : [];
  }
  
  const getDSDivisions = (provinceId, districtId) => {
    const province = provinces.find(p => p.Id === parseInt(provinceId));
    if (!province) return [];
    
    const district = province.districts.find(d => d.Id === parseInt(districtId));
    return district ? district.dsDivisions : [];
  };

  const handleProvinceChange = (provinceId) => {
    setSelectedProvince(provinceId);
    setSelectedDistrict(null);
    props.handleChange({
      target: { name: 'selectedProvince', value: provinceId }
    });
    
   
    const districts = getDistricts(provinceId);
    props.setDistricts(districts);

    props.handleChange({
      target: { name: 'DSDIV_CODE', value: '' }
    });
  };
  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
    props.handleChange({
      target: { name: 'selectedDistrict', value: districtId }
    });
    
    const dsDivisions = getDSDivisions(districtId);
    setDSDivisions(dsDivisions);
  };

  const handleWorkLocationChange = (value, selectedOption) => {
    props.handleWorkLocationChange(value, selectedOption);

    if (value !== "") {
      const rscArray = getRSCByNumber(value);
      setRscOptions(rscArray || []);
    } else {
      setRscOptions([]);
    }
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
  const handleChange = (e) => {
    if (!e || !e.target) {
      console.error("Event or target is undefined", e);
      return;
    }
  
   
    const target = e.target;
    const name = target.name;
    const value = target.value;
  
   
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="well-data-container">
      <div>
        <div className="border-b border-gray-400 dark:border-gray-600">
          <div className="flex">
          <div className="w-[30%] p-3 flex items-center -mt-9 mb-6 ml-[7.3rem] whitespace-nowrap">
  <p className="block mb-2">Well No :</p>
  <input
    required
    placeholder="Well No"
    name="WELLNO"
    value={props.formData.WELLNO || ''}
    onChange={props.handleChange}
    type="text"
    className="p-2 border border-gray-500 rounded-md dark:bg-slate-700 dark:text-white"
  />
</div>

            
            <div className="w-[30%]  p-3 flex items-center -mt-9 mb-6 ml-[9.5rem] whitespace-nowrap">
              <p className="block mb-2">Old Well No : </p>
              <input
                placeholder="Old Well No"
                name="OLDWELLNO"
                value={props.formData.OLDWELLNO || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 border border-gray-500 rounded-md dark:bg-slate-700 dark:text-white  "
              />
            </div>
          </div>
          {props.wellIdExists && (
            <span className="ml-2 text-red-500">Well ID already exists!</span>
          )}
          <div className="w-[30%]  p-3 flex items-center -mt-9 mb-6 ml-[5.1rem] whitespace-nowrap">
              <p className="block mb-2">New Well No : </p>
              <input
                required
                placeholder="New Well No"
                name="NWELLNO"
                value={props.formData.NWELLNO || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 border border-gray-500 rounded-md dark:bg-slate-700 dark:text-white border-r"
              />
            </div>
        </div>

        <div className="flex flex-row">
        <div className="w-[50%] border-r border-gray-400 p-[64px] -mt-10">
            {/* Work locations */}
            <div className="flex items-center mb-2">
  <p className="block mb-2">Project Office:</p>
  <select
    required
    value={props.formData.selectedProjectOffice || ''}
    onChange={(e) => {
      const selectedId = e.target.value;
      const selectedLocation = Worklocations?.find(
        (location) => location.id === selectedId
      );
      props.handleChange({
        target: {
          name: 'selectedProjectOffice',
          value: selectedId,
        },
      });

      props.handleChange({
        target: {
          name: 'selectedProjectOfficeName',
          value: selectedLocation?.name || '',
        },
      });
    }}

    className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]   dark:bg-slate-700 dark:text-white"
  >
    
    <option value="">Select Project Office</option>
    {Worklocations?.map((location) => (
      <option key={location.id} value={location.id}>
        {location.name}
      </option>
    ))}
  </select>

</div>



            {/* Province */}
            <div className="flex items-center mb-2">
      <p className="block mb-2">Province:</p>
      <select
    value={props.formData.selectedProvince || ''}
    onChange={(e) => {
      const selectedProvinceId = e.target.value;
      const selectedProvince = provinces.find(
        (province) => province.Id === parseInt(selectedProvinceId)
      );

      handleProvinceChange(selectedProvinceId);

      // Store the name of the selected province
      props.handleChange({
        target: { name: 'selectedProvince', value: selectedProvinceId },
      });

      props.handleChange({
        target: { name: 'selectedProvinceName', value: selectedProvince?.Name || '' },
      });
    }}
    className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]   dark:bg-slate-700 dark:text-white"
  >
    <option value="">Select Province</option>
    {provinces.map((province) => (
      <option key={province.Id} value={province.Id}>
        {province.Name}
      </option>
    ))}
  </select>

    </div>

            {/* District */}
            <div className="flex items-center mb-2">
      <p className="block mb-2">District:</p>
      <select
    value={props.formData.selectedDistrict || ''}
    onChange={(e) => {
      const selectedDistrictId = e.target.value;
      const selectedDistrict = getDistricts(props.formData.selectedProvince).find(
        (district) => district.Id === parseInt(selectedDistrictId)
      );

      handleDistrictChange(selectedDistrictId);

      props.handleChange({
        target: { name: 'selectedDistrict', value: selectedDistrictId },
      });

      props.handleChange({
        target: { name: 'selectedDistrictName', value: selectedDistrict?.Name || '' },
      });
    }}
    disabled={!props.formData.selectedProvince}
    className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
  >
    <option value="">Select District</option>
    {getDistricts(props.formData.selectedProvince).map((district) => (
      <option key={district.Id} value={district.Id}>
        {district.Name}
      </option>
    ))}
  </select>

    </div>

            {/* DS Division */}
            <div className="flex items-center mb-2">
      <p className="block mb-2">DS Division:</p>
      <select
    value={props.formData.DSDIV_CODE || ''}
    onChange={(e) => {
      const selectedDsDivision = e.target.value;
      const selectedDsDivisionName = getDSDivisions(
        props.formData.selectedProvince,
        props.formData.selectedDistrict
      ).find((division) => division === selectedDsDivision);

      props.handleChange({
        target: { name: 'DSDIV_CODE', value: selectedDsDivision },
      });

    
      props.handleChange({
        target: { name: 'DSDIV_NAME', value: selectedDsDivisionName || '' },
      });
    }}
    disabled={!props.formData.selectedDistrict}
    className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
  >
    <option value="">Select DS Division</option>
    {getDSDivisions(
      props.formData.selectedProvince,
      props.formData.selectedDistrict
    ).map((division) => (
      <option key={division} value={division}>
        {division}
      </option>
    ))}
  </select>

    </div>
            
            <div className="flex items-center mb-2">
              <p className="block mb-2">GS Division : </p>
              <input
                placeholder="GS Division"
                name="GSDIV"
                value={props.formData.GSDIV || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="flex items-center mb-2">
              <p className="block mb-2">Election Division : </p>
              <input
                placeholder="Election Division"
                name="ELECT_CODE"
                value={props.formData.ELECT_CODE || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div className="flex items-center mb-2">
              <p className="block mb-2">Village : </p>
              <input
                placeholder="Village"
                name="VILLAGE"
                value={props.formData.VILLAGE || ''} 
                onChange={props.handleChange}
                type="text"
                className="items-end p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="flex items-center mb-2">
              <p className="block mb-2">Location : </p>
              <input
                placeholder="Location"
                name="LOCATION"
                value={props.formData.LOCATION || ''} 
                onChange={props.handleChange}
                type="text"
                className="items-end p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="flex-col">
              {/* X_COORDINATE Input */}
              <div className="flex items-center mb-2">
                <label htmlFor="x_coordinate" className="block mb-2">x coordinate:</label>
                <input
                  id="x_coordinate"
                  placeholder="X_Coordinate"
                  name="X_COORDINATE"
                  value={props.formData.X_COORDINATE || ''} 
                  onChange={props.handleChange}
                  type="text"
                  className="items-end p-2 ml-auto border border-gray-500 rounded-md w-[43%] dark:bg-slate-700 dark:text-white"
                />
              </div>

              {/* Y_COORDINATE Input */}
              <div className="flex items-center mb-2">
                <label htmlFor="y_coordinate" className="block mb-2">y coordinate:</label>
                <input
                  id="y_coordinate"
                  placeholder="Y_Coordinate"
                  name="Y_COORDINATE"
                  value={props.formData.Y_COORDINATE || ''} 
                  onChange={props.handleChange}
                  type="text"
                  className="items-end p-2 ml-auto border border-gray-500 rounded-md w-[43%] dark:bg-slate-700 dark:text-white"
                />
              </div>
              {/* Map Used */}
              <div className="flex items-center mb-2">
                <p className="block mb-2">Map Used : </p>
                <input
                  placeholder="Map Used"
                  name="MAP_USED"
                  value={props.formData.MAP_USED || ''}
                  onChange={(e) => props.handleChange({
                    target: { name: 'MAP_USED', value: e.target.value }
                  })}
                  type="text"
                  className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div className="flex items-center mb-2">
                <p className="block mb-2">Map Scale : </p>
                <input
                  placeholder="Map Scale"
                  name="MAP_SCALE"
                  value={props.formData.MAP_SCALE || ''}
                  onChange={props.handleChange}
                  type="text"
                  className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div className="flex items-center mb-2">
                <p className="block mb-2">Geological Used : </p>
                <input
                  placeholder="Geological Used"
                  name="GEOLOGICAL_USED"
                  value={props.formData.GEOLOGICAL_USED || ''}
                  onChange={props.handleChange}
                  type="text"
                  className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div className="flex items-center mb-2">
                <p className="block mb-2">Geological Scale : </p>
                <input
                  placeholder="Geological Scale"
                  name="GEOLOGICAL_SCALE"
                  value={props.formData.GEOLOGICAL_SCALE || ''}
                  onChange={props.handleChange}
                  type="text"
                  className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div className="flex items-center mb-2">
                <p className="block mb-2">X Metric: </p>
                <input
                  placeholder="X Metric"
                  name="X_METRIC"
                  value={props.formData.X_METRIC || ''}
                  onChange={props.handleChange}
                  type="text"
                  className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div className="flex items-center mb-2">
                <p className="block mb-2">Y Metric : </p>
                <input
                  placeholder="Y Metric"
                  name="Y_METRIC"
                  value={props.formData.Y_METRIC || ''}
                  onChange={props.handleChange}
                  type="text"
                  className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>
          </div>
          {/* 1st row */}
          <div className="w-[50%] border-r border-gray-400 p-[64px] ml-auto -mt-10 dark:bg-slate-800 dark:text-white">
            {/* User Type */}
            <div className="flex items-center mb-2">
              <p className="block mb-2">User Type : </p>
              <select
                value={props.formData.USERTYPE || ''} 
                onChange={(e) => props.handleChange({
                  target: { name: 'USERTYPE', value: e.target.value }
                })}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
              >
                <option value="">Select User Type</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Domestic">Domestic</option>
                <option value="Tourism">Tourism</option>
                <option value="Water Supply Scheme">Water Supply Scheme</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>
            <div className="flex items-center mb-2">
              <p className="block mb-2">SchemeName : </p>
              <input
                placeholder="Schemename"
                name="SCHEMENAME"
                value={props.formData.SCHEMENAME || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
              />
            </div>
            {/* Well Condition */}
            <div className="flex items-center mb-2">
              <p className="block mb-2">Well Condition: </p>
              <select
                value={props.formData.WellCondition || ''}
                onChange={(e) => props.handleChange({
                  target: { name: 'WellCondition', value: e.target.value }
                })}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
              >
                <option value="">Select Well Condition</option>
                <option value="Pumping">Pumping</option>
                <option value="abandoned">Abandoned</option>
              </select>
            </div>
            <div className="flex items-center mb-2">
              <p className="block mb-2">Source: </p>
              <select
                value={props.formData.SOURCE || ''}
                onChange={(e) => props.handleChange({
                  target: { name: 'SOURCE', value: e.target.value }
                })}
                className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
              >
                <option value="Home Well">Home Well</option>
                {WellConditions.map((type) => (
      <option key={type.value} value={type.value}>
        {type.label}
      </option>
    ))}
              </select>
            </div>
           
            <div className="flex items-center mb-2">
              <p className="block mb-2">Elv Method : </p>
              <input
                placeholder="Elv Method"
                name="ELV_METHOD"
                value={props.formData.ELV_METHOD || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="flex items-center mb-2">
              <p className="block mb-2">Dep Soil : </p>
              <input
                placeholder="Dep Soil"
                name="DEP_SOIL"
                value={props.formData.DEP_SOIL || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="flex items-center mb-2">
              <p className="block mb-2">Dep Hw Rock : </p>
              <input
                placeholder="Dep Hw Rock"
                name="DEP_HW_ROCK"
                value={props.formData.DEP_HW_ROCK || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="flex items-center mb-2">
              <p className="block mb-2">Dep w Rock : </p>
              <input
                placeholder="Dep w Rock"
                name="DEP_W_ROCK"
                value={props.formData.DEP_W_ROCK || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="flex items-center mb-2">
              <p className="block mb-2">Geol : </p>
              <input
                placeholder="Geol"
                name="GEOL"
                value={props.formData.GEOL || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="flex items-center mb-2">
              <p className="block mb-2">IsLock : </p>
              <input
                placeholder="IsLock"
                name="IsLock"
                value={props.formData.IsLock || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[63%]  dark:bg-slate-700 dark:text-white"
              />
            </div>
           
            <div className="flex items-center mb-2">
  <p className="block mb-2">WellType : </p>
  <select
    value={props.formData.WellType || ''}
    onChange={(e) => {
      props.handleChange({
        target: { name: 'WellType', value: e.target.value },
      });
    }}
    className="p-2 ml-auto border border-gray-500 rounded-md w-[63%] dark:bg-slate-700 dark:text-white"
  >
    <option value="">Select Well Type</option>
    {WellTypes.map((type) => (
      <option key={type.value} value={type.value}>
        {type.label}
      </option>
    ))}
  </select>
</div>



            <div className="flex items-center mb-2">
              <p className="block mb-2">Elevation1 : </p>
              <input
                placeholder="Elevation1"
                name="Elevation1"
                value={props.formData.Elevation1 || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[43%] dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="flex items-center mb-2">
              <p className="block mb-2">ElevationMsl : </p>
              <input
                placeholder="ElevationMsl"
                name="ELEVATIONMSL"
                value={props.formData.ELEVATIONMSL || ''}
                onChange={props.handleChange}
                type="text"
                className="p-2 ml-auto border border-gray-500 rounded-md w-[43%] dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>
       
          
        </div>
       
        <div className="flex py-3 border-t border-gray-500">
         
        </div>
      </div>
    </div>
  );
}

export default Well;
