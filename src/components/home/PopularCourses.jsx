"use client";
import { useEffect, useState } from "react";
import { Card, Button, Spinner, Chip } from "@heroui/react";
import Image from "next/image";
import { FaStar, FaChalkboardTeacher } from "react-icons/fa";
import { motion } from "framer-motion";
import CourseModal from "./CourseModal";
import Link from "next/link";

export default function PopularCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.sort((a, b) => b.rating - a.rating).slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" color="primary" />
      </div>
    );

  return (
    <section className="relative py-24 max-w-7xl mx-auto px-6">

      {/* Background Glow */}
      <div className="absolute -top-20 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            🔥 Popular Courses
          </h2>
          <p className="text-gray-500 mt-2">
            Most loved courses by our students this month
          </p>
        </div>

        <Button
          variant="light"
          className="font-semibold text-blue-600 hover:bg-blue-50 rounded-xl"
        >
          
        

        <Link href="/courses" className="hover:text-blue-600">See All →</Link></Button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -12 }}
          >
            <Card className="group overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all">

              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Category */}
                <div className="absolute top-4 left-4">
                  <Chip className="bg-white/90 backdrop-blur font-semibold">
                    {course.category}
                  </Chip>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">

                {/* Rating + Duration */}
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-1 text-orange-500 font-bold">
                    <FaStar /> {course.rating}
                  </span>

                  <span className="text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md">
                    {course.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 leading-snug line-clamp-2 min-h-[48px]">
                  {course.title}
                </h3>

                {/* Instructor */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center text-sm shadow">
                    <FaChalkboardTeacher />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">
                    {course.instructor}
                  </span>
                </div>

                {/* Button */}
                <Button
                  onPress={() => {
                    setSelectedCourse(course);
                    setIsModalOpen(true);
                  }}
                  className="w-full mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  View Details
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <CourseModal
        isOpen={isModalOpen}
        course={selectedCourse}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}