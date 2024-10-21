"use client";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/MainLayout";

import adminService from "@/services/adminService";

const sections = [
  { id: "general", title: "General" },
  { id: "personal-details", title: "Personal Details" },
  { id: "contact-info", title: "Contact Information" },
  { id: "job-details", title: "Job Details" },
  { id: "employment", title: "Employment" },
];

const Profile = () => {
  const [activeSection, setActiveSection] = useState("general");
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const employeeNo = sessionStorage.getItem("employeeNo");
        const data = await adminService.getEmployeeDetails(employeeNo);
        setEmployeeData(data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const renderLabeledInput = (labelText, defaultValue) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{labelText}</label>
      <Input defaultValue={defaultValue} readOnly />
    </div>
  );

  return (
    <MainLayout>
      <>
        <div className="flex min-h-screen w-full flex-col pt-2">
          <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
              <h1 className="text-3xl font-semibold">Profile</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    className={`text-left font-semibold ${
                      activeSection === section.id
                        ? "text-primary"
                        : "text-gray-600"
                    } hover:text-primary`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
              <div className="grid gap-6">
                {activeSection === "general" && employeeData && (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Details</CardTitle>
                        <CardDescription>
                          Used to identify your personal details.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form className="flex flex-col gap-4">
                          {renderLabeledInput(
                            "Name with Initials",
                            employeeData.empName
                          )}
                          {renderLabeledInput(
                            "Full Name",
                            employeeData.fullName
                          )}
                          {renderLabeledInput(
                            "Date of Birth (DOB)",
                            employeeData.dob
                          )}
                          {renderLabeledInput(
                            "Gender",
                            employeeData.gender === 1 ? "Male" : "Female"
                          )}
                          {renderLabeledInput(
                            "NIC Number",
                            employeeData.niCnumber
                          )}
                        </form>
                      </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>Your contact details.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form className="flex flex-col gap-4">
                          {renderLabeledInput("Mobile", employeeData.mobile)}
                          {renderLabeledInput("Email", employeeData.email)}
                          {renderLabeledInput(
                            "Location",
                            employeeData.empLocation
                          )}
                        </form>
                      </CardContent>
                    </Card>

                    {/* Job Details */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Job Details</CardTitle>
                        <CardDescription>
                          Your job-related information.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form className="flex flex-col gap-4">
                          {renderLabeledInput(
                            "Employee Number (EmpNo)",
                            employeeData.empNo
                          )}
                          {renderLabeledInput(
                            "Designation",
                            employeeData.designation
                          )}
                          {renderLabeledInput(
                            "Designation Category",
                            employeeData.designationCategory
                          )}
                          {renderLabeledInput(
                            "Board Grade",
                            employeeData.boardGrade
                          )}
                          {renderLabeledInput(
                            "Salary Code",
                            employeeData.salaryCode
                          )}
                          {renderLabeledInput(
                            "Employee Cost Center",
                            employeeData.empCostCenter
                          )}
                        </form>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </>
    </MainLayout>
  );
};

export default Profile;
