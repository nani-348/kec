"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw, Search, Move, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InteractiveMapProps {
    src: string;
    alt: string;
    title: string;
    className?: string;
}

export default function InteractiveMap({ src, alt, title, className }: InteractiveMapProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMagnifierActive, setIsMagnifierActive] = useState(false);
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    const imageContainerRef = useRef<HTMLDivElement>(null);
    const magnifierSize = 200;
    const magnifierZoom = 3;

    useEffect(() => {
        const node = imageContainerRef.current;
        if (!node) return;

        const updateSize = () => {
            setContainerSize({ width: node.offsetWidth, height: node.offsetHeight });
        };

        updateSize();
        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(node);

        return () => resizeObserver.disconnect();
    }, [isExpanded]);

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
        setZoom(prev => Math.min(prev + 0.5, 5));
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

    const closeModal = () => {
        handleReset();
        setIsExpanded(false);
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
            setZoom(prev => Math.min(prev + 0.25, 5));
        } else {
            setZoom(prev => {
                const newZoom = Math.max(prev - 0.25, 1);
                if (newZoom === 1) {
                    setImagePosition({ x: 0, y: 0 });
                }
                return newZoom;
            });
        }
    }, []);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isExpanded) return;

            switch (e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case '+':
                case '=':
                    handleZoomIn();
                    break;
                case '-':
                    handleZoomOut();
                    break;
                case 'm':
                case 'M':
                    setIsMagnifierActive(prev => !prev);
                    break;
                case 'r':
                case 'R':
                    handleReset();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isExpanded]);

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
                    <Search size={14} className="text-primary" />
                    {title}
                </div>

                {/* Hint Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg flex items-center gap-1.5">
                    <Search size={12} />
                    Click to Zoom & Magnify
                </div>

                {/* Hover Expand Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-4 rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-xl">
                    <ZoomIn className="text-primary w-8 h-8" />
                </div>

                {/* Top Right Maximize Icon */}
                <button
                    className="absolute top-4 right-4 bg-white/80 p-2.5 rounded-lg text-gray-700 hover:text-primary hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
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
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col"
                        onClick={closeModal}
                    >
                        {/* Top Control Bar */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 via-black/40 to-transparent"
                        >
                            {/* Title */}
                            <div className="text-white font-medium flex items-center gap-3">
                                <div className="p-2 bg-secondary/20 rounded-lg">
                                    <Search size={18} className="text-secondary" />
                                </div>
                                <span className="text-lg">{title}</span>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-2">
                                {/* Magnifier Toggle */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsMagnifierActive(!isMagnifierActive);
                                    }}
                                    className={`p-3 rounded-xl transition-all backdrop-blur-md border flex items-center gap-2 ${isMagnifierActive
                                            ? 'bg-secondary text-white border-secondary shadow-lg shadow-secondary/30'
                                            : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                                        }`}
                                    title="Toggle Magnifier (M)"
                                >
                                    <Search size={18} />
                                    <span className="text-sm font-medium hidden sm:inline">Magnifier</span>
                                </button>

                                <div className="h-8 w-px bg-white/20 mx-1" />

                                {/* Zoom Controls */}
                                <div className="flex items-center bg-white/10 rounded-xl backdrop-blur-md border border-white/20 overflow-hidden">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleZoomOut();
                                        }}
                                        className="p-3 text-white hover:bg-white/10 transition-colors"
                                        title="Zoom Out (-)"
                                    >
                                        <Minus size={18} />
                                    </button>

                                    <div className="px-3 py-2 text-white text-sm font-bold min-w-[70px] text-center border-x border-white/10">
                                        {Math.round(zoom * 100)}%
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleZoomIn();
                                        }}
                                        className="p-3 text-white hover:bg-white/10 transition-colors"
                                        title="Zoom In (+)"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>

                                {/* Reset */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleReset();
                                    }}
                                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-white/20"
                                    title="Reset View (R)"
                                >
                                    <RotateCcw size={18} />
                                </button>

                                <div className="h-8 w-px bg-white/20 mx-1" />

                                {/* Close */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeModal();
                                    }}
                                    className="p-3 rounded-xl bg-red-500/80 hover:bg-red-500 text-white transition-colors backdrop-blur-md shadow-lg"
                                    title="Close (ESC)"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </motion.div>

                        {/* Image Container */}
                        <div
                            ref={imageContainerRef}
                            className={`flex-1 flex items-center justify-center overflow-hidden m-4 mt-24 mb-20 rounded-xl ${zoom > 1 && !isMagnifierActive ? 'cursor-grab active:cursor-grabbing' : ''
                                } ${isMagnifierActive ? 'cursor-none' : ''}`}
                            onClick={(e) => e.stopPropagation()}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onWheel={handleWheel}
                        >
                            <motion.div
                                className="relative w-full h-full"
                                style={{
                                    transform: `scale(${zoom}) translate(${imagePosition.x / zoom}px, ${imagePosition.y / zoom}px)`,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <Image
                                    src={src}
                                    alt={`${alt} - Fullscreen`}
                                    fill
                                    className="object-contain select-none"
                                    quality={100}
                                    draggable={false}
                                />
                            </motion.div>

                            {/* Magnifying Glass Lens */}
                            {showMagnifier && isMagnifierActive && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute pointer-events-none rounded-full overflow-hidden"
                                    style={{
                                        width: magnifierSize,
                                        height: magnifierSize,
                                        left: magnifierPosition.x - magnifierSize / 2,
                                        top: magnifierPosition.y - magnifierSize / 2,
                                        border: '4px solid rgba(255,255,255,0.9)',
                                        boxShadow: '0 0 0 2px rgba(0,0,0,0.3), 0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <div
                                        className="absolute rounded-full"
                                        style={{
                                            width: containerSize.width,
                                            height: containerSize.height,
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

                                    {/* Crosshair */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-full h-[1px] bg-red-500/60" />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="h-full w-[1px] bg-red-500/60" />
                                    </div>

                                    {/* Magnifier Label */}
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                        {magnifierZoom}x ZOOM
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Bottom Hint Bar */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="absolute bottom-0 left-0 right-0 p-4 flex justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                        >
                            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-white/70 text-xs">
                                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isMagnifierActive ? 'bg-secondary/20 text-secondary' : 'bg-white/5'}`}>
                                    <Search size={14} />
                                    Magnifier: <span className="font-bold">{isMagnifierActive ? 'ON' : 'OFF'}</span>
                                    <span className="text-white/40 ml-1">(M)</span>
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5">
                                    <Move size={14} /> Scroll to zoom • Drag to pan
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5">
                                    <span className="text-white/50">ESC</span> to close
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
