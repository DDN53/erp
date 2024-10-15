import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

import img from "@/public/images/homeCardImages/Administration.jpg";

const Card = ({ title, description, image, link, moduleId, moduleName }) => {
  const router = useRouter();

  const handleClick = async () => {
    console.log("Card clicked!");
    Cookies.set("moduleId", moduleId);
    Cookies.set("moduleName", moduleName);

    const taskIds = [51, 52, 53, 54, 55];
    Cookies.set("assignedTaskIds", JSON.stringify(taskIds));
    router.push(link);
  };

  return (
    <div
      className="relative group rounded-lg overflow-hidden cursor-pointer h-70 w-48 border"
      onClick={handleClick}
    >
      <p>{JSON.stringify(image)}</p>
      <Image
        src={image}
        // src={img}
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
