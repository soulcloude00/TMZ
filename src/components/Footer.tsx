import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/8127c288-f897-45fd-839e-ab9e50c78677.png" 
                alt="Tiara Mobile Zone" 
                className="h-12" 
              />
            </Link>
            <p className="text-gray-400 mt-4">
              Premium mobile phones and accessories for the discerning customer.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-tiara-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-tiara-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-tiara-gold">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mobiles" className="text-gray-400 hover:text-tiara-gold transition-colors">
                  Mobile Phones
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="text-gray-400 hover:text-tiara-gold transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/smartwatches" className="text-gray-400 hover:text-tiara-gold transition-colors">
                  Smart Watches
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-400 hover:text-tiara-gold transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-tiara-gold">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-tiara-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-tiara-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-tiara-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-tiara-gold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-tiara-gold shrink-0 mt-0.5" />
                <span className="text-gray-400">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-tiara-gold shrink-0 mt-0.5" />
                <span className="text-gray-400">contact@tiaramobile.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Tiara Mobile Zone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
