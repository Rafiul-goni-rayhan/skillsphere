"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, staggerChildren: 0.2 } 
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        <motion.h1 variants={containerVariants} className="text-5xl md:text-8xl font-black text-gray-900 leading-tight tracking-tighter mb-6">
          Upgrade Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Skills Today 🚀
          </span>
        </motion.h1>
        
        <motion.p variants={containerVariants} className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Learn from Industry Experts. Master Web Development, Design, and more with our interactive courses[cite: 6].
        </motion.p>

        <motion.div variants={containerVariants} className="flex gap-4 justify-center flex-wrap">
          <Button as={Link} href="/courses" size="lg" className="bg-blue-600 text-white font-bold px-10 py-7 rounded-2xl shadow-xl hover:shadow-blue-200 hover:-translate-y-1 transition-all">
            Explore Courses
          </Button>
          <Button as={Link} href="/register" variant="bordered" size="lg" className="border-2 border-gray-900 font-bold px-10 py-7 rounded-2xl hover:bg-gray-900 hover:text-white transition-all">
            Join for Free
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
