"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/card";
import modulesData from "@/data/modules.json";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const HomeCards = () => {
  const [cards, setCards] = useState(modulesData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      setCards(modulesData);
    } catch (err) {
      setError("Failed to load modules");
      console.error("Error loading modules:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <>
      <nav className="h-full max-h-full">
        <Navbar />
       

        <div className="container mx-auto mt-12 p-4 flex flex-col min-h-screen mb-0 pt-10">
          <div className="flex justify-center mt-4 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {cards.map((card) => (
                <Card
                  key={card.moduleId}
                  title={card.moduleName}
                  description={card.description}
                  image={card.moduleImage}
                  link={card.pageLink}
                  moduleId={card.moduleId}
                  moduleName={card.moduleName}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>
      <Footer />
    </>
  );
};

export default HomeCards;
