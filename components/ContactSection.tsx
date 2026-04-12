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
            className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] text-center flex flex-col items-center border border-white/10"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 text-white">
              <Phone size={28} />
            </div>
            <h4 className="text-xl font-bold mb-4">اتصل بنا</h4>
            <p className="text-white/80 mb-2 font-light" dir="ltr">هاتف المعمل: +963 11 472 3798</p>
            <p className="text-white/80 font-light" dir="ltr">رقم المبيعات: +963 954 400 301</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] text-center flex flex-col items-center border border-white/10"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 text-white">
              <Mail size={28} />
            </div>
            <h4 className="text-xl font-bold mb-4">راسلنا</h4>
            <a href="mailto:sales@Alsabahcandies.com" className="text-white/80 hover:text-white transition-colors font-light">
              sales@Alsabahcandies.com
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] text-center flex flex-col items-center border border-white/10"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 text-white">
              <MapPin size={28} />
            </div>
            <h4 className="text-xl font-bold mb-4">تابعنا</h4>
            <div className="flex gap-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 font-light">
                <Facebook size={20} /> فيسبوك
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 font-light">
                <Instagram size={20} /> إنستغرام
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
