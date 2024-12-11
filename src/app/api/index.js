import axios from "axios";

const config = () => {
  return {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
};

const API = axios.create({
  //baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000",
  baseURL: "http://localhost:5000",
  //baseURL: "http://10.0.19.207:5000",
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getEmployee = async (data) => {
  const response = await API.get("api/users/getemployee");
  return response.data;
};

const signin = async (loginData) => {
  console.log(loginData);
  const response = await API.post("api/users/login", loginData);
  return response.data;
};

const signup = async (data) => {
  const response = await API.post("api/users/register", data);
  return response.data;
};

const sendVerificationCode = async (data) => {
  const response = await API.post(
    "api/users/sendVerificationCode",
    data,
    config()
  );
  return response.data;
};

const submitVerficationCode = async (data) => {
  const response = await API.post(
    "api/users/submitVerificationCode",
    data,
    config()
  );
  return response.data;
};

const changePassword = async (data) => {
  const response = await API.post("api/users/resetPassword", data);
  return response.data;
};

const getProfile = async () => {
  const response = await API.get("api/users/profile");
  return response.data;
};
const viewallwells = async () => {
  const response = await API.get("api/users/viewallwells");
  return response.data;
};

const viewwell = async (newWellNo) => {
  const response = await API.get(
    `api/users/viewwell?newWellNumber=${newWellNo}`,
    config()
  );
  return response.data;
};

const addwell = async (data) => {
  try {
    const response = await API.post("api/users/addwell", data);
    
    // Log the full response for debugging
    console.log('Full API Response:', response);
    
    // Validate response structure
    if (!response || !response.data) {
      throw new Error('Invalid API response structure');
    }
    
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Re-throw to handle in component
  }
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

const api = {
  signin,
  signup,
  submitVerficationCode,
  sendVerificationCode,
  changePassword,
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
  addDrillingData
};
export default api;
