'use client';

import { motion } from 'motion/react';
import { encodeSafeUrl } from '@/lib/utils';

interface AboutSectionProps {
  data?: {
    title: string;
    subtitle: string;
    description: string;
    image_url: string;
  };
}

export function AboutSection({ data }: AboutSectionProps) {
  const title = data?.title || "نصنع ذكريات حلوة منذ 1947";
  const subtitle = data?.subtitle || "تراثنا";
  const description = data?.description || "تأسست شركة سكاكر الصباح في دمشق عام 1947 وتعد من أول وأعرق الشركات في صناعة السكاكر والكراميل. تمتلك الشركة خبرة طويلة وسمعة مميزة في الأسواق المحلية والإقليمية، وتقدم تشكيلة واسعة وفاخرة من النكهات المتعددة لتناسب مختلف الأذواق. نلتزم دائماً بالجودة العالية والمذاق الأصيل.";
  const imageUrl = data?.image_url || "https://alsabahcandies.com/Materials/post-new.png";

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-white bg-pattern-light">
      {/* Organic floating shapes */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 -left-20 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 -right-20 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl"
        />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-brand-red/20 bg-brand-red/5 mb-6">
              <h2 className="text-xs uppercase tracking-[0.2em] text-brand-red font-bold">{subtitle}</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-chocolate mb-8 leading-tight">
              {title}
            </h3>
            <p className="text-lg text-chocolate/80 leading-relaxed mb-6 font-light">
              {description}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative">
              <img 
                src={encodeSafeUrl(imageUrl)} 
                alt={title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-chocolate/10 mix-blend-overlay" />
            </div>
            
            {/* Decorative element - +75 Years Circle */}
            <motion.div 
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.3)", 
                  "0 0 40px rgba(239, 68, 68, 0.6)", 
                  "0 0 20px rgba(239, 68, 68, 0.3)"
                ],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-bottom-8 md:-right-8 w-24 h-24 md:w-40 md:h-40 bg-gradient-to-br from-brand-red to-[#c40000] rounded-full flex items-center justify-center text-cream text-center p-4 shadow-[0_10px_30px_rgba(196,0,0,0.4)] z-20 border-4 border-white/20 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center">
                <span className="font-bold text-3xl md:text-5xl leading-none mb-1">+75</span>
                <span className="text-sm md:text-xl font-medium tracking-wider">عاماً</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
