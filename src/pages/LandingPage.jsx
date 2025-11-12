import React from "react";
import Hero from "../components/LandingPage/Hero";
import Courses from "../components/LandingPage/Courses";
import Categories from "../components/LandingPage/Categories";
import FeaturedInstructor from "../components/LandingPage/FeaturedInstructor";
import Events from "../components/LandingPage/Events";
import News from "../components/LandingPage/News";
import CTA from "../components/LandingPage/CTA";
import Become from "../components/LandingPage/Become";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <Courses />
      <Categories />
      <FeaturedInstructor />
      <Events />
      <News />
      <CTA />
      <Become />
    </div>
  );
}
