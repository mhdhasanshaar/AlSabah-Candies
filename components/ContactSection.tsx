'use client';

import { motion } from 'motion/react';
import { Phone, Mail, Instagram, Facebook, MapPin } from 'lucide-react';

import Link from 'next/link';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 text-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-[0.2em] text-white/80 mb-4 font-medium">تواصل معنا</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            <Link href="/admin" className="cursor-default hover:text-white transition-none">نحن</Link> دائماً قريبون منكم
          </h3>
          <p className="text-white/70 font-light text-lg">
            لأي استفسار أو تواصل يمكنكم الوصول إلينا عبر:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] text-center flex flex-col items-center border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mb-8 text-white shadow-inner">
              <Phone size={32} />
            </div>
            <h4 className="text-2xl font-bold mb-6">اتصل بنا</h4>
            <div className="space-y-3 w-full">
              <div className="flex flex-col items-center">
                <span className="text-xs text-white/50 mb-1">هاتف المعمل</span>
                <p 
                  className="text-lg text-white/90 font-medium tracking-wider" 
                  style={{ direction: 'ltr', unicodeBidi: 'embed' }}
                >
                  +963 11 472 3798
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-white/50 mb-1">رقم المبيعات</span>
                <p 
                  className="text-lg text-white/90 font-medium tracking-wider" 
                  style={{ direction: 'ltr', unicodeBidi: 'embed' }}
                >
                  +963 954 400 301
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] text-center flex flex-col items-center border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mb-8 text-white shadow-inner">
              <Mail size={32} />
            </div>
            <h4 className="text-2xl font-bold mb-6">راسلنا</h4>
            <a 
              href="mailto:sales@Alsabahcandies.com" 
              className="group flex flex-col items-center gap-2"
            >
              <span className="text-xs text-white/50">البريد الإلكتروني</span>
              <span className="text-lg text-white/90 hover:text-white transition-colors font-medium border-b border-transparent hover:border-white/30 pb-1">
                sales@Alsabahcandies.com
              </span>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] text-center flex flex-col items-center border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mb-8 text-white shadow-inner">
              <Instagram size={32} />
            </div>
            <h4 className="text-2xl font-bold mb-6">تابعنا</h4>
            <div className="flex flex-col gap-4 w-full">
              <a 
                href="https://www.facebook.com/Alsabah.candies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 px-6 bg-white/5 rounded-2xl hover:bg-white/20 hover:scale-[1.05] transition-all duration-300 group"
              >
                <Facebook size={24} className="text-white/70 group-hover:text-white" />
                <span className="text-lg font-medium text-white/90 group-hover:text-white">فيسبوك</span>
              </a>
              <a 
                href="https://www.instagram.com/alsabah.candies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 px-6 bg-white/5 rounded-2xl hover:bg-white/20 hover:scale-[1.05] transition-all duration-300 group"
              >
                <Instagram size={24} className="text-white/70 group-hover:text-white" />
                <span className="text-lg font-medium text-white/90 group-hover:text-white">إنستغرام</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
