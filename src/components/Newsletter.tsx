
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
        duration: 3000,
      });
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-400 mb-8">
            Subscribe to our newsletter for exclusive offers, new arrivals, and tech news.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-tiara-gold"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-tiara-gold hover:bg-tiara-lightgold text-black font-medium"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="mt-4 text-gray-500 text-sm">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from Tiara Mobile Zone.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
