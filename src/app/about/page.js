"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MoonLoader } from "react-spinners";

// Loading animation using TailwindCSS and Framer Motion
const LoadingAnimation = () => (
  <motion.div
    className="flex flex-col items-center justify-center h-32"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <MoonLoader size={30} color="#4B5563" />
    <p className="mt-4 text-gray-500">Loading...</p>
  </motion.div>
);

// Dynamically import MainLayout with SSR disabled and lazy loading
const MainLayout = dynamic(
  () =>
    import("@/components/WaterProductLayout/MainLayout").then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <LoadingAnimation />
  }
);

const Button = dynamic(
  () => import("@/components/ui/button").then((mod) => mod.Button),
  { 
    ssr: false,
    loading: () => <LoadingAnimation />
  }
);

export default function About() {
  return (
    <MainLayout>
      <main className="p-24">
        <section className="py-24 flex flex-col gap-8">
          <h1 className="text-4xl font-bold text-gray-800">About Page</h1>
          <p className="text-lg text-gray-600">
            chgvjb bknll bknjnllkl nklkkjbjhbj
          </p>
        </section>
        <div className="flex gap-6 py-6">
          <Button variant="secondary">Add</Button>
          <Button>Cancel</Button>
        </div>
      </main>
    </MainLayout>
  );
}
