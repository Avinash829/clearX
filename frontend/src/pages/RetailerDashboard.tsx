import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Layout from '@/components/Layout';
import { useToast } from '@/components/ui/use-toast';
import { Upload } from 'lucide-react';

const RetailerDashboard = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    stock: '',
    expiry: '',
    image: ''
  });
  const [addForm, setAddForm] = useState({
    name: '',
    price: '',
    stock: '',
    expiry: '',
    image: ''
  });
  const { toast } = useToast();
  
  const stats = [
    { title: 'Total Sales', value: '₹45,230', change: '+12%', color: 'text-green-600' },
    { title: 'Low Stock Items', value: '8', change: '+2', color: 'text-red-600' },
    { title: 'Active Products', value: '156', change: '+5', color: 'text-blue-600' },
    { title: 'Orders Today', value: '23', change: '+8', color: 'text-purple-600' }
  ];

  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Fresh Apples', 
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100&h=100&fit=crop', 
      price: '₹120', 
      stock: 25, 
      expiry: '2025-01-15', 
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Bread Loaves', 
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop', 
      price: '₹35', 
      stock: 5, 
      expiry: '2025-01-10', 
      status: 'Low Stock' 
    },
    { 
      id: 3, 
      name: 'Milk Packets', 
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop', 
      price: '₹55', 
      stock: 15, 
      expiry: '2025-01-12', 
      status: 'Active' 
    },
    { 
      id: 4, 
      name: 'Bananas', 
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100&h=100&fit=crop', 
      price: '₹80', 
      stock: 30, 
      expiry: '2025-01-14', 
      status: 'Active' 
    },
    { 
      id: 5, 
      name: 'Chicken', 
      image: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=100&h=100&fit=crop', 
      price: '₹250', 
      stock: 2, 
      expiry: '2025-01-11', 
      status: 'Critical' 
    }
  ]);

  const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 5500 }
  ];

  const handleImageUpload = (event, isEdit = false) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        if (isEdit) {
          setEditForm({...editForm, image: imageUrl});
        } else {
          setAddForm({...addForm, image: imageUrl});
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: product.price.replace('₹', ''),
      stock: product.stock.toString(),
      expiry: product.expiry,
      image: product.image
    });
  };

  const handleSaveEdit = () => {
    const updatedProducts = products.map(product => {
      if (product.id === editingProduct.id) {
        const updatedStock = parseInt(editForm.stock);
        let status = 'Active';
        if (updatedStock < 5) {
          status = updatedStock < 3 ? 'Critical' : 'Low Stock';
        }
        
        return {
          ...product,
          name: editForm.name,
          price: `₹${editForm.price}`,
          stock: updatedStock,
          expiry: editForm.expiry,
          status: status,
          image: editForm.image
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    setEditingProduct(null);
    setEditForm({ name: '', price: '', stock: '', expiry: '', image: '' });
    
    toast({
      title: "Product Updated",
      description: "Product details have been successfully updated.",
    });
  };

  const handleAddProduct = () => {
    if (!addForm.name || !addForm.price || !addForm.stock || !addForm.expiry) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newProduct = {
      id: products.length + 1,
      name: addForm.name,
      price: `₹${addForm.price}`,
      stock: parseInt(addForm.stock),
      expiry: addForm.expiry,
      image: addForm.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop',
      status: parseInt(addForm.stock) < 5 ? (parseInt(addForm.stock) < 3 ? 'Critical' : 'Low Stock') : 'Active'
    };

    setProducts([...products, newProduct]);
    setAddForm({ name: '', price: '', stock: '', expiry: '', image: '' });
    setShowAddProduct(false);

    toast({
      title: "Product Added",
      description: "New product has been successfully added.",
    });
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    
    toast({
      title: "Product Deleted",
      description: "Product has been successfully deleted.",
      variant: "destructive",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Retailer Dashboard</h1>
            <p className="text-gray-600">Manage your inventory and track sales</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`text-sm font-medium ${stat.color}`}>
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products Table */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Product Inventory</CardTitle>
                      <CardDescription>Manage your products and stock levels</CardDescription>
                    </div>
                    <Button 
                      onClick={() => setShowAddProduct(true)}
                      className="bg-eco-green hover:bg-eco-dark"
                    >
                      Add Product
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Expiry</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              product.stock < 5 ? 'bg-red-100 text-red-800' :
                              product.stock < 10 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {product.stock}
                            </span>
                          </TableCell>
                          <TableCell>{product.expiry}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              product.status === 'Critical' ? 'bg-red-100 text-red-800' :
                              product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {product.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditProduct(product)}
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-600"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Sales Chart */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>Monthly sales performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{data.month}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-eco-green h-2 rounded-full" 
                              style={{ width: `${(data.sales / 6000) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">₹{data.sales}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">#ORD001</p>
                        <p className="text-sm text-gray-600">2 items • ₹175</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Completed
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">#ORD002</p>
                        <p className="text-sm text-gray-600">1 item • ₹120</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Processing
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">#ORD003</p>
                        <p className="text-sm text-gray-600">3 items • ₹285</p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Pending
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Add Product Modal */}
          {showAddProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <Input 
                      placeholder="Enter product name"
                      value={addForm.name}
                      onChange={(e) => setAddForm({...addForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <Input 
                      placeholder="₹0"
                      type="number"
                      value={addForm.price}
                      onChange={(e) => setAddForm({...addForm, price: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                    <Input 
                      placeholder="0" 
                      type="number"
                      value={addForm.stock}
                      onChange={(e) => setAddForm({...addForm, stock: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <Input 
                      type="date"
                      value={addForm.expiry}
                      onChange={(e) => setAddForm({...addForm, expiry: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Input 
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, false)}
                          className="hidden"
                          id="add-image-upload"
                        />
                        <label 
                          htmlFor="add-image-upload"
                          className="flex items-center justify-center w-full h-10 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          <span className="text-sm">Upload Image</span>
                        </label>
                      </div>
                      {addForm.image && (
                        <img 
                          src={addForm.image} 
                          alt="Preview" 
                          className="w-16 h-16 object-cover rounded border"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button variant="outline" onClick={() => {
                    setShowAddProduct(false);
                    setAddForm({ name: '', price: '', stock: '', expiry: '', image: '' });
                  }}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-eco-green hover:bg-eco-dark" 
                    onClick={handleAddProduct}
                  >
                    Add Product
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Product Modal */}
          {editingProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <Input 
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      placeholder="Enter product name" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <Input 
                      value={editForm.price}
                      onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                      placeholder="0" 
                      type="number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                    <Input 
                      value={editForm.stock}
                      onChange={(e) => setEditForm({...editForm, stock: e.target.value})}
                      placeholder="0" 
                      type="number" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <Input 
                      value={editForm.expiry}
                      onChange={(e) => setEditForm({...editForm, expiry: e.target.value})}
                      type="date" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Input 
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, true)}
                          className="hidden"
                          id="edit-image-upload"
                        />
                        <label 
                          htmlFor="edit-image-upload"
                          className="flex items-center justify-center w-full h-10 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          <span className="text-sm">Change Image</span>
                        </label>
                      </div>
                      {editForm.image && (
                        <img 
                          src={editForm.image} 
                          alt="Preview" 
                          className="w-16 h-16 object-cover rounded border"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditingProduct(null);
                      setEditForm({ name: '', price: '', stock: '', expiry: '', image: '' });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-eco-green hover:bg-eco-dark" 
                    onClick={handleSaveEdit}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RetailerDashboard;
