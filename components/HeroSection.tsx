'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  bannerUrl: string;
  imageUrl?: string;
}

export function HeroSection({ bannerUrl, imageUrl }: HeroSectionProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-cream">
      {/* 1. Immediate Background & Pattern */}
      <div className="absolute inset-0 z-0 bg-pattern-light opacity-40" />

      {/* 2. Media Layer (Image then Video) */}
      <div className="absolute inset-0 z-10">
        {/* Dark base for media - only visible when media starts appearing */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: (isImageLoaded || isVideoLoaded) ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[#0a0a0a]"
        />

        {/* Hero Image (Poster) */}
        {imageUrl && (
          <motion.img 
            src={imageUrl} 
            alt="Hero Banner Poster" 
            onLoad={() => setIsImageLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? (isVideoLoaded ? 0 : 1) : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Hero Video */}
        {bannerUrl && (
          <motion.video 
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoLoaded ? 1 : 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            onLoadedData={() => setIsVideoLoaded(true)}
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={bannerUrl} type="video/mp4" />
          </motion.video>
        )}
        
        {/* Gradient Overlay - Fades in with the media */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: (isImageLoaded || isVideoLoaded) ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-white" 
        />
      </div>

      {/* 3. Content Layer */}
      <div className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center gap-10">
        {/* Logo - Appears early */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img 
            src="https://alsabahcandies.com/Materials/logo.sabah.svg" 
            alt="Alsabah Candies Logo" 
            className={`w-[160px] md:w-[200px] h-auto mx-auto transition-all duration-1000 ${(isImageLoaded || isVideoLoaded) ? 'drop-shadow-lg' : 'drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]'}`}
          />
        </motion.div>
        
        {/* Text & Button - Fade in when media is ready */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: (isImageLoaded || isVideoLoaded) ? 1 : 0,
            y: (isImageLoaded || isVideoLoaded) ? 0 : 20 
          }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center gap-10"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)] leading-tight">
            حكاية مستمرة<br />منذ 1947
          </h1>
          
          <a 
            href="#products" 
            className="inline-block px-12 py-5 bg-brand-red text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white hover:text-brand-red hover:scale-105 transition-all duration-300 shadow-lg"
          >
            استكشف المنتجات
          </a>
        </motion.div>
      </div>
    </section>
  );
}
