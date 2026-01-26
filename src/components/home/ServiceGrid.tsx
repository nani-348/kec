"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Droplets,
    Layers,
    Activity,
    Waves,
    Scale,
    Sprout,
    ArrowRight
} from "lucide-react";

const ANALYSIS_CATEGORIES = [
    {
        label: "Groundwater Level Analysis",
        description: "Spatial and temporal trends in groundwater levels across observation wells",
        icon: Droplets,
        color: "text-blue-600",
        bg: "bg-blue-50",
        href: "#groundwater-levels"
    },
    {
        label: "Aquifer & Storage Analysis",
        description: "Aquifer characterization, storage coefficients, and capacity assessment",
        icon: Layers,
        color: "text-cyan-600",
        bg: "bg-cyan-50",
        href: "#aquifer-storage"
    },
    {
        label: "Hydrology & Flow Analysis",
        description: "Surface water runoff, drainage patterns, and flow dynamics",
        icon: Activity,
        color: "text-green-600",
        bg: "bg-green-50",
        href: "#hydrology"
    },
    {
        label: "MI Tanks & Surface Storage",
        description: "Minor irrigation tanks, HNSS canals, and surface water bodies",
        icon: Waves,
        color: "text-teal-600",
        bg: "bg-teal-50",
        href: "#mi-tanks"
    },
    {
        label: "Water Balance & Energy",
        description: "Recharge-discharge dynamics and groundwater-surface water interaction",
        icon: Scale,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        href: "#water-balance"
    },
    {
        label: "Agriculture & Wells",
        description: "Irrigation patterns, well density, and agricultural water demand",
        icon: Sprout,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        href: "#agriculture-wells"
    },
];

export default function ServiceGrid() {
    return (
        <section className="py-16 bg-primary relative">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-2 font-serif uppercase tracking-wider">Analysis Categories</h2>
                    <p className="text-white/80 max-w-2xl mx-auto">
                        Explore comprehensive groundwater and hydrology analysis modules for the KADA region
                    </p>
                    <div className="h-1 w-20 bg-secondary mx-auto rounded-full mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ANALYSIS_CATEGORIES.map((category, index) => (
                        <motion.div
                            key={category.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, ease: "easeInOut" }}
                            viewport={{ once: true }}
                            className="group relative h-full"
                        >
                            <Link href={category.href} className="block h-full">
                                <div className="relative h-full p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-primary/20 overflow-hidden [will-change:transform]">
                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 z-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none [will-change:transform]" />

                                    <div className={`relative z-10 p-3 rounded-lg ${category.bg} w-fit mb-4 group-hover:scale-110 transition-transform duration-300 ease-in-out [will-change:transform]`}>
                                        <category.icon className={`w-6 h-6 ${category.color}`} />
                                    </div>
                                    <h3 className="relative z-10 text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300 ease-in-out font-serif">
                                        {category.label}
                                    </h3>
                                    <p className="relative z-10 text-sm text-gray-600 mb-4 flex-grow">
                                        {category.description}
                                    </p>
                                    <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-secondary group-hover:gap-3 transition-all duration-300 ease-in-out">
                                        View Analysis <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
