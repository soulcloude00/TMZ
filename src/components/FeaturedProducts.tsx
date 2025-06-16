import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

import type { StockItem } from '@/pages/Admin'; // Import StockItem interface

// Removed local Product interface - using StockItem instead
// interface Product { ... }

// Removed mock data
// const FEATURED_PRODUCTS: Product[] = [ ... ];

const API_URL = 'http://localhost:3001/api'; // Define API_URL if not already defined globally

const FeaturedProducts = () => {
  const [products, setProducts] = useState<StockItem[]>([]); // Use StockItem[] for state
  const [addedToCart, setAddedToCart] = useState<Record<number, boolean>>({});

  // Fetch stock items from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/stock`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: StockItem[] = await response.json();
        setProducts(data); // Set fetched data
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array to fetch only once on mount

  const handleAddToCart = (productId: number) => {
    setAddedToCart((prev) => ({
      ...prev,
      [productId]: true
    }));

    setTimeout(() => {
      setAddedToCart((prev) => ({
        ...prev,
        [productId]: false
      }));
    }, 2000);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Products</h2>
          <div className="h-1 w-20 bg-tiara-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
          {products.map((product) => (
            <div key={product.id} className="product-card bg-gray-900 p-4 animate-slide-up">
              <div className="aspect-square overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <h3 className="text-white font-medium text-lg mb-1">{product.name}</h3>
              
              <div className="flex items-center justify-between mb-4">
                <p className="text-tiara-gold font-semibold">₹{product.price.toLocaleString()}</p> {/* Use toLocaleString for currency formatting */}
                <span className="text-xs text-gray-400 uppercase tracking-wider bg-gray-800 px-2 py-1 rounded">
                  {product.type}
                </span>
              </div>
              
              <Button 
                className={`w-full ${
                  addedToCart[product.id] 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "bg-tiara-gold hover:bg-tiara-lightgold text-black"
                }`}
                onClick={() => handleAddToCart(product.id)}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                {addedToCart[product.id] ? "Added to Cart" : "Add to Cart"}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-tiara-gold text-tiara-gold hover:bg-tiara-gold/10"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
