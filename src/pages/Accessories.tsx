import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, Search, ShoppingCart, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AccessoriesFilters from '@/components/AccessoriesFilters';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

import type { StockItem } from '@/pages/Admin'; // Import StockItem interface

// Mock data for accessories
// const accessories = [ ... ]; // REMOVE all dummy data

// Types
interface FilterState {
  categories: string[];
  brands: string[];
  priceRanges: string[];
  inStock: boolean | null;
}

// Unique glassmorphism style
const glassCard = "backdrop-blur-md bg-white/30 border border-white/20 shadow-xl rounded-2xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40";
const chipBase = "px-3 py-1 rounded-full text-xs font-semibold shadow transition-transform duration-200 cursor-pointer mr-2 mb-2 border border-tiara-gold/40";
const chipSelected = "bg-tiara-gold text-black border-tiara-gold scale-110";
const chipUnselected = "bg-black/40 text-tiara-gold hover:bg-tiara-gold/20 hover:text-tiara-gold";

const categoryList = ['Chargers','Cases','Earphones','Screen Guards','Smartwatches','Cables','Power Banks'];

const AccessoriesPage = () => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRanges: [],
    inStock: null
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const [spotlightAccessory, setSpotlightAccessory] = useState<StockItem | null>(null); // Add state for spotlighted accessory

  // Fetch accessories from the backend
  const { data: stockItems = [], isLoading } = useQuery<StockItem[]> ({
    queryKey: ['stockItems'], // Use a more general key since we fetch all stock
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/stock');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });

  // Filter to show only accessories and apply other filters
  const accessories = stockItems.filter(item => item.type === 'accessory');

  const filteredAccessories = accessories.filter(item => {
    // Check category filter
    if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
      return false;
    }
    
    // Check brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(item.brand)) {
      return false;
    }
    
    // Check stock filter
    if (filters.inStock !== null && item.inStock !== filters.inStock) {
      return false;
    }
    
    return true;
  });

  // Dynamically generate brand list from filtered accessories
  const accessoryBrands = Array.from(new Set(accessories.map(item => item.brand)));

  // Calculate pagination
  const totalPages = Math.ceil(filteredAccessories.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedAccessories = filteredAccessories.slice(start, end);
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  // Generate stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-tiara-gold">★</span>);
    }
    
    if (halfStar) {
      stars.push(<span key="half" className="text-tiara-gold">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-400">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black">
      <NavBar />
      {spotlightAccessory ? (
        // Spotlight View
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black transition-all duration-700 pt-24">
          <NavBar />
          {/* Animated background particles - Optional, can add if desired */}
          {/* <div className="pointer-events-none fixed inset-0 z-0">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`absolute rounded-full bg-tiara-gold/10 blur-2xl animate-particle${i%3+1}`} style={{
                width: `${40 + (i%3)*20}px`, height: `${40 + (i%3)*20}px`,
                left: `${(i*8)%100}%`, top: `${(i*13)%100}%`, opacity: 0.5
              }} />
            ))}
          </div> */}
          <div className="flex-1 flex items-center justify-center px-4 py-16 animate-fade-in relative">
            <div className="flex flex-col md:flex-row items-center gap-8 bg-black/60 rounded-3xl shadow-2xl p-8 md:p-10 max-w-3xl w-full relative">
              {/* Close button */}
              <button aria-label="Close Spotlight" className="absolute top-4 right-4 text-white/70 hover:text-tiara-gold text-2xl bg-black/60 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-tiara-gold z-20" onClick={() => setSpotlightAccessory(null)}><X size={24} /></button>
              
              {/* Left: Image */}
              <div className="w-full md:w-1/3 flex-shrink-0 flex items-center justify-center">
                <img 
                  src={spotlightAccessory.image}
                  alt={`Spotlight view of ${spotlightAccessory.name}`}
                  className="w-48 h-48 object-contain rounded-2xl shadow-lg bg-gray-800"
                />
              </div>

              {/* Right: Product Info and Specs */}
              <div className="flex flex-col items-center md:items-start w-full md:w-2/3 text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">{spotlightAccessory.name}</h2>
                <Badge className="bg-tiara-gold/20 text-tiara-gold border border-tiara-gold mb-4">{spotlightAccessory.brand}</Badge>

                <div className="text-2xl font-bold text-tiara-gold mb-4">₹{spotlightAccessory.price.toLocaleString()}</div>

                {/* Specs Table (adapted from Mobile Spotlight) */}
                {spotlightAccessory.features && typeof spotlightAccessory.features === 'string' && JSON.parse(spotlightAccessory.features).length > 0 && (
                  <div className="w-full bg-black/40 rounded-lg p-4 mt-2">
                    <table className="w-full text-left text-white">
                      <tbody>
                        {JSON.parse(spotlightAccessory.features).map((spec: { label: string; value: string }, i: number) => (
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
                )}

                {/* Add to Cart Button */}
                <Button 
                  className="w-full mt-6 font-semibold shadow hover:scale-105 transition-transform bg-gradient-to-r from-tiara-gold to-yellow-300 animate-fade-in-up text-black"
                  onClick={() => alert('Add to cart!')} // Replace with actual add to cart logic
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        // Normal Accessories List View
        <main className="flex-1 w-full max-w-7xl mx-auto pt-24 pb-16 px-4">
          <section className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">Accessories</h1>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl">Discover unique accessories to complement your mobile lifestyle. Handpicked, stylish, and functional—find your next favorite here!</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {categoryList.map(cat => (
                <span
                  key={cat}
                  className={
                    chipBase + ' ' + (filters.categories.includes(cat) ? chipSelected : chipUnselected)
                  }
                  onClick={() => {
                    const newCategories = filters.categories.includes(cat)
                      ? filters.categories.filter(c => c !== cat)
                      : [...filters.categories, cat];
                    handleFilterChange({ ...filters, categories: newCategories });
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {accessoryBrands.map(brand => (
                <span
                  key={brand}
                  className={
                    chipBase + ' ' + (filters.brands.includes(brand) ? chipSelected : chipUnselected)
                  }
                  onClick={() => {
                    const newBrands = filters.brands.includes(brand)
                      ? filters.brands.filter(b => b !== brand)
                      : [...filters.brands, brand];
                    handleFilterChange({ ...filters, brands: newBrands });
                  }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredAccessories.slice(start, end).map(item => (
              <div 
                key={item.id} 
                className="bg-black/70 rounded-2xl shadow-lg p-6 flex flex-col items-center mb-6 break-inside-avoid animate-fade-in-up group relative overflow-hidden cursor-pointer"
                style={{ minHeight: 320 }}
                onClick={() => setSpotlightAccessory(item)} // Add click handler to open spotlight
              >
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-xl mb-4 shadow-md group-hover:scale-105 transition-transform duration-300 bg-gray-800" onError={(e) => { e.currentTarget.src = '/fallback-charger.png'; }} />
                <div className="absolute top-4 right-4 z-10">
                  <Button size="icon" variant="ghost" className="rounded-full bg-white/10 hover:bg-tiara-gold/80 transition-colors shadow-lg">
                    <Heart className="w-5 h-5 text-red-400 group-hover:scale-125 transition-transform" />
                  </Button>
                </div>
                <h3 className="text-xl font-bold mb-1 text-white drop-shadow text-center">{item.name}</h3>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary">{item.category}</Badge>
                  <Badge className="bg-tiara-gold/20 text-tiara-gold border border-tiara-gold">{item.brand}</Badge>
                  {item.isNew && <Badge className="bg-green-400/80 text-white">New</Badge>}
                  {item.isHot && <Badge className="bg-red-400/80 text-white">Hot</Badge>}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-tiara-gold text-lg font-bold">₹{item.price}</span>
                  <span className="ml-2 text-gray-400 text-sm">{renderStars(item.rating)} ({item.reviews})</span>
                </div>
                <Button className="w-full mt-2 font-semibold shadow hover:scale-105 transition-transform bg-gradient-to-r from-tiara-gold to-yellow-300 animate-fade-in-up text-black" onClick={() => alert('Add to cart!')}>Add to Cart</Button>
              </div>
            ))}
          </section>
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage(Math.max(1, page - 1))} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>{i + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={() => setPage(Math.min(totalPages, page + 1))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default AccessoriesPage;
