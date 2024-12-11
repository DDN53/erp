"use client";

import { useState } from "react";

import MainLayout from "@/components/WaterProductLayout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <div className="flex min-h-screen w-full flex-col pt-10 flex-1 flex-col gap-4 p-4 md:gap-6 md:p-8  mx-auto w-full max-w-3xl">
        <h1 className="text-xl font-bold mb-4">User Registration</h1>
        <Card className="rounded-lg border-2 ">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Please fill out the Registration Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium">Employee Number</label>
                <Input
                  type="text"
                  name="empNo"
                  value={formData.empNo}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md p-2 text-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium">Full Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md p-2 text-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium">Phone Number</label>
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handlePhoneNumberInput}
                  required
                  maxLength={10}
                  className="border border-gray-300 rounded-md p-2 text-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md p-2 text-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium">Password</label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md p-2 text-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium">Confirm Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md p-2 text-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium">Security Question</label>
                <select
                  name="securityQuestion"
                  className="border border-gray-300 rounded-md p-2 text-gray-500"
                  value={formData.securityQuestion}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a question
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
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium">Security Answer</label>
                <Input
                  type="text"
                  name="securityAnswer"
                  value={formData.securityAnswer}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md p-2 text-gray-500"
                />
              </div>
              <div className="flex justify-center mt-4">
                <Button variant={"default"} type="submit">
                  Register
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UserRegister;
