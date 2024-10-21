import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

import adminService from "@/services/adminService";

import imagePaths from "@/public/images/homeCardImages/imagePaths";

import img from "@/public/images/homeCardImages/Administration.jpg";

const Card = ({ title, description, image, link, moduleId, moduleName }) => {
  const router = useRouter();
  const employeeNo = sessionStorage.getItem("employeeNo");

  const handleClick = async () => {
    // console.log("Card clicked!");
    // console.log("Employee number from session:", employeeNo);
    const userType = sessionStorage.getItem("userType");

    // Cookies.set("moduleId", moduleId);
    // Cookies.set("moduleName", moduleName);

    try {
      let tasks;

      // Fetch tasks based on user type
      if (userType === "regular") {
        tasks = await adminService.getAssignedTasks(employeeNo);
      } else if (userType === "admin") {
        tasks = await adminService.getAdminTasks();
      } else {
        throw new Error("Unknown user type");
      }

      // console.log("Tasks fetched:", tasks);

      const allTasks = tasks
        .filter((module) => module.moduleId === moduleId)
        .flatMap((module) => module.tasks);
      // console.log("allTasks:", allTasks);

      const relevantTaskIds = allTasks.map((task) => task.taskId);
      // console.log("assignedTaskIds:", relevantTaskIds);

      const relevantTasks = tasks.filter((task) => task.moduleId === moduleId);
      console.log("Relevant tasks to save in cookie:", relevantTasks);

      Cookies.set("assignedTaskIds", JSON.stringify(relevantTaskIds), {
        expires: 1,
      });
      Cookies.set("moduleId", moduleId);
      Cookies.set("moduleName", moduleName);

      router.push(link);
    } catch (error) {}
  };

  return (
    <div
      className="relative group rounded-lg overflow-hidden cursor-pointer h-70 w-48 border"
      onClick={handleClick}
    >
      {/* <p>{JSON.stringify(image)}</p>
      <p>{image}</p>
      <p>{imagePaths[image]}</p> */}
      <Image
        src={imagePaths[image]}
        width={300}
        height={300}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
        unoptimized={true}
      />
      <div className="p-2 text-center">
        <h2 className="text-sm font-bold">{title}</h2>
      </div>
      <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-center p-4">{description}</p>
      </div>
    </div>
  );
};

export default Card;
