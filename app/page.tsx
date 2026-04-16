'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProductsSection } from '@/components/ProductsSection';
import { OtherProductsSection } from '@/components/OtherProductsSection';
import { PackagingSection } from '@/components/PackagingSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Product } from '@/lib/store';
import storeData from '@/data/store.json';

export default function Home() {
  const [products, setProducts] = useState<Product[]>(
    storeData.products.map((p: any) => ({
      id: p.id.toString(),
      name: p.name,
      description: p.description,
      image: p.image_url || p.image
    }))
  );
  const [otherProducts, setOtherProducts] = useState<any[]>(storeData.other_products);
  const [banner, setBanner] = useState({ 
    videoUrl: storeData.banner, 
    imageUrl: storeData.banner_poster 
  });
  const [sections, setSections] = useState<any>(storeData.sections);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // No longer needed to load static data here as it's initialized in state
  }, []);

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <HeroSection bannerUrl={banner.videoUrl} imageUrl={banner.imageUrl} />
      <AboutSection data={sections['about']} />
      <ProductsSection products={products} />
      <PackagingSection />
      <OtherProductsSection products={otherProducts} />
      <div className="bg-footer-gradient relative">
        {/* Animated Fluid Blobs */}
        <div className="fluid-blob fluid-blob-1" />
        <div className="fluid-blob fluid-blob-2" />
        <div className="fluid-blob fluid-blob-3" />
        <div className="fluid-blob fluid-blob-4" />
        
        <div className="relative z-10">
          <ContactSection />
          <Footer />
        </div>
      </div>
    </main>
  );
}
