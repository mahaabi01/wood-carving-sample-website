// app/team/page.tsx
"use client";

import React from "react";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  experience: string;
  imageUrl: string;
  bio: string;
};

// dummy team data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Master Carver",
    experience: "15 years",
    imageUrl: "/team/rajesh.jpg",
    bio: "Rajesh is a master carver with over 15 years of experience in traditional wood carving techniques. He leads our team with passion and expertise.",
  },
  {
    id: 2,
    name: "Anita Singh",
    role: "Designer",
    experience: "10 years",
    imageUrl: "/team/anita.jpg",
    bio: "Anita is our creative designer who brings modern aesthetics to traditional wood carving. She has a keen eye for detail and design.",
  },
  {
    id: 3,
    name: "Vikram Patel",
    role: "Craftsman",
    experience: "8 years",
    imageUrl: "/team/vikram.jpg",
    bio: "Vikram is a skilled craftsman specializing in intricate woodwork. His dedication to quality ensures every piece we create is exceptional.",
  },
  {
    id: 4,
    name: "Suman Rao",
    role: "Quality Control",
    experience: "12 years",
    imageUrl: "/team/suman.jpg",
    bio: "Suman oversees our quality control processes, ensuring that every product meets our high standards before it reaches our customers.",
  },
  {
    id: 5,
    name: "Amit Joshi",
    role: "Apprentice",
    experience: "3 years",
    imageUrl: "/team/amit.jpg",
    bio: "Amit is an enthusiastic apprentice learning the art of wood carving. He brings fresh ideas and energy to our team.",
  },
]

export default function TeamPage() {
  return (
    <main className="min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Meet Our Team</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full h-64">
              <img 
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {member.name}
              </h2>
              <p className="text-red-600 font-medium">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {member.experience} of experience
              </p>
              {member.bio && (
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                  {member.bio}
                </p>
              )}
            </div>
      </div>
    ))}
      </div>
    </main>
  )
}