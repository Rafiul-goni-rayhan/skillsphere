"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-24 lg:py-36">

      {/* Glow Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-purple-300/30 rounded-full blur-3xl" />

      {/* Floating Shapes */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="hidden md:block absolute top-20 right-20 w-16 h-16 bg-blue-100 rounded-2xl rotate-12 shadow-md"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="hidden md:block absolute bottom-20 left-20 w-20 h-20 bg-purple-100 rounded-full shadow-md"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold shadow-sm"
        >
          🚀 Learn Smarter, Grow Faster
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-tight tracking-tight mb-6"
        >
          Upgrade Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Skills Today
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Learn from industry experts and master real-world skills with interactive courses designed for your success.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Button
            as={Link}
            href="/courses"
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-10 py-7 rounded-2xl shadow-xl hover:shadow-purple-200 hover:-translate-y-1 transition-all"
          >
            Explore Courses
          </Button>

          <Button
            as={Link}
            href="/register"
            size="lg"
            className="bg-white border border-gray-200 font-bold px-10 py-7 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            Join for Free
          </Button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-14 flex justify-center gap-10 flex-wrap text-gray-700"
        >
          <div>
            <h3 className="text-2xl font-bold text-blue-600">10K+</h3>
            <p className="text-sm">Students</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-purple-600">50+</h3>
            <p className="text-sm">Courses</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-pink-600">95%</h3>
            <p className="text-sm">Success Rate</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}