"use client";

import React from "react";
import { motion, useMotionValue, useTransform, useInView, animate } from "framer-motion";

const STATS = [
    { label: "Observation Wells", value: "847", suffix: "" },
    { label: "Mandals Covered", value: "24", suffix: "" },
    { label: "Data Points Analyzed", value: "1.2", suffix: "M+" },
    { label: "Years of Data", value: "15", suffix: "+" },
];

const Counter = ({ value, suffix = "" }: { value: string, suffix?: string }) => {
    // Parse the numeric part (handling decimals like 1.2)
    const numericValue = parseFloat(value.replace(/,/g, ""));
    const isDecimal = value.includes(".");

    // Create a motion value starting at 0
    const count = useMotionValue(0);
    // Use a spring for smooth "ease-out" effect
    const rounded = useTransform(count, (latest) => {
        if (isDecimal) return latest.toFixed(1);
        return Math.round(latest).toLocaleString();
    });

    // Create a ref for the element to trigger the animation when in view
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    React.useEffect(() => {
        if (isInView) {
            animate(count, numericValue, { duration: 2.5, ease: "circOut" });
        }
    }, [count, isInView, numericValue]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
};

export default function StatsSection() {
    return (
        <section className="py-20 bg-background relative overflow-hidden border-y border-gray-100">
            <div className="container-custom relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-secondary font-serif italic mb-2">Observatory Coverage</h2>
                        <div className="h-0.5 w-40 bg-gray-200 mx-auto" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-primary text-center hover:shadow-lg transition-all duration-300 ease-in-out group"
                            whileHover={{ y: -5 }}
                        >
                            <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-2 font-serif flex justify-center items-center gap-0.5">
                                <Counter value={stat.value} />
                                <span className="text-xl">{stat.suffix}</span>
                            </h3>
                            <p className="text-gray-600 font-medium font-sans uppercase tracking-wide text-xs group-hover:text-secondary transition-colors duration-300">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
