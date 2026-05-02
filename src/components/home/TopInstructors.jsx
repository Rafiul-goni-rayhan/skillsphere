"use client";

import { Card } from "@heroui/react";
import Image from "next/image"; 

export default function TopInstructors() {
  const instructors = [
    { name: "John Doe", role: "Web Developer", img: "https://placehold.co/150/2563eb/FFF?text=JD" },
    { name: "Sarah Smith", role: "UI/UX Expert", img: "https://placehold.co/150/ec4899/FFF?text=SS" },
    { name: "Rafiul Goni Rayhan", role: "Full-Stack Engineer", img: "https://placehold.co/150/8b5cf6/FFF?text=RG" },
    { name: "Emily Chen", role: "Design Lead", img: "https://placehold.co/150/f59e0b/FFF?text=EC" },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-6 mb-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">🏆 Top Instructors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {instructors.map((inst, i) => (
          <Card key={i} className="py-6 flex flex-col items-center text-center shadow-sm border border-gray-200">
            
            
            <div className="w-20 h-20 mb-4 relative rounded-full border-2 border-primary overflow-hidden ring-4 ring-primary/10">
              <Image 
                src={inst.img} 
                alt={inst.name} 
                fill
                className="object-cover"
              />
            </div>
            
            <h3 className="text-lg font-bold text-gray-800">{inst.name}</h3>
            <p className="text-sm text-gray-500">{inst.role}</p>
            
          </Card>
        ))}
      </div>
    </section>
  );
}