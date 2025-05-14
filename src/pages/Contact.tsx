import { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type FormValues = z.infer<typeof formSchema>;

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });
  
  // Handle form submission
  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log('Form submitted:', data);
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      
      // Reset the form
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 md:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Get In Touch
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Have questions or feedback? We'd love to hear from you. Fill out the form below 
            or reach out through any of our contact channels.
          </p>
        </div>
      </section>
      
      {/* Main Content with Form and Contact Info */}
      <section className="py-12 px-4 md:px-6 flex-grow">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-900 rounded-lg p-6 md:p-8 shadow-xl border border-gray-800 animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-6">
                Send Us a <span className="text-tiara-gold">Message</span>
              </h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your email address" 
                            {...field}
                            className="bg-gray-800 border-gray-700 text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="What is this about?" 
                            {...field}
                            className="bg-gray-800 border-gray-700 text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message" 
                            {...field}
                            className="bg-gray-800 border-gray-700 text-white min-h-[150px]" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    className="w-full bg-tiara-gold text-black hover:bg-tiara-lightgold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-gray-900 rounded-lg p-6 md:p-8 shadow-xl border border-gray-800 animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Contact <span className="text-tiara-gold">Information</span>
                </h2>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="bg-tiara-gold/10 rounded-full p-3 mt-1">
                      <Phone className="h-5 w-5 text-tiara-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Phone</h3>
                      <p className="text-gray-400">
                        <a href="tel:+911234567890" className="hover:text-tiara-gold transition-colors">
                          +91 1234 567 890
                        </a>
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Monday - Saturday, 9am - 8pm
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <div className="bg-tiara-gold/10 rounded-full p-3 mt-1">
                      <Mail className="h-5 w-5 text-tiara-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Email</h3>
                      <p className="text-gray-400">
                        <a href="mailto:contact@tiaramobile.com" className="hover:text-tiara-gold transition-colors">
                          contact@tiaramobile.com
                        </a>
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <div className="bg-tiara-gold/10 rounded-full p-3 mt-1">
                      <MapPin className="h-5 w-5 text-tiara-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Address</h3>
                      <p className="text-gray-400">
                        123 Tech Avenue, <br />
                        Electronics Market, <br />
                        Mumbai - 400001, India
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Social Media */}
              <div className="bg-gray-900 rounded-lg p-6 md:p-8 shadow-xl border border-gray-800 animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Connect With <span className="text-tiara-gold">Us</span>
                </h2>
                
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="bg-tiara-gold/10 hover:bg-tiara-gold/20 rounded-full p-4 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-6 w-6 text-tiara-gold" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-tiara-gold/10 hover:bg-tiara-gold/20 rounded-full p-4 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-6 w-6 text-tiara-gold" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-tiara-gold/10 hover:bg-tiara-gold/20 rounded-full p-4 transition-colors"
                    aria-label="Phone"
                  >
                    <Phone className="h-6 w-6 text-tiara-gold" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mt-12 rounded-lg overflow-hidden border border-gray-800 h-80 animate-fade-in">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1675099113037!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Tiara Mobile Zone Location"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* FAQ Section (Optional) */}
      <section className="py-12 px-4 md:px-6 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Frequently Asked <span className="text-tiara-gold">Questions</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold text-white mb-2">What are your business hours?</h3>
              <p className="text-gray-400">
                Our online store is available 24/7. Our physical store is open Monday through Saturday, 
                9:00 AM to 8:00 PM. We are closed on major holidays.
              </p>
            </div>
            
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold text-white mb-2">Do you offer product warranties?</h3>
              <p className="text-gray-400">
                Yes, all our products come with standard manufacturer warranties. Some products have 
                extended warranty options which you can select during checkout.
              </p>
            </div>
            
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold text-white mb-2">What is your return policy?</h3>
              <p className="text-gray-400">
                We offer a 7-day return policy for most items in original, unused condition with 
                original packaging. Some exceptions apply for certain product categories.
              </p>
            </div>
            
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold text-white mb-2">Do you ship internationally?</h3>
              <p className="text-gray-400">
                Currently, we only ship within India. We're working on expanding our shipping options to 
                international destinations soon.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
