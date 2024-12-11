"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from 'next/dynamic';

import { FaEye, FaEyeSlash } from "react-icons/fa";

import adminService from "@/services/adminService";
import { Authenticate } from "@/services/authService";

// Lazy load the Button component
 import { Button } from "@/components/ui/button";

export default function Login() {
  const router = useRouter();
  const [employeeNo, setEmployeeNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    apiError: "",
    employeeNo: "",
    password: "",
  });

  const handleSignIn = async (e) => {
    e.preventDefault();

    setErrors({ apiError: "", employeeNo: "", password: "" });

    let validationErrors = {};
    if (!employeeNo) {
      validationErrors.employeeNo = "Employee number is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await Authenticate(employeeNo, password);

      if (result.success) {
        const data = await adminService.getEmployeeDetails(employeeNo);

        sessionStorage.setItem("costCenter", data.empCostCenter);
        sessionStorage.setItem("designation", data.designation);
        sessionStorage.setItem("employeeName", data.empName);

        router.push("/home");
        sessionStorage.setItem("userType", "regular");
      } else {
        setErrors({ apiError: result.message });
      }
    } catch (error) {
      setErrors({ apiError: "Failed to authenticate. Please try again." });
    }
  };

  const handleForgotPasswordClick = () => {};

  const handleAdminLoginClick = async () => {
    if (!employeeNo || !password) {
      setErrors({
        adminLogin: "Username and Password are required for admin login.",
      });
      return;
    }

    try {
      const result = await adminService.loginAdmin({
        UserName: employeeNo,
        Password: password,
      });
      if (result) {
        sessionStorage.setItem("userType", "admin");

        router.push("/home");
      } else {
        setErrors({ adminLogin: "Invalid admin credentials." });
      }
    } catch (error) {
      setErrors({ adminLogin: "Admin login failed." });
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div
        className="flex-col items-center justify-between flex-1 hidden bg-white md:flex"
        style={{
          backgroundImage: `url("/images/login_image1.jpg")`,
          backgroundSize: "cover",
          width:"1000"
        }}
      >
        <div className="flex-1"></div>
        <p className="mb-4 text-white">Developed by NWSDB IT Division</p>
      </div>
      <div className="flex items-center justify-center flex-1 p-4 bg-white sm:p-6 md:p-8 lg:p-10">
        <form
          className="w-full max-w-sm p-6 bg-gray-100 border rounded-lg sm:p-6 md:p-8 lg:p-10 border-gray-300 shadow-lg"
          onSubmit={handleSignIn}
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/images/Water-Board-Logo1.png"
              alt="Water-Board-Logo"
              className="h-12 mx-2 w-60"
              width={240}
              height={48}
              priority
            />
            <Image
              src="/images/EmblemSriLanka1.png"
              alt="Emblem SriLanka"
              className="h-12 mx-2"
              width={40}
              height={48}
              priority
            />
          </div>
          <h2 className="mb-6 text-2xl font-bold text-left">Login</h2>
          {errors.apiError && <p className="text-error">{errors.apiError}</p>}
          {errors.adminLogin && (
            <p className="text-error">{errors.adminLogin}</p>
          )}
          <div className="mb-4">
            <label htmlFor="employeeNo" className="block mb-2 text-black-700">
              User Name
            </label>
            <input
              type="text"
              id="employeeNo"
              name="employeeNo"
              value={employeeNo}
              onChange={(e) => setEmployeeNo(e.target.value)}
              className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: "white" }}
            />
            {errors.employeeNo && (
              <p className="text-sm text-error">{errors.employeeNo}</p>
            )}
          </div>
          <div className="relative mb-6">
            <label htmlFor="password" className="block mb-2 text-black-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: "white" }}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer pt-7"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.password && (
              <p className="text-sm text-error">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label className="flex items-center mb-3">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <span
              className="self-end text-blue-500 cursor-pointer hover:underline"
              onClick={handleForgotPasswordClick}
            >
              Forgot Password?
            </span>
          </div>
          <div className="mb-4">
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200" type="submit">
              Login
            </Button>
            <div className="flex justify-end mt-2">
              <Button
                variant="outline"
                size="sm"
                type="button"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-200"
                onClick={handleAdminLoginClick}
              >
                Admin Login
              </Button>
            </div>
          </div>
          <div className="text-center">
            <p style={{ color: "#4b5563" }}>
              If you are trouble to login, please contact administration
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
