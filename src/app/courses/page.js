"use client";

import { useEffect, useState } from "react";
import { Card, Button, Spinner, Chip } from "@heroui/react";
import Image from "next/image";
import {
  FaStar,
  FaClock,
  FaChalkboardTeacher,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import CourseModal from "@/components/home/CourseModal";

export default function AllCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch courses", err);
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <section className="py-10 max-w-7xl mx-auto px-6 min-h-screen relative">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">All Courses</h1>
        <p className="text-gray-500 mb-8">
          Explore our wide range of skill-based programs.
        </p>

        {/* CUSTOM SEARCH BAR */}
        <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search courses by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-gray-700 font-medium shadow-sm"
          />
          {/* Clear Button (isClearable এর বিকল্প) */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Course List Section */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <h3 className="text-2xl font-bold text-gray-600">
            No courses found!
          </h3>
          <p className="text-gray-400 mt-2">
            Try searching with a different keyword.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="w-full relative h-48 bg-gray-100">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="flex flex-col items-start p-5 gap-3 bg-white flex-grow">
                <div className="flex justify-between w-full items-center">
                  <Chip
                    size="sm"
                    color="primary"
                    variant="flat"
                    className="font-semibold"
                  >
                    {course.category}
                  </Chip>
                  <span className="flex items-center gap-1 font-bold text-warning text-sm">
                    <FaStar /> {course.rating}
                  </span>
                </div>
                <h3 className="text-lg font-bold line-clamp-2 text-gray-800 leading-snug">
                  {course.title}
                </h3>
                <div className="flex justify-between w-full text-sm text-gray-500 mt-auto pt-4 border-t border-gray-50">
                  <span className="flex items-center gap-1">
                    <FaChalkboardTeacher className="text-primary" />{" "}
                    {course.instructor}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-purple-500" /> {course.duration}
                  </span>
                </div>

               
                <Button
                  onClick={() => handleViewDetails(course)}
                  variant="bordered"
                  className="w-full mt-4 font-bold border-2 border-purple-300 bg-lime-50 text-purple-700 rounded-full hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 shadow-sm active:scale-95"
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Component */}
      <CourseModal
        isOpen={isModalOpen}
        course={selectedCourse}
        onClose={closeModal}
      />
    </section>
  );
}
