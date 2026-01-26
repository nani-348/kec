"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, Minimize2, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InteractiveMapProps {
    src: string;
    alt: string;
    title: string;
    className?: string; // To allow external sizing/styling
}

export default function InteractiveMap({ src, alt, title, className }: InteractiveMapProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            {/* Inline Preview */}
            <div
                className={`relative w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50 group cursor-pointer ${className}`}
                onClick={() => setIsExpanded(true)}
            >
                <Image
                    src={src}
                    alt={`${alt} - Click to Expand`}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    priority
                />

                {/* Overlay Gradient & Hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Bottom Label */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-medium text-gray-700 shadow-sm flex items-center gap-2">
                    {title}
                </div>

                {/* Hover Expand Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg">
                    <ZoomIn className="text-primary w-6 h-6" />
                </div>

                {/* Top Right Maximize Icon */}
                <button
                    className="absolute top-4 right-4 bg-white/80 p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(true);
                    }}
                >
                    <Maximize2 size={18} />
                </button>
            </div>

            {/* Fullscreen Modal/Lightbox */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                        onClick={() => setIsExpanded(false)}
                    >
                        {/* Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close / Minimize Controls */}
                            <div className="absolute top-0 right-0 p-4 flex gap-4 z-50">
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors backdrop-blur-md border border-white/20"
                                    title="Minimize / Close"
                                >
                                    <Minimize2 size={24} />
                                </button>
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors backdrop-blur-md"
                                    title="Close"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Large Image */}
                            <div className="relative w-full h-full rounded-lg overflow-hidden">
                                <Image
                                    src={src}
                                    alt={`${alt} - Fullscreen`}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                />
                            </div>

                            <div className="mt-4 text-white/80 text-sm font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
                                {title} - Detailed View
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
