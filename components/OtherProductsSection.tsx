'use client';

import { motion } from 'motion/react';
import { ProductCard } from './ProductCard';

interface OtherProduct {
  id: number;
  name: string;
  description: string;
  image_url: string;
  weight: string;
}

interface OtherProductsSectionProps {
  products: OtherProduct[];
}

export function OtherProductsSection({ products }: OtherProductsSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section id="other-products" className="py-24 md:py-32 bg-white bg-pattern-light relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-chocolate/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-24">
          <h2 className="text-sm uppercase tracking-[0.2em] text-brand-red mb-4 font-medium">تشكيلة متنوعة</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-chocolate mb-6">
            منتجات أخرى فاخرة
          </h3>
          <p className="text-chocolate/70 font-light text-lg">
            نقدم لكم مجموعة مختارة من الحلويات والمنتجات التكميلية التي تضفي لمسة من السعادة على يومكم.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.name}
              description={product.description}
              image={product.image_url}
              weight={product.weight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
