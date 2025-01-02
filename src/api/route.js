import axios from "axios";



const API = axios.create({
  //baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000",
   baseURL: "http://localhost:8000",
  //baseURL: "http://192.168.1.3:8000",
});


const addwell = async (data) => {
  const response = await API.post("api/users/addwell", data);
  return response.data;
};


const viewallwells = async () => {
  const response = await API.get("api/users/viewallwells");
  return response.data;
};

const viewwell = async (newWellNumber) => {
  const response = await API.get(
    `api/users/viewwell?newWellNumber=${newWellNumber}`,
    config()
  );
  return response.data;
};


const editwell = async (newWellNo, data) => {
  const response = await API.put(`api/users/editwell/${newWellNo}`, data);
  return response.data;
};

const removewell = async (newWellNo) => {
  const response = await API.delete(`api/users/removewell/${newWellNo}`);
  return response.data;
};

const viewallusers = async () => {
  const response = await API.get("api/users/viewallusers");
  return response.data;
};
const edituser = async (data) => {
  const response = await API.post("api/users/edituser", data);
  return response.data;
};

const deleteuser = async (userName) => {
  const response = await API.post(`api/users/deleteuser/${userName}`);
  return response.data;
};

const province = async () => {
  const response = await API.get("api/comman/getAllProvinces");
  return response.data;
};

const addmonthlydata = async (data) => {
  const response = await API.post("api/users/monthlyData", data);
  return response.data;
};

const viewallmonthlydata = async () => {
  const response = await API.get("api/users/monthlyData");
  return response.data;
};

const viewmonthlydata = async (mid) => {
  const response = await API.get(
    `api/users/monthlyData?mid=${mid}`,
    config()
  );
  return response.data;
};

const editmonthlydata = async (mid, data) => {
  const response = await API.put(`api/users/editmonthlydata/${mid}`, data);
  return response.data;
};

const removemonthlydata = async (mid) => {
  const response = await API.delete(
    `api/users/monthlyData/${mid}`,
  
  );
  return response.data;
};
const generateWellReportPDF = async (data) => {
  return await API.post(`api/users/report/pdf`, data, {
    responseType: 'blob' 
  });
};

const generateWellReportExcel = async (data) => {
  return await API.post(`api/users/report/excel`, data, {
    responseType: 'blob' 
  });
};

const monthlyDataReportPDF = async (wellNo) => {
  return await API.get(`api/users/monthlyData/export/pdf?wellNo=${wellNo}`, {
    responseType: 'blob' 
  });
};

const monthlyDataReportExcel = async (wellNo) => {
  return await API.get(`api/users/monthlyData/export/excel?wellNo=${wellNo}`, {
    responseType: 'blob' 
  });
};

const AddwaterQuality = async (data) => {
  const response = await API.post("api/waterQuality/", data);
  return response.data;
};

const AddWeatherCondition = async (data) => {
    const response = await API.post("api/waterQuality/wether", data);
    return response.data;
};
const waterQualityEdit = async (data) => {
  const response = await API.post("api/waterQuality/edit", data);
  return response.data;
};
const waterQualityDelete = async (data) => {
  const response = await API.post("api/waterQuality/delete", data);
  return response.data;
};
const waterQualityView = async (data) => {
  const response = await API.get("api/waterQuality/view", data);
  return response.data;
};
const waterQualityUpdate = async (id, data) => {
  const response = await API.put(`api/waterQuality/${id}`, data);
  return response.data;
};

const addChemicalData = async (data) => {
  const response = await API.post("api/users/chemical-data", data);
  return response.data;
};

const addDrillingData = async (data) => {
  const response = await API.post("api/users/drilling-data", data);
  return response.data;
};
const savewaterquality = async (data) => {
  try {
    const response = await API.post("api/waterquality/save", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("API Response:", response);

    // Validate the response structure and success field
    if (!response || !response.data || !response.data.success) {
      throw new Error(
        "Invalid API response structure or unsuccessful operation"
      );
    }

    return response.data; // Return the successful response data
  } catch (error) {
    console.error("API Error:", error);

    // Handle errors gracefully by rethrowing them for further handling
    throw new Error(
      error.response?.data?.message || "An error occurred while saving data"
    );
  }
};



const api = {
  viewallwells,
  addwell,
  viewwell,
  removewell,
  editwell,
  viewallusers,
  edituser,
  addmonthlydata,
  removemonthlydata,
  editmonthlydata,
  viewmonthlydata,
  viewallmonthlydata,
  deleteuser,
  generateWellReportPDF,
  generateWellReportExcel,
  AddwaterQuality,
  waterQualityView,
  waterQualityUpdate,
  monthlyDataReportPDF,
  monthlyDataReportExcel,
  AddWeatherCondition,
  addChemicalData,
  addDrillingData,
  savewaterquality,
  province


};
export default api;
