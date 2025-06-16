import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export interface StockItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  os: 'Android' | 'iOS';
  features: string; // JSON string in the database
  image: string;
  images?: string[] | null; // Change type to optional array of strings or null
  rating: number;
  reviews: number;
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isHot?: boolean;
  type: 'mobile' | 'accessory';
  category: string; // Add category property
}

const API_URL = 'http://localhost:3001/api';

const Admin = () => {
  const [items, setItems] = useState<StockItem[]>([]);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'mobile' | 'accessory'>('mobile');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/stock`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleCreate = async (item: Omit<StockItem, 'id'>) => {
    try {
      const response = await fetch(`${API_URL}/stock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        fetchItems();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleUpdate = async (id: number, item: Partial<StockItem>) => {
    try {
      const response = await fetch(`${API_URL}/stock/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        fetchItems();
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`${API_URL}/stock/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchItems();
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const filteredItems = items.filter(item => item.type === selectedType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <NavBar />
      <main className="flex-1 flex flex-col items-center justify-start pt-32 pb-16 px-2 md:px-0">
        <div className="w-full max-w-6xl">
          <Tabs value={selectedType} onValueChange={v => setSelectedType(v as 'mobile' | 'accessory')} className="mb-8">
            <TabsList className="bg-gray-800 border border-gray-700">
              <TabsTrigger value="mobile" className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white">Mobiles</TabsTrigger>
              <TabsTrigger value="accessory" className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white">Accessories</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Stock Management</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg text-lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Add New Item
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 text-white border border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Stock Item</DialogTitle>
                </DialogHeader>
                <StockItemForm onSubmit={handleCreate} initialType={selectedType} />
                <div ref={(node) => { if (node) node.focus(); }} tabIndex={-1} aria-hidden="true" />
              </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editingItem} onOpenChange={(open) => { if (!open) setEditingItem(null); }}>
              <DialogContent className="bg-gray-900 text-white border border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Edit Stock Item</DialogTitle>
                </DialogHeader>
                {editingItem && (
                  <StockItemForm
                    initialData={editingItem}
                    onSubmit={(data) => {
                      handleUpdate(editingItem.id, data);
                    }}
                    initialType={editingItem.type as 'mobile' | 'accessory'}
                  />
                )}
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-700">
            <Table className="text-white">
              <TableHeader className="bg-gray-800">
                <TableRow>
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Brand</TableHead>
                  <TableHead className="text-gray-300">Price</TableHead>
                  <TableHead className="text-gray-300">Stock</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-gray-500 text-lg">
                      No stock items found. Click <span className="font-semibold text-blue-400">"Add New Item"</span> to get started!
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-800">
                      <TableCell className="py-4 text-white">{item.name}</TableCell>
                      <TableCell className="py-4 text-white">{item.brand}</TableCell>
                      <TableCell className="py-4 text-tiara-gold font-bold">₹{item.price.toLocaleString()}</TableCell>
                      <TableCell className="py-4 text-white">{item.stockCount}</TableCell>
                      <TableCell className="py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.inStock ? 'bg-green-700 text-green-200' : 'bg-red-700 text-red-200'}`}>
                          {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-white hover:bg-gray-800"
                            onClick={() => setEditingItem(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-white hover:bg-gray-800"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface StockItemFormProps {
  onSubmit: (item: Omit<StockItem, 'id'>) => void;
  initialData?: Partial<StockItem>;
  initialType?: 'mobile' | 'accessory';
}

const StockItemForm = ({ onSubmit, initialData, initialType = 'mobile' }: StockItemFormProps) => {
  const [formData, setFormData] = useState<Partial<StockItem>>({
    name: '',
    brand: '',
    price: 0,
    stockCount: 0,
    type: initialData?.type || initialType,
    os: undefined, // Initialize os as undefined or a default if applicable
    image: '',
    rating: 0, // Add default for rating
    reviews: 0, // Add default for reviews
    inStock: true, // Add default for inStock
    ...(initialData || {}),
  });

  // Images array state for gallery
  const [images, setImages] = useState<string[]>(
    (initialData && Array.isArray((initialData as any).images))
      ? ((initialData as any).images as string[])
      : initialData?.image
        ? [initialData.image]
        : ['']
  );

  // Structured features: [{label: 'RAM', value: '8GB'}, ...]
  const [specs, setSpecs] = useState<{label: string, value: string}[]>(() => {
    try {
      const arr = JSON.parse(initialData?.features || '[]');
      if (Array.isArray(arr) && arr.length && typeof arr[0] === 'object') return arr;
      return [];
    } catch {
      return [];
    }
  });
  const [specLabel, setSpecLabel] = useState('');
  const [specValue, setSpecValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save button clicked, form submitted');
    const submitData = {
      ...formData,
      features: JSON.stringify(specs),
      images,
      image: images[0] || '',
      rating: formData.rating || 0, // Ensure rating is included
      reviews: formData.reviews || 0, // Ensure reviews is included
      inStock: formData.inStock ?? true, // Ensure inStock is included, default to true
      stockCount: formData.stockCount ?? 0, // Ensure stockCount is included, default to 0
    };
    onSubmit(submitData as Omit<StockItem, 'id'>);
  };

  const addSpec = () => {
    if (specLabel.trim() && specValue.trim()) {
      setSpecs(prev => [...prev, { label: specLabel.trim(), value: specValue.trim() }]);
      setSpecLabel('');
      setSpecValue('');
    }
  };

  const removeSpec = (index: number) => {
    setSpecs(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value: 'mobile' | 'accessory') => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger className="text-white bg-gray-800 border-gray-700 focus:border-blue-500">
              <SelectValue placeholder="Select Type" className="text-white" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="accessory">Accessory</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            className="text-white bg-gray-800 placeholder-gray-400 border-gray-700 focus:border-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            className="text-white bg-gray-800 placeholder-gray-400 border-gray-700 focus:border-blue-500"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            required
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            className="text-white bg-gray-800 placeholder-gray-400 border-gray-700 focus:border-blue-500"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
        </div>
        {formData.type === 'mobile' && (
          <div className="space-y-3">
            <Label htmlFor="os">Operating System</Label>
            <Select
              value={formData.os}
              onValueChange={(value: 'Android' | 'iOS') => setFormData({ ...formData, os: value })}
            >
              <SelectTrigger className="text-white bg-gray-800 border-gray-700 focus:border-blue-500">
                <SelectValue placeholder="Select OS" className="text-white" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Android">Android</SelectItem>
                <SelectItem value="iOS">iOS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="space-y-3">
          <Label htmlFor="stockCount">Stock Count</Label>
          <Input
            id="stockCount"
            type="number"
            className="text-white bg-gray-800 placeholder-gray-400 border-gray-700 focus:border-blue-500"
            value={formData.stockCount}
            onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-3">
          <Label>Image Gallery</Label>
          <div className="flex flex-col gap-2">
            {images.map((img, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  className="text-white bg-gray-800 placeholder-gray-400 border-gray-700 focus:border-blue-500"
                  value={img}
                  onChange={e => {
                    const newImages = [...images];
                    newImages[idx] = e.target.value;
                    setImages(newImages);
                  }}
                  placeholder={`Image URL #${idx + 1}`}
                  required={idx === 0}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="bg-gray-700 text-white border-gray-700 hover:bg-gray-600"
                  onClick={() => setImages(images.filter((_, i) => i !== idx))}
                  disabled={images.length === 1}
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              className="w-fit bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
              onClick={() => setImages([...images, ''])}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Image
            </Button>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 space-y-3">
          <Label>Specs</Label>
          <div className="flex gap-2">
            <Input
              className="text-white bg-gray-800 placeholder-gray-400 border-gray-700 focus:border-blue-500"
              value={specLabel}
              onChange={e => setSpecLabel(e.target.value)}
              placeholder="Label (e.g. RAM)"
            />
            <Input
              className="text-white bg-gray-800 placeholder-gray-400 border-gray-700 focus:border-blue-500"
              value={specValue}
              onChange={e => setSpecValue(e.target.value)}
              placeholder="Value (e.g. 8GB)"
            />
            <Button type="button" onClick={addSpec}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {specs.map((spec, index) => (
              <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                <span className="font-semibold text-black">{spec.label}:</span>
                <span className="text-black">{spec.value}</span>
                <button type="button" onClick={() => removeSpec(index)} className="text-gray-500 hover:text-gray-700"><X className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="submit" className="px-6 py-2 text-lg">
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>
    </form>
  );
};

export default Admin;
