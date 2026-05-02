
import HeroSection from "./home/HeroSection";
import PopularCourses from "./home/PopularCourses";
import LearningTips from "./home/LearningTips";
import TopInstructors from "./home/TopInstructors";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <PopularCourses />
      <LearningTips />
      <TopInstructors />
    </div>
  );
}