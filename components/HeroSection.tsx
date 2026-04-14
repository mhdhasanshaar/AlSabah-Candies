'use client';

import { motion } from 'motion/react';

interface HeroSectionProps {
  bannerUrl: string;
  imageUrl?: string;
}

export function HeroSection({ bannerUrl, imageUrl }: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Media Background */}
      <div className="absolute inset-0 z-0">
        {bannerUrl ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            poster={imageUrl}
          >
            <source src={bannerUrl} type="video/mp4" />
          </video>
        ) : imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Hero Banner" 
            className="w-full h-full object-cover"
          />
        ) : null}
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-cream/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <img 
            src="https://alsabahcandies.com/Materials/logo.sabah.svg" 
            alt="Alsabah Candies Logo" 
            className="w-[260px] md:w-[180px] h-auto mx-auto drop-shadow-lg"
          />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-md leading-tight"
        >
          حكاية مستمرة<br />منذ 1947
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
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
