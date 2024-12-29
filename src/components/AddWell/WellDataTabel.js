"use client"

import React, { useState } from 'react';
import WellForm from '@/components/AddWell/WellForm';
import WellDataTable from '@/components/AddWell/WellDataTable'; 
import { Button } from '@/components/ui/button';

export default function page() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [wellData, setWellData] = useState([]); 

  const handleAddWell = (newWell) => {
    setWellData((prevData) => [...prevData, newWell]); 
    setFormVisible(false); 
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  return (
    <div>
      {!isFormVisible ? (
        <Button className="add-well-button" onClick={() => setFormVisible(true)}>Add Well Data</Button>
      ) : (
        <Button className="close-form-button" onClick={handleCloseForm}>Close Form</Button>
      )}
      {isFormVisible && (
        <div className="popup">
          <WellForm onAddWell={handleAddWell} onCancel={handleCloseForm} />
        </div>
      )}
      <WellDataTable wellData={wellData} /> 
    </div>
  );
}