"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

import { ModeToggle } from "./ui/toggle-mode";
import Profile from "./Profile";

import logo from "@/public/images/nwsdb_logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className=" fixed top-0 left-0 w-full p-2 border-b z-50 bg-white dark:bg-black bg-opacity-90">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Logo */}
        <Link href="/">
          <Image
            className="dark:invert"
            src={logo}
            alt="NWSDB logo"
            width={60}
            height={38}
            priority
          />
        </Link>

        <button className="lg:hidden text-xl" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Right Side: Links */}
        {/* <div className=" flex item-center space-x-6"> */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col lg:flex lg:flex-row lg:items-center space-x-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white dark:bg-black lg:bg-transparent p-4 lg:p-0 z-50 border lg:border-none`}
        >
          <Link href="/home" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/Bill" className="hover:underline">
            Bill Calculator
          </Link>
          <Link href="/Loan" className="hover:underline">
            Loan Calculator
          </Link>
          <div className="flex flex-row space-x-3">
            <ModeToggle />
            <Profile />
          </div>
        </div>
      </div>
    </nav>
  );
}
