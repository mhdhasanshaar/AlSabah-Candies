'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  Image as ImageIcon, 
  Settings, 
  PlusCircle, 
  Trash2, 
  LogOut, 
  ChevronRight,
  Upload,
  Weight,
  Layers
} from 'lucide-react';

type TabType = 'overview' | 'add-product' | 'add-other' | 'manage-products' | 'banners' | 'sections';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Data states
  const [products, setProducts] = useState<any[]>([]);
  const [otherProducts, setOtherProducts] = useState<any[]>([]);
  const [stats, setStats] = useState({ products: 0, others: 0, banners: 0 });

  // Form states
  const [product, setProduct] = useState({ name: '', description: '', imageUrl: '' });
  const [otherProduct, setOtherProduct] = useState({ name: '', description: '', imageUrl: '', weight: '' });
  const [bannerUrl, setBannerUrl] = useState('');
  const [section, setSection] = useState({ 
    slug: 'about', 
    title: '', 
    subtitle: '', 
    description: '', 
    imageUrl: '' 
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchInitialData();
    }
  }, [isAuthenticated]);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [pRes, oRes] = await Promise.all([
        fetch('/api/products.php'),
        fetch('/api/other-products.php')
      ]);
      const pData = await safeParse(pRes) || [];
      const oData = await safeParse(oRes) || [];
      setProducts(pData);
      setOtherProducts(oData);
      setStats({
        products: pData.length,
        others: oData.length,
        banners: 1
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'alsabah2025') {
      setIsAuthenticated(true);
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  const safeParse = async (res: Response) => {
    const text = await res.text();
    try { return JSON.parse(text); } catch (e) { return null; }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'section' | 'banner' | 'other') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    
    const typeMap = {
      product: 'products',
      other: 'products',
      section: 'sections',
      banner: 'banners'
    };
    formData.append('type', typeMap[type]);

    try {
      const res = await fetch('/api/upload.php', {
        method: 'POST',
        body: formData,
      });
      const data = await safeParse(res);
      if (data?.success) {
        if (type === 'product') setProduct({ ...product, imageUrl: data.url });
        else if (type === 'other') setOtherProduct({ ...otherProduct, imageUrl: data.url });
        else if (type === 'section') setSection({ ...section, imageUrl: data.url });
        else if (type === 'banner') setBannerUrl(data.url);
        setMessage({ text: 'تم رفع الصورة بنجاح', type: 'success' });
      } else {
        setMessage({ text: 'فشل الرفع: ' + (data?.error || 'خطأ في السيرفر'), type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'خطأ في الاتصال بالسيرفر', type: 'error' });
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
      const data = await safeParse(res);
      if (data?.success) {
        setMessage({ text: 'تم إضافة المنتج بنجاح', type: 'success' });
        setProduct({ name: '', description: '', imageUrl: '' });
        fetchInitialData();
      } else {
        setMessage({ text: 'فشل الحفظ: ' + (data?.error || 'خطأ في الخادم'), type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'خطأ في الاتصال بالخادم', type: 'error' });
    }
  };

  const handleAddOtherProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/add-other-product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: otherProduct.name,
          description: otherProduct.description,
          image_url: otherProduct.imageUrl,
          weight: otherProduct.weight
        }),
      });
      const data = await safeParse(res);
      if (data?.success) {
        setMessage({ text: 'تم إضافة المنتج الآخر بنجاح', type: 'success' });
        setOtherProduct({ name: '', description: '', imageUrl: '', weight: '' });
        fetchInitialData();
      } else {
        setMessage({ text: 'فشل الحفظ: ' + (data?.error || 'خطأ في الخادم'), type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'خطأ في الاتصال بالخادم', type: 'error' });
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
      const data = await safeParse(res);
      if (data?.success) {
        setMessage({ text: 'تم تحديث البانر بنجاح', type: 'success' });
        setBannerUrl('');
      } else {
        setMessage({ text: 'فشل التحديث: ' + (data?.error || 'خطأ في الخادم'), type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'خطأ في الاتصال بالخادم', type: 'error' });
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
      const data = await safeParse(res);
      if (data?.success) {
        setMessage({ text: 'تم تحديث القسم بنجاح', type: 'success' });
      } else {
        setMessage({ text: 'فشل التحديث: ' + (data?.error || 'خطأ في الخادم'), type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'خطأ في الاتصال بالخادم', type: 'error' });
    }
  };

  const handleDelete = async (id: number, type: 'main' | 'other') => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    try {
      const res = await fetch('/api/delete-product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type }),
      });
      const data = await safeParse(res);
      if (data?.success) {
        setMessage({ text: 'تم الحذف بنجاح', type: 'success' });
        fetchInitialData();
      }
    } catch (error) {
      setMessage({ text: 'خطأ في الحذف', type: 'error' });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fdf8f3] flex items-center justify-center p-6 font-sans" dir="rtl">
        <div className="bg-white p-10 rounded-[2rem] shadow-2xl max-w-md w-full border border-brand-red/5">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-brand-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Settings className="text-brand-red w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-chocolate">لوحة الإدارة</h1>
            <p className="text-chocolate/50 mt-2">يرجى إدخال كلمة المرور للمتابعة</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-2xl border border-brand-red/10 focus:outline-none focus:ring-4 focus:ring-brand-red/10 text-center text-xl tracking-widest"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full py-4 bg-brand-red text-white rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-brand-red/20 transition-all active:scale-[0.98]">
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans" dir="rtl">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-l border-gray-100 flex flex-col sticky top-0 h-screen shadow-sm">
        <div className="p-8 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center text-white font-bold text-xl">S</div>
            <div>
              <h2 className="font-bold text-chocolate leading-tight">سكاكر الصباح</h2>
              <p className="text-[10px] text-chocolate/40 uppercase tracking-wider font-bold">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarLink 
            icon={<LayoutDashboard size={20} />} 
            label="نظرة عامة" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-chocolate/30 uppercase tracking-widest">إدارة المنتجات</div>
          <SidebarLink 
            icon={<PlusCircle size={20} />} 
            label="إضافة منتج أساسي" 
            active={activeTab === 'add-product'} 
            onClick={() => setActiveTab('add-product')} 
          />
          <SidebarLink 
            icon={<PlusCircle size={20} />} 
            label="إضافة منتج آخر (وزن)" 
            active={activeTab === 'add-other'} 
            onClick={() => setActiveTab('add-other')} 
          />
          <SidebarLink 
            icon={<Package size={20} />} 
            label="عرض وإدارة المنتجات" 
            active={activeTab === 'manage-products'} 
            onClick={() => setActiveTab('manage-products')} 
          />
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-chocolate/30 uppercase tracking-widest">محتوى الموقع</div>
          <SidebarLink 
            icon={<ImageIcon size={20} />} 
            label="البنرات الرئيسية" 
            active={activeTab === 'banners'} 
            onClick={() => setActiveTab('banners')} 
          />
          <SidebarLink 
            icon={<Layers size={20} />} 
            label="أقسام الموقع (بوسترات)" 
            active={activeTab === 'sections'} 
            onClick={() => setActiveTab('sections')} 
          />
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            <LogOut size={20} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-chocolate">
              {activeTab === 'overview' && 'مرحباً بك في لوحة التحكم'}
              {activeTab === 'add-product' && 'إضافة منتج جديد'}
              {activeTab === 'add-other' && 'إضافة منتج آخر'}
              {activeTab === 'manage-products' && 'إدارة المنتجات'}
              {activeTab === 'banners' && 'تحديث البنرات'}
              {activeTab === 'sections' && 'إدارة الأقسام'}
            </h1>
            <p className="text-chocolate/40 mt-1">يمكنك إدارة محتوى موقعك من هنا بكل سهولة</p>
          </div>
          <Link href="/" className="bg-white px-6 py-3 rounded-2xl text-chocolate font-bold shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center gap-2">
            <span>زيارة الموقع</span>
            <ChevronRight size={18} />
          </Link>
        </header>

        {message.text && (
          <div className={`p-4 rounded-2xl mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
            <p className="font-medium">{message.text}</p>
            <button onClick={() => setMessage({text: '', type: ''})} className="mr-auto opacity-50 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Tab Content */}
        <div className="max-w-5xl">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard icon={<Package className="text-blue-500" />} label="المنتجات الأساسية" value={stats.products} color="blue" />
              <StatsCard icon={<Layers className="text-purple-500" />} label="منتجات أخرى" value={stats.others} color="purple" />
              <StatsCard icon={<ImageIcon className="text-orange-500" />} label="البنرات النشطة" value={stats.banners} color="orange" />
              
              <div className="md:col-span-3 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm mt-4">
                <h3 className="text-xl font-bold text-chocolate mb-4">تعليمات سريعة</h3>
                <ul className="space-y-3 text-chocolate/60">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center text-[10px] mt-1 font-bold">1</div>
                    <p>استخدم قسم <b>&quot;إضافة منتج&quot;</b> لرفع المنتجات التي تظهر في القسم الأول من الموقع.</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center text-[10px] mt-1 font-bold">2</div>
                    <p>قسم <b>&quot;منتجات أخرى&quot;</b> مخصص للمنتجات التي تتطلب حقل الوزن (مثل المغلفات الكبيرة).</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center text-[10px] mt-1 font-bold">3</div>
                    <p>تأكد من رفع صور ذات خلفية نظيفة (يفضل أن تكون مفرغة أو بيضاء) للحصول على أفضل مظهر.</p>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {(activeTab === 'add-product' || activeTab === 'add-other') && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <form onSubmit={activeTab === 'add-product' ? handleAddProduct : handleAddOtherProduct} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-chocolate/70 mb-2 mr-1">اسم المنتج</label>
                      <input 
                        type="text" 
                        required
                        placeholder="مثال: توفي فواكه مشكل"
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all outline-none"
                        value={activeTab === 'add-product' ? product.name : otherProduct.name}
                        onChange={(e) => activeTab === 'add-product' ? setProduct({ ...product, name: e.target.value }) : setOtherProduct({ ...otherProduct, name: e.target.value })}
                      />
                    </div>
                    
                    {activeTab === 'add-other' && (
                      <div>
                        <label className="block text-sm font-bold text-chocolate/70 mb-2 mr-1 flex items-center gap-2">
                          <Weight size={16} className="text-brand-red" />
                          <span>الوزن (مثال: 500 غرام)</span>
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="500g / 1kg"
                          className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all outline-none"
                          value={otherProduct.weight}
                          onChange={(e) => setOtherProduct({ ...otherProduct, weight: e.target.value })}
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-bold text-chocolate/70 mb-2 mr-1">وصف المنتج</label>
                      <textarea 
                        required
                        rows={4}
                        placeholder="اكتب تفاصيل المنتج هنا..."
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all outline-none resize-none"
                        value={activeTab === 'add-product' ? product.description : otherProduct.description}
                        onChange={(e) => activeTab === 'add-product' ? setProduct({ ...product, description: e.target.value }) : setOtherProduct({ ...otherProduct, description: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <label className="block text-sm font-bold text-chocolate/70 mb-2 mr-1">صورة المنتج</label>
                    <div className="relative group">
                      <div className={`relative h-64 rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden ${isUploading ? 'border-brand-red animate-pulse' : 'border-gray-200 group-hover:border-brand-red/40 bg-gray-50 group-hover:bg-white'}`}>
                        {(activeTab === 'add-product' ? product.imageUrl : otherProduct.imageUrl) ? (
                          <div className="relative w-full h-full p-4">
                            <Image src={activeTab === 'add-product' ? product.imageUrl : otherProduct.imageUrl} alt="Preview" fill className="object-contain" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <p className="text-white font-bold flex items-center gap-2">
                                <Upload size={20} />
                                تغيير الصورة
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center p-8">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-chocolate/20 group-hover:text-brand-red transition-colors">
                              <Upload size={32} />
                            </div>
                            <p className="text-chocolate/40 font-medium">اسحب الصورة هنا أو اضغط للرفع</p>
                            <p className="text-[10px] text-chocolate/20 mt-2 uppercase tracking-widest font-bold">PNG, JPG up to 5MB</p>
                          </div>
                        )}
                        <input 
                          type="file" 
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={(e) => handleImageUpload(e, activeTab === 'add-product' ? 'product' : 'other')}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50">
                  <button 
                    disabled={!(activeTab === 'add-product' ? product.imageUrl : otherProduct.imageUrl) || isUploading}
                    className="w-full py-5 bg-chocolate text-white rounded-[1.5rem] font-bold text-lg hover:shadow-xl hover:shadow-chocolate/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] flex items-center justify-center gap-3"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>جاري الرفع...</span>
                      </>
                    ) : (
                      <>
                        <PlusCircle size={22} />
                        <span>حفظ المنتج ونشره فوراً</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'manage-products' && (
            <div className="space-y-8">
              <ProductTable 
                title="المنتجات الأساسية" 
                data={products} 
                onDelete={(id) => handleDelete(id, 'main')} 
                isLoading={isLoading}
              />
              <ProductTable 
                title="منتجات أخرى (بالوزن)" 
                data={otherProducts} 
                onDelete={(id) => handleDelete(id, 'other')} 
                isLoading={isLoading}
                hasWeight
              />
            </div>
          )}

          {activeTab === 'banners' && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <form onSubmit={handleAddBanner} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-chocolate/70 mb-2 mr-1">رابط البانر المباشر</label>
                      <input 
                        type="text" 
                        required
                        placeholder="https://..."
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all outline-none"
                        value={bannerUrl}
                        onChange={(e) => setBannerUrl(e.target.value)}
                      />
                    </div>
                    <div className="p-6 bg-brand-red/5 rounded-2xl border border-brand-red/10">
                      <h4 className="font-bold text-brand-red mb-2 text-sm">نصيحة تقنية</h4>
                      <p className="text-xs text-chocolate/60 leading-relaxed">
                        يفضل استخدام فيديوهات بصيغة MP4 وبحجم صغير (أقل من 5 ميجا) لضمان سرعة تحميل الموقع. يمكنك رفع الملف من اليمين وسيتم توليد الرابط تلقائياً.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <label className="block text-sm font-bold text-chocolate/70 mb-2 mr-1">رفع ملف جديد (فيديو أو صورة)</label>
                    <div className="relative h-48 rounded-[2rem] border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center overflow-hidden hover:border-brand-red/40 transition-all group">
                      <div className="text-center p-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-3 text-chocolate/20 group-hover:text-brand-red transition-colors">
                          <Upload size={24} />
                        </div>
                        <p className="text-xs text-chocolate/40 font-bold">اضغط للرفع</p>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*,video/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => handleImageUpload(e, 'banner')}
                      />
                    </div>
                  </div>
                </div>
                <button className="w-full py-5 bg-chocolate text-white rounded-[1.5rem] font-bold text-lg hover:shadow-xl transition-all">
                  تحديث البانر الرئيسي
                </button>
              </form>
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <form onSubmit={handleUpdateSection} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-chocolate/70 mb-2 mr-1">القسم المستهدف</label>
                      <select 
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all outline-none appearance-none"
                        value={section.slug}
                        onChange={(e) => setSection({ ...section, slug: e.target.value })}
                      >
                        <option value="about">قسم قصتنا (About Us)</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-chocolate/70 mb-2 mr-1">العنوان الفرعي</label>
                        <input 
                          type="text" 
                          required
                          className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all outline-none"
                          value={section.subtitle}
                          onChange={(e) => setSection({ ...section, subtitle: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-chocolate/70 mb-2 mr-1">العنوان الرئيسي</label>
                        <input 
                          type="text" 
                          required
                          className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all outline-none"
                          value={section.title}
                          onChange={(e) => setSection({ ...section, title: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-chocolate/70 mb-2 mr-1">الوصف</label>
                      <textarea 
                        required
                        rows={4}
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all outline-none resize-none"
                        value={section.description}
                        onChange={(e) => setSection({ ...section, description: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <label className="block text-sm font-bold text-chocolate/70 mb-2 mr-1">بوستر القسم</label>
                    <div className="relative h-72 rounded-[2rem] border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center overflow-hidden hover:border-brand-red/40 transition-all group">
                      {section.imageUrl ? (
                        <div className="relative w-full h-full p-4">
                          <Image src={section.imageUrl} alt="Preview" fill className="object-contain" />
                        </div>
                      ) : (
                        <div className="text-center p-4">
                          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-chocolate/20">
                            <ImageIcon size={32} />
                          </div>
                          <p className="text-xs text-chocolate/40 font-bold">اضغط لرفع بوستر</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => handleImageUpload(e, 'section')}
                      />
                    </div>
                  </div>
                </div>
                <button className="w-full py-5 bg-chocolate text-white rounded-[1.5rem] font-bold text-lg hover:shadow-xl transition-all">
                  تحديث بيانات القسم
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Sub-components for cleaner code
function SidebarLink({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm ${active ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' : 'text-chocolate/60 hover:bg-gray-50 hover:text-chocolate'}`}
    >
      {icon}
      <span>{label}</span>
      {active && <div className="mr-auto w-1.5 h-1.5 rounded-full bg-white" />}
    </button>
  );
}

function StatsCard({ icon, label, value, color }: { icon: any, label: string, value: number, color: string }) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-6">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-chocolate/40 font-bold text-xs uppercase tracking-wider mb-1">{label}</p>
        <p className="text-3xl font-black text-chocolate">{value}</p>
      </div>
    </div>
  );
}

function ProductTable({ title, data, onDelete, isLoading, hasWeight = false }: { title: string, data: any[], onDelete: (id: number) => void, isLoading: boolean, hasWeight?: boolean }) {
  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <h3 className="text-xl font-bold text-chocolate">{title}</h3>
        <span className="bg-white px-4 py-1 rounded-full text-xs font-bold text-chocolate/40 border border-gray-100">{data.length} منتج</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="text-chocolate/30 text-xs uppercase tracking-widest font-bold">
              <th className="px-8 py-6">المنتج</th>
              <th className="px-8 py-6">الوصف</th>
              {hasWeight && <th className="px-8 py-6">الوزن</th>}
              <th className="px-8 py-6 text-left">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr><td colSpan={hasWeight ? 4 : 3} className="p-10 text-center text-chocolate/20 animate-pulse">جاري التحميل...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={hasWeight ? 4 : 3} className="p-10 text-center text-chocolate/20">لا يوجد منتجات حالياً</td></tr>
            ) : data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 bg-cream rounded-xl overflow-hidden border border-gray-100 p-1">
                      <Image src={item.image_url} alt={item.name} fill className="object-contain" />
                    </div>
                    <span className="font-bold text-chocolate">{item.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-chocolate/50 text-sm max-w-xs truncate">{item.description}</td>
                {hasWeight && <td className="px-8 py-5 font-bold text-brand-red text-sm">{item.weight}</td>}
                <td className="px-8 py-5 text-left">
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
