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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [otherProducts, setOtherProducts] = useState<any[]>([]);
  const [banner, setBanner] = useState('');
  const [sections, setSections] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, otherProdRes, bannerRes, sectionsRes] = await Promise.all([
          fetch('/api/products.php'),
          fetch('/api/other-products.php'),
          fetch('/api/banners.php'),
          fetch('/api/get-sections.php')
        ]);
        
        let prodData = [];
        let otherProdData = [];
        let bannerData = { banner: '' };
        let sectionsData = {};

        // Helper to safely parse JSON
        const safeParse = async (res: Response) => {
          const text = await res.text();
          try {
            return JSON.parse(text);
          } catch (e) {
            console.warn('Failed to parse JSON from', res.url, 'Response was:', text.substring(0, 100));
            return null;
          }
        };

        prodData = await safeParse(prodRes) || [];
        otherProdData = await safeParse(otherProdRes) || [];
        bannerData = await safeParse(bannerRes) || { banner: '' };
        sectionsData = await safeParse(sectionsRes) || {};
        
        setProducts(Array.isArray(prodData) ? prodData : []);
        setOtherProducts(Array.isArray(otherProdData) ? otherProdData : []);
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
