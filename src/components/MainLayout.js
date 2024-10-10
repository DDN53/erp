import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { FaBars } from "react-icons/fa";

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const generatePath = () => {
    if (!router) return "";
    const pathSegments = router.pathname.split("/").filter(Boolean);
    return pathSegments.join(" > ");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-grow pt-16">
          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className={`fixed flex flex-grow pt-4 top-16 left-0 h-full overflow-auto transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar isOpen={isSidebarOpen} />
          </div>

          {/* Main Content */}
          <div
            className={`flex-grow p-4 overflow-auto transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : ""
            }`}
          >
            {/* Page Path and Toggle Icon */}
            <div className="flex items-center mb-4">
              <FaBars className="cursor-pointer mr-4" onClick={toggleSidebar} />
              {/* <span>{generatePath()}</span> */}
            </div>

            {/* Page content */}
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
