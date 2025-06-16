import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

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

  useEffect(() => {
    setUserEmail(localStorage.getItem('user_email'));
    window.addEventListener('storage', () => setUserEmail(localStorage.getItem('user_email')));
    return () => window.removeEventListener('storage', () => setUserEmail(localStorage.getItem('user_email')));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_email');
    setUserEmail(null);
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-md' : 'bg-black/80'
    }`}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white hidden sm:inline">TIARA MOBILE ZONE</span>
            </Link>
          </div>

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
            {!userEmail ? (
              <>
                <Link to="/login" className="text-white hover:text-tiara-gold transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="text-white hover:text-tiara-gold transition-colors">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="text-white hover:text-tiara-gold transition-colors">
                  Profile
                </Link>
                <button onClick={handleLogout} className="text-white hover:text-tiara-gold transition-colors">
                  Logout
                </button>
              </>
            )}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:text-tiara-gold">
                <ShoppingBag className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-tiara-gold text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-tiara-gold">
              <ShoppingBag className="h-6 w-6" />
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
