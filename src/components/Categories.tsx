
import { Smartphone, Headphones, CircleCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    id: 'mobiles',
    name: 'Mobile Phones',
    icon: Smartphone,
    description: 'Latest smartphones from top brands',
    path: '/mobiles',
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: Headphones,
    description: 'Enhance your mobile experience',
    path: '/accessories',
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const WhyChooseUs = [
  {
    title: "Premium Products",
    description: "Carefully selected range of high-quality devices"
  },
  {
    title: "Expert Support",
    description: "Get guidance from our knowledgeable team"
  },
  {
    title: "Fast Delivery",
    description: "Quick shipping to your doorstep"
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Categories */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore Our Categories</h2>
          <div className="h-1 w-20 bg-tiara-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CATEGORIES.map((category) => (
            <Link 
              to={category.path} 
              key={category.id} 
              className="category-card group"
            >
              <div className="relative overflow-hidden rounded-xl">
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
                
                {/* Category image */}
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="flex items-center gap-3 mb-2">
                    <category.icon className="h-6 w-6 text-tiara-gold" />
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  </div>
                  <p className="text-gray-300">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Why Choose Us section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Tiara</h2>
            <div className="h-1 w-20 bg-tiara-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WhyChooseUs.map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-tiara-gold transition-colors"
              >
                <div className="flex justify-center mb-4">
                  <CircleCheck className="h-12 w-12 text-tiara-gold" />
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-2">{item.title}</h3>
                <p className="text-gray-400 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
