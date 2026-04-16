'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React from 'react';
import { encodeSafeUrl } from '@/lib/utils';

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
              src={encodeSafeUrl(image)}
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
          className="flex flex-col items-center text-center space-y-6 relative z-10 flex-grow w-full"
        >
          {/* Title Badge - Premium Style (Unified Size & Auto-fit text) */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative -mt-10 mb-2 cursor-default"
          >
            {/* The Badge Shape */}
            <div className="bg-brand-red w-[240px] md:w-[280px] h-14 md:h-16 flex items-center justify-center rounded-[30px] md:rounded-[40px] shadow-[0_8px_25px_rgba(237,28,36,0.4)] border-b-4 border-[#b3141a] relative overflow-hidden group">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <h4 className="text-white text-lg md:text-xl font-black leading-none tracking-tight px-4 whitespace-nowrap overflow-hidden text-ellipsis">
                {title}
              </h4>
            </div>
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
