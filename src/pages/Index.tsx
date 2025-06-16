import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

// Animated Stats Section
const Stats = () => {
  const stats = [
    { label: 'Happy Customers', value: 12000 },
    { label: 'Products Sold', value: 35000 },
    { label: 'Years in Business', value: 12 },
    { label: 'Brands', value: 25 },
  ];
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, i) => {
      return setInterval(() => {
        setCounts((prev) => {
          const next = [...prev];
          if (next[i] < stat.value) next[i] += Math.ceil(stat.value / 100);
          if (next[i] > stat.value) next[i] = stat.value;
          return next;
        });
      }, 20);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={stat.label} className="p-6 rounded-xl bg-gray-900/80 shadow-lg border border-tiara-gold animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold text-tiara-gold mb-2 animate-bounce">{counts[i]}</div>
              <div className="text-lg text-white font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Carousel
const TESTIMONIALS = [
  {
    name: 'Aarav S.',
    text: 'Amazing service and genuine products! My new phone arrived in perfect condition and super fast.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Priya K.',
    text: 'The staff was very helpful in choosing the right accessories. Highly recommend Tiara Mobile Zone!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Vikram R.',
    text: 'Great prices and after-sales support. Will definitely shop again!',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
];

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <div className="h-1 w-20 bg-tiara-gold mx-auto"></div>
        </div>
        <div className="max-w-xl mx-auto">
          <div className="relative bg-gray-900/80 rounded-xl p-8 shadow-xl border border-tiara-gold animate-fade-in">
            <img src={TESTIMONIALS[idx].avatar} alt={TESTIMONIALS[idx].name} className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-tiara-gold" />
            <p className="text-lg text-gray-200 italic mb-4">“{TESTIMONIALS[idx].text}”</p>
            <div className="text-tiara-gold font-bold">{TESTIMONIALS[idx].name}</div>
            <div className="absolute left-0 right-0 flex justify-center gap-2 mt-4 bottom-2">
              {TESTIMONIALS.map((_, i) => (
                <span key={i} className={`inline-block w-3 h-3 rounded-full ${i === idx ? 'bg-tiara-gold' : 'bg-gray-700'}`}></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Brands Strip
const BRANDS = [
  '/lovable-uploads/apple-logo.png',
  '/lovable-uploads/samsung-logo.png',
  '/lovable-uploads/oneplus-logo.png',
  '/lovable-uploads/xiaomi-logo.png',
  '/lovable-uploads/sony-logo.png',
  '/lovable-uploads/boat-logo.png',
  '/lovable-uploads/jbl-logo.png',
  '/lovable-uploads/realme-logo.png',
];

const BrandsStrip = () => (
  <section className="py-8 bg-gradient-to-r from-black via-gray-900 to-black">
    <div className="overflow-x-hidden">
      <div className="flex gap-12 animate-scroll-x items-center" style={{ minWidth: '1200px' }}>
        {BRANDS.concat(BRANDS).map((logo, i) => (
          <img key={i} src={logo} alt="Brand Logo" className="h-12 grayscale hover:grayscale-0 transition duration-300" />
        ))}
      </div>
    </div>
    <style>{`
      @keyframes scroll-x {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-scroll-x {
        animation: scroll-x 30s linear infinite;
      }
    `}</style>
  </section>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <NavBar />
      <Hero />
      <Stats />
      <BrandsStrip />
      <FeaturedProducts />
      <Categories />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
