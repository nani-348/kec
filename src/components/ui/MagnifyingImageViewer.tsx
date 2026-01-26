"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Maximize2, Minimize2, X, ZoomIn, ZoomOut, Move, RotateCcw, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MagnifyingImageViewerProps {
    src: string;
    alt: string;
    title: string;
    className?: string;
}

export default function MagnifyingImageViewer({ src, alt, title, className }: MagnifyingImageViewerProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMagnifierActive, setIsMagnifierActive] = useState(false);
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });

    const imageContainerRef = useRef<HTMLDivElement>(null);
    const magnifierSize = 180;
    const magnifierZoom = 2.5;

    // Handle magnifier movement
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageContainerRef.current) return;

        const rect = imageContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Keep magnifier within bounds
        const boundedX = Math.max(0, Math.min(x, rect.width));
        const boundedY = Math.max(0, Math.min(y, rect.height));

        if (isMagnifierActive && !isPanning) {
            setMagnifierPosition({ x: boundedX, y: boundedY });
            setShowMagnifier(true);
        }

        // Handle panning
        if (isPanning && zoom > 1) {
            const deltaX = e.clientX - panStart.x;
            const deltaY = e.clientY - panStart.y;
            setImagePosition(prev => ({
                x: prev.x + deltaX,
                y: prev.y + deltaY
            }));
            setPanStart({ x: e.clientX, y: e.clientY });
        }
    }, [isMagnifierActive, isPanning, panStart, zoom]);

    const handleMouseLeave = () => {
        setShowMagnifier(false);
    };

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 0.5, 4));
    };

    const handleZoomOut = () => {
        setZoom(prev => {
            const newZoom = Math.max(prev - 0.5, 1);
            if (newZoom === 1) {
                setImagePosition({ x: 0, y: 0 });
            }
            return newZoom;
        });
    };

    const handleReset = () => {
        setZoom(1);
        setImagePosition({ x: 0, y: 0 });
        setIsMagnifierActive(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom > 1 && !isMagnifierActive) {
            setIsPanning(true);
            setPanStart({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    // Handle wheel zoom
    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            setZoom(prev => Math.min(prev + 0.2, 4));
        } else {
            setZoom(prev => {
                const newZoom = Math.max(prev - 0.2, 1);
                if (newZoom === 1) {
                    setImagePosition({ x: 0, y: 0 });
                }
                return newZoom;
            });
        }
    }, []);

    // Reset on close
    useEffect(() => {
        if (!isExpanded) {
            handleReset();
        }
    }, [isExpanded]);

    return (
        <>
            {/* Inline Preview Card */}
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

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Bottom Label */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-medium text-gray-700 shadow-sm flex items-center gap-2">
                    <Search size={14} className="text-primary" />
                    {title}
                </div>

                {/* Hover Expand Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg">
                    <ZoomIn className="text-primary w-6 h-6" />
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    🔍 Click to Zoom
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

            {/* Fullscreen Modal with Magnifier */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col"
                        onClick={() => setIsExpanded(false)}
                    >
                        {/* Top Control Bar */}
                        <div className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
                            {/* Title */}
                            <div className="text-white font-medium flex items-center gap-2">
                                <Search size={18} className="text-secondary" />
                                {title}
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-2">
                                {/* Magnifier Toggle */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsMagnifierActive(!isMagnifierActive);
                                    }}
                                    className={`p-2.5 rounded-full transition-all backdrop-blur-md border ${isMagnifierActive
                                            ? 'bg-secondary text-white border-secondary'
                                            : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                                        }`}
                                    title="Toggle Magnifier"
                                >
                                    <Search size={20} />
                                </button>

                                {/* Zoom In */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleZoomIn();
                                    }}
                                    className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors backdrop-blur-md border border-white/20"
                                    title="Zoom In"
                                >
                                    <ZoomIn size={20} />
                                </button>

                                {/* Zoom Level Badge */}
                                <div className="bg-white/10 text-white text-sm font-medium px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 min-w-[60px] text-center">
                                    {Math.round(zoom * 100)}%
                                </div>

                                {/* Zoom Out */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleZoomOut();
                                    }}
                                    className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors backdrop-blur-md border border-white/20"
                                    title="Zoom Out"
                                >
                                    <ZoomOut size={20} />
                                </button>

                                {/* Reset */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleReset();
                                    }}
                                    className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors backdrop-blur-md border border-white/20"
                                    title="Reset View"
                                >
                                    <RotateCcw size={20} />
                                </button>

                                {/* Divider */}
                                <div className="w-px h-8 bg-white/20 mx-2" />

                                {/* Close */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsExpanded(false);
                                    }}
                                    className="bg-red-500/80 hover:bg-red-600 text-white p-2.5 rounded-full transition-colors backdrop-blur-md"
                                    title="Close"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Image Container */}
                        <div
                            ref={imageContainerRef}
                            className={`flex-1 flex items-center justify-center overflow-hidden m-4 mt-20 mb-4 ${zoom > 1 && !isMagnifierActive ? 'cursor-grab active:cursor-grabbing' : ''
                                } ${isMagnifierActive ? 'cursor-crosshair' : ''}`}
                            onClick={(e) => e.stopPropagation()}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onWheel={handleWheel}
                        >
                            <div
                                className="relative w-full h-full transition-transform duration-150 ease-out"
                                style={{
                                    transform: `scale(${zoom}) translate(${imagePosition.x / zoom}px, ${imagePosition.y / zoom}px)`,
                                }}
                            >
                                <Image
                                    src={src}
                                    alt={`${alt} - Fullscreen`}
                                    fill
                                    className="object-contain select-none"
                                    quality={100}
                                    draggable={false}
                                />
                            </div>

                            {/* Magnifying Glass Lens */}
                            {showMagnifier && isMagnifierActive && (
                                <div
                                    className="absolute pointer-events-none border-4 border-white/80 rounded-full overflow-hidden shadow-2xl"
                                    style={{
                                        width: magnifierSize,
                                        height: magnifierSize,
                                        left: magnifierPosition.x - magnifierSize / 2,
                                        top: magnifierPosition.y - magnifierSize / 2,
                                        boxShadow: '0 0 0 3px rgba(0,0,0,0.3), 0 25px 50px -12px rgba(0,0,0,0.5)',
                                    }}
                                >
                                    <div
                                        className="absolute"
                                        style={{
                                            width: imageContainerRef.current?.offsetWidth || 0,
                                            height: imageContainerRef.current?.offsetHeight || 0,
                                            transform: `scale(${magnifierZoom})`,
                                            transformOrigin: `${magnifierPosition.x}px ${magnifierPosition.y}px`,
                                            left: -(magnifierPosition.x * magnifierZoom - magnifierSize / 2),
                                            top: -(magnifierPosition.y * magnifierZoom - magnifierSize / 2),
                                        }}
                                    >
                                        <Image
                                            src={src}
                                            alt=""
                                            fill
                                            className="object-contain"
                                            quality={100}
                                        />
                                    </div>

                                    {/* Crosshair in magnifier */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-full h-px bg-red-500/50" />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="h-full w-px bg-red-500/50" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bottom Hint Bar */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center bg-gradient-to-t from-black/60 to-transparent">
                            <div className="flex gap-6 text-white/60 text-xs">
                                <span className="flex items-center gap-1">
                                    <Search size={14} /> Magnifier: {isMagnifierActive ? 'ON' : 'OFF'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Move size={14} /> Scroll to zoom, drag to pan
                                </span>
                                <span>Press ESC to close</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
