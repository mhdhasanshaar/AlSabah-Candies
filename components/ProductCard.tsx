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
          <svg viewBox="0 0 300 300" className="w-full h-full">
            <g>
              <path fill="#FFFFFF" d="M22.99,106.91c-4.11,5.55-7.61,11.33-10.48,17.41c-4.49,9.38-7.41,19.53-8.9,30.36
                c-0.67,5.19-1.01,10.61-1.04,16.1c0,9.15,1.17,18.01,3.37,26.68c4.22,16.65,12.46,32.55,25.08,48.08
                c13.38,16.56,30.58,29.63,51.12,39c1.82,0.88,3.68,1.54,5.79,2.32l16.64,5.82l-8.96-14.15c0,0-0.1-0.02-0.25-0.11l-0.8-0.55
                c-1.09-0.72-2.21-1.34-3.36-2.02c-26.92-16.06-43.27-38.47-48.79-66.52c-0.64-3.32-0.97-6.52-1.3-9.72
                c-3.19-31.14,8.31-56.86,34.52-76.39c3.27-2.4,6.55-4.54,9.89-6.27c15.83-8.71,32.84-10.75,50.78-6.22
                c4.52,1.18,8.69,2.94,12.49,5.21c13.65,8.13,22.07,22.81,21.24,38.41c0.01,0.98-0.09,1.94-0.25,2.94c-0.6,4.6-1.75,8.49-3.54,11.81
                c1.14-7.65-0.41-16.13-4.68-23.57c-7.09-12.5-19.82-19.61-33.99-18.98c-14.6,0.65-28.87,7.62-39.08,19.21
                c-9.79,11.14-14.8,25.25-13.73,38.8c0.46,6.1,1.79,11.87,3.79,17.35c2.32,6.34,5.56,12.29,9.86,17.75
                c10,12.57,22.49,20.83,37.18,24.34c14.15,3.5,28.49,2.58,42.73-2.77c0,0,0,0,0.06-0.04c3.05-1.09,6.08-2.35,9.05-3.84
                c0.73-0.39,1.4-0.74,2.14-1.12c6.03-3.12,11.54-6.63,16.44-10.54c1.18-0.95,2.29-1.85,3.36-2.82c2.5-2.08,4.71-4.33,6.82-6.6
                c1.33-1.4,2.57-2.93,3.82-4.46c0.46-0.57,0.87-1.17,1.32-1.75c1.91-2.5,3.73-5.06,5.31-7.77c1.02-1.74,1.92-3.4,2.83-5.16
                c0.83-1.62,1.65-3.4,2.44-5.08c-0.04-0.06,0.02-0.1,0.04-0.21c0.75-1.74,1.4-3.51,2.11-5.32c1.27-3.7,2.41-7.48,3.23-11.34
                c4.36-19.96,2.03-40.31-7.13-60.43c-3.41-7.63-7.52-14.55-12.18-20.65c-12.07-16.06-28.19-26.89-48.07-32.48
                c-34.57-9.64-66.54-6.27-95.71,10.15C54.98,77,45.96,83.51,37.31,91.29c-5.43,4.88-10.11,10.09-14.26,15.57L22.99,106.91z"/>
              <path fill="#FFFFFF" d="M251.56,78.28c29.27,41.48,32.16,92.7,11.95,134.99c-9.47,19.81-23.98,37.68-43.3,51.63l5.31,8.41
                c2.25-1.25,4.49-2.61,6.72-4.07c18.56-12.1,36.39-31.06,48.76-54.9c10.67-20.56,17.28-44.75,16.62-71.44
                c-1.16-47.43-26.95-90.18-66.78-114.5c-9.63-5.88-20.05-10.71-31.17-14.23c-14.1-4.46-28.63-6.8-43.4-7.06
                c-7.84-0.14-15.74,0.27-23.68,1.32c-27.53,3.64-56.67,17.5-63.86,25.04L48.23,55.05l26.37-13.7
                C138.58,8.1,213.01,23.64,251.56,78.28z"/>
            </g>
          </svg>
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
