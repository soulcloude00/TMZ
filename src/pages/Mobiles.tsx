import { useState, useEffect, useRef, useMemo } from 'react';
import { ShoppingBag, Heart, Star, Filter, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart-context';
import { useToast } from '@/components/ui/use-toast';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import MobileFilters from '@/components/MobileFilters';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog } from '@/components/ui/dialog';

import type { StockItem } from '@/pages/Admin'; // Import StockItem interface

const API_URL = 'http://localhost:3001/api';

const BRAND_COLORS: Record<string, string> = {
  Apple: 'from-gray-900 via-gray-800 to-white',
  Samsung: 'from-blue-900 via-blue-700 to-blue-300',
  Xiaomi: 'from-orange-900 via-orange-700 to-yellow-300',
  Google: 'from-gray-900 via-green-700 to-green-300',
  OnePlus: 'from-red-900 via-red-700 to-red-300',
  Nothing: 'from-black via-gray-700 to-white',
  Motorola: 'from-purple-900 via-purple-700 to-purple-300',
};

// Helper type guard
const isSpecObj = (spec: any): spec is { label: string; value: string } => spec && typeof spec === 'object' && 'label' in spec && 'value' in spec;

const MobilesShowcase = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [mobiles, setMobiles] = useState<StockItem[]>([]); // Use StockItem[] for state
  const [current, setCurrent] = useState(0);
  const [spotlight, setSpotlight] = useState<null | number>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [specsAnimated, setSpecsAnimated] = useState(false);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_URL}/stock`)
      .then(res => res.json())
      .then((data: StockItem[]) => { // Use StockItem[] for fetched data type
        // Filter for mobile items and parse features and images
        const mobileItems = data
          .filter((item) => item.type === 'mobile') // Filter by type
          .map((item) => ({
            ...item,
            features: Array.isArray(item.features) ? item.features : JSON.parse(item.features || '[]'),
            images: Array.isArray(item.images) 
              ? item.images 
              : typeof item.images === 'string' 
                ? JSON.parse(item.images || '[]')
                : item.image 
                  ? [item.image] 
                  : [],
          }));
        setMobiles(mobileItems);
      });
  }, []);

  useEffect(() => { setCurrent(0); }, [brandFilter]);

  const filteredMobiles = brandFilter ? mobiles.filter(m => m.brand === brandFilter) : mobiles;
  const mobile = filteredMobiles.length > 0 ? filteredMobiles[current % filteredMobiles.length] : null;
  const m = (spotlight !== null && mobile) ? filteredMobiles[spotlight] : null;
  const featureObjs = (m && Array.isArray(m.features) ? m.features.filter(isSpecObj) : []) as {label: string, value: string}[];
  const storageOptions = featureObjs.filter(f => f.label.toLowerCase().includes('storage'));
  const colorOptions = featureObjs.filter(f => f.label.toLowerCase().includes('color'));
  const images = m && Array.isArray(m.images) && m.images.length > 0 
    ? (m.images as string[])
    : m && m.image 
      ? [m.image] 
      : [];
  const [mainImage, setMainImage] = useState(images[0] || '');
  const [selectedStorage, setSelectedStorage] = useState(storageOptions[0]?.value || '');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]?.value || '');

  useEffect(() => {
    if (m && images.length > 0) {
      setMainImage(images[0]);
      setSelectedStorage(storageOptions[0]?.value || '');
      setSelectedColor(colorOptions[0]?.value || '');
    }
    // eslint-disable-next-line
  }, [spotlight, m]);

  // Animated background based on brand
  const bgClass = mobile ? (BRAND_COLORS[mobile.brand] || 'from-black via-gray-900 to-black') : 'from-black via-gray-900 to-black';

  // Auto-advance carousel
  useEffect(() => {
    if (!autoPlay || spotlight !== null || filteredMobiles.length === 0) return;
    const interval = setInterval(() => setCurrent((c) => (c + 1) % filteredMobiles.length), 5000);
    return () => clearInterval(interval);
  }, [autoPlay, filteredMobiles.length, spotlight]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (spotlight !== null) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  // Animate specs chips
  useEffect(() => {
    setSpecsAnimated(false);
    const t = setTimeout(() => setSpecsAnimated(true), 400);
    return () => clearTimeout(t);
  }, [current, brandFilter]);

  // Navigation
  const prev = () => setCurrent((c) => (c - 1 + filteredMobiles.length) % filteredMobiles.length);
  const next = () => setCurrent((c) => (c + 1) % filteredMobiles.length);

  // Brand pills (generate after filtering by type)
  const BRANDS = Array.from(new Set(mobiles.filter(item => item.type === 'mobile').map(m => m.brand)));

  const handleAddToCart = (mobile: StockItem) => {
    addToCart({
      id: mobile.id,
      name: mobile.name,
      price: mobile.price,
      image: mobile.image
    });
    
    toast({
      title: "Added to Cart",
      description: `${mobile.name} has been added to your cart.`,
    });
  };

  // Spotlight mode
  if (spotlight !== null && mobile && m) {
    // DEBUG: Log images and mainImage to help diagnose issues
    // eslint-disable-next-line no-console
    console.log('Spotlight images:', images, 'mainImage:', mainImage, 'm.images:', m.images, 'm.image:', m.image);

    return (
      <div className={`min-h-screen flex flex-col bg-gradient-to-br ${BRAND_COLORS[m.brand] || 'from-black via-gray-900 to-black'} transition-all duration-700`}>
        <NavBar />
        {/* Animated background particles */}
        <div className="pointer-events-none fixed inset-0 z-0">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`absolute rounded-full bg-tiara-gold/10 blur-2xl animate-particle${i%3+1}`} style={{
              width: `${40 + (i%3)*20}px`, height: `${40 + (i%3)*20}px`,
              left: `${(i*8)%100}%`, top: `${(i*13)%100}%`, opacity: 0.5
            }} />
          ))}
        </div>
        <div className="flex-1 flex items-center justify-center px-4 py-16 animate-fade-in relative">
          <div className="flex flex-row items-center gap-12 bg-black/60 rounded-3xl shadow-2xl p-10 max-w-5xl w-full relative">
            {/* Close button in card */}
            <button aria-label="Close Spotlight" className="absolute top-6 right-6 text-white/70 hover:text-tiara-gold text-3xl bg-black/60 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-tiara-gold z-20" onClick={() => setSpotlight(null)}><X /></button>
            {/* Left: Main image and thumbnails */}
            <div className="flex flex-row items-center gap-4 w-1/2 max-w-md">
              {images.length > 1 && (
                <div className="flex flex-col gap-2 mr-2">
                  {images.map((img, idx) => (
                    <img
                      key={img + idx}
                      src={img}
                      alt={`Thumbnail ${idx+1}`}
                      className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${mainImage === img ? 'border-tiara-gold' : 'border-transparent'} transition-all`}
                      onClick={() => setMainImage(img)}
                    />
                  ))}
                </div>
              )}
              <div className="w-[350px] h-[400px] flex items-center justify-center bg-black/70 rounded-2xl shadow-xl">
                <img src={mainImage} alt={`Spotlight view of ${m.name}`} className="w-full h-full object-contain animate-fade-in-up" />
              </div>
            </div>
            {/* Right: Product info */}
            <div className="flex flex-col items-start w-1/2 min-w-[320px] max-w-lg px-4">
              <h2 className="text-4xl font-bold text-white mb-2 animate-fade-in-up delay-100">{m.name}</h2>
              <div className="flex gap-2 mb-4 animate-fade-in-up delay-200">
                {Array(5).fill(0).map((_, i) => <Star key={i} className={`h-6 w-6 ${i < Math.floor(m.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                <span className="text-gray-200">({m.reviews} reviews)</span>
              </div>
              {/* Storage/variant selection */}
              {storageOptions.length > 0 && (
                <div className="mb-4 w-full">
                  <div className="text-tiara-gold font-semibold mb-1">Storage</div>
                  <div className="flex gap-3">
                    {storageOptions.map((opt, idx) => (
                      <button
                        key={opt.value + idx}
                        className={`px-4 py-2 rounded-lg font-bold border-2 transition-all ${selectedStorage === opt.value ? 'bg-tiara-gold text-black border-tiara-gold' : 'bg-black/40 text-tiara-gold border-tiara-gold/40 hover:bg-tiara-gold/20'}`}
                        onClick={() => setSelectedStorage(opt.value)}
                      >
                        {opt.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Color selection */}
              {colorOptions.length > 0 && (
                <div className="mb-4 w-full">
                  <div className="text-tiara-gold font-semibold mb-1">Color</div>
                  <div className="flex gap-3">
                    {colorOptions.map((opt, idx) => (
                      <button
                        key={opt.value + idx}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === opt.value ? 'border-tiara-gold ring-2 ring-tiara-gold' : 'border-tiara-gold/40'} bg-white`}
                        style={{ background: opt.value.toLowerCase() }}
                        onClick={() => setSelectedColor(opt.value)}
                      >
                        <span className="sr-only">{opt.value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Price */}
              <div className="text-3xl font-bold text-tiara-gold my-4 animate-fade-in-up delay-400">₹{m.price.toLocaleString()}</div>
              {/* Add to Cart Button */}
              <Button 
                className="bg-tiara-gold text-black font-bold px-8 py-3 rounded-xl text-lg mb-6 shadow-lg hover:bg-yellow-400 transition-all"
                onClick={() => handleAddToCart(m)}
              >
                Add to Cart
              </Button>
              {/* Divider */}
              <div className="w-full border-t border-tiara-gold/30 my-4"></div>
              {/* Specs Table */}
              <div className="w-full bg-black/40 rounded-lg p-4 mt-2">
                <table className="w-full text-left">
                  <tbody>
                    {featureObjs.map((spec, i) => (
                      typeof spec === 'object' && spec.label && spec.value ? (
                        <tr key={spec.label + spec.value + i}>
                          <td className="pr-4 font-semibold text-tiara-gold uppercase w-32">{spec.label}</td>
                          <td className="text-white">{spec.value}</td>
                        </tr>
                      ) : null
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <style>{`
          .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(.4,0,.2,1) both; }
          .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
          @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
          @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
          .animate-particle1 { animation: particle1 12s linear infinite alternate; }
          .animate-particle2 { animation: particle2 16s linear infinite alternate; }
          .animate-particle3 { animation: particle3 20s linear infinite alternate; }
          @keyframes particle1 { 0% { transform: translateY(0); } 100% { transform: translateY(40px); } }
          @keyframes particle2 { 0% { transform: translateX(0); } 100% { transform: translateX(60px); } }
          @keyframes particle3 { 0% { transform: scale(1); } 100% { transform: scale(1.3); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br ${bgClass} transition-all duration-700 pt-24`}>
      <NavBar />
      {/* Animated background particles */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`absolute rounded-full bg-tiara-gold/10 blur-2xl animate-particle${i%3+1}`} style={{
            width: `${40 + (i%3)*20}px`, height: `${40 + (i%3)*20}px`,
            left: `${(i*8)%100}%`, top: `${(i*13)%100}%`, opacity: 0.5
          }} />
        ))}
      </div>
      {/* Brand Filter Pills */}
      <div ref={pillsRef} className="flex justify-center gap-4 py-8 px-2 overflow-x-auto scrollbar-hide animate-fade-in">
        {BRANDS.map(brand => (
          <button
            key={brand}
            className={`px-5 py-2 rounded-full font-bold text-lg shadow transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-tiara-gold ${brandFilter === brand ? 'bg-tiara-gold text-black border-tiara-gold scale-110' : 'bg-black/40 text-tiara-gold border-tiara-gold/40 hover:bg-tiara-gold/20'}`}
            onClick={() => setBrandFilter(brandFilter === brand ? null : brand)}
            tabIndex={0}
          >
            {brand}
          </button>
        ))}
      </div>
      {/* Showcase Carousel */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {filteredMobiles.length === 0 ? (
          <div className="text-white text-2xl font-bold mt-16">No mobiles found.</div>
        ) : (
          <div className="relative w-full max-w-xl flex flex-col items-center">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <button aria-label="Previous Mobile" onClick={prev} className="bg-black/40 hover:bg-tiara-gold/80 text-tiara-gold hover:text-black rounded-full p-3 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-tiara-gold scale-100 active:scale-90">
                <ArrowLeft className="h-7 w-7" />
              </button>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <button aria-label="Next Mobile" onClick={next} className="bg-black/40 hover:bg-tiara-gold/80 text-tiara-gold hover:text-black rounded-full p-3 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-tiara-gold scale-100 active:scale-90">
                <ArrowRight className="h-7 w-7" />
              </button>
            </div>
            {/* Animated Card */}
            <div className="w-full max-w-md mx-auto bg-black/70 rounded-3xl shadow-2xl p-8 flex flex-col items-center transition-all duration-700 animate-fade-in-up cursor-pointer hover:scale-105 focus-within:scale-105 focus:outline-none" onClick={() => setSpotlight(current)} tabIndex={0} onFocus={() => setAutoPlay(false)} onBlur={() => setAutoPlay(true)}>
              <img src={mobile?.image} alt={`Showcase of ${mobile?.name}`} className="w-48 h-48 object-cover rounded-2xl mb-6 shadow-lg" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">{mobile?.name}</h2>
              <div className="flex gap-2 mb-3">
                {Array(5).fill(0).map((_, i) => <Star key={i} className={`h-5 w-5 ${i < Math.floor(mobile?.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                <span className="text-gray-200">({mobile?.reviews})</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.isArray(mobile?.features) && mobile.features.filter(isSpecObj).map((spec, i) => (
                  <span key={spec.label + spec.value + i} className={`bg-tiara-gold/20 text-tiara-gold px-2 py-1 rounded-full text-xs font-medium shadow transition-all duration-500 ${specsAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i*80}ms` }}>
                    <strong>{spec.label}:</strong> {spec.value}
                  </span>
                ))}
              </div>
              <div className="text-xl font-bold text-tiara-gold mb-2">₹{mobile?.price?.toLocaleString()}</div>
              <div className="flex gap-2 mt-2">
                {mobile?.isNew && <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce">NEW</span>}
                {mobile?.isHot && <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">HOT</span>}
                {mobile?.stockCount && mobile.stockCount <= 5 && <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce">Only {mobile.stockCount} left</span>}
              </div>
              <div className="mt-6 text-xs text-gray-400">Click card for Spotlight</div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <style>{`
        .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(.4,0,.2,1) both; }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-bounce { animation: bounce 1s infinite alternate; }
        @keyframes bounce { 0% { transform: translateY(0); } 100% { transform: translateY(-8px); } }
        .animate-pulse { animation: pulse 1.5s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-particle1 { animation: particle1 12s linear infinite alternate; }
        .animate-particle2 { animation: particle2 16s linear infinite alternate; }
        .animate-particle3 { animation: particle3 20s linear infinite alternate; }
        @keyframes particle1 { 0% { transform: translateY(0); } 100% { transform: translateY(40px); } }
        @keyframes particle2 { 0% { transform: translateX(0); } 100% { transform: translateX(60px); } }
        @keyframes particle3 { 0% { transform: scale(1); } 100% { transform: scale(1.3); } }
      `}</style>
    </div>
  );
};

export default MobilesShowcase;
