
import React, { useEffect } from 'react';
import { Phone, Mail, ChevronDown } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  useEffect(() => {
    // Simple scroll animation for elements with .animate-on-scroll class
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 md:px-6 relative">
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-crown-bounce mb-6">
            <img 
              src="/lovable-uploads/8127c288-f897-45fd-839e-ab9e50c78677.png" 
              alt="Tiara Mobile Zone" 
              className="h-20 md:h-28 mx-auto"
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Empowering Mobile Lifestyle Since 2015
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Premium tech made accessible with uncompromised quality and support
          </p>
          
          <div className="mt-10 animate-bounce">
            <ChevronDown className="h-8 w-8 text-tiara-gold mx-auto" />
          </div>
        </div>
        
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-tiara-gold/5 to-transparent"></div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 px-4 md:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12 animate-on-scroll opacity-0">
            Our <span className="text-tiara-gold">Story</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="animate-on-scroll opacity-0">
              <h3 className="text-xl font-semibold text-tiara-gold mb-4">How We Started</h3>
              <p className="text-gray-300 mb-6">
                Tiara Mobile Zone began as a small kiosk in a busy market in 2015. 
                Founded by tech enthusiasts who believed premium mobile technology 
                should be accessible to everyone, we quickly built a reputation for 
                authentic products and exceptional customer service.
              </p>
              <p className="text-gray-300">
                What started as a passion project grew into one of the most trusted 
                mobile retailers in the region, with a carefully curated selection 
                of devices and accessories that meet our stringent quality standards.
              </p>
            </div>
            
            <div className="relative animate-on-scroll opacity-0">
              <img 
                src="https://placehold.co/600x400/222/gold?text=Store+Image" 
                alt="Tiara Mobile Zone Store" 
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-4 -right-4 h-24 w-24 border-4 border-tiara-gold rounded-lg z-[-1]"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center mt-20">
            <div className="order-2 md:order-1 relative animate-on-scroll opacity-0">
              <img 
                src="https://placehold.co/600x400/222/gold?text=Mission+Image" 
                alt="Our Mission" 
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -top-4 -left-4 h-24 w-24 border-4 border-tiara-gold rounded-lg z-[-1]"></div>
            </div>
            
            <div className="order-1 md:order-2 animate-on-scroll opacity-0">
              <h3 className="text-xl font-semibold text-tiara-gold mb-4">Our Mission</h3>
              <p className="text-gray-300 mb-6">
                Our mission is to bridge the gap between cutting-edge mobile technology 
                and everyday users. We believe in providing not just products, but complete 
                solutions that enhance your digital lifestyle.
              </p>
              <p className="text-gray-300">
                Every product in our catalog undergoes rigorous quality checks to ensure 
                that you receive only the best. We stand behind every item we sell with 
                comprehensive warranty and after-sales support.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Highlights */}
      <section className="py-16 px-4 md:px-6 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12 animate-on-scroll opacity-0">
            Why Choose <span className="text-tiara-gold">Tiara Mobile Zone</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Highlight 1 */}
            <div className="bg-black/50 p-6 rounded-lg border border-gray-800 hover:border-tiara-gold transition-all duration-300 animate-on-scroll opacity-0">
              <div className="bg-tiara-gold/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl text-tiara-gold">🛒</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">10,000+ Products Sold</h3>
              <p className="text-gray-400">
                Trusted by thousands of customers across the country for their mobile needs.
              </p>
            </div>
            
            {/* Highlight 2 */}
            <div className="bg-black/50 p-6 rounded-lg border border-gray-800 hover:border-tiara-gold transition-all duration-300 animate-on-scroll opacity-0">
              <div className="bg-tiara-gold/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl text-tiara-gold">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Trusted By 5,000+ Customers</h3>
              <p className="text-gray-400">
                Our growing community of satisfied customers is our greatest achievement.
              </p>
            </div>
            
            {/* Highlight 3 */}
            <div className="bg-black/50 p-6 rounded-lg border border-gray-800 hover:border-tiara-gold transition-all duration-300 animate-on-scroll opacity-0">
              <div className="bg-tiara-gold/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl text-tiara-gold">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Express Delivery Across India</h3>
              <p className="text-gray-400">
                Fast and reliable shipping with real-time tracking for complete peace of mind.
              </p>
            </div>
            
            {/* Highlight 4 */}
            <div className="bg-black/50 p-6 rounded-lg border border-gray-800 hover:border-tiara-gold transition-all duration-300 animate-on-scroll opacity-0">
              <div className="bg-tiara-gold/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl text-tiara-gold">🛠️</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Warranty & After Sales</h3>
              <p className="text-gray-400">
                Comprehensive warranty and dedicated support for all your post-purchase needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 px-4 md:px-6 bg-black">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12 animate-on-scroll opacity-0">
            Meet Our <span className="text-tiara-gold">Team</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center animate-on-scroll opacity-0">
              <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-full border-4 border-tiara-gold">
                <img 
                  src="https://placehold.co/300x300/222/gold?text=Founder" 
                  alt="Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">Rahul Sharma</h3>
              <p className="text-tiara-gold font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-400 max-w-xs mx-auto">
                Tech enthusiast with over 10 years of experience in the mobile industry.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center animate-on-scroll opacity-0">
              <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-full border-4 border-tiara-gold">
                <img 
                  src="https://placehold.co/300x300/222/gold?text=Co-Founder" 
                  alt="Co-Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">Priya Patel</h3>
              <p className="text-tiara-gold font-medium mb-3">Co-Founder & COO</p>
              <p className="text-gray-400 max-w-xs mx-auto">
                Operations expert who ensures seamless customer experience across all channels.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center animate-on-scroll opacity-0">
              <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-full border-4 border-tiara-gold">
                <img 
                  src="https://placehold.co/300x300/222/gold?text=Tech+Lead" 
                  alt="Tech Lead" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">Vikram Singh</h3>
              <p className="text-tiara-gold font-medium mb-3">Technical Director</p>
              <p className="text-gray-400 max-w-xs mx-auto">
                Mobile tech specialist who tests and vets every product in our catalog.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Contact Section */}
      <section className="py-12 px-4 md:px-6 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-8 animate-on-scroll opacity-0">
            Have Questions? <span className="text-tiara-gold">Get in Touch</span>
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 animate-on-scroll opacity-0">
            <a href="tel:+911234567890" className="flex items-center gap-3 text-gray-300 hover:text-tiara-gold transition-colors">
              <Phone className="h-5 w-5 text-tiara-gold" />
              <span>+91 1234 567 890</span>
            </a>
            <span className="hidden md:block text-gray-600">|</span>
            <a href="mailto:contact@tiaramobile.com" className="flex items-center gap-3 text-gray-300 hover:text-tiara-gold transition-colors">
              <Mail className="h-5 w-5 text-tiara-gold" />
              <span>contact@tiaramobile.com</span>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
