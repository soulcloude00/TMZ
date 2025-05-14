
import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import MobileFilters from '@/components/MobileFilters';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Types
interface Mobile {
  id: number;
  name: string;
  brand: string;
  price: number;
  os: 'Android' | 'iOS';
  features: string[];
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  stockCount?: number;
  isNew?: boolean;
  isHot?: boolean;
}

const MOBILES_DATA: Mobile[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 139900,
    os: "iOS",
    features: ["5G", "A17 Pro", "OLED", "48MP"],
    image: "https://images.unsplash.com/photo-1695048133142-1a20484bce71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 247,
    inStock: true,
    stockCount: 5,
    isNew: true
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    price: 124999,
    os: "Android",
    features: ["5G", "Snapdragon 8 Gen 2", "AMOLED", "200MP"],
    image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 189,
    inStock: true
  },
  {
    id: 3,
    name: "Xiaomi 13 Pro",
    brand: "Xiaomi",
    price: 79999,
    os: "Android",
    features: ["5G", "Snapdragon 8 Gen 2", "AMOLED", "Leica Optics"],
    image: "https://images.unsplash.com/photo-1676420284807-4def25115738?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.5,
    reviews: 102,
    inStock: true,
    isHot: true
  },
  {
    id: 4,
    name: "Google Pixel 7 Pro",
    brand: "Google",
    price: 69999,
    os: "Android",
    features: ["5G", "Tensor G2", "OLED", "48MP"],
    image: "https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviews: 112,
    inStock: true
  },
  {
    id: 5,
    name: "OnePlus 11",
    brand: "OnePlus",
    price: 56999,
    os: "Android",
    features: ["5G", "Snapdragon 8 Gen 2", "AMOLED", "50MP"],
    image: "https://images.unsplash.com/photo-1676568600271-42d3e68af4a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.5,
    reviews: 98,
    inStock: true
  },
  {
    id: 6,
    name: "iPhone 14",
    brand: "Apple",
    price: 69900,
    os: "iOS",
    features: ["5G", "A15 Bionic", "OLED"],
    image: "https://images.unsplash.com/photo-1664478546383-ee16768c25d1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviews: 156,
    inStock: false
  },
  {
    id: 7,
    name: "Samsung Galaxy A54",
    brand: "Samsung",
    price: 38999,
    os: "Android",
    features: ["5G", "Exynos 1380", "AMOLED"],
    image: "https://images.unsplash.com/photo-1634921553115-8c23e4fb0683?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.3,
    reviews: 84,
    inStock: true,
    stockCount: 2
  },
  {
    id: 8,
    name: "Nothing Phone (2)",
    brand: "Nothing",
    price: 44999,
    os: "Android",
    features: ["5G", "Snapdragon 8+ Gen 1", "OLED", "Glyph Interface"],
    image: "https://images.unsplash.com/photo-1689185304386-6a730de1adcd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.4,
    reviews: 75,
    inStock: true,
    isNew: true
  },
  {
    id: 9,
    name: "Motorola Edge 40",
    brand: "Motorola",
    price: 29999,
    os: "Android",
    features: ["5G", "Dimensity 8020", "OLED"],
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.2,
    reviews: 63,
    inStock: true
  },
];

// Filter and Sorting options
type SortOption = 'price-low' | 'price-high' | 'newest' | 'best-selling';
type FilterState = {
  brands: string[];
  priceRanges: string[];
  os: string[];
  features: string[];
}

const MobilesPage = () => {
  // State for filters and sorting
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceRanges: [],
    os: [],
    features: []
  });
  const [sortBy, setSortBy] = useState<SortOption>('best-selling');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Item per page and computed values
  const itemsPerPage = 6;
  const totalPages = Math.ceil(MOBILES_DATA.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter and sort the products
  const filteredAndSortedProducts = () => {
    let result = [...MOBILES_DATA];

    // Apply filters
    if (filters.brands.length > 0) {
      result = result.filter(mobile => filters.brands.includes(mobile.brand));
    }

    if (filters.os.length > 0) {
      result = result.filter(mobile => filters.os.includes(mobile.os));
    }

    if (filters.features.length > 0) {
      result = result.filter(mobile => 
        mobile.features.some(feature => filters.features.includes(feature))
      );
    }

    if (filters.priceRanges.length > 0) {
      result = result.filter(mobile => {
        return filters.priceRanges.some(range => {
          const [min, max] = range.split('-').map(num => parseInt(num));
          return mobile.price >= min && mobile.price <= max;
        });
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = result.filter(mobile => mobile.isNew).concat(result.filter(mobile => !mobile.isNew));
        break;
      case 'best-selling':
        result.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
        break;
    }

    return result;
  };

  const displayedProducts = filteredAndSortedProducts().slice(startIndex, endIndex);

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle sort changes
  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  // Toggle wishlist
  const toggleWishlist = (id: number) => {
    setWishlist(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Function to render rating stars
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Mobile Phones</h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto">
            Discover the latest and greatest smartphones from top brands, all in one place.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Mobile filter trigger */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <Button 
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            variant="outline"
            className="text-white border-tiara-gold"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Sort:</span>
            <select 
              className="bg-gray-900 text-white border border-gray-700 rounded p-1 text-sm"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
            >
              <option value="best-selling">Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
        
        {/* Mobile filters dropdown */}
        <div className={`lg:hidden ${mobileFiltersOpen ? 'block' : 'hidden'} bg-gray-900 rounded-lg p-4 mb-6`}>
          <MobileFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClose={() => setMobileFiltersOpen(false)}
          />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 sticky top-20 self-start">
            <MobileFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {/* Desktop Sort Options */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-sm text-gray-400">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProducts().length)} of {filteredAndSortedProducts().length} products
              </p>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select 
                  className="bg-gray-900 text-white border border-gray-700 rounded p-2"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                >
                  <option value="best-selling">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((mobile) => (
                <div 
                  key={mobile.id} 
                  className={`product-card bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 relative
                    ${hoveredProduct === mobile.id ? 'border-tiara-gold shadow-lg shadow-tiara-gold/20' : 'border-transparent'}`}
                  onMouseEnter={() => setHoveredProduct(mobile.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Status Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
                    {mobile.isNew && (
                      <Badge className="bg-blue-500 text-white">NEW</Badge>
                    )}
                    {mobile.isHot && (
                      <Badge className="bg-red-500 text-white">HOT</Badge>
                    )}
                    {mobile.stockCount && mobile.stockCount <= 5 && (
                      <Badge className="bg-amber-500 text-white">Only {mobile.stockCount} left</Badge>
                    )}
                  </div>
                  
                  {/* Wishlist Button */}
                  <button 
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 transition-all duration-300 opacity-60 hover:opacity-100"
                    onClick={() => toggleWishlist(mobile.id)}
                  >
                    <Heart className={`h-5 w-5 ${wishlist[mobile.id] ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                  
                  {/* Product Image with Zoom Effect */}
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={mobile.image}
                      alt={mobile.name}
                      className={`w-full h-full object-cover transition-transform duration-500 
                        ${hoveredProduct === mobile.id ? 'scale-110' : 'scale-100'}
                        ${!mobile.inStock ? 'opacity-50' : ''}`}
                    />
                    {!mobile.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="text-white font-medium px-3 py-1 rounded-full bg-gray-800">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">{mobile.brand}</span>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2 truncate">{mobile.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex mr-2">
                        {renderStars(mobile.rating)}
                      </div>
                      <span className="text-xs text-gray-400">({mobile.reviews})</span>
                    </div>
                    
                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between">
                      <span className="text-tiara-gold font-bold">₹{mobile.price.toLocaleString()}</span>
                      
                      <Button 
                        className={`transition-all duration-300 ${
                          mobile.inStock 
                            ? 'bg-tiara-gold hover:bg-tiara-lightgold text-black' 
                            : 'bg-gray-700 cursor-not-allowed'
                        }`}
                        disabled={!mobile.inStock}
                        size="sm"
                      >
                        <ShoppingBag className="mr-1 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {displayedProducts.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-400 mb-6">Try changing your filters or search terms</p>
                <Button 
                  onClick={() => setFilters({brands: [], priceRanges: [], os: [], features: []})}
                  variant="outline"
                  className="border-tiara-gold text-tiara-gold"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MobilesPage;
