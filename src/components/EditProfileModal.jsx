"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button, Input, Avatar } from "@heroui/react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function EditProfileModal({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    if (!name || !image) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);

    const { error } = await authClient.updateUser({
      name,
      image,
    });

    if (!error) {
      toast.success("Profile updated successfully 🎉");
      router.refresh();
      setIsOpen(false);
    } else {
      toast.error(error.message || "Update failed!");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Open Button */}
      <Button
        onPress={() => setIsOpen(true)}
        color="primary"
        className="rounded-xl shadow-md hover:scale-[1.03] transition"
      >
        Edit Profile
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">

          {/* Animated Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl w-full max-w-md shadow-2xl border border-gray-200"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Edit Profile ✨
              </h2>
              <p className="text-gray-500 text-sm">
                Update your personal information
              </p>
            </div>

           


            {/* Form */}
            <div className="space-y-4">

              <Input
                label="Full Name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="bordered"
                radius="lg"
                size="lg"
              />

              <Input
                label="Profile Image URL"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                variant="bordered"
                radius="lg"
                size="lg"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="flat"
                onPress={() => setIsOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>

              <Button
                color="primary"
                isLoading={loading}
                onPress={handleUpdate}
                className="rounded-xl shadow-md hover:scale-[1.03] transition"
              >
                Save Changes
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}