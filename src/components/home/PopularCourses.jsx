"use client";
import { useEffect, useState } from "react";
import { Card, Button, Spinner, Chip } from "@heroui/react";
import Image from "next/image";
import { FaStar, FaClock, FaChalkboardTeacher } from "react-icons/fa";
import { motion } from "framer-motion";
import CourseModal from "./CourseModal";

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

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" color="primary" /></div>;

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div className="text-left">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">🔥 Popular Courses</h2>
          <p className="text-gray-500 mt-2">The most enrolled programs this month.</p>
        </div>
        <Button variant="light" className="font-bold text-blue-600">See All</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <Card className="border-none shadow-2xl shadow-gray-100 rounded-[2.5rem] overflow-hidden bg-white">
              <div className="relative h-56 w-full">
                <Image src={course.image} alt={course.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <Chip size="sm" className="bg-white/90 backdrop-blur font-bold">{course.category}</Chip>
                </div>
              </div>

              <div className="p-7 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 font-black text-orange-500 text-sm italic">
                    <FaStar /> {course.rating}
                  </span>
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{course.duration}</span>
                </div>
                <h3 className="text-xl font-black text-gray-800 leading-snug h-14 line-clamp-2">
                  {course.title}
                </h3>
                <div className="pt-4 border-t border-gray-50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FaChalkboardTeacher size={14} />
                  </div>
                  <span className="text-sm font-bold text-gray-600">{course.instructor}</span>
                </div>
                <Button
                  onPress={() => { setSelectedCourse(course); setIsModalOpen(true); }}
                  className="w-full bg-gray-900 text-white font-bold py-7 rounded-2xl hover:bg-blue-600 transition-all mt-4"
                >
                  View Details
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <CourseModal isOpen={isModalOpen} course={selectedCourse} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
