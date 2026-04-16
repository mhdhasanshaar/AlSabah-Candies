'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React from 'react';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  weight?: string;
}

export function ProductCard({ title, description, image, weight }: ProductCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable on mobile (simple check)
    if (window.innerWidth < 768) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ 
        scale: 1.08,
        y: -10,
      }}
      className="relative pt-32 pb-12 group h-full flex flex-col perspective-1000"
    >
      {/* Floating Product Image */}
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute -top-10 md:-top-16 left-1/2 -translate-x-1/2 z-20 w-72 h-72 md:w-80 md:h-80 pointer-events-none"
      >
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full drop-shadow-2xl scale-110"
        >
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center text-white/40">
              <span>No Image</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Card Container */}
      <div 
        style={{ transform: "translateZ(0px)" }}
        className="relative flex-grow bg-[#E8C999] rounded-[3rem] px-8 pt-32 pb-12 shadow-lg transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col items-center"
      >
        
        {/* Subtle Liquid Effect Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -inset-[50%] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)] animate-liquid opacity-50" />
        </div>

        {/* Brand Identity SVG (Sun/Swirl) - Enhanced with Creamy Liquid Motion */}
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scaleX: [1, 1.1, 0.9, 1.05, 1],
            scaleY: [1, 0.9, 1.1, 0.95, 1],
          }}
          transition={{
            rotate: {
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            },
            scaleX: {
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scaleY: {
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="absolute top-4 left-1/2 -translate-x-1/2 w-[120%] h-auto opacity-20 pointer-events-none"
        >
          <img 
            src="https://alsabahcandies.com/Materials/sun1.svg" 
            alt="Brand Identity" 
            className="w-full h-full"
          />
        </motion.div>
        
        <div 
          style={{ transform: "translateZ(30px)" }}
          className="flex flex-col items-center text-center space-y-6 relative z-10 flex-grow"
        >
          {/* Title Badge - Premium Style */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-b from-[#ff2d2d] to-[#c40000] px-10 py-4 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.2)] shadow-[inset_0_2px_6px_rgba(0,0,0,0.25)] hover:shadow-[0_0_15px_rgba(255,50,50,0.5)] transition-all duration-300 -mt-8 cursor-default"
          >
            <h4 className="text-white text-2xl font-bold leading-none tracking-tight">
              {title}
            </h4>
          </motion.div>

          {/* Weight Badge (Optional) */}
          {weight && (
            <div className="bg-chocolate/10 px-4 py-1 rounded-full">
              <span className="text-chocolate font-medium text-sm">{weight}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-chocolate/80 text-base md:text-lg font-light leading-relaxed max-w-[280px] mx-auto">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
