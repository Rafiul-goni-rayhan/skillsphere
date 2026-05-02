"use client";

import { Card } from "@heroui/react";

export default function LearningTips() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">📌 Learning Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold mb-2 text-primary">Study Techniques</h3>
              <p className="text-gray-600">Use the Pomodoro technique. Study for 25 minutes, then take a 5-minute break to keep your mind fresh and focused.</p>
            </div>
          </Card>
          <Card className="shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold mb-2 text-purple-600">Time Management</h3>
              <p className="text-gray-600">Plan your day ahead. Break down large projects into smaller, manageable tasks to avoid feeling overwhelmed.</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}