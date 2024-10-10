"use client";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button for the profile icon */}
      <button onClick={toggleDropdown} className="focus:outline-none">
        <FaUserCircle size={30} className="cursor-pointer" />
      </button>

      {/* Profile Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-black bg-opacity-90 border">
          <div className="flex items-center p-4 border-b">
            {/* <img
              src={FaUserCircle}
              alt="Profile"
              className="h-10 w-10 rounded-full mr-2"
            /> */}
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="pl-4">
              <p className="text-sm font-medium">A.B.Perera</p>
              <p className="text-xs">IT</p>
            </div>
          </div>
          <ul className="py-1">
            <li>
              <a href="/profile" className="block px-4 py-2">
                Profile
              </a>
            </li>
            {/* <li>
              <a href="/settings" className="block px-4 py-2 hover:bg-gray-200">
                Settings
              </a>
            </li> */}
            <li>
              <a href="/logout" className="block px-4 py-2 hover:bg-gray-200">
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
