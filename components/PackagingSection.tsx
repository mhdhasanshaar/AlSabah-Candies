'use client';

import { motion } from 'motion/react';

const packagingOptions = [
  'كيس ( 200 غرام )',
  'صندوق ( 30 كيس )',
  'صندوق ( 10 كيلو )',
];

export function PackagingSection() {
  return (
    <section id="packaging" className="py-24 md:py-32 bg-white bg-pattern-light relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border border-chocolate rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border border-chocolate rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.3em] text-brand-red mb-4 font-bold"
          >
            التوفر
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-chocolate"
          >
            خيارات الشراء
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packagingOptions.map((option, i) => (
            <motion.div
              key={option}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="h-full bg-cream/30 backdrop-blur-sm border border-chocolate/10 rounded-[2.5rem] p-10 flex items-center justify-center text-center transition-all duration-500 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-chocolate/5 group-hover:border-brand-red/20">
                <span className="text-xl md:text-2xl font-bold text-chocolate group-hover:text-brand-red transition-colors duration-300">
                  {option}
                </span>
                
                {/* Subtle corner accent */}
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-brand-red/20 group-hover:bg-brand-red transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
