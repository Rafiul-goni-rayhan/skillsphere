"use client";

import { useState } from "react";
import { Card, Input, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      alert(error.message || "Login failed!");
    } else {
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <Card className="max-w-md w-full p-10 rounded-2xl shadow-2xl border border-gray-100 backdrop-blur-md bg-white/80">
        
        <h2 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to continue your journey
        </p>

        <div className="space-y-5 flex flex-col p-2">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            variant="bordered"
            radius="lg"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 rounded p-2"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            variant="bordered"
            radius="lg"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 rounded p-2"
          />

          <Button
            color="primary"
            className="w-full font-semibold text-lg h-12 rounded-xl shadow-md hover:shadow-lg transition border"
            onClick={handleLogin}
            isLoading={loading}
          >
            Login
          </Button>

          <p className="text-center text-gray-500 text-sm mt-4">
            New here?{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}