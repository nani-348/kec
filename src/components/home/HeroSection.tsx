"use client";

import React from "react";
import { motion } from "framer-motion";
import { Droplets, CloudRain, Database, Waves } from "lucide-react";

const INDICATORS = [
    { label: "Recharge-worthy Area", value: "2,34,500", unit: "Ha", icon: Droplets, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Average Rainfall", value: "827", unit: "mm", icon: CloudRain, color: "text-cyan-600", bg: "bg-cyan-50" },
    { label: "Groundwater Availability", value: "12.8", unit: "TMC", icon: Database, color: "text-green-600", bg: "bg-green-50" },
    { label: "MI Tanks Analyzed", value: "1,247", unit: "No.", icon: Waves, color: "text-teal-600", bg: "bg-teal-50" },
];

export default function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden bg-white">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/images/banner.jpg"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/videos/hero-nature.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            </div>

            {/* Wave Decoration */}
            <div className="wave-decoration z-20">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>

            <div className="container-custom relative z-10 pt-16 pb-24 lg:pt-24 lg:pb-32">
                <div className="flex flex-col items-center text-center gap-12">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="max-w-4xl space-y-6"
                    >
                        <div className="inline-block bg-secondary/90 border border-secondary/20 rounded-full px-4 py-1.5 animate-fade-in shadow-lg">
                            <span className="text-white font-bold text-sm tracking-wide uppercase">
                                Scientific Analysis Portal
                            </span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight font-serif drop-shadow-md">
                            Groundwater Analysis & <br />
                            <span className="text-secondary drop-shadow-sm">Hydrology Observatory</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-sm font-medium">
                            A scientific, spatial and temporal analysis of groundwater levels, aquifer storage,
                            surface water interaction, and recharge dynamics for informed water resource management.
                        </p>
                    </motion.div>

                    {/* Analytical Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full max-w-5xl"
                    >
                        {INDICATORS.map((indicator, index) => (
                            <motion.div
                                key={indicator.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    delay: 0.4 + index * 0.1,
                                    ease: "easeInOut",
                                    y: {
                                        duration: 3 + index, // Different durations for organic feel
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                className={`${indicator.bg} border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out [will-change:transform]`}
                                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                                        <indicator.icon className={`w-5 h-5 ${indicator.color}`} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl lg:text-3xl font-bold text-gray-900 font-serif">
                                            {indicator.value}
                                        </span>
                                        <span className="text-sm text-gray-500 font-medium">{indicator.unit}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                                        {indicator.label}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
