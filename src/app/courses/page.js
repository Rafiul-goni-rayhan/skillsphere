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

  // Modal State
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
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
       <Spinner size="lg" label="Loading Courses..." color="primary" />
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white min-h-screen relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Explore All <span className="text-primary">Courses</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            search your favourite course 
          </p>

          {/* MODERN SEARCH BAR */}
          <div className="max-w-xl mx-auto mt-10 relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <FaSearch className="text-slate-400 group-focus-within:text-primary transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Search for courses, skills, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-slate-700 shadow-xl shadow-slate-200/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-danger transition-colors"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* Course List Section */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
               <FaSearch className="text-3xl text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-700">No courses found!</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="group border-none bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full rounded-[2rem] overflow-hidden"
              >
                {/* Image Section */}
                <div className="w-full relative h-56 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <Chip
                      size="sm"
                      className="bg-white/90 backdrop-blur-md text-primary font-bold shadow-lg"
                    >
                      {course.category}
                    </Chip>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1 bg-warning/90 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                      <FaStar /> {course.rating}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col p-6 flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 line-clamp-2 leading-tight mb-4 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  
                  <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex justify-between items-center text-sm text-slate-500">
                      <span className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <FaChalkboardTeacher className="text-primary text-xs" />
                        </div>
                        {course.instructor}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <FaClock className="text-slate-400" /> {course.duration}
                      </span>
                    </div>

                    <Button
                      onClick={() => handleViewDetails(course)}
                      className="w-full mt-4 font-bold bg-slate-900 text-white rounded-xl hover:bg-primary py-6 transition-all duration-300 shadow-lg shadow-slate-200"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal Component */}
      <CourseModal
        isOpen={isModalOpen}
        course={selectedCourse}
        onClose={closeModal}
      />
    </section>
  );
}