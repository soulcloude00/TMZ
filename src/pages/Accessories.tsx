
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, Search, ShoppingCart, Heart } from 'lucide-react';
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

// Mock data for accessories
const accessories = [
  {
    id: 1,
    name: "20W Type-C Fast Charger",
    price: 999,
    image: "https://placehold.co/300x300/222/gold?text=Charger",
    category: "Chargers",
    brand: "Apple",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    isNew: true
  },
  {
    id: 2,
    name: "Premium Phone Case - iPhone 15 Pro",
    price: 1299,
    image: "https://placehold.co/300x300/222/gold?text=Case",
    category: "Cases",
    brand: "Tiara",
    rating: 4.8,
    reviews: 86,
    inStock: true,
    isHot: true
  },
  {
    id: 3,
    name: "Wireless Earbuds With Noise Cancellation",
    price: 3999,
    image: "https://placehold.co/300x300/222/gold?text=Earbuds",
    category: "Earphones",
    brand: "Boat",
    rating: 4.6,
    reviews: 215,
    inStock: true
  },
  {
    id: 4,
    name: "9D Tempered Glass Screen Protector",
    price: 499,
    image: "https://placehold.co/300x300/222/gold?text=Screen+Guard",
    category: "Screen Guards",
    brand: "Tiara",
    rating: 4.3,
    reviews: 94,
    inStock: true
  },
  {
    id: 5,
    name: "Smart Watch with Heart Rate Monitor",
    price: 4999,
    image: "https://placehold.co/300x300/222/gold?text=Smartwatch",
    category: "Smartwatches",
    brand: "Samsung",
    rating: 4.7,
    reviews: 152,
    inStock: true,
    isNew: true
  },
  {
    id: 6,
    name: "Premium Braided USB-C Cable - 2m",
    price: 799,
    image: "https://placehold.co/300x300/222/gold?text=Cable",
    category: "Cables",
    brand: "Tiara",
    rating: 4.4,
    reviews: 67,
    inStock: false
  },
  {
    id: 7,
    name: "10000mAh Power Bank",
    price: 1499,
    image: "https://placehold.co/300x300/222/gold?text=Power+Bank",
    category: "Power Banks",
    brand: "Xiaomi",
    rating: 4.8,
    reviews: 203,
    inStock: true,
    isHot: true
  },
  {
    id: 8,
    name: "Wireless Charging Pad - 15W",
    price: 1299,
    image: "https://placehold.co/300x300/222/gold?text=Charging+Pad",
    category: "Chargers",
    brand: "Samsung",
    rating: 4.5,
    reviews: 89,
    inStock: true
  },
  {
    id: 9,
    name: "Bluetooth Headphones",
    price: 2499,
    image: "https://placehold.co/300x300/222/gold?text=Headphones",
    category: "Earphones",
    brand: "Boat",
    rating: 4.2,
    reviews: 76,
    inStock: true
  }
];

// Types
interface FilterState {
  categories: string[];
  brands: string[];
  priceRanges: string[];
  inStock: boolean | null;
}

const AccessoriesPage = () => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRanges: [],
    inStock: null
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Mock query to fetch accessories
  const { data = accessories, isLoading } = useQuery({
    queryKey: ['accessories'],
    queryFn: () => Promise.resolve(accessories)
  });

  // Filter accessories based on selected filters
  const filteredAccessories = data.filter(item => {
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
    <div className="flex flex-col min-h-screen bg-black">
      <NavBar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-black to-gray-900 pt-24 pb-8 px-4 md:px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Mobile Accessories
          </h1>
          <p className="text-gray-400">
            Enhance your mobile experience with our premium accessories
          </p>
        </div>
      </div>
      
      {/* Deals of the Week Banner */}
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="bg-gray-900 border border-tiara-gold rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-tiara-gold mb-2">
                Deals of the Week
              </h2>
              <p className="text-white mb-4 md:mb-0">
                Get up to 40% off on selected accessories!
              </p>
            </div>
            <Button className="bg-tiara-gold text-black hover:bg-tiara-lightgold">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content with Filters and Products */}
      <div className="container mx-auto px-4 md:px-6 flex-grow py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Desktop View */}
          <div className="hidden lg:block w-1/4 sticky top-24">
            <AccessoriesFilters 
              filters={filters} 
              onFilterChange={handleFilterChange} 
            />
          </div>
          
          {/* Filters - Mobile View */}
          <div className="lg:hidden mb-4 flex justify-between items-center">
            <div className="relative w-full max-w-sm mr-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search accessories..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-800 focus:border-tiara-gold focus:outline-none"
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="text-white border-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-gray-900 border-r border-gray-800 w-[300px] sm:w-[360px]">
                <AccessoriesFilters 
                  filters={filters} 
                  onFilterChange={handleFilterChange} 
                  onClose={() => document.querySelector('[data-state="open"]')?.dispatchEvent(new MouseEvent('click', {bubbles: true}))}
                />
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Product Grid */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-900 rounded-lg h-80 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <>
                {filteredAccessories.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No accessories match your filters.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4 border-tiara-gold text-tiara-gold hover:bg-tiara-gold hover:text-black"
                      onClick={() => setFilters({
                        categories: [],
                        brands: [],
                        priceRanges: [],
                        inStock: null
                      })}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedAccessories.map((accessory) => (
                      <Card key={accessory.id} className="product-card bg-gray-900 border-gray-800 text-white overflow-hidden">
                        {/* Product Image */}
                        <div className="relative aspect-square overflow-hidden">
                          <img 
                            src={accessory.image} 
                            alt={accessory.name} 
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                          />
                          
                          {/* Tags */}
                          <div className="absolute top-2 left-2 flex flex-col gap-2">
                            {accessory.isNew && (
                              <Badge className="bg-tiara-gold text-black font-semibold">NEW</Badge>
                            )}
                            {accessory.isHot && (
                              <Badge className="bg-red-500 text-white font-semibold">HOT</Badge>
                            )}
                            {!accessory.inStock && (
                              <Badge variant="outline" className="bg-gray-900/80 text-white border-gray-600">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                          
                          {/* Wishlist Button */}
                          <button className="absolute top-2 right-2 bg-black/30 p-2 rounded-full transition-colors hover:bg-black/50">
                            <Heart className="h-5 w-5 text-white hover:text-tiara-gold transition-colors" />
                          </button>
                        </div>
                        
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{accessory.name}</h3>
                          
                          <div className="flex items-center mb-2">
                            <div className="flex mr-1">{renderStars(accessory.rating)}</div>
                            <span className="text-sm text-gray-400">({accessory.reviews})</span>
                          </div>
                          
                          <p className="text-tiara-gold font-semibold">₹{accessory.price.toLocaleString()}</p>
                          
                          {accessory.inStock && accessory.id === 7 && (
                            <p className="text-sm text-red-400 mt-1">Only 3 left!</p>
                          )}
                        </CardContent>
                        
                        <CardFooter className="p-4 pt-0">
                          <Button 
                            className="w-full bg-tiara-gold text-black hover:bg-tiara-lightgold"
                            disabled={!accessory.inStock}
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
                
                {/* Pagination */}
                {filteredAccessories.length > 0 && totalPages > 1 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) setPage(page - 1);
                          }} 
                          className={page === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(i + 1);
                            }} 
                            isActive={page === i + 1}
                            className={page === i + 1 ? "bg-tiara-gold text-black" : "text-white"}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (page < totalPages) setPage(page + 1);
                          }} 
                          className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AccessoriesPage;
