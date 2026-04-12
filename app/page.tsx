'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProductsSection } from '@/components/ProductsSection';
import { PackagingSection } from '@/components/PackagingSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Product } from '@/lib/store';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [banner, setBanner] = useState('');
  const [sections, setSections] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, bannerRes, sectionsRes] = await Promise.all([
          fetch('/api/products.php'),
          fetch('/api/banners.php'),
          fetch('/api/get-sections.php')
        ]);
        
        const prodData = await prodRes.json();
        const bannerData = await bannerRes.json();
        const sectionsData = await sectionsRes.json();
        
        setProducts(Array.isArray(prodData) ? prodData : []);
        setBanner(bannerData.banner || '');
        setSections(sectionsData || {});
      } catch (error) {
        console.error('Error fetching dynamic data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <HeroSection bannerUrl={banner} />
      <AboutSection data={sections['about']} />
      <ProductsSection products={products} />
      <PackagingSection />
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
