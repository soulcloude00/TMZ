import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const accountOptions = [
  {
    title: "Your Orders",
    description: "Track, return, or buy things again",
    icon: "📦",
    link: "/orders"
  },
  {
    title: "Login & Security",
    description: "Edit login, name, and password",
    icon: "🔒",
    link: "/profile/security"
  },
  {
    title: "Your Addresses",
    description: "Edit addresses for orders and gifts",
    icon: "📍",
    link: "/profile/addresses"
  },
  {
    title: "Payment Options",
    description: "Edit or add payment methods",
    icon: "💳",
    link: "/profile/payments"
  },
  // Add more options as needed
];

const Profile = () => {
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('user_email');
    if (!userEmail) {
      navigate('/login');
    } else {
      setEmail(userEmail);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white py-10">
      <NavBar />
      <div className="max-w-4xl mx-auto mt-20">
        <Card className="mb-10 bg-black shadow-2xl hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-shadow border-0">
          {/* Company Branding */}
          <div className="flex items-center gap-4 mb-8">
            <img
              src="/lovable-uploads/8127c288-f897-45fd-839e-ab9e50c78677.png"
              alt="Tiara Mobile Zone"
              className="h-12"
            />
            <h1 className="text-3xl font-extrabold text-tiara-gold tracking-tight">
              Tiara Mobile Zone <span className="font-light text-white">- Your Account</span>
            </h1>
          </div>

          {/* Back Button */}
          <Button
            onClick={() => navigate('/')}
            variant="secondary"
            className="mb-8 bg-gray-800 text-tiara-gold border border-tiara-gold hover:bg-gray-700"
          >
            <span className="text-lg">←</span> Back to Home
          </Button>

          {/* User Info */}
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-gradient-to-br from-tiara-gold to-yellow-500 text-black rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold shadow border-2 border-tiara-gold">
              {email ? email[0].toUpperCase() : "?"}
            </div>
            <div>
              <div className="font-semibold text-xl text-white">{email}</div>
              <div className="text-gray-400 text-sm">Logged in</div>
            </div>
          </div>

          {/* Account Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {accountOptions.map((opt) => (
              <a
                key={opt.title}
                href={opt.link}
                className="block"
              >
                <Card className="shadow-2xl transition-transform h-full bg-black hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] duration-200 border-0">
                  <CardContent className="flex items-center gap-4 py-6">
                    <span className="text-4xl text-tiara-gold">{opt.icon}</span>
                    <div>
                      <div className="font-semibold text-lg text-tiara-gold">{opt.title}</div>
                      <div className="text-gray-300 text-sm">{opt.description}</div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Profile; 