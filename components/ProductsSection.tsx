'use client';

import { motion } from 'motion/react';
import { Product } from '@/lib/store';
import { ProductCard } from './ProductCard';

interface ProductsSectionProps {
  products: Product[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <section id="products" className="py-24 md:py-32 bg-white bg-pattern-light relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-24">
          <h2 className="text-sm uppercase tracking-[0.2em] text-brand-red mb-4 font-medium">مجموعتنا</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-chocolate mb-6">
            نكهات أصيلة
          </h3>
          <p className="text-chocolate/70 font-light text-lg">
            اكتشف مجموعتنا الواسعة من السكاكر الفاخرة، المصنوعة بحب وبأجود المكونات.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.name}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
