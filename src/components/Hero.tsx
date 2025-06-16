import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SLOGANS = [
  'Stay connected in style — Tiara Mobile, where technology meets elegance.',
  'Tiara Mobile — because your phone deserves the best',
  'Empowering your mobile lifestyle — only at Tiara Mobile',
];

const TYPING_SPEED = 40; // ms per character
const BLINK_PAUSE = 1000; // ms for the whole text blink effect
const HOLD_PAUSE = 2500; // ms to hold the text after blinking

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sloganIdx, setSloganIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isBlinkingPause, setIsBlinkingPause] = useState(false);
  const [isHoldPause, setIsHoldPause] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setDisplayed('');
    setIsBlinkingPause(false);
    setIsHoldPause(false);
  }, [sloganIdx]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isBlinkingPause && !isHoldPause) {
      if (displayed.length < SLOGANS[sloganIdx].length) {
        timeout = setTimeout(() => {
          setDisplayed(SLOGANS[sloganIdx].slice(0, displayed.length + 1));
        }, TYPING_SPEED);
      } else {
        // Finished typing, start blink
        timeout = setTimeout(() => {
          setIsBlinkingPause(true);
        }, BLINK_PAUSE);
      }
    } else if (isBlinkingPause && !isHoldPause) {
      // After blink, hold the text
      timeout = setTimeout(() => {
        setIsBlinkingPause(false);
        setIsHoldPause(true);
      }, BLINK_PAUSE);
    } else if (isHoldPause) {
      // After hold, move to next quote
      timeout = setTimeout(() => {
        setIsHoldPause(false);
        setSloganIdx((idx) => (idx + 1) % SLOGANS.length);
      }, HOLD_PAUSE);
    }
    return () => clearTimeout(timeout);
  }, [displayed, sloganIdx, isBlinkingPause, isHoldPause]);

  return (
    <div className="relative min-h-screen bg-black flex items-center overflow-hidden">
      {/* Dynamic background shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-tiara-gold/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-tiara-gold/20 rounded-full blur-2xl animate-float-medium" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-tiara-gold/5 rounded-full blur-2xl animate-float-fast" style={{transform: 'translate(-50%, -50%)'}} />
        <div className="absolute inset-0 bg-gradient-to-b from-tiara-black via-tiara-black/90 to-tiara-black opacity-90" />
      </div>
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
          {/* Typewriter Slogan Rotator */}
          <div className="h-16 flex items-center justify-center w-full">
            <span
              className={`block text-2xl md:text-3xl lg:text-4xl font-bold text-tiara-gold max-w-3xl min-h-[3rem] transition-opacity duration-200 ${isBlinkingPause ? 'animate-text-blink' : 'opacity-100'}`}
              style={{ letterSpacing: '0.01em', whiteSpace: 'pre-line' }}
            >
              {displayed}
              {!isBlinkingPause && !isHoldPause && displayed.length < SLOGANS[sloganIdx].length && (
                <span className="inline-block w-2 h-7 align-middle bg-tiara-gold animate-blink ml-1" style={{verticalAlign: 'middle'}}></span>
              )}
            </span>
          </div>
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
      <style>{`
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
        @keyframes float-medium { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(20px); } }
        @keyframes float-fast { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s steps(1) infinite; }
        @keyframes text-blink { 0%, 100% { opacity: 1; } 20%, 50%, 80% { opacity: 0.4; } }
        .animate-text-blink { animation: text-blink 0.5s steps(1) 1; }
      `}</style>
    </div>
  );
};

export default Hero;
