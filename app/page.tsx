import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProductsSection } from '@/components/ProductsSection';
import { PackagingSection } from '@/components/PackagingSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { getStoreData } from '@/lib/store';

export default function Home() {
  const data = getStoreData();

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <HeroSection bannerUrl={data.banner} />
      <AboutSection />
      <ProductsSection products={data.products} />
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
