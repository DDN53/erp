import apiClient from "./baseService";

const GetAllLocations = async () => {
  try {
    const response = await apiClient.get(`/comman/GetAllLocations`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching locations:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const GetLocationsList = async () => {
  try {
    const response = await apiClient.get(`/GetLocationsList`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching location list:",
      error.response ? error.response.data : error.messageGetAllLocations
    );
    throw error;
  }
};

const GetAllCostCenters = async () => {
  try {
    const response = await apiClient.get(`/comman/GetAllCostCenters`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching cost centers:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const GetLocationWiseCostCenters = async (locId) => {
  try {
    const response = await apiClient.get(`/comman/GetLocationWiseCostCenters`, {
      params: { locId },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching location-wise cost centers:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const GetAllDesignations = async () => {
  try {
    const response = await apiClient.get(`/GetAllDesignations`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching designations:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const GetAllBoardGrades = async () => {
  try {
    const response = await apiClient.get(`/GetAllBoardGrades`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching board gardes:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const GetAllEmpTypes = async () => {
  try {
    const response = await apiClient.get(`/GetAllEmpTypes`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching employee types:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const GetAllEmployeeStatus = async () => {
  try {
    const response = await apiClient.get(`/GetAllEmployeeStatus`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching employee status:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const GetAllDesignationCategories = async () => {
  try {
    const response = await apiClient.get(`/GetAllDesignationCategories`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching designation categories:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const GetAllSalaryCodes = async () => {
  try {
    const response = await apiClient.get(`/GetAllSalaryCodes`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching salary codes:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
// audit
const GetAll = async () => {
  try {
    const response = await apiClient.get(`/audit/getAllActivities`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching salary codes:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default {
  GetAllLocations,
  GetLocationsList,
  GetAllCostCenters,
  GetLocationWiseCostCenters,
  GetAllDesignations,
  GetAllBoardGrades,
  GetAllEmpTypes,
  GetAllEmployeeStatus,
  GetAllDesignationCategories,
  GetAllSalaryCodes,
  GetAll,
};
