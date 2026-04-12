'use client';

import { motion } from 'motion/react';

const packagingOptions = [
  { title: 'كيس (200 غرام)', desc: 'مثالي للمشاركة', icon: '🛍️' },
  { title: 'صندوق (30 كيس)', desc: 'للعائلة بأكملها', icon: '📦' },
  { title: 'صندوق (10 كيلو)', desc: 'للجملة والمناسبات', icon: '🏭' },
  { title: 'سكاكر الشوكولا الفاخرة (500 غرام)', desc: 'هدية فاخرة', icon: '🎁' },
];

export function PackagingSection() {
  return (
    <section id="packaging" className="py-24 md:py-32 bg-white bg-pattern-light relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/3"
          >
            <h2 className="text-sm uppercase tracking-[0.2em] text-brand-red mb-4 font-medium">التعبئة والتغليف</h2>
            <h3 className="text-4xl font-bold text-chocolate mb-6">
              خيارات لكل المناسبات
            </h3>
            <p className="text-chocolate/70 font-light text-lg mb-8">
              سواء كنت تبحث عن متعة شخصية، أو عبوة عائلية، أو كميات كبيرة، فلدينا التغليف المثالي لك.
            </p>
          </motion.div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {packagingOptions.map((opt, i) => (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow border border-brand-red/10"
              >
                <div className="text-4xl mb-4">{opt.icon}</div>
                <h4 className="text-xl font-bold text-chocolate mb-2">{opt.title}</h4>
                <p className="text-chocolate/60 font-light">{opt.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
