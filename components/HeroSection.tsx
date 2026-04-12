'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

interface HeroSectionProps {
  bannerUrl: string;
}

export function HeroSection({ bannerUrl }: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={bannerUrl} type="video/mp4" />
        </video>
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-cream/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <Image 
            src="https://alsabahcandies.com/Test/logo.sabah.svg" 
            alt="Alsabah Candies Logo" 
            width={200}
            height={100}
            className="h-24 md:h-32 w-auto mx-auto drop-shadow-lg"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-md"
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
            className="inline-block px-10 py-4 bg-brand-red text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white hover:text-brand-red hover:scale-105 transition-all duration-300 shadow-lg"
          >
            استكشف المنتجات
          </a>
        </motion.div>
      </div>
    </section>
  );
}
