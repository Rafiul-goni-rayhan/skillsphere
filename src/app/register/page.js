"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa"; // FaImage অ্যাড করা হয়েছে
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(""); // নতুন স্টেট ইমেজ লিঙ্কের জন্য
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    if (e) e.preventDefault();

    if (!name || !email || !password || !image) {
      toast.error("complete all field");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image,
        callbackURL: "/",
      });

      if (error) {
        toast.error("Registration failed: " + error.message);
      } else {
        toast.success("Account created successfully!");
        router.push("/login");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] px-4 bg-gray-50/50">
      <Card className="max-w-md w-full p-8 shadow-2xl border border-gray-100 bg-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-2">Register to create new account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                required
                type="text"
                placeholder="Rafiul Goni"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Profile Image URL
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaImage className="text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                required
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                required
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="
            w-full h-12 mt-4 
            font-bold text-lg text-white
            rounded-2xl
            bg-gradient-to-r from-blue-600 to-purple-600
            shadow-lg shadow-blue-200
            hover:shadow-xl hover:shadow-blue-300
            hover:-translate-y-0.5
            transition-all duration-300
            relative overflow-hidden
            "
          >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 animate-[shine_1.5s_infinite]" />

            {loading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-bold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
