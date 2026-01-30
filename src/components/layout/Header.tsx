"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, Globe, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const NAV_ITEMS = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Overview",
        href: "/overview/about-kada",
        subItems: [
            { label: "About KADA Region", href: "/overview/about-kada" },
            { label: "Administrative Profile", href: "/overview/admin-profile" },
            { label: "Rainfall Characteristics", href: "/overview/rainfall" },
            { label: "Spatial Framework", href: "/overview/spatial-framework" },
        ]
    },
    {
        label: "Groundwater Levels",
        href: "/groundwater/real-time",
        subItems: [
            { label: "Real-Time Water Levels", href: "/groundwater/real-time" },
            { label: "Annual & Long-Term Trends", href: "/groundwater/annual-trends" },
            { label: "Spatial Distribution", href: "/groundwater/spatial-distribution" },
            { label: "Seasonal Fluctuation", href: "/groundwater/seasonal-fluctuation" },
            { label: "Seasonal GIS Analysis", href: "/groundwater/seasonal-gis" },
            { label: "Current Status", href: "/groundwater/current-status" },
            { label: "Piezometer Observations", href: "/groundwater/piezometer-obs" },
        ]
    },
    {
        label: "Conservation Planning",
        href: "/conservation/water-conservation-plan",
        subItems: [
            { label: "Water Conservation Plan Status", href: "/conservation/water-conservation-plan" },
            { label: "Conservation Maps & Analysis", href: "/conservation/maps-analysis" },
        ]
    },
    {
        label: "Hydrology Analysis",
        href: "/hydrology/surface",
        subItems: [
            { label: "Flow Accumulation Analysis", href: "/hydrology/surface" },
            { label: "Indexing & Zone Identification", href: "/hydrology/indexing" },
        ]
    },
    {
        label: "MI Tanks & HNSS",
        href: "/mi-tanks/storage-status",
        subItems: [
            { label: "MI Tank Storage Status", href: "/mi-tanks/storage-status" },
            { label: "MI Tank Storage Change", href: "/mi-tanks/storage-change" },
            { label: "HNSS-Linked MI Tanks", href: "/mi-tanks/hnss-linked" },
            { label: "HNSS Interventions", href: "/mi-tanks/hnss-interventions" },
            { label: "HNSS & MIT Influence", href: "/agriculture/hnss-influence" },
        ]
    },
    {
        label: "Water Balance",
        href: "/water-balance/monthly-gwr",
        subItems: [

            { label: "Monthly Ground Water Resources", href: "/water-balance/monthly-gwr" },
            { label: "Annual GW Estimation", href: "/groundwater/gw-estimation" },
        ]
    },
    {
        label: "Agriculture & Wells",
        href: "/agriculture/well-status",
        subItems: [
            { label: "Status of Bore Wells", href: "/agriculture/well-status" },
            { label: "Well Density", href: "/agriculture/well-density" },
            { label: "Ground Water Stress", href: "/agriculture/groundwater-stress" },
            { label: "Well Characteristics", href: "/agriculture/well-characteristics" },
            { label: "Cropping & Irrigation Practices", href: "/agriculture/cropping" },
        ]
    }
];

const MORE_MENU_ITEMS = [
    { label: "Groundwater Resources", href: "/#", heading: true },
    { label: "Recharge Components", href: "/resources/recharge" },
    { label: "Extraction Components", href: "/resources/extraction" },
    { label: "Availability & Balance", href: "/resources/availability" },
    { label: "Aquifer & Storage", href: "/#", heading: true, className: "mt-3" },
    { label: "Aquifer Demarcation", href: "/aquifer/demarcation" },
    { label: "Aquifer Parameters", href: "/aquifer/parameters" },
    { label: "Groundwater In-Storage Estimation", href: "/aquifer/storage-estimation" },
    { label: "Sustainability Indicators", href: "/aquifer/sustainability" },
    { label: "Case Studies", href: "/#", heading: true, className: "mt-3" },
    { label: "Cherlopalli Medium Reservoir", href: "/case-studies/cherlopalli" },
    { label: "Data & Methods", href: "/#", heading: true, className: "mt-3" },
    { label: "Methodology", href: "/data-methods/methodology" },
    { label: "Assumptions & Limitations", href: "/data-methods/assumptions" },
    { label: "Data Sources & Downloads", href: "/data-methods/downloads" },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

    const toggleMobileItem = (label: string) => {
        setExpandedMobileItem(prev => prev === label ? null : label);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 transition-all duration-300 ease-in-out">
            {/* Top Bar */}
            <div className="bg-primary text-white text-xs py-1 px-4 hidden md:flex justify-between items-center">
                <div className="flex space-x-4">
                    <span className="flex items-center gap-1"><Phone size={12} /> Call Us: 1800-425-xxxx</span>
                    <span className="flex items-center gap-1"><Mail size={12} /> support@gmail.com</span>
                </div>
                <div className="flex space-x-4">
                    <span className="cursor-pointer hover:underline">Skip to Main Content</span>
                    <span className="flex items-center gap-1 cursor-pointer"><Globe size={12} /> English</span>
                </div>
            </div>

            <div className="w-full px-2 lg:px-6 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-4 shrink-0">
                    <div className="relative h-12 w-12 lg:h-14 lg:w-14">
                        <Image
                            src="/images/logo.png"
                            alt="KADA-GWRS Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl lg:text-3xl font-bold leading-none font-serif tracking-tight text-primary">
                            KADA-GWRS
                        </h1>
                        <p className="text-[9px] lg:text-[11px] text-secondary font-bold uppercase tracking-[0.25em] mt-1.5 opacity-90 whitespace-nowrap">
                            Govt. of Andhra Pradesh
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation - Optimized Spacing */}
                <nav className="hidden xl:flex items-center justify-between flex-grow ml-12 h-full max-w-7xl mx-auto">
                    {NAV_ITEMS.map((item) => (
                        <div
                            key={item.label}
                            className="relative group h-full flex items-center py-3 px-2"
                            onMouseEnter={() => setActiveDropdown(item.label)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={item.href}
                                className={clsx(
                                    "text-[13px] font-semibold whitespace-nowrap transition-all duration-300 ease-in-out hover:text-secondary py-1 border-b-2 border-transparent hover:border-secondary/30",
                                    activeDropdown === item.label ? "text-secondary border-secondary/30" : "text-gray-700"
                                )}
                            >
                                {item.label}
                            </Link>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {activeDropdown === item.label && item.subItems && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        className="absolute top-full left-0 mt-0 w-64 bg-white rounded-b-md shadow-xl border-t-2 border-primary border-x border-b border-gray-100 overflow-hidden z-40"
                                    >
                                        <div className="py-2">
                                            {item.subItems.map((subItem) => (
                                                <Link
                                                    key={subItem.label}
                                                    href={subItem.href}
                                                    className="group flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors duration-200"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors duration-200" />
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    {/* More Dropdown */}
                    <div
                        className="relative group h-full flex items-center py-3 px-2"
                        onMouseEnter={() => setActiveDropdown("more")}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button
                            className={clsx(
                                "text-[13px] font-semibold whitespace-nowrap transition-all duration-300 ease-in-out hover:text-secondary py-1 flex items-center gap-1 border-b-2 border-transparent hover:border-secondary/30 cursor-pointer",
                                activeDropdown === "more" ? "text-secondary border-secondary/30" : "text-gray-700"
                            )}
                        >
                            More <ChevronDown size={14} />
                        </button>

                        <AnimatePresence>
                            {activeDropdown === "more" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="absolute top-full right-0 mt-0 w-72 bg-white rounded-b-md shadow-xl border-t-2 border-primary border-x border-b border-gray-100 overflow-hidden z-40"
                                >
                                    <div className="py-3 max-h-[80vh] overflow-y-auto">
                                        {MORE_MENU_ITEMS.map((item, idx) => (
                                            item.heading ? (
                                                <div key={idx} className={`px-4 py-2 text-[11px] font-bold text-primary uppercase tracking-wider ${item.className || ''}`}>
                                                    {item.label}
                                                </div>
                                            ) : (
                                                <Link
                                                    key={idx}
                                                    href={item.href}
                                                    className="group flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors duration-200"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors duration-200" />
                                                    {item.label}
                                                </Link>
                                            )
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="xl:hidden p-2 text-gray-700"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="xl:hidden border-t border-gray-100 bg-white overflow-hidden max-h-[80vh] overflow-y-auto"
                    >
                        <div className="flex flex-col p-4 space-y-1">
                            {NAV_ITEMS.map((item) => (
                                <div key={item.label} className="border-b border-gray-50">
                                    {item.subItems ? (
                                        <>
                                            <button
                                                onClick={() => toggleMobileItem(item.label)}
                                                className="flex items-center justify-between w-full py-3 text-left font-semibold text-sm text-gray-800 focus:outline-none group"
                                            >
                                                {item.label}
                                                <ChevronDown size={16} className={clsx("transition-transform duration-300 text-gray-400 group-hover:text-primary", expandedMobileItem === item.label ? "rotate-180 text-primary" : "")} />
                                            </button>
                                            <AnimatePresence>
                                                {expandedMobileItem === item.label && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pl-4 pb-3 space-y-1 text-gray-600 border-l-2 border-secondary/20 ml-1 mb-2">
                                                            {item.subItems.map((subItem) => (
                                                                <Link
                                                                    key={subItem.label}
                                                                    href={subItem.href}
                                                                    className="flex items-center gap-2 text-xs py-2 hover:text-primary transition-colors font-medium group"
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                >
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors duration-200" />
                                                                    {subItem.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="flex items-center w-full py-3 text-left font-semibold text-sm text-gray-800 hover:text-primary transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}

                            {/* More Resources Accordion */}
                            <div className="border-b border-gray-50 mt-2">
                                <button
                                    onClick={() => toggleMobileItem("More Resources")}
                                    className="flex items-center justify-between w-full py-3 text-left font-semibold text-sm text-gray-800 focus:outline-none group"
                                >
                                    More Resources
                                    <ChevronDown size={16} className={clsx("transition-transform duration-300 text-gray-400 group-hover:text-primary", expandedMobileItem === "More Resources" ? "rotate-180 text-primary" : "")} />
                                </button>
                                <AnimatePresence>
                                    {expandedMobileItem === "More Resources" && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-4 pb-3 space-y-1 text-gray-600 border-l-2 border-secondary/20 ml-1 mb-2">
                                                {MORE_MENU_ITEMS.map((item, idx) => (
                                                    item.heading ? (
                                                        <div key={idx} className={`pt-2 pb-1 text-[10px] font-bold text-primary uppercase tracking-wider ${item.className || ''}`}>
                                                            {item.label}
                                                        </div>
                                                    ) : (
                                                        <Link
                                                            key={idx}
                                                            href={item.href}
                                                            className="flex items-center gap-2 text-xs py-2 hover:text-primary transition-colors font-medium group"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors duration-200" />
                                                            {item.label}
                                                        </Link>
                                                    )
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
