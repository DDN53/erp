"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

import { ModeToggle } from "../ui/toggle-mode";
import Profile from "./Profile";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const logoPath = useMemo(() => 
    isDarkMode ? "/images/nwsdb_logo_dark1.png" : "/images/nwsdb_logo1.png",
    [isDarkMode]
  );

  const checkDarkMode = useCallback(() => {
    return document.documentElement.classList.contains("dark");
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const updateDarkMode = () => setIsDarkMode(checkDarkMode());
    updateDarkMode();

    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [checkDarkMode]);

  return (
    <nav className="fixed top-0 left-0 w-full p-1 border-b z-50 bg-white dark:bg-black bg-opacity-90">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <Image
            src={logoPath}
            alt="NWSDB logo"
            width={54}
            height={38}
            style={{
              width: "auto",
              height: "100%",
            }}
            priority
          />
        </div>

        {/* Toggle Menu Button */}
        <button className="lg:hidden text-xl" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Right Side: Icons (Desktop View) */}
        <div className="hidden lg:flex lg:items-center space-x-6">
          <Link href="/home" prefetch className="hover:underline">
            Home
          </Link>
          <Link href="/about" prefetch className="hover:underline">
            About
          </Link>
          <Link href="/home/inventory" prefetch className="hover:underline">
            Bill Calculator
          </Link>
          <Link href="/Loan" prefetch className="hover:underline">
            Loan Calculator
          </Link>
          <div className="flex items-center space-x-3">
            <ModeToggle />
            <Profile />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } flex-col lg:hidden items-center w-full bg-white dark:bg-black p-4 border-t`}
      >
        <Link href="/home" prefetch className="hover:underline py-2">
          Home
        </Link>
        <Link href="/about" prefetch className="hover:underline py-2">
          About
        </Link>
        <Link href="/home/inventory" prefetch className="hover:underline py-2">
          Bill Calculator
        </Link>
        <Link href="/Loan" prefetch className="hover:underline py-2">
          Loan Calculator
        </Link>

        {/* Show icons in mobile menu */}
        <div className="flex flex-row space-x-3 mt-2">
          <ModeToggle />
          <Profile />
        </div>
      </div>
    </nav>
  );
}
