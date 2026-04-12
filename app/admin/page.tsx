'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'product' | 'banner' | 'section'>('product');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isUploading, setIsUploading] = useState(false);

  // Form states
  const [product, setProduct] = useState({ name: '', description: '', imageUrl: '' });
  const [bannerUrl, setBannerUrl] = useState('');
  const [section, setSection] = useState({ 
    slug: 'about', 
    title: '', 
    subtitle: '', 
    description: '', 
    imageUrl: '' 
  });

  useEffect(() => {
    if (activeTab === 'section') {
      const fetchSectionData = async () => {
        try {
          const res = await fetch('/api/get-sections.php');
          const data = await res.json();
          if (data[section.slug]) {
            setSection(data[section.slug]);
          }
        } catch (error) {
          console.error('Error fetching section data:', error);
        }
      };
      fetchSectionData();
    }
  }, [activeTab, section.slug]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'alsabah2025') {
      setIsAuthenticated(true);
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'section') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload.php', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.success) {
        if (type === 'product') setProduct({ ...product, imageUrl: data.url });
        else setSection({ ...section, imageUrl: data.url });
        setMessage({ text: 'تم رفع الصورة بنجاح', type: 'success' });
      } else {
        setMessage({ text: 'فشل رفع الصورة: ' + (data.error || 'خطأ غير معروف'), type: 'error' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ 
        text: 'خطأ في الاتصال بالخادم. ملاحظة: ميزة الرفع تعمل فقط على استضافة cPanel الحقيقية وليس في المعاينة هنا.', 
        type: 'error' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/add-product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          image_url: product.imageUrl
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: 'تم إضافة المنتج بنجاح', type: 'success' });
        setProduct({ name: '', description: '', imageUrl: '' });
      }
    } catch (error) {
      setMessage({ text: 'خطأ في الحفظ', type: 'error' });
    }
  };

  const handleAddBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/add-banner.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ banner_url: bannerUrl }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: 'تم تحديث البانر بنجاح', type: 'success' });
        setBannerUrl('');
      }
    } catch (error) {
      setMessage({ text: 'خطأ في الحفظ', type: 'error' });
    }
  };

  const handleUpdateSection = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/update-section.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: section.slug,
          title: section.title,
          subtitle: section.subtitle,
          description: section.description,
          image_url: section.imageUrl
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: 'تم تحديث القسم بنجاح', type: 'success' });
      }
    } catch (error) {
      setMessage({ text: 'خطأ في الحفظ', type: 'error' });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-brand-red/10">
          <h1 className="text-2xl font-bold text-chocolate mb-6 text-center">لوحة التحكم</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="كلمة المرور"
              className="w-full px-4 py-3 rounded-xl border border-brand-red/20 focus:outline-none focus:ring-2 focus:ring-brand-red text-center"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full py-3 bg-brand-red text-white rounded-xl font-bold hover:bg-brand-red/90 transition-all">
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-chocolate">لوحة الإدارة</h1>
          <Link href="/" className="text-brand-red hover:underline">العودة للموقع</Link>
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl mb-6 text-center font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('product')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'product' ? 'bg-chocolate text-white' : 'bg-white text-chocolate border border-chocolate/10'}`}
          >
            إضافة منتج
          </button>
          <button 
            onClick={() => setActiveTab('banner')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'banner' ? 'bg-chocolate text-white' : 'bg-white text-chocolate border border-chocolate/10'}`}
          >
            تحديث البانر
          </button>
          <button 
            onClick={() => setActiveTab('section')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'section' ? 'bg-chocolate text-white' : 'bg-white text-chocolate border border-chocolate/10'}`}
          >
            إدارة الأقسام (بوستر)
          </button>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-brand-red/5">
          {activeTab === 'product' && (
            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-chocolate/60 mb-2">اسم المنتج</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brand-red/10 focus:outline-none focus:ring-2 focus:ring-brand-red"
                      value={product.name}
                      onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-chocolate/60 mb-2">الوصف</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-brand-red/10 focus:outline-none focus:ring-2 focus:ring-brand-red"
                      value={product.description}
                      onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-chocolate/60 mb-2">صورة المنتج</label>
                  <div className="relative h-48 bg-cream rounded-2xl border-2 border-dashed border-brand-red/20 flex flex-col items-center justify-center overflow-hidden">
                    {product.imageUrl ? (
                      <Image src={product.imageUrl} alt="Preview" fill className="object-contain p-4" />
                    ) : (
                      <div className="text-center p-4">
                        <span className="text-4xl mb-2 block">📸</span>
                        <p className="text-xs text-chocolate/40">اضغط لرفع صورة</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleImageUpload(e, 'product')}
                    />
                  </div>
                  {isUploading && <p className="text-xs text-brand-red animate-pulse text-center">جاري الرفع...</p>}
                </div>
              </div>

              <button 
                disabled={!product.imageUrl || isUploading}
                className="w-full py-4 bg-chocolate text-white rounded-2xl font-bold hover:bg-chocolate/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                حفظ المنتج في قاعدة البيانات
              </button>
            </form>
          )}

          {activeTab === 'banner' && (
            <form onSubmit={handleAddBanner} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-chocolate/60 mb-2">رابط فيديو البانر (MP4)</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://alsabahcandies.com/uploads/video.mp4"
                  className="w-full px-4 py-3 rounded-xl border border-brand-red/10 focus:outline-none focus:ring-2 focus:ring-brand-red"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                />
              </div>
              <button className="w-full py-4 bg-chocolate text-white rounded-2xl font-bold hover:bg-chocolate/90 transition-all">
                تحديث الفيديو الرئيسي
              </button>
            </form>
          )}

          {activeTab === 'section' && (
            <form onSubmit={handleUpdateSection} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-chocolate/60 mb-2">اختر القسم</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border border-brand-red/10 focus:outline-none focus:ring-2 focus:ring-brand-red"
                      value={section.slug}
                      onChange={(e) => setSection({ ...section, slug: e.target.value })}
                    >
                      <option value="about">قسم قصتنا (About Us)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-chocolate/60 mb-2">العنوان الفرعي (Subtitle)</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brand-red/10 focus:outline-none focus:ring-2 focus:ring-brand-red"
                      value={section.subtitle}
                      onChange={(e) => setSection({ ...section, subtitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-chocolate/60 mb-2">العنوان الرئيسي (Title)</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brand-red/10 focus:outline-none focus:ring-2 focus:ring-brand-red"
                      value={section.title}
                      onChange={(e) => setSection({ ...section, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-chocolate/60 mb-2">الوصف (Description)</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-brand-red/10 focus:outline-none focus:ring-2 focus:ring-brand-red"
                      value={section.description}
                      onChange={(e) => setSection({ ...section, description: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-chocolate/60 mb-2">صورة القسم (البوستر)</label>
                  <div className="relative h-64 bg-cream rounded-2xl border-2 border-dashed border-brand-red/20 flex flex-col items-center justify-center overflow-hidden">
                    {section.imageUrl ? (
                      <Image src={section.imageUrl} alt="Preview" fill className="object-contain p-4" />
                    ) : (
                      <div className="text-center p-4">
                        <span className="text-4xl mb-2 block">🖼️</span>
                        <p className="text-xs text-chocolate/40">اضغط لرفع بوستر القسم</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleImageUpload(e, 'section')}
                    />
                  </div>
                  {isUploading && <p className="text-xs text-brand-red animate-pulse text-center">جاري الرفع...</p>}
                </div>
              </div>

              <button 
                disabled={isUploading}
                className="w-full py-4 bg-chocolate text-white rounded-2xl font-bold hover:bg-chocolate/90 transition-all disabled:opacity-50"
              >
                تحديث بيانات القسم
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
