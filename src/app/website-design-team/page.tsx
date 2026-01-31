"use client";
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Code2, Palette, Database, Globe, Github, ExternalLink, Mail, GraduationCap, Users, Sparkles, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
    {
        name: "Mr. R. Shakthi Prasad",
        role: "AI Enthusiast & Explorer",
        department: "Electronics & Communication Engineering",
        bio: "Passionate about exploring artificial intelligence and its real-world applications. Web development is a creative hobby that brings ideas to life through intuitive digital experiences.",
        skills: ["AI/ML", "Prompt Engineering", "Web Development", "UI/UX Design", "Problem Solving", "Innovation"],
        image: "/images/team-shakthi.jpeg",
        links: {
            github: "https://github.com/shakthiprasad243",
            portfolio: "https://shakthiprasad.me",
            email: "shakthiprasad243@gmail.com",
        },
    },
    {
        name: "Mr. E. Charan Kumar Reddy",
        role: "AI Enthusiast & Explorer",
        department: "Electronics & Communication Engineering",
        bio: "Curious explorer of AI technologies and data-driven solutions. Combines technical curiosity with a passion for building web applications as a creative outlet.",
        skills: ["AI/ML", "Data Analysis", "Python", "Research", "Web Development", "Automation"],
        image: "/images/team-charan.jpg",
        links: {
            github: "https://github.com/reddycharan348",
            portfolio: "https://reddycharan.me",
            email: "reddycharan348@gmail.com",
        },
    },
];

const mentors = [
    {
        name: "Dr. Kodanda Ramaiah, Ph.D., MIETE, MIEI",
        role: "Director – R & D | Professor",
        department: "Electronics & Communication Engineering",
        bio: "An accomplished academic leader and researcher with extensive experience in research management, innovation, and mentoring. Actively involved in leading research and development initiatives, fostering innovation ecosystems, and guiding faculty and students toward impactful research outcomes. Professional contributions span applied research, technology development, and institutional capacity building.",
        areasOfInterest: ["Electronics & Communication Systems", "Research & Development Management", "Innovation & Entrepreneurship", "Applied Engineering Research"],
        email: "ramaiah.gnk@gmail.com",
        image: "/images/mentor-gnk.jpg",
    },
    {
        name: "Dr. M. Lakshmipathy, Ph.D., MIEEE, LMISTE, MIAENG, MISRD, MISOC",
        role: "Associate Professor",
        department: "Electronics & Communication Engineering",
        bio: "An accomplished academician and educator with strong experience in teaching, research, and mentoring undergraduate and postgraduate students. Academic interests span core electronics, communication systems, and emerging technologies, with a focus on strengthening students' conceptual understanding and practical skills.",
        areasOfInterest: ["Embedded Systems", "VLSI & Core Electronics", "Technology-Driven Social Responsibility Projects", "Emerging Technologies"],
        email: "lakshmipathym@kec.ac.in",
        image: "/images/mentor-mlp.png",
    },
];

const projectHighlights = [
    {
        icon: Globe,
        title: "Responsive Design",
        description: "Mobile-first approach ensuring seamless experience across all devices.",
        color: "bg-cyan-50 text-cyan-600",
    },
    {
        icon: Database,
        title: "Data Visualization",
        description: "Interactive charts and maps for comprehensive groundwater analysis.",
        color: "bg-green-50 text-green-600",
    },
    {
        icon: Code2,
        title: "Modern Tech Stack",
        description: "Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.",
        color: "bg-purple-50 text-purple-600",
    },
    {
        icon: Palette,
        title: "Premium Aesthetics",
        description: "Glassmorphism effects with a carefully curated color palette.",
        color: "bg-orange-50 text-orange-600",
    },
];

const techStack = [
    { name: "Next.js 15", category: "Framework" },
    { name: "React 19", category: "Library" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Framer Motion", category: "Animation" },
    { name: "Recharts", category: "Charts" },
    { name: "Lucide Icons", category: "Icons" },
    { name: "Vercel", category: "Deployment" },
];

export default function WebsiteDesignTeamPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-medium mb-4">
                        <Users size={16} />
                        Meet the Team
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-serif leading-tight mb-4">
                        Website Design Team
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                        The creative minds behind the KADA Groundwater Information System portal.
                        Passionate about building intuitive, data-driven web applications.
                    </p>
                </div>

                {/* College Association Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-white border border-gray-200 p-3 overflow-hidden">
                                <Image
                                    src="/images/kec-logo.png"
                                    alt="Kuppam Engineering College"
                                    width={180}
                                    height={60}
                                    className="h-10 w-auto object-contain"
                                />
                            </div>
                        </div>
                        <div className="md:ml-auto flex items-center gap-2">
                            <GraduationCap size={18} className="text-secondary" />
                            <span className="text-sm text-gray-600">Department of Electronics & Communication Engineering</span>
                        </div>
                    </div>
                </div>

                {/* Mentors Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <GraduationCap size={20} className="text-secondary" />
                        <h2 className="text-xl font-bold text-gray-900 font-serif">Our Mentors</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {mentors.map((mentor) => (
                            <div
                                key={mentor.name}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex items-start gap-5 mb-4">
                                    <div className="w-24 h-32 rounded-xl overflow-hidden border-2 border-secondary/20 shrink-0 shadow-sm">
                                        <Image
                                            src={mentor.image}
                                            alt={mentor.name}
                                            width={96}
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 font-serif">
                                            {mentor.name}
                                        </h3>
                                        <p className="text-secondary text-sm font-medium">
                                            {mentor.role}
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            {mentor.department}
                                        </p>
                                        <a
                                            href={`mailto:${mentor.email}`}
                                            className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-secondary mt-2 transition-colors"
                                        >
                                            <Mail size={12} />
                                            {mentor.email}
                                        </a>
                                    </div>
                                </div>

                                {/* Bio */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    {mentor.bio}
                                </p>

                                {/* Areas of Interest */}
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-xs font-semibold text-gray-700 mb-2">Areas of Interest</p>
                                    <div className="flex flex-wrap gap-2">
                                        {mentor.areasOfInterest.map((area) => (
                                            <span
                                                key={area}
                                                className="px-2.5 py-1 text-xs bg-secondary/10 border border-secondary/20 rounded-full text-secondary"
                                            >
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Members Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <Users size={20} className="text-secondary" />
                        <h2 className="text-xl font-bold text-gray-900 font-serif">Development Team</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {teamMembers.map((member, index) => (
                            <div
                                key={member.name}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    {/* Avatar */}
                                    <div className="w-24 h-32 rounded-xl overflow-hidden border-2 border-gray-200 shrink-0 shadow-sm">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            width={96}
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 font-serif">
                                            {member.name}
                                        </h3>
                                        <p className="text-secondary text-sm font-medium">
                                            {member.role}
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            {member.department}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    {member.bio}
                                </p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {member.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2.5 py-1 text-xs bg-gray-100 border border-gray-200 rounded-full text-gray-600"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Social Links */}
                                <div className="flex gap-2 pt-4 border-t border-gray-100">
                                    <a
                                        href={member.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all duration-300"
                                    >
                                        <Github size={16} />
                                    </a>
                                    <a
                                        href={member.links.portfolio}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-all duration-300"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                    <a
                                        href={`mailto:${member.links.email}`}
                                        className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 hover:text-secondary hover:border-secondary/30 transition-all duration-300"
                                    >
                                        <Mail size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project Highlights */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles size={20} className="text-secondary" />
                        <h2 className="text-xl font-bold text-gray-900 font-serif">Project Highlights</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {projectHighlights.map((highlight, index) => (
                            <div
                                key={highlight.title}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
                            >
                                <div className={`w-10 h-10 rounded-lg ${highlight.color} flex items-center justify-center mb-3`}>
                                    <highlight.icon size={20} />
                                </div>
                                <h3 className="text-gray-900 font-semibold mb-1">{highlight.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{highlight.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
                        <Layers size={18} className="text-secondary" />
                        <h2 className="text-lg font-semibold text-gray-800">Technology Stack</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-wrap gap-3">
                            {techStack.map((tech) => (
                                <div
                                    key={tech.name}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                                >
                                    <span className="font-medium text-gray-900">{tech.name}</span>
                                    <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded">{tech.category}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium"
                    >
                        Back to Home
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
