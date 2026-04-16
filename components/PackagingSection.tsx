'use client';

import { motion } from 'motion/react';

const packagingOptions = [
  'كيس ( 200 غرام )',
  'صندوق ( 30 كيس )',
  'صندوق ( 10 كيلو )',
];

export function PackagingSection() {
  return (
    <section id="packaging" className="py-24 md:py-32 bg-footer-gradient text-white relative overflow-hidden">
      {/* Animated Fluid Blobs for consistency with ContactSection */}
      <div className="fluid-blob fluid-blob-1 opacity-40" />
      <div className="fluid-blob fluid-blob-2 opacity-40" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 mb-6"
          >
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/90 font-bold">التوفر</h2>
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-6"
          >
            خيارات الشراء
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packagingOptions.map((option, i) => (
            <motion.div
              key={option}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-10 flex items-center justify-center text-center transition-all duration-500 group-hover:bg-white/20 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:border-white/40">
                <span className="text-xl md:text-2xl font-bold text-white transition-colors duration-300">
                  {option}
                </span>
                
                {/* Subtle corner accent */}
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
