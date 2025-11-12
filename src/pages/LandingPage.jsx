import React from "react";

// ✅ Import Landing Page Section Components
import Hero from "@/components/landingPage/Hero";
import Courses from "@/components/landingPage/Courses";
import Categories from "@/components/landingPage/Categories";
import FeaturedInstructor from "@/components/landingPage/FeaturedInstructor";
import Events from "@/components/landingPage/Events";
import News from "@/components/landingPage/News";
import CTA from "@/components/landingPage/CTA";
import Become from "@/components/landingPage/Become";

// ✅ Landing Page Layout
export default function LandingPage() {
  return (
    <main className="flex flex-col gap-12 bg-background text-foreground">
      {/* Hero Section */}
      <Hero />

      {/* Courses Section */}
      <Courses />

      {/* Categories Section */}
      <Categories />

      {/* Featured Instructors Section */}
      <FeaturedInstructor />

      {/* Events Section */}
      <Events />

      {/* News & Updates */}
      <News />

      {/* Call To Action Section */}
      <CTA />

      {/* Become an Instructor Section */}
      <Become />
    </main>
  );
}
