'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/store';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [bannerUrl, setBannerUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, bannerRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/banner')
      ]);
      const prods = await prodRes.json();
      const { banner } = await bannerRes.json();
      setProducts(prods);
      setBannerUrl(banner);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sc123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleBannerUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ banner: bannerUrl })
      });
      alert('Banner updated successfully!');
    } catch (err) {
      alert('Failed to update banner');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData = {
      id: editingProduct?.id || '',
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string || 'https://alsabahcandies.com/products/توفي-فواكه.png',
    };

    try {
      if (isAdding) {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        const newProd = await res.json();
        setProducts([...products, newProd]);
      } else {
        const res = await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        const updatedProd = await res.json();
        setProducts(products.map(p => p.id === updatedProd.id ? updatedProd : p));
      }
      setIsAdding(false);
      setEditingProduct(null);
    } catch (err) {
      alert('Failed to save product');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <Image src="https://alsabahcandies.com/Test/logo.sabah.svg" alt="Logo" width={120} height={64} className="h-16 w-auto mx-auto mb-4" referrerPolicy="no-referrer" />
            <h1 className="text-2xl font-bold text-chocolate">تسجيل دخول الإدارة</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-chocolate/80 mb-1">كلمة المرور</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-brand-red/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red text-left"
                placeholder="أدخل كلمة المرور"
                dir="ltr"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-chocolate text-cream py-2 rounded-lg hover:bg-chocolate/90 transition-colors">
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-chocolate">لوحة التحكم</h1>
            <p className="text-red-500 text-sm mt-2 font-medium">تنبيه: لوحة التحكم معطلة في وضع التصدير الثابت (Static Export). التغييرات لن يتم حفظها.</p>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 text-chocolate border border-chocolate rounded-lg hover:bg-chocolate hover:text-cream transition-colors"
          >
            تسجيل خروج
          </button>
        </div>

        {/* Banner Management */}
        <div className="bg-white p-8 rounded-2xl shadow-sm mb-12">
          <h2 className="text-xl font-bold text-chocolate mb-6">فيديو الواجهة الرئيسية</h2>
          <form onSubmit={handleBannerUpdate} className="flex gap-4">
            <input 
              type="text" 
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              className="flex-1 px-4 py-2 border border-brand-red/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red text-left"
              placeholder="رابط الفيديو (مثال: https://alsabahcandies.com/Test/hero-banner2.mp4)"
              dir="ltr"
            />
            <button type="submit" className="bg-brand-red text-white px-6 py-2 rounded-lg hover:bg-brand-red/90 transition-colors">
              تحديث الفيديو
            </button>
          </form>
        </div>

        {/* Products Management */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-chocolate">المنتجات</h2>
            <button 
              onClick={() => { setIsAdding(true); setEditingProduct(null); }}
              className="bg-brand-green text-chocolate px-4 py-2 rounded-lg hover:bg-brand-green/90 transition-colors font-medium"
            >
              + إضافة منتج
            </button>
          </div>

          {(isAdding || editingProduct) && (
            <div className="mb-8 p-6 border border-brand-red/20 rounded-xl bg-cream/30">
              <h3 className="font-bold text-chocolate mb-4">{isAdding ? 'إضافة منتج جديد' : 'تعديل المنتج'}</h3>
              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-chocolate/80 mb-1">الاسم</label>
                    <input 
                      name="name"
                      defaultValue={editingProduct?.name}
                      required
                      className="w-full px-4 py-2 border border-brand-red/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-chocolate/80 mb-1">رابط الصورة</label>
                    <input 
                      name="image"
                      defaultValue={editingProduct?.image}
                      placeholder="اتركه فارغاً للصورة الافتراضية"
                      className="w-full px-4 py-2 border border-brand-red/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red text-left"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-chocolate/80 mb-1">الوصف</label>
                  <textarea 
                    name="description"
                    defaultValue={editingProduct?.description}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-brand-red/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                  />
                </div>
                <div className="flex gap-4 justify-end">
                  <button 
                    type="button" 
                    onClick={() => { setIsAdding(false); setEditingProduct(null); }}
                    className="px-4 py-2 text-chocolate hover:bg-chocolate/5 rounded-lg transition-colors"
                  >
                    إلغاء
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-chocolate text-cream rounded-lg hover:bg-chocolate/90 transition-colors"
                  >
                    حفظ المنتج
                  </button>
                </div>
              </form>
            </div>
          )}

          {isLoading ? (
            <p className="text-chocolate/60">جاري تحميل المنتجات...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-brand-red/20 text-chocolate/60 text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">الصورة</th>
                    <th className="p-4 font-medium">الاسم</th>
                    <th className="p-4 font-medium">الوصف</th>
                    <th className="p-4 font-medium text-left">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-brand-red/10 hover:bg-cream/30 transition-colors">
                      <td className="p-4">
                        <div className="relative w-12 h-12 bg-cream rounded-lg p-1 overflow-hidden">
                          <Image src={product.image} alt={product.name} fill className="object-contain" referrerPolicy="no-referrer" />
                        </div>
                      </td>
                      <td className="p-4 font-medium text-chocolate">{product.name}</td>
                      <td className="p-4 text-chocolate/70 text-sm max-w-xs truncate">{product.description}</td>
                      <td className="p-4 text-left space-x-3 space-x-reverse">
                        <button 
                          onClick={() => { setEditingProduct(product); setIsAdding(false); }}
                          className="text-brand-red hover:text-chocolate transition-colors text-sm font-medium"
                        >
                          تعديل
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
