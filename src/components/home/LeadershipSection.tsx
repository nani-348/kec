"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const LEADERS = [
    {
        name: "Sri N. Chandrababu Naidu",
        designation: "Hon'ble Chief Minister",
        image: "/images/cm.png"
    },
    {
        name: "Sri Pawan Kalyan",
        designation: "Hon'ble Deputy Chief Minister",
        image: "/images/pspk.svg"
    }
];

export default function LeadershipSection() {
    return (
        <section className="py-12 bg-white flex justify-center">
            <div className="container-custom">
                <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
                    {LEADERS.map((leader, index) => (
                        <motion.div
                            key={leader.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="relative w-40 h-40 lg:w-48 lg:h-48 mb-4 overflow-hidden rounded-full shadow-lg border-2 border-primary/10 group-hover:border-primary/30 transition-all duration-300">
                                <Image
                                    src={leader.image}
                                    alt={leader.name}
                                    fill
                                    sizes="(max-width: 768px) 160px, 192px"
                                    className="object-cover transition-all duration-500 scale-105 group-hover:scale-110"
                                />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-lg font-bold text-gray-900 font-serif leading-tight">
                                    {leader.name}
                                </h4>
                                <p className="text-secondary text-xs lg:text-sm font-bold uppercase tracking-widest text-balance">
                                    {leader.designation}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
