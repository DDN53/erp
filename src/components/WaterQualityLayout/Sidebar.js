import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import adminService from "@/services/adminService";

import {
  FaChevronDown,
  FaChevronRight,
  FaFileAlt,
  FaCog,
  FaDatabase,
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
} from "react-icons/fa";
import Cookies from "js-cookie";
import reportData from "@/data/reportData.json";

//import taskData from "@/data/task.json";

const Sidebar = ({ isOpen }) => {
  const [expandedGroupId, setExpandedGroupId] = useState(null);
  const [expandedProcessId, setExpandedProcessId] = useState(null);
  const [expandedReportProcessId, setExpandedReportProcessId] = useState(null);

  const [isMainProcessExpanded, setIsMainProcessExpanded] = useState(false);
  const [isReportsExpanded, setIsReportsExpanded] = useState(false);
  const [menuData, setMenuData] = useState([]);

  const [wellData, setWellData] = useState([]);

  const moduleId = parseInt(Cookies.get("moduleId"), 10);
  const moduleName = Cookies.get("moduleName");

  const filteredReportData = reportData.filter(
    (process) => process.moduleId === moduleId
  );

  useEffect(() => {
    fetchDataFromCookies();
  }, []);

  const fetchDataFromCookies = async () => {
    const taskIdsCookie = Cookies.get("assignedTaskIds");
    const userType = sessionStorage.getItem("userType");
    const employeeNo = sessionStorage.getItem("employeeNo");

    if (taskIdsCookie) {
      try {
        const taskIds = JSON.parse(taskIdsCookie);
        let fetchedData = [];

        if (userType === "regular") {
          fetchedData = await adminService.getAssignedTasks(employeeNo);
        } else if (userType === "admin") {
          fetchedData = await adminService.getAdminTasks();
        } else {
          throw new Error("Unknown user type");
        }

        const relevantGroups = fetchedData.reduce((acc, item) => {
          const filteredTasks = item.tasks
            .filter((task) => taskIds.includes(task.taskId))
            .reduce((uniqueTasks, task) => {
              if (!uniqueTasks.find((t) => t.taskId === task.taskId)) {
                uniqueTasks.push(task);
              }
              return uniqueTasks;
            }, []);

          if (filteredTasks.length > 0) {
            const existingGroup = acc.find(
              (group) => group.groupId === item.groupId
            );
            if (existingGroup) {
              existingGroup.processes.push({
                processId: item.processId,
                processName: item.processName,
                tasks: filteredTasks,
              });
            } else {
              acc.push({
                groupId: item.groupId,
                groupName: item.groupName,
                processes: [
                  {
                    processId: item.processId,
                    processName: item.processName,
                    tasks: filteredTasks,
                  },
                ],
              });
            }
          }
          return acc;
        }, []);

        setMenuData(relevantGroups);
      } catch (error) {
        console.error("Error fetching tasks based on cookie data:", error);
        setMenuData([]);
      }
    } else {
      console.log("No task IDs found in cookies.");
      setMenuData([]);
    }
  };

  const toggleGroup = (groupId) => {
    setExpandedGroupId((prevGroupId) =>
      prevGroupId === groupId ? null : groupId
    );
  };

  const toggleProcess = (processId) => {
    setExpandedProcessId((prevProcessId) =>
      prevProcessId === processId ? null : processId
    );
  };

  const toggleMainProcess = () => {
    setIsMainProcessExpanded((prev) => {
      if (!prev) setIsReportsExpanded(false);
      return !prev;
    });
  };

  const toggleReports = () => {
    setIsReportsExpanded((prev) => {
      if (!prev) setIsMainProcessExpanded(false);
      return !prev;
    });
  };

  const toggleReportProcess = (rptProcessId) => {
    setExpandedReportProcessId((prevProcessId) =>
      prevProcessId === rptProcessId ? null : rptProcessId
    );
  };

  const toggleWellData = () => {
    setIsWellDataExpanded((prev) => {
      if (!prev) {
        setIsReportsExpanded(false);
        setIsMainProcessExpanded(false);
        setIsMonthlyDataExpanded(false);
      }
      return !prev;
    });
  };

  const toggleMonthlyData = () => {
    setIsMonthlyDataExpanded((prev) => {
      if (!prev) {
        setIsReportsExpanded(false);
        setIsMainProcessExpanded(false);
        setIsWellDataExpanded(false);
      }
      return !prev;
    });
  };

  // const isActiveTask = (taskUrl) => location.pathname === taskUrl;
  const isActiveTask = (taskUrl) => {
    return (
      typeof window !== "undefined" && window.location.pathname === taskUrl
    );
  };

  // const isActiveProcess = (processId) => {
  //   const activeTaskUrl = location.pathname;
  //   return menuData
  //     .find((group) =>
  //       group.processes.some((process) => process.processId === processId)
  //     )
  //     ?.processes.some((process) =>
  //       process.tasks.some((task) => task.taskUrl === activeTaskUrl)
  //     );
  // };
  const isActiveProcess = (processId, isReport = false) => {
    const activeTaskUrl =
      typeof window !== "undefined" && window.location.pathname;

    if (!isReport) {
      return menuData
        .find((group) =>
          group.processes.some((process) => process.processId === processId)
        )
        ?.processes.some((process) =>
          process.tasks.some((task) => task.taskUrl === activeTaskUrl)
        );
    } else {
      return filteredReportData
        .find((process) => process.rptProcessId === processId)
        ?.rptTasks.some((task) => task.rptTaskUrl === activeTaskUrl);
    }
  };

  return (
    <div
      className={classNames(
        "w-64 transition-transform transform border-r  ml-0",
        {
          "-translate-x-full": !isOpen,
          "translate-x-0": isOpen,
        },
        "md:block"
      )}
    >
      {/* Module Name Section */}
      <div className="text-center font-bold p-2 border-b  cursor-pointer ">
        {moduleName}
      </div>

      {/* Main Process Section */}
      <div
        className="p-2 mt-2 mx-4 text-sm font-bold flex items-center justify-between cursor-pointer border-2 rounded-lg hover:bg-gray-400 "
        onClick={toggleMainProcess}
      >
        <FaCog className="mr-2" style={{ color: "blue", fontSize: "20px" }} />{" "}
        MAIN PROCESS
        {isMainProcessExpanded ? <FaChevronDown /> : <FaChevronRight />}
      </div>

      {isMainProcessExpanded && (
        <div className="p-1 overflow-y-auto max-h-[calc(100vh-210px)]">
          {/* Well Data Section - Now inside Main Process */}
          <div className="ml-0 mb-2 font-semibold">
            <h4 className="text-sm ml-2 cursor-pointer flex items-center border-b p-1 pb-2 pt-2 hover:bg-gray-400 rounded-md">
              <FaDatabase className="mr-2" style={{ color: "blue", fontSize: "20px" }} />
              WaterQuality 
            </h4>
            <div className="ml-4 p-1 hover:bg-gray-400 rounded-md">
              <Link href="/waterQuality" className="cursor-pointer text-sm font-medium">
              WaterQuality Dashboard
              </Link>
            </div>
            <div className="ml-4 p-1 hover:bg-gray-400 rounded-md">
              <Link href="/waterQuality/addwell" className="cursor-pointer text-sm font-medium">
                WaterQuality Data
              </Link>
            </div>
          </div>

          {/* Monthly Data Section - Now inside Main Process */}
          <div className="ml-0 mb-2 font-semibold">
            <h4 className="text-sm ml-2 cursor-pointer flex items-center border-b p-1 pb-2 pt-2 hover:bg-gray-400 rounded-md">
              <FaCalendarAlt className="mr-2" style={{ color: "blue", fontSize: "20px" }} />
              MONTHLY DATA
            </h4>
            <div className="ml-4 p-1 hover:bg-gray-400 rounded-md">
              <Link href="/waterQuality/monthlyData" className="cursor-pointer text-sm font-medium">
                Monthly Data
              </Link>
            </div>
          </div>

          {menuData.map((group) => (
            <div key={group.groupId} className="ml-0 mb-2 font-semibold">
              <h4
                onClick={() => toggleGroup(group.groupId)}
                className="text-sm ml-2 cursor-pointer flex justify-between items-center border-b p-1 pb-2 pt-2 hover:bg-gray-400 rounded-md"
              >
                {group.groupName}
                {expandedGroupId === group.groupId ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </h4>

              {expandedGroupId === group.groupId &&
                group.processes.map((process) => (
                  <div key={process.processId} className="ml-4">
                    <h5
                      onClick={() => toggleProcess(process.processId)}
                      // className="text-sm ml-2 cursor-pointer flex justify-between items-center border-b p-1 pb-2 pt-2 hover:bg-gray-400 rounded-md"
                      className={`text-sm ml-2 cursor-pointer flex justify-between items-center border-b p-1 pb-2 pt-2 hover:bg-gray-400 rounded-md ${
                        isActiveProcess(process.processId) ? "bg-gray-300" : ""
                      }`}
                    >
                      {process.processName}
                      {expandedProcessId === process.processId ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </h5>

                    {expandedProcessId === process.processId &&
                      process.tasks.map((task) => (
                        <Link
                          href={task.taskUrl || "#"}
                          key={task.taskId}
                          className="cursor-pointer text-sm font-medium mt-0"
                        >
                          <div
                            className={`ml-4 p-1 hover:bg-gray-400 rounded-md ${
                              isActiveTask(task.taskUrl) ? "bg-gray-400" : ""
                            }`}
                          >
                            {task.taskName}
                          </div>
                        </Link>
                      ))}
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}

      {/* Reports Section */}
      <div
        className="p-2 mt-2 mx-4 mb-2 text-sm font-bold flex items-center justify-between cursor-pointer border-2 rounded-lg hover:bg-gray-400"
        onClick={toggleReports}
      >
        <FaFileAlt
          className="mr-2"
          style={{ color: "blue", fontSize: "20px" }}
        />{" "}
        REPORTS
        {isReportsExpanded ? <FaChevronDown /> : <FaChevronRight />}
      </div>

      {isReportsExpanded && (
        <div className="p-1 overflow-y-auto max-h-[calc(100vh-230px)]">
          {/* Well Info Reports */}
          <div className="ml-0 mb-2 font-semibold">
            <Link href="/waterQuality/wellreport" className="cursor-pointer text-sm font-medium mt-0">
              <div className="ml-4 p-1 hover:bg-gray-400 rounded-md flex items-center">
                <FaChartBar className="mr-2" style={{ color: "blue" }} />
                Well Status Report
              </div>
            </Link>
          </div>

          {/* Monthly Data Reports */}
          <div className="ml-0 mb-2 font-semibold">
            <Link href="/waterQuality/monthlyreport" className="cursor-pointer text-sm font-medium mt-0">
              <div className="ml-4 p-1 hover:bg-gray-400 rounded-md flex items-center">
                <FaChartLine className="mr-2" style={{ color: "blue" }} />
                Monthly Status Report
              </div>
            </Link>
          </div>

          {/* Existing Report Data */}
          {filteredReportData.map((process) => (
            <div key={process.rptProcessId} className="ml-0 mb-2 font-semibold">
              <h4
                onClick={() => toggleReportProcess(process.rptProcessId)}
                style={{
                  backgroundColor: isActiveProcess(process.rptProcessId)
                    ? gray
                    : undefined,
                }}
                className="text-sm ml-2 cursor-pointer flex justify-between items-center border-b p-1 pb-2 pt-2 hover:bg-gray-400 rounded-md"
              >
                {process.rptProcessName}
                {expandedReportProcessId === process.rptProcessId ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </h4>

              {expandedReportProcessId === process.rptProcessId &&
                process.rptTasks.map((task) => (
                  <Link
                    key={task.rptTaskId}
                    href={task.rptTaskUrl || "#"}
                    className="cursor-pointer text-sm  font-medium mt-0"
                  >
                    <div
                      // key={task.rptTaskId}
                      className={`ml-4 p-1 hover:bg-gray-400 rounded-md ${
                        isActiveTask(task.taskUrl) ? "bg-gray-300" : ""
                      }`}
                    >
                      {task.rptTaskName}
                    </div>
                  </Link>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
