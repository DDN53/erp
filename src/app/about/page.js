"use client";
import MoainLayout from "@/components/MainLayout";
import { Footer } from "@/components/Footer";
import Nav from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
export default function About() {
  return (
    <MoainLayout>
      <main className="p-24">
        <section className="py-24 flex flex-col gap-8">
          <h1 className="text-4xl">About page</h1>
          <p>chgvjb bknll bknjnllkl nklkkjbjhbj</p>
        </section>
        <div className="flex gap-6 py-6">
          <Button variant={"secondary"}>Add</Button>
          <Button>Cancel</Button>
        </div>
      </main>
    </MoainLayout>
  );
}
