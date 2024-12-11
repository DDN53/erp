import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

import adminService from "@/services/adminService";

import imagePaths from "@/data/imagePaths";

const Card = ({ title, description, image, link, moduleId, moduleName }) => {
  const router = useRouter();
  const employeeNo = sessionStorage.getItem("employeeNo");

  const handleClick = async () => {
    // ... (rest of the code remains the same)
  };

  return (
    <div
      className="relative group rounded-lg overflow-hidden cursor-pointer h-70 w-48 border transition-colors duration-300 hover:scale-105 hover:shadow-md "
      onClick={handleClick}
    >
      <Image
        src={imagePaths[image]}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
        priority={true}
        unoptimized={true}
        width={300}
        height={300}
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