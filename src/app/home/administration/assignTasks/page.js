"use client";

import MainLayout from "@/components/WaterProductLayout/MainLayout";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import TextBox from "@/components/TextBox";
import adminService from "@/services/adminService";

const AssignTasks = () => {
  const [formData, setFormData] = useState({
    location: "",
    costCenter: "",
    designation: "",
    employeeNumber: "",
    employee: "",
    email: "",
    contactNumber: "",
    module: "",
    groupProfile: "",
  });
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [moduleData, setModuleData] = useState([]);
  const [expandedModules, setExpandedModules] = useState({});
  const [expandedGroups, setExpandedGroups] = useState({});
  const [expandedProcesses, setExpandedProcesses] = useState({});
  const [selectedTasks, setSelectedTasks] = useState({});
  const [previousTasks, setPreviousTasks] = useState({});

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        setLoading(true);
        const data = await adminService.getAdminModulesWithRelation();
        setModuleData(data || []);
      } catch (err) {
        console.error("Failed to fetch modules:", err);
        setError("Failed to fetch module data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, []);

  useEffect(() => {
    if (employeeNumber) {
      const fetchEmployeeDetails = async (number) => {
        try {
          setLoading(true);
          const data = await adminService.getEmployeeDetails(number);
          setFormData({
            employeeNumber: data.empNo || "",
            location: data.empLocation || "",
            costCenter: data.empCostCenter || "",
            designation: data.designation || "",
            employee: data.empName || "",
            email: data.email || "",
            contactNumber: data.mobile || "",
            module: "",
            groupProfile: "",
          });

          const assignedTasks = await adminService.getAssignedTasks(number);
          const assignedTaskIds = {};
          // console.log("Assigned Tasks Data:", assignedTasks);

          assignedTasks.forEach((assignedModule) => {
            assignedModule.tasks.forEach((task) => {
              assignedTaskIds[task.taskId] = true;
              // console.log(
              //   `Assigned Task ID: ${task.taskId} - ${task.taskName}`
              // );
            });
          });

          setSelectedTasks(assignedTaskIds);
          setPreviousTasks(assignedTaskIds);
          setError(null);
        } catch (err) {
          console.error("Fetch error:", err);
          setError();
          // "Failed to fetch employee details. Please check the employee number and try again."
        } finally {
          setLoading(false);
        }
      };

      fetchEmployeeDetails(employeeNumber);
    } else {
      resetFormData();
    }
  }, [employeeNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetFormData = () => {
    setFormData({
      location: "",
      costCenter: "",
      designation: "",
      employee: "",
      employeeNumber: "",
      email: "",
      contactNumber: "",
      module: "",
      groupProfile: "",
    });
    setSelectedTasks({});
    setPreviousTasks({});
    setEmployeeNumber("");
  };

  const handleEmployeeNumberChange = (e) => {
    const value = e.target.value;
    setEmployeeNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tasksToAdd = Object.keys(selectedTasks).filter(
      (taskId) => selectedTasks[taskId] && !previousTasks[taskId]
    );
    const tasksToRemove = Object.keys(previousTasks).filter(
      (taskId) => !selectedTasks[taskId]
    );

    // console.log("Tasks to Add:", tasksToAdd);
    // console.log("Tasks to Remove:", tasksToRemove);

    try {
      if (tasksToAdd.length > 0 || tasksToRemove.length > 0) {
        const response = await adminService.updateEmployeeTasks(
          employeeNumber,
          {
            employeeId: employeeNumber,
            taskIdsToAdd: tasksToAdd,
            taskIdsToRemove: tasksToRemove,
          }
        );

        // console.log("API Response:", response);

        alert("Tasks updated successfully.");
        setPreviousTasks(selectedTasks);
        resetFormData();
      } else {
        alert("No changes to save.");
      }
    } catch (err) {
      console.error("Error updating tasks:", err);
      setError("Failed to update tasks. Please try again.");
    }
  };

  const toggleModule = (moduleId) => {
    setExpandedModules((prevState) => ({
      ...prevState,
      [moduleId]: !prevState[moduleId],
    }));
  };

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const toggleProcess = (processId) => {
    setExpandedProcesses((prevState) => ({
      ...prevState,
      [processId]: !prevState[processId],
    }));
  };

  const handleTaskSelection = (taskId, isSelected) => {
    setSelectedTasks((prevState) => ({
      ...prevState,
      [taskId]: isSelected,
    }));
  };

  return (
    <MainLayout>
      <div className="p-4 lg:px-40 px-2">
        <h1 className="text-xl font-bold">Assign Tasks</h1>
        <p className="font-bold pb-4">You can assign tasks to new user here.</p>

        <TextBox
          label="Enter Employee Number"
          type="text"
          value={employeeNumber}
          onChange={handleEmployeeNumberChange}
        />
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border p-4 my-4 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <TextBox
                label="Employee Name"
                type="text"
                value={formData.employee}
                onChange={handleChange}
                readOnly
              />
              <TextBox
                label="Employee Number"
                type="text"
                value={formData.employeeNumber}
                onChange={handleChange}
                readOnly
              />
              <TextBox
                label="Designation"
                type="text"
                value={formData.designation}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <TextBox
                label="Location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                readOnly
              />
              <TextBox
                label="Cost Center"
                type="text"
                value={formData.costCenter}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <TextBox
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                readOnly
              />
              <TextBox
                label="Contact Number"
                type="text"
                value={formData.contactNumber}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>

          <div className="border p-4 my-4 rounded-lg overflow-auto text-sm">
            <p className="font-bold pb-4 text-lg">Assign Tasks</p>

            {moduleData.length > 0 ? (
              moduleData.map((module) => (
                <div key={module.moduleId}>
                  <h2
                    onClick={() => toggleModule(module.moduleId)}
                    style={{ cursor: "pointer", paddingTop: "10px" }}
                  >
                    {expandedModules[module.moduleId] ? "▼" : "►"}{" "}
                    {module.moduleName}
                  </h2>
                  {expandedModules[module.moduleId] &&
                    module.groups?.map((group) => (
                      <div key={group.groupId} style={{ marginLeft: "20px" }}>
                        <h3
                          onClick={() => toggleGroup(group.groupId)}
                          style={{ cursor: "pointer" }}
                        >
                          {expandedGroups[group.groupId] ? "▼" : "►"}{" "}
                          {group.groupName}
                        </h3>
                        {expandedGroups[group.groupId] &&
                          group.processes?.map((process) => (
                            <div
                              key={process.processId}
                              style={{ marginLeft: "20px" }}
                            >
                              <h4
                                onClick={() => toggleProcess(process.processId)}
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                {expandedProcesses[process.processId]
                                  ? "▼"
                                  : "►"}{" "}
                                {process.processName}
                              </h4>
                              {expandedProcesses[process.processId] &&
                                process.tasks?.map((task) => (
                                  <div
                                    key={task.taskId}
                                    style={{ marginLeft: "30px" }}
                                  >
                                    <label>
                                      <input
                                        type="checkbox"
                                        checked={!!selectedTasks[task.taskId]}
                                        style={{ marginRight: "10px" }}
                                        onChange={(e) =>
                                          handleTaskSelection(
                                            task.taskId,
                                            e.target.checked
                                          )
                                        }
                                      />
                                      {task.taskName}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
              ))
            ) : (
              <p>No modules found.</p>
            )}
          </div>

          <div className="flex gap-6 py-6">
            <Button type="submit">Submit</Button>
            <Button variant={"secondary"} onClick={resetFormData}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default AssignTasks;
