"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Spinner, Button, Chip, Card } from "@heroui/react";
import Image from "next/image";
import { FaStar, FaClock, FaChalkboardTeacher, FaLayerGroup } from "react-icons/fa";

export default function CourseDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = true; 

  useEffect(() => {
    // Protected Route Logic
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

   
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const foundCourse = data.find((c) => c.id.toString() === id);
        setCourse(foundCourse);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch course details", err);
        setLoading(false);
      });
  }, [id, isLoggedIn, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!course) {
    return <div className="text-center py-20 text-2xl font-bold">Course not found!</div>;
  }

  // static curriculam list
  const curriculum = [
    "Module 1: Introduction to the Course",
    "Module 2: Fundamentals and Core Concepts",
    "Module 3: Advanced Topics and Practical Examples",
    "Module 4: Real-world Projects and Assignments",
    "Module 5: Final Assessment and Certification"
  ];

  return (
    <section className="py-10 max-w-5xl mx-auto px-6 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Side: Course Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="w-full relative h-72 md:h-96 rounded-xl overflow-hidden bg-gray-100 shadow-md">
            <Image 
              src={course.image} 
              alt={course.title} 
              fill
              className="object-cover" 
              priority
            />
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Chip color="primary" variant="flat">{course.category}</Chip>
              <Chip color="secondary" variant="dot">{course.level}</Chip>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{course.title}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">{course.description}</p>
          </div>

          {/* Static Curriculum Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaLayerGroup className="text-primary" /> Course Curriculum
            </h2>
            <Card className="border border-gray-200 shadow-sm p-2">
              <ul className="divide-y divide-gray-100">
                {curriculum.map((module, index) => (
                  <li key={index} className="p-4 hover:bg-gray-50 transition-colors text-gray-700 font-medium">
                    {module}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Right Side: Action Card */}
        <div className="md:col-span-1">
          <Card className="p-6 border border-gray-200 shadow-md sticky top-24">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Course Overview</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-gray-500 flex items-center gap-2"><FaChalkboardTeacher /> Instructor</span>
                <span className="font-semibold">{course.instructor}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-gray-500 flex items-center gap-2"><FaClock /> Duration</span>
                <span className="font-semibold">{course.duration}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-gray-500 flex items-center gap-2"><FaStar className="text-warning" /> Rating</span>
                <span className="font-semibold">{course.rating} / 5.0</span>
              </div>
            </div>
            <Button color="primary" size="lg" className="w-full font-bold text-lg">
              Enroll Now
            </Button>
          </Card>
        </div>

      </div>
    </section>
  );
}