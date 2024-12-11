"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import modulesData from "@/data/modules.json";
import { Footer } from "@/components/WaterProductLayout/Footer";
import Navbar from "@/components/WaterProductLayout/Navbar";

const HomeCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

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

  const handleCardClick = (card) => {
    if (card.moduleName === "Water Production") {
      router.push("/waterProduction");
    } else {
      router.push(card.pageLink);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <nav className="h-full max-h-full">
        <Navbar />
        <div className="container mx-auto mt-12 p-4 flex flex-col min-h-screen mb-0 pt-10">
          <div className="flex justify-center mt-4 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {cards.map((card) => (
                <div 
                  key={card.moduleId}
                  className="dark:bg-slate-800 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => handleCardClick(card)}
                >
                  <div className="relative h-40">
                    <Image
                      src={card.moduleImage}
                      alt={card.moduleName}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{card.moduleName}</h2>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                </div>
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
