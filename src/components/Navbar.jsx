"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Spinner, Button, Avatar } from "@heroui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully!");
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };
  console.log(session);

  return (
    <motion.div
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200 shadow-sm"
    >
      <nav className="flex justify-between items-center py-3 px-6 max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div whileHover={{ rotate: 10 }} className="p-1 bg-blue-600 rounded-xl">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
          </motion.div>

          <span className="font-black text-2xl text-gray-900 italic">
            Skill<span className="text-blue-600">Sphere</span>
          </span>
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          {[
            { name: "Home", path: "/" },
            { name: "Courses", path: "/courses" },
            { name: "My Profile", path: session ? "/my-profile" : "/login" },
          ].map((item) => (
            <li key={item.name}>
              <Link href={item.path} className="relative group py-2">
                <span className="group-hover:text-blue-600 transition">
                  {item.name}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {isPending ? (
            <Spinner size="sm" color="primary" />
          ) : session ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
             
              <img
                src={session.user.image}
                name={session.user.name}
                size="sm"
                className="cursor-pointer border rounded-full"
                height={40}
                width={40}
                
              />

            
              <div className="flex items-center gap-3">

  {/* User Name */}
  <span className="hidden sm:block text-sm font-semibold text-gray-700 
    bg-gradient-to-r from-blue-50 to-indigo-50 
    px-4 py-1.5 rounded-full border border-blue-100
    shadow-sm transition-all duration-300 
    hover:shadow-md hover:-translate-y-0.5 hover:text-blue-600 cursor-default">
    
    👋 {session.user.name.split(" ")[0]}
  </span>

  {/* Logout Button */}
  <Button
    onClick={handleLogout}
    size="sm"
    className="rounded-full px-4 font-semibold 
    bg-red-50 text-red-600 border border-red-200
    hover:bg-red-100 hover:text-red-700 
    hover:shadow-md hover:-translate-y-0.5
    active:scale-90 transition-all duration-200"
  >
    Logout
  </Button>

</div>
            </motion.div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="light" className="font-semibold text-blue-600">
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  color="primary"
                  className="font-semibold rounded-lg shadow-md hover:scale-[1.03] transition"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;