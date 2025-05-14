
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/8127c288-f897-45fd-839e-ab9e50c78677.png" 
              alt="Tiara Mobile Zone" 
              className="h-10 md:h-12" 
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-tiara-gold transition-colors">
              Home
            </Link>
            <Link to="/mobiles" className="text-white hover:text-tiara-gold transition-colors">
              Mobiles
            </Link>
            <Link to="/accessories" className="text-white hover:text-tiara-gold transition-colors">
              Accessories
            </Link>
            <Link to="/about" className="text-white hover:text-tiara-gold transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-white hover:text-tiara-gold transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-tiara-gold">
              <ShoppingBag className="h-6 w-6" />
              <span className="sr-only">Shopping Cart</span>
            </Button>
            <Button variant="outline" className="hidden md:inline-flex border-tiara-gold text-tiara-gold hover:bg-tiara-gold hover:text-black">
              Log In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
