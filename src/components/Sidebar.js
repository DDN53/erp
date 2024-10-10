import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import {
  FaChevronDown,
  FaChevronRight,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";
import Cookies from "js-cookie";
import reportData from "@/data/reportData.json";
import taskData from "@/data/task.json";

const Sidebar = ({ isOpen }) => {
  const [expandedGroupId, setExpandedGroupId] = useState(null);
  const [expandedProcessId, setExpandedProcessId] = useState(null);

  const [isMainProcessExpanded, setIsMainProcessExpanded] = useState(false);
  const [isReportsExpanded, setIsReportsExpanded] = useState(false);
  const [menuData, setMenuData] = useState([]);

  const moduleId = parseInt(Cookies.get("moduleId"), 10);
  const moduleName = Cookies.get("moduleName");

  const filteredReportData = reportData.filter(
    (process) => process.moduleId === moduleId
  );

  useEffect(() => {
    fetchDataFromCookies();
  }, []);

  const fetchDataFromCookies = () => {
    const taskIdsCookie = Cookies.get("assignedTaskIds");
    console.log("Task IDs cookie:", taskIdsCookie);
    console.log("Module ID:", moduleId);
    console.log("Module Name:", moduleName);

    if (taskIdsCookie) {
      const taskIds = JSON.parse(taskIdsCookie);
      console.log("Parsed Task IDs:", taskIds);

      console.log("Task Data:", taskData);

      const relevantTasks = taskData
        .filter((task) => {
          const isMatch =
            task.moduleId === moduleId && taskIds.includes(task.taskId);
          console.log(
            `Checking Task ID: ${task.taskId}, Module ID: ${task.moduleId}, Match: ${isMatch}`
          );
          return isMatch;
        })
        .reduce((acc, task) => {
          const existingGroup = acc.find(
            (group) => group.groupId === task.groupId
          );
          if (existingGroup) {
            const existingProcess = existingGroup.processes.find(
              (process) => process.processId === task.processId
            );
            if (existingProcess) {
              existingProcess.tasks.push(task);
            } else {
              existingGroup.processes.push({
                processId: task.processId,
                processName: task.processName,
                tasks: [task],
              });
            }
          } else {
            acc.push({
              groupId: task.groupId,
              groupName: task.groupName,
              processes: [
                {
                  processId: task.processId,
                  processName: task.processName,
                  tasks: [task],
                },
              ],
            });
          }
          return acc;
        }, []);

      console.log("Relevant Tasks:", relevantTasks);
      setMenuData(relevantTasks);
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
      <div className="text-center font-bold p-2 border-b hover:bg-sky-700 cursor-pointer ">
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
          {menuData.map((group) => (
            <div key={group.groupId} className="ml-0 mb-2 font-semibold">
              <h4
                onClick={() => toggleGroup(group.groupId)}
                className="text-xl ml-2 cursor-pointer flex justify-between items-center border-b p-1 pb-2 pt-2 hover:bg-gray-400 rounded-md"
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
                      className="text-lg ml-2 cursor-pointer flex justify-between items-center border-b p-1 pb-2 pt-2 hover:bg-gray-400 rounded-md"
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
                          className="cursor-pointer text-lg font-semibold mt-0"
                        >
                          <div className="ml-4 p-1 hover:bg-gray-400 rounded-md">
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
        <div className="p-1 overflow-y-auto max-h-[calc(100vh-210px)]">
          {filteredReportData.map((process) => (
            <div key={process.processId}>
              <Link
                href={process.processUrl || "#"}
                className="text-lg font-semibold cursor-pointer ml-4"
              >
                <div className="ml-4 p-1 hover:bg-gray-400 rounded-md">
                  {process.processName}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
