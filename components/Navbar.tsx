'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="hidden md:flex items-center gap-3 group">
          <Image 
            src="https://alsabahcandies.com/Materials/logo.sabah.svg" 
            alt="Alsabah Candies Logo" 
            width={120}
            height={40}
            className="h-10 w-auto transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#about" scrolled={scrolled}>قصتنا</NavLink>
          <NavLink href="#products" scrolled={scrolled}>منتجاتنا</NavLink>
          <NavLink href="#packaging" scrolled={scrolled}>التعبئة والتغليف</NavLink>
          <NavLink href="#contact" scrolled={scrolled}>تواصل معنا</NavLink>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children, scrolled }: { href: string; children: React.ReactNode; scrolled: boolean }) {
  return (
    <Link 
      href={href} 
      className={`text-sm uppercase tracking-widest font-medium transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:transition-all hover:after:w-full ${
        scrolled 
          ? 'text-chocolate/80 hover:text-chocolate after:bg-chocolate' 
          : 'text-[#ffefe3] hover:text-white after:bg-[#ffefe3]'
      }`}
    >
      {children}
    </Link>
  );
}
