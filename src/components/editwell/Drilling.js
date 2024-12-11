import React, { useState } from 'react';


function Drilling(props) {
  const [currentLog, setCurrentLog] = useState({
    DrillData: props.formData.DrillData || '',
    RodNo: props.formData.RodNo || '',
    Starttime: props.formData.Starttime || '',
    FinishTime: props.formData.FinishTime || '', 
    Duration: props.formData.Duration || '',
    DrillBitandHammerType: props.formData.DrillBitandHammerType || '',
    drillDepth: props.formData.drillDepth || '',
    yield: props.formData.yield || '',
    EC: props.formData.EC || '',
    Fracture: props.formData.Fracture|| '',
    Description: props.formData.Description || ''
  });

  const [drillLogs, setDrillLogs] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Convert numeric fields to numbers or empty string
    let processedValue = value;
  

    setCurrentLog((prev) => ({
      ...prev,
      [name]: processedValue
    }));
    
    if (props.handleChange) {
      props.handleChange({
        target: {
          name,
          value: processedValue
        }
      });
    }
  };

  const addNewRow = () => {
    if (props.addDrillLog) {
      props.addDrillLog(currentLog);
    }
    
    setDrillLogs([...drillLogs, currentLog]);
    setCurrentLog({
      DrillData: '',
      RodNo: '',
      Starttime: '',
      FinishTime: '',
      Duration: '',
      DrillBitandHammerType: '',
      drillDepth: '',
      yield: '',
      EC: '',
      Fracture: '',
      Description: ''
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Drilling Log</h1>
      <div className="mb-4">
        <label className="mr-2">Date: </label>
        <input
          type="date"
          name="DrillData"
          value={currentLog.DrillData}
          onChange={handleInputChange}
          className="border rounded p-1 dark:bg-slate-600 dark:text-white text-black"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:hover:bg-gray-700 dark:text-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Rod No.</th>
              <th className="border p-2">Start Time</th>
              <th className="border p-2">Finish Time</th>
              <th className="border p-2">Duration (min)</th>
              <th className="border p-2">Drill Bit No. & Dia Hammer Type</th>
              <th className="border p-2">drillDepth (m)</th>
              <th className="border p-2">yield (lpm)</th>
              <th className="border p-2">EC (μs/cm)</th>
              <th className="border p-2">Fracture (m)</th>
              <th className="border p-2">Description*</th>
            </tr>
          </thead>
          <tbody>
            {drillLogs.map((log, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-2">{log.RodNo}</td>
                <td className="border p-2">{log.Starttime}</td>
                <td className="border p-2">{log.FinishTime}</td>
                <td className="border p-2">{log.Duration}</td>
                <td className="border p-2">{log.DrillBitandHammerType}</td>
                <td className="border p-2">{log.drillDepth}</td>
                <td className="border p-2">{log.yield}</td>
                <td className="border p-2">{log.EC}</td>
                <td className="border p-2">{log.Fracture}</td>
                <td className="border p-2">{log.Description}</td>
              </tr>
            ))}
            <tr>
              <td className="border p-2 dark:dark:text-white text-black">
                <input 
                  className="w-full p-1 border rounded dark:bg-slate-600 dark:text-white text-black"
                  name="RodNo"
                  value={currentLog.RodNo}
                  onChange={handleInputChange}
                />
              </td>
              <td className="border p-2 dark:dark:text-white text-black"><input className="w-full p-1 border rounded dark:bg-slate-600 dark:text-white text-black" name="Starttime" value={currentLog.Starttime} onChange={handleInputChange} /></td>
              <td className="border p-2 dark:dark:text-white text-black"><input className="w-full p-1 border rounded dark:bg-slate-600 dark:text-white text-black" name="FinishTime" value={currentLog.FinishTime} onChange={handleInputChange} /></td>
              <td className="border p-2 dark:dark:text-white text-black"><input className="w-full p-1 border rounded dark:bg-slate-600 dark:text-white text-black" name="Duration" value={currentLog.Duration} onChange={handleInputChange} /></td>
              <td className="border p-2 dark:dark:text-white text-black"><input className="w-full p-1 border rounded dark:bg-slate-600 dark:text-white text-black" name="DrillBitandHammerType" value={currentLog.DrillBitandHammerType} onChange={handleInputChange} /></td>
              <td className="border p-2 dark:dark:text-white text-black"><input className="w-full p-1 border rounded dark:bg-slate-600 dark:text-white text-black" name="drillDepth" value={currentLog.drillDepth} onChange={handleInputChange} /></td>
              <td className="border p-2 dark:dark:text-white text-black"><input className="w-full p-1 border rounded dark:bg-slate-600 dark:text-white text-black" name="yield" value={currentLog.yield} onChange={handleInputChange} /></td>
              <td className="border p-2 dark:dark:text-white text-black"><input className="w-full p-1 border rounded dark:bg-slate-600 dark:text-white text-black" name="EC" value={currentLog.EC} onChange={handleInputChange} /></td>
              <td className="border p-2 dark:dark:text-white text-black"><input className="w-full p-1 border rounded dark:bg-slate-600 dark:text-white text-black" name="Fracture" value={currentLog.Fracture} onChange={handleInputChange} /></td>
              <td className="border p-2 dark:dark:text-white text-black"><input className="w-full p-1 border rounded dark:bg-slate-600 dark:text-white text-black" name="Description" value={currentLog.Description} onChange={handleInputChange} /></td>
            </tr>
          </tbody>
        </table>
      </div>
   
      <div className="mt-10">
        <div className="mb-2">
          <label className="mr-2" style={{marginRight: '85px'}}>Solid Sample:</label>
          <select
            name="Solidsample"
            value={props.Solidsample || ''}
            onChange={props.handleChange}
            className="border rounded p-1 dark:bg-slate-600 dark:text-white text-black"
          >
            <option value="">Select</option>
            <option value="collected">Collected</option>
            <option value="not collected">Not Collected</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="mr-20">Water Sample:</label>
          <select
            name="WaterSample"
            value={props.WaterSample || ''}
            onChange={props.handleChange}
            className="border rounded p-1 dark:bg-slate-600 dark:text-white text-black"
          >
            <option value="">Select</option>
            <option value="collected">Collected</option>
            <option value="not collected">Not Collected</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="mr-5">Driller Name Signature:</label>
          <input
            type="text"
            name="Drillingsign"
            value={props.Drillingsign || ''}
            onChange={props.handleChange}
            placeholder="Driller Name Signature"
            className="border rounded p-1 dark:bg-slate-600 dark:text-white text-black"
          />
        </div>
        <div className="mb-2">
          <label className="mr-8">OIC Name Signature:</label>
          <input
            type="text"
            name="OicSign"
            value={props.OicSign || ''}
            onChange={props.handleChange}
            placeholder="OIC Name Signature"
            className="border rounded p-1 dark:bg-slate-600 dark:text-white text-black"
          />
        </div>
      </div>
    </div>
  );
}

export default Drilling;
