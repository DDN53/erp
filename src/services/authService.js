import apiClient from "./baseService";

export const Authenticate = async (employeeNo, password) => {
  try {
    // console.log("Sending request with:", {
    //   userName: employeeNo,
    //   password: password,
    // });

    const response = await apiClient.post("/Authenticate", {
      userName: employeeNo,
      password: password,
    });

    // console.log("API Response: ", response);

    if (response.data.status === "200") {
      const token = response.data.data;
      // console.log("Response Data: ", response.data);

      // Check if we are in the browser (client-side) before accessing localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("jwtToken", token);
        sessionStorage.setItem("employeeNo", employeeNo);
      }
      // console.log("Token stored:", token);

      return { success: true };
    } else {
      if (response.status === 401) {
        return { success: false, message: "Incorrect username or password" };
      } else {
        return { success: false, message: "Authentication failed" };
      }
    }
  } catch (error) {
    // console.error("Authentication error: ", error.response || error.message);
    return {
      success: false,
      message: "Authentication failed. Please try again.",
    };
  }
};
