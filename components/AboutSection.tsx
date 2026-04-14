'use client';

import { motion } from 'motion/react';

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
            <h2 className="text-[36px] uppercase tracking-[0.2em] text-brand-red mb-4 font-medium">{subtitle}</h2>
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
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-chocolate/10 mix-blend-overlay" />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-red rounded-full flex items-center justify-center text-cream text-center p-4 shadow-xl">
              <span className="font-bold text-xl leading-tight">+75<br/><span className="text-sm font-medium">عاماً</span></span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
