
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1299,
    image: "https://images.unsplash.com/photo-1631281956016-3cdc1b2fe5fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "mobiles"
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    price: 1199,
    image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "mobiles"
  },
  {
    id: 3,
    name: "Google Pixel 7 Pro",
    price: 899,
    image: "https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "mobiles"
  },
  {
    id: 4,
    name: "AirPods Pro",
    price: 249,
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "accessories"
  }
];

const FeaturedProducts = () => {
  const [addedToCart, setAddedToCart] = useState<Record<number, boolean>>({});

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
          {FEATURED_PRODUCTS.map((product) => (
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
                <p className="text-tiara-gold font-semibold">${product.price}</p>
                <span className="text-xs text-gray-400 uppercase tracking-wider bg-gray-800 px-2 py-1 rounded">
                  {product.category}
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
