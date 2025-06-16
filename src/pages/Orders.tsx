import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: number;
  createdAt: string;
  status: string;
  total: number;
  items: OrderItem[];
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userEmail = localStorage.getItem('user_email');
  const userId = localStorage.getItem('user_id');

  if (!userId) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <NavBar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-2xl text-red-400 mb-4">User not found. Please log in again.</div>
          <Button onClick={() => window.location.href = '/login'}>Go to Login</Button>
        </div>
        <Footer />
      </div>
    );
  }

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      setError(null);
      try {
        // You may need to adjust how userId is retrieved
        const res = await fetch(`/api/orders?userId=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching orders');
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchOrders();
  }, [userId]);

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <div className="max-w-4xl mx-auto pt-32 pb-16 px-4">
        <h1 className="text-3xl font-extrabold text-tiara-gold mb-10">Your Orders</h1>
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading orders...</div>
        ) : (orders.length === 0) ? (
          <div className="text-center py-20 text-gray-400">
            <div className="mb-4 text-6xl">📦</div>
            <div className="mb-4">No orders...</div>
            <Button onClick={() => window.location.href = '/mobiles'}>Shop Now</Button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map(order => (
              <Card key={order.id} className="bg-black shadow-2xl border-0 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-shadow">
                <CardContent className="py-6 px-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="mb-2 md:mb-0">
                      <div className="text-lg font-bold text-tiara-gold">Order #{order.id}</div>
                      <div className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-200 text-xs font-semibold uppercase tracking-wide">{order.status}</span>
                      <span className="text-lg font-bold text-white">₹{order.total}</span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-400">
                          <th className="text-left py-2">Item</th>
                          <th className="text-left py-2">Qty</th>
                          <th className="text-left py-2">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map(item => (
                          <tr key={item.id} className="border-b border-gray-800 last:border-0">
                            <td className="py-2 flex items-center gap-3">
                              {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />}
                              <span>{item.name}</span>
                            </td>
                            <td className="py-2">{item.quantity}</td>
                            <td className="py-2">₹{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
} 