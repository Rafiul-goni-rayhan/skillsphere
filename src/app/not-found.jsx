"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-center px-4">

      {/* Animated 404 */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-7xl md:text-9xl font-extrabold text-blue-600"
      >
        404
      </motion.h1>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-bold text-gray-800 mt-4"
      >
        Oops! Page Not Found 😕
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-500 mt-2 max-w-md"
      >
        The page you are looking for might have been removed,
        had its name changed, or is temporarily unavailable.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6"
      >
        <Link href="/">
          <Button
            color="primary"
            size="lg"
            className="rounded-xl shadow-md hover:scale-105 transition"
          >
            Go Back Home
          </Button>
        </Link>
      </motion.div>

      {/* Optional decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 text-sm text-gray-400"
      >
        SkillSphere © {new Date().getFullYear()}
      </motion.div>
    </div>
  );
};

export default Notfound;