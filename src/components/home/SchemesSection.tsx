"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Target, BarChart3 } from "lucide-react";

import { motion } from "framer-motion";

export default function SchemesSection() {
    return (
        <section className="py-16 bg-swarna-bg relative">
            <div className="container-custom">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-secondary mb-10 text-center lg:text-left font-serif italic"
                >
                    Key Analysis Themes
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Conservation Planning Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        whileHover={{ y: -5 }}
                        viewport={{ once: true }}
                        className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out bg-blue-50 border border-blue-100 [will-change:transform]"
                    >
                        <div className="p-8">
                            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-3 [will-change:transform]">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 ease-in-out font-serif">
                                Conservation Planning
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Identification of recharge zones, potential conservation structures, and sustainable
                                groundwater management strategies based on hydrogeological assessments.
                            </p>
                            <Link
                                href="/conservation/proposed"
                                className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all duration-300 ease-in-out"
                            >
                                View Analysis <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Data & Methods Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        whileHover={{ y: -5 }}
                        viewport={{ once: true }}
                        className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out bg-green-50 border border-green-100 [will-change:transform]"
                    >
                        <div className="p-8">
                            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 text-green-600 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-3 [will-change:transform]">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300 ease-in-out font-serif">
                                Data & Methodology
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Scientific methodologies, data sources, and analytical frameworks used for groundwater
                                assessment including GEC norms, water balance equations, and spatial analysis techniques.
                            </p>
                            <Link
                                href="/data-methods/methodology"
                                className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300 ease-in-out"
                            >
                                View Details <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
