"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="bg-footer-bg relative text-white pt-16 pb-8 border-t border-white/5 overflow-hidden">
            {/* Subtle Gradient Overlay for Rich Aesthetics */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,165,0,0.05),transparent)] pointer-events-none" />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", staggerChildren: 0.1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16 [will-change:transform]"
                >
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 w-fit backdrop-blur-sm">
                            <Image
                                src="/images/logo.png"
                                alt="KADA Groundwater Observatory"
                                width={44}
                                height={44}
                                className="w-11 h-11"
                            />
                            <div>
                                <h3 className="font-bold text-xl leading-none text-secondary font-serif tracking-tight">KADA</h3>
                                <h3 className="font-bold text-xl leading-none text-white font-serif tracking-tight">GWIS</h3>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            An official analytical portal for groundwater and hydrology assessments in the KADA Region,
                            Government of Andhra Pradesh.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-secondary font-serif">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/overview/about-kada" className="hover:text-secondary transition-colors duration-300 ease-in-out">Overview</Link></li>
                            <li><Link href="/groundwater/current-status" className="hover:text-secondary transition-colors duration-300 ease-in-out">Groundwater Levels</Link></li>
                            <li><Link href="/aquifer/storage-estimation" className="hover:text-secondary transition-colors duration-300 ease-in-out">Aquifer & Storage</Link></li>
                            <li><Link href="/hydrology/surface" className="hover:text-secondary transition-colors duration-300 ease-in-out">Hydrology</Link></li>
                            <li><Link href="/data-methods/methodology" className="hover:text-secondary transition-colors duration-300 ease-in-out">Data & Methods</Link></li>
                        </ul>
                    </div>

                    {/* Analysis Sections */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-secondary font-serif">Analysis Sections</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/mi-tanks/inventory" className="hover:text-secondary transition-colors duration-300 ease-in-out">MI Tanks & HNSS</Link></li>
                            <li><Link href="/water-balance/groundwater-balance" className="hover:text-secondary transition-colors duration-300 ease-in-out">Water Balance</Link></li>
                            <li><Link href="/agriculture/well-inventory" className="hover:text-secondary transition-colors duration-300 ease-in-out">Agriculture & Wells</Link></li>
                            <li><Link href="/conservation/existing" className="hover:text-secondary transition-colors duration-300 ease-in-out">Conservation Planning</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-secondary font-serif">Contact Info</h4>
                        <ul className="space-y-5 text-sm text-gray-400">
                            <li className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 mt-1">
                                    <MapPin className="w-4 h-4 text-secondary shrink-0" />
                                </div>
                                <span className="leading-relaxed">
                                    KADA Office,<br />
                                    KUPPAM,CHITTOR(Dist.)<br />
                                    Andhra Pradesh.
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                    <Phone className="w-4 h-4 text-secondary shrink-0" />
                                </div>
                                <span>1800-425-xxxx</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                    <Mail className="w-4 h-4 text-secondary shrink-0" />
                                </div>
                                <span>support@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Kuppam Engineering College */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold mb-6 text-secondary font-serif">In Association With</h4>
                        <Link href="/website-design-team" className="block bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-secondary/30 transition-all duration-300 cursor-pointer">
                            <Image
                                src="/images/kec-logo.png"
                                alt="Kuppam Engineering College"
                                width={180}
                                height={60}
                                className="h-12 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-gray-400 text-xs leading-relaxed max-w-[200px]">
                            Technical partner for data analysis and visualization solutions.
                        </p>
                    </div>
                </motion.div>

                {/* Disclaimer */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
                    <p className="text-xs text-gray-400 text-center leading-relaxed">
                        <strong className="text-gray-300">Disclaimer:</strong> All information presented is analytical and observational
                        in nature and does not constitute service delivery or grievance redressal. Data is provided for
                        informational and research purposes only.
                    </p>
                </div>

                <hr className="border-white/10 mb-6" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© 2026 KADA GWIS, Govt. of Andhra Pradesh. All rights reserved.</p>
                    <p className="flex items-center gap-2">
                        Designed & Developed by{" "}
                        <Link
                            href="/website-design-team"
                            className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-secondary/90 font-medium text-xs tracking-wide hover:bg-secondary/20 hover:border-secondary/30 transition-all duration-300"
                        >
                            R.SHAKTHI PRASAD & E.Charan Kumar Reddy
                        </Link>
                    </p>
                </div>
            </div>
        </footer >
    );
}
