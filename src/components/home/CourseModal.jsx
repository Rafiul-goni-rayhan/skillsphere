"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Chip } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaClock,
  FaChalkboardTeacher,
  FaLayerGroup,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

export default function CourseModal({ isOpen, course, onClose }) {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);

  if (!isOpen || !course) return null;

  const isAlreadyEnrolled = enrolledCourseIds.includes(course.id);

  const handleEnroll = () => {
    if (!session) {
      toast.error("Please login first to enroll!");
      onClose();
      router.push("/login");
      return;
    }

    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setEnrolledCourseIds((prevIds) => [...prevIds, course.id]);
          resolve();
        }, 1500);
      }),
      {
        loading: 'Enrolling in course...',
        success: <b>Successfully enrolled in {course.title}!</b>,
        error: <b>Could not enroll. Please try again.</b>,
      }
    );
  };

  const staticCurriculum = [
    "Module 1: Introduction to the Course",
    "Module 2: Fundamentals and Core Concepts",
    "Module 3: Advanced Topics and Practical Examples",
    "Module 4: Real-world Projects and Assignments",
    "Module 5: Final Assessment and Certification",
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-100"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <div>
              <div className="flex gap-2 mb-2">
                <Chip size="sm" color="primary" variant="flat" className="font-bold uppercase tracking-wider">
                  {course.category}
                </Chip>
                <Chip size="sm" color="secondary" variant="flat" className="font-bold uppercase tracking-wider">
                  {course.level}
                </Chip>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                {course.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 transition-all p-3 bg-white shadow-sm rounded-2xl hover:shadow-md active:scale-90"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 overflow-y-auto custom-scrollbar">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full relative h-72 rounded-[1.5rem] overflow-hidden bg-gray-100 mb-8 shadow-2xl shadow-blue-50"
            >
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
            </motion.div>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {course.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <div className="flex flex-col">
                <span className="text-[10px] text-blue-600 uppercase font-black tracking-widest mb-1">Instructor</span>
                <span className="font-bold text-gray-800 flex items-center gap-2">
                  <FaChalkboardTeacher className="text-blue-500" /> {course.instructor}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-purple-600 uppercase font-black tracking-widest mb-1">Duration</span>
                <span className="font-bold text-gray-800 flex items-center gap-2">
                  <FaClock className="text-purple-500" /> {course.duration}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-orange-600 uppercase font-black tracking-widest mb-1">Rating</span>
                <span className="font-bold text-gray-800 flex items-center gap-2">
                  <FaStar className="text-orange-400" /> {course.rating} / 5.0
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <FaLayerGroup className="text-blue-600" /> Course Curriculum
              </h3>
              <ul className="space-y-4">
                {staticCurriculum.map((module, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="p-5 bg-white rounded-2xl text-gray-700 font-bold border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-all cursor-default"
                  >
                    <FaCheckCircle className="text-green-500 text-lg" />
                    {module}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-gray-50 bg-white flex justify-between items-center">
            <Button
              variant="light"
              color="danger"
              onPress={onClose}
              className="font-bold text-red-500 hover:bg-red-50 rounded-xl"
            >
              Close Window
            </Button>

            <Button
              color={isAlreadyEnrolled ? "success" : "primary"}
              onPress={handleEnroll}
              isDisabled={isAlreadyEnrolled}
              size="lg"
              className={`font-black px-10 py-7 rounded-2xl shadow-xl transition-all active:scale-95 ${
                isAlreadyEnrolled 
                  ? "bg-green-100 text-green-700" 
                  : "bg-blue-600 text-white shadow-blue-200"
              }`}
            >
              {isAlreadyEnrolled ? "Already Enrolled ✅" : "Enroll Now"}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}