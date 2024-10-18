"use client";

import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import adminService from "@/services/adminService";
const UserRegister = () => {
  const [formData, setFormData] = useState({
    empNo: "",
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneNumberInput = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await adminService.post(`/CreateUser`, formData);
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert("Failed to create user.");
    }
  };

  return (
    <MainLayout>
      <div className="flex min-h-screen w-full flex-col pt-10 ">
        {/* <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-6 md:p-8 shadow-lg rounded-lg mx-auto w-full max-w-3xl"> */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          User Registration
        </h1>
        <Card className="shadow-md rounded-lg border-2 border-gray-150">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-400">
              Please fill Registration Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {[
                "empNo",
                "name",
                "phoneNumber",
                "email",
                "password",
                "confirmPassword",
                "securityAnswer",
              ].map((field) => (
                <div key={field} className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-800">
                    {field.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <Input
                    type={
                      field === "phoneNumber"
                        ? "tel"
                        : field === "email"
                        ? "email"
                        : "text"
                    }
                    name={field}
                    value={formData[field]}
                    onChange={
                      field === "phoneNumber"
                        ? handlePhoneNumberInput
                        : handleChange
                    }
                    required
                    maxLength={field === "phoneNumber" ? 10 : undefined}
                    className="border border-gray-300 rounded-md p-2 text-gray-500"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-800">
                  Security Question
                </label>
                <select
                  name="securityQuestion"
                  className="border border-gray-300 rounded-md p-2 text-gray-500"
                  value={formData.securityQuestion}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {[
                    "What was the name of your first pet?",
                    "What is your mother’s maiden name?",
                    "What was the make and model of your first car?",
                    "In what city were you born?",
                  ].map((question, index) => (
                    <option key={index} value={question}>
                      {question}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-6 rounded-lg shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Register
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* </main> */}
      </div>
    </MainLayout>
  );
};

export default UserRegister;
