"use client";

import { authClient } from "@/lib/auth-client";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Chip 
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar, FaClock, FaChalkboardTeacher, FaLayerGroup, FaLock, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function CourseModal({ isOpen, onClose, course }) {
  const router = useRouter();
  const { data: session } = authClient.useSession(); //

  if (!course) return null; //

  const handleEnroll = () => {
    if (!session) { //
      onClose();
      router.push("/login");
      return;
    }
    alert(`${course.title} কোর্সে এনরোল হচ্ছে...`); //[cite: 5]
  };

  const curriculum = [
    "Module 1: Introduction",
    "Module 2: Core Fundamentals",
    "Module 3: Advanced Practical",
    "Module 4: Final Project"
  ]; //[cite: 5]

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="4xl" 
      backdrop="blur"
      scrollBehavior="inside"
      className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] border border-gray-100"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 border-b border-gray-50 py-6 px-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-2 mb-2"
              >
                <Chip size="sm" variant="shadow" color="primary" className="font-bold uppercase tracking-wider px-3">
                  {course.category}
                </Chip>
                <Chip size="sm" variant="flat" color="secondary" className="font-bold uppercase tracking-wider px-3">
                  {course.level || "Intermediate"}
                </Chip>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-black text-gray-900 tracking-tight"
              >
                {course.title}
              </motion.h2>
            </ModalHeader>

            <ModalBody className="py-8 px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* বাম পাশ: ইমেজ এবং ডেসক্রিপশন */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="relative h-64 w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-100 group">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <FaStar className="text-orange-400 text-sm" />
                      <span className="font-bold text-gray-800 text-sm">{course.rating}</span>
                    </div>
                  </div>
                  <div className="bg-blue-50/30 p-6 rounded-[1.5rem] border border-blue-50">
                    <h4 className="font-bold text-blue-600 mb-2">About this course</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </motion.div>

                {/* ডান পাশ: কারিকুলাম এবং মেটা ইনফো */}
                <div className="space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                      <FaLayerGroup className="text-blue-500" /> Curriculum
                    </h4>
                    <ul className="space-y-3">
                      {curriculum.map((item, index) => (
                        <motion.li 
                          key={index}
                          whileHover={{ x: 5 }}
                          className="text-sm bg-white p-4 rounded-2xl border border-gray-100 text-gray-700 flex items-center gap-3 shadow-sm hover:shadow-md transition-all cursor-default"
                        >
                          <FaCheckCircle className="text-green-500 text-base flex-shrink-0" />
                          <span className="font-medium">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-100">
                      <p className="text-[10px] opacity-80 font-bold uppercase mb-1">Instructor</p>
                      <p className="text-sm font-bold flex items-center gap-2">
                         <FaChalkboardTeacher /> {course.instructor}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <p className="text-[10px] text-purple-500 font-bold uppercase mb-1">Duration</p>
                      <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <FaClock /> {course.duration}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="border-t border-gray-50 py-6 px-8 flex justify-between items-center">
              <Button 
                variant="light" 
                color="danger" 
                onPress={onClose} 
                className="font-bold hover:bg-red-50 rounded-xl"
              >
                Close
              </Button>
              <Button 
                color="primary" 
                onPress={handleEnroll} 
                size="lg"
                className="font-black px-10 py-7 rounded-2xl shadow-xl shadow-blue-200 transition-transform active:scale-95 bg-blue-600"
                startContent={!session && <FaLock className="text-xs" />}
              >
                {session ? "Enroll Now" : "Login to Enroll"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}