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

const DEFAULT_PRODUCTS = [
  {
    id: 'd1',
    name: "حليب محشوة بالشوكولا",
    description: "سكاكر بطبقة خارجية من الحليب كامل الدسم مع حشوة شوكولا غنية في الداخل، تجمع بين النعومة والطعم المركز في حبة واحدة.",
    image: "https://alsabahcandies.com/products/بالحليب-محشوة-بالشوكولا.png"
  },
  {
    id: 'd2',
    name: "محشية بكريمة البندق",
    description: "سكاكر محشية بكريمة البندق الناعمة، بنكهة متوازنة وغنية مناسبة لمحبي الطعم الكلاسيكي الفاخر.",
    image: "https://alsabahcandies.com/products/محشي-كريم-البندق.png"
  },
  {
    id: 'd3',
    name: "قهوة بالحليب",
    description: "سكاكر بطعم القهوة الممزوجة بالحليب تمنح مذاقاً دافئاً يناسب أوقات الاستراحة.",
    image: "https://alsabahcandies.com/products/قهوة-بالحليب.png"
  },
  {
    id: 'd4',
    name: "بطعم الليمون والنعناع",
    description: "سكاكر منعشة بنكهة النعناع والليمون معاً توفر انتعاشاً فورياً وطعماً نقياً يدوم.",
    image: "https://alsabahcandies.com/products/ليمون-ونعنع.png"
  },
  {
    id: 'd5',
    name: "توفي فواكه",
    description: "حبات توفي طرية بنكهات فواكه متنوعة مثل البطيخ الأصفر، الكرز، الليمون، الموز، البرتقال والتفاح، قوامها طري ونكهتها غنية بطعم الفاكهة.",
    image: "https://alsabahcandies.com/products/توفي-فواكه.png"
  },
  {
    id: 'd6',
    name: "كاندي حوامض",
    description: "سكاكر بنكهات حامضة متنوعة مثل كولا، ليمون، تفاح، برتقال، fريز، موز، مخصصة لمحبي النكهات الجريئة والمنعشة.",
    image: "https://alsabahcandies.com/products/كاندي-الحوامض.png"
  },
  {
    id: 'd7',
    name: "كاندي نعناع",
    description: "حبيبات صغيرة بنكهة النعناع المركز لعشاق مذاق النعنع ولمحبين الانتعاش.",
    image: "https://alsabahcandies.com/products/كاندي-نعنع.png"
  },
  {
    id: 'd8',
    name: "كراميل شوكولا",
    description: "قطع كراميل غنية بنكهة الشوكولا اللذيذة تجمع بين القوام الطري والطعم الغني.",
    image: "https://alsabahcandies.com/products/كراميل-شوكولا.png"
  },
  {
    id: 'd9',
    name: "كوكتيل فواكه",
    description: "مجموعة من نكهات الفواكه الطبيعية في كيس سكاكر واحد، خيار مناسب للتنوع والاستمتاع بنكهات مختلفة كل مرة.",
    image: "https://alsabahcandies.com/products/كوكتيل-الفواكه.png"
  },
  {
    id: 'd10',
    name: "حليب",
    description: "سكاكر بالحليب الكامل الدسم بطعم وملمس يذوب في الفم، تُعد خياراً مثالياً لعشاق النكهات الكلاسيكية الهادئة.",
    image: "https://alsabahcandies.com/products/بالحليب.png"
  },
  {
    id: 'd11',
    name: "كراميل حليب",
    description: "كراميل لذيذ بطعم الحليب كامل الدسم، بسيط وأصيل.",
    image: "https://alsabahcandies.com/products/كراميل-الحليب.png"
  },
  {
    id: 'd12',
    name: "آيس كريم",
    description: "سكاكر لذيذة المذاق بنكهات مستوحاة من الآيس كريم، متوفرة بنكهات الفريز، الأناناس والبطيخ الأصفر.",
    image: "https://alsabahcandies.com/products/أيس-كريم.png"
  }
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [otherProducts, setOtherProducts] = useState<any[]>([]);
  const [banner, setBanner] = useState({ videoUrl: 'https://alsabahcandies.com/Materials/loop_banner_alsabah.mp4', imageUrl: 'https://alsabahcandies.com/Materials/loop_banner_alsabah00.jpg' });
  const [sections, setSections] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, otherProdRes, bannerRes, sectionsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/other-products'),
          fetch('/api/banners'),
          fetch('/api/sections')
        ]);
        
        let prodData = [];
        let otherProdData = [];
        let bannerData = [];
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

        prodData = await safeParse(prodRes);
        otherProdData = await safeParse(otherProdRes);
        bannerData = await safeParse(bannerRes);
        sectionsData = await safeParse(sectionsRes);
        
        // Use default products if DB is empty or fetch fails
        if (Array.isArray(prodData) && prodData.length > 0) {
          setProducts(prodData.map((p: any) => ({
            id: p.id.toString(),
            name: p.name,
            description: p.description,
            image: p.image_url || p.image
          })));
        } else {
          setProducts(DEFAULT_PRODUCTS);
        }

        setOtherProducts(Array.isArray(otherProdData) ? otherProdData : []);
        
        if (Array.isArray(bannerData) && bannerData.length > 0) {
          setBanner({ 
            videoUrl: bannerData[0].banner_url || 'https://alsabahcandies.com/Materials/loop_banner_alsabah.mp4', 
            imageUrl: bannerData[0].image_url || 'https://alsabahcandies.com/Materials/loop_banner_alsabah00.jpg' 
          });
        } else {
          // Fallback if no banner in DB
          setBanner({
            videoUrl: 'https://alsabahcandies.com/Materials/loop_banner_alsabah.mp4',
            imageUrl: 'https://alsabahcandies.com/Materials/loop_banner_alsabah00.jpg'
          });
        }
        
        setSections(sectionsData || {});
      } catch (error) {
        console.error('Error fetching dynamic data:', error);
        setProducts(DEFAULT_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
