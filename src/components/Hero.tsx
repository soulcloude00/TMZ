
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-black flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-tiara-black via-tiara-black/90 to-tiara-black"></div>
      
      {/* Animated content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center gap-8 pt-16">
          {/* Logo with animation */}
          <div 
            className={`transition-all duration-1000 delay-300 transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <img 
              src="/lovable-uploads/8127c288-f897-45fd-839e-ab9e50c78677.png" 
              alt="Tiara Mobile Zone" 
              className="h-32 md:h-40 lg:h-48 animate-crown-bounce"
            />
          </div>
          
          {/* Tagline */}
          <h1 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl transition-all duration-1000 delay-500 transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Premium Mobile Experience <span className="text-tiara-gold">Redefined</span>
          </h1>
          
          {/* Description */}
          <p 
            className={`text-gray-300 text-lg max-w-2xl transition-all duration-1000 delay-700 transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Discover the latest smartphones and accessories with royal service fit for a king. Exclusive deals await you at Tiara Mobile Zone.
          </p>
          
          {/* CTA buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-1000 delay-900 transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-tiara-gold hover:bg-tiara-lightgold text-black font-medium"
            >
              <Link to="/mobiles">
                Shop Mobiles
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-tiara-gold text-tiara-gold hover:bg-tiara-gold/10"
            >
              <Link to="/accessories">
                Browse Accessories
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
