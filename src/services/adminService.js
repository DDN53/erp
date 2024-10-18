import apiClient from "./baseService";

// Admin related services
const registerAdmin = async (adminData) => {
  try {
    const response = await apiClient.post("/RegisterAdmin", adminData);
    return response.data;
  } catch (error) {
    console.error(
      "Error registering admin:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const loginAdmin = async (adminLoginData) => {
  try {
    const response = await apiClient.post("/LoginAdmin", adminLoginData);
    return response.data;
  } catch (error) {
    console.error(
      "Error logging in admin:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getAdminTasks = async () => {
  try {
    const response = await apiClient.get("/AdminGetAllGroupTasks");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching admin tasks:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getEmployeeDetails = async (empNo) => {
  try {
    const response = await apiClient.get(`/GetEmployeeNew/${empNo}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching employee details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getModules = async () => {
  try {
    const response = await apiClient.get(`/GetAdminModules`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching modules:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Fetch modules with their related processes and tasks
const getAdminModulesWithRelation = async () => {
  try {
    const response = await apiClient.get(`/GetAdminModulesGroupsWithRelation`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching modules:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getAssignedTasks = async (employeeNumber) => {
  try {
    const response = await apiClient.get(
      `/GetAssignedGroupedTasks/${employeeNumber}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching assigned tasks:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const updateEmployeeTasks = async (employeeNumber, taskUpdates) => {
  try {
    const response = await apiClient.put(
      `/UpdateEmployeeGroupedTasks/${employeeNumber}`,
      taskUpdates
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating employee tasks:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const response = await apiClient.post("/CreateUser", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const resetPassword = async (userCredentials) => {
  try {
    const response = await apiClient.post("/ResetPassword", userCredentials);
    return response.data;
  } catch (error) {
    console.error(
      "Error resetting password:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Export all service methods
export default {
  registerAdmin,
  loginAdmin,
  getAdminTasks,
  getEmployeeDetails,
  getModules,
  getAdminModulesWithRelation,
  getAssignedTasks,
  updateEmployeeTasks,
  createUser,
  resetPassword,
};
