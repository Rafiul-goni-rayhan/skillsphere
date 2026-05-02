"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Spinner, Button } from "@heroui/react";
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

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <nav className="flex justify-between items-center py-3 px-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="p-1 bg-blue-600 rounded-xl"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
          </motion.div>
          <span className="font-black text-2xl tracking-tight text-gray-900 italic">
            Skill<span className="text-blue-600">Sphere</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          {["Home", "Courses", "My Profile"].map((item) => (
            <li key={item}>
              <Link
                href={
                  item === "Home"
                    ? "/"
                    : item === "Courses"
                      ? "/courses"
                      : session
                        ? "/my-profile"
                        : "/login"
                }
                className="relative group py-2"
              >
                <span className="group-hover:text-blue-600 transition-colors">
                  {item}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {isPending ? (
            <Spinner size="sm" color="primary" />
          ) : session ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4"
            >
              <span className="hidden sm:block text-sm font-bold text-gray-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Hi, {session.user.name.split(" ")[0]}
              </span>
              <Button
                onClick={handleLogout}
                size="sm"
                color="danger"
                variant="flat"
                className="font-bold rounded-lg transition-transform active:scale-90"
              >
                Logout
              </Button>
            </motion.div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Login Button */}
              <Link href="/login">
                <Button variant="light" className="font-bold text-blue-600">
                  Login
                </Button>
              </Link>

              {/* Register Button */}
              <Link href="/register">
                <Button
                  color="primary"
                  className="font-bold shadow-lg shadow-blue-200 rounded-lg transition-transform hover:-translate-y-0.5"
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
// "use client";
// import Link from "next/link";

// const Navbar = () => {
//   return (
//     <div className="bg-gray-100 border-b border-gray-300">
//       <nav className="flex justify-between items-center py-4 px-6 max-w-7xl mx-auto">
//         {/* Logo Section */}
//         <div className="flex items-center gap-2">
//           <div className="bg-blue-200 p-2 rounded">
//             <span className="font-bold text-blue-600">Logo</span>
//           </div>
//           <h3 className="font-bold text-lg text-gray-800">SkillSphere</h3>
//         </div>

//         {/* Navigation Links */}
//         <ul className="flex items-center gap-6 text-sm text-gray-700">
//           <li>
//             <Link href="/">Home</Link>
//           </li>
//           <li>
//             <Link href="/courses">Courses</Link>
//           </li>
//           <li>
//             <Link href="/my-profile">My Profile</Link>
//           </li>
//         </ul>

//         {/* Auth Buttons */}
//         <div className="flex items-center gap-4">
//           <Link href="/login" className="text-sm text-blue-600">Login</Link>
//         <Link href="/register" className="text-sm text-white bg-blue-600 px-3 py-1 rounded">Register</Link>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@heroui/react";
// import { motion } from "framer-motion";
// import height from "./../../node_modules/dom-helpers/esm/height";

// const Navbar = () => {
//   // Framer Motion Animation Variants
//   const navItemVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     // Glassmorphism, Drop Shadow & Sticky Effect
//     <div className="sticky top-0 z-50 bg-gray-50 backdrop-blur-xl border-b border-gray-300 shadow-md transition-all duration-300">
//       <nav className="flex justify-between items-center py-4 px-6 max-w-7xl mx-auto w-full">

//         {/* Logo Section with Bounce Animation */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="flex gap-3 items-center group cursor-pointer"
//         >
//           <div className="relative overflow-hidden rounded-xl bg-blue-100 p-1 group-hover:bg-blue-200 transition-colors duration-300">
//             <Image
//               src={"/logo.png"}
//               alt="SkillSphere Logo"
//               loading="eager"
//               width={35}
//               height={35}
//               className="object-cover group-hover:scale-110 transition-transform duration-300"
//             />
//           </div>
//           <h3 className="font-black text-2xl tracking-tighter text-gray-800 drop-shadow-sm">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Skill</span>Sphere.
//           </h3>
//         </motion.div>

//         {/* Main Links with Staggered Fade-in & Animated Underline */}
//         <ul className="hidden md:flex items-center gap-10 text-[15px] font-bold text-gray-700">
//           {[
//             { name: "Home", path: "/" },
//             { name: "Courses", path: "/courses" },
//             { name: "My Profile", path: "/my-profile" },
//           ].map((item, index) => (
//             <motion.li
//               key={item.name}
//               variants={navItemVariants}
//               initial="hidden"
//               animate="visible"
//               transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
//             >
//               <Link href={item.path} className="relative group py-2">
//                 <span className="group-hover:text-blue-500 transition-colors duration-300">
//                   {item.name}
//                 </span>
//                 {/* Animated Underline Effect */}
//                 <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out group-hover:w-full"></span>
//               </Link>
//             </motion.li>
//           ))}
//         </ul>

//         {/* Auth Buttons with Pulse & Hover Scale Effects */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="flex gap-4"
//         >
//           <ul className="flex items-center gap-6">
//             <li>
//               <Link
//                 href="/login"
//                 className="font-bold text-gray-700 hover:text-blue-500 transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
//               >
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Button
//                 as={Link}
//                 href="/register"
//                 color="primary"
//                 size="md"
//                 className="font-bold rounded-2xl p-1 text-white bg-gradient-to-r from-blue-500 to-purple-500 border-none shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//               >
//                 Register
//               </Button>
//             </li>
//           </ul>
//         </motion.div>

//       </nav>
//     </div>
//   );
// };

// export default Navbar;
