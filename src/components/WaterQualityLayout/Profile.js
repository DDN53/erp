"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

import { FaUserCircle } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [empName, setEmpName] = useState("");
  const [designation, setDesignation] = useState("");

  useEffect(() => {
    const storedEmpName = sessionStorage.getItem("employeeName");
    const storedDesignation = sessionStorage.getItem("designation");

    if (storedEmpName) {
      setEmpName(storedEmpName);
    }

    if (storedDesignation) {
      setDesignation(storedDesignation);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();

    const allCookies = Cookies.get();
    for (let cookie in allCookies) {
      Cookies.remove(cookie);
    }

    router.push("/");
  };

  return (
    <div>
      {/* Button for the profile icon */}
      <button onClick={toggleDropdown} className="focus:outline-none">
        <FaUserCircle size={30} className="cursor-pointer" />
      </button>

      {/* Profile Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-lg bg-white dark:bg-black bg-opacity-90 border">
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
              <p className="text-sm font-medium">{empName}</p>
              <p className="text-xs">{designation}</p>
            </div>
          </div>
          <ul className="py-1">
            <li>
              <a href="/profile" className="block px-4 py-2">
                Profile
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
