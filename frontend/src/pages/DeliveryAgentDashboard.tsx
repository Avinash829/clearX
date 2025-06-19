
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Layout from '@/components/Layout';

const DeliveryAgentDashboard = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const stats = [
    { title: "Today's Earnings", value: '₹1,250', change: '+15%', color: 'text-green-600', icon: '💰' },
    { title: 'Active Deliveries', value: '3', change: '+1', color: 'text-blue-600', icon: '🚚' },
    { title: 'Pending Pickups', value: '2', change: 'Same', color: 'text-orange-600', icon: '📦' },
    { title: 'Completed Today', value: '8', change: '+3', color: 'text-purple-600', icon: '✅' }
  ];

  const orders = [
    { 
      id: 'ORD001', 
      address: '123 MG Road, Pune', 
      distance: '2.5 km',
      eta: '15 mins', 
      status: 'picked_up',
      customer: 'Rahul Sharma',
      phone: '+91 98765 43210',
      amount: '₹285',
      items: 3
    },
    { 
      id: 'ORD002', 
      address: '456 FC Road, Pune', 
      distance: '1.8 km',
      eta: '20 mins', 
      status: 'ready_for_pickup',
      customer: 'Priya Patel',
      phone: '+91 87654 32109',
      amount: '₹120',
      items: 2
    },
    { 
      id: 'ORD003', 
      address: '789 Camp Area, Pune', 
      distance: '3.2 km',
      eta: '25 mins', 
      status: 'pending',
      customer: 'Amit Kumar',
      phone: '+91 76543 21098',
      amount: '₹450',
      items: 5
    }
  ];

  const notifications = [
    { id: 1, message: 'New pickup request for ORD004', time: '2 mins ago', type: 'new' },
    { id: 2, message: 'Customer updated delivery address for ORD001', time: '5 mins ago', type: 'update' },
    { id: 3, message: 'Payment received for ORD005', time: '10 mins ago', type: 'payment' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'picked_up': return 'bg-blue-100 text-blue-800';
      case 'ready_for_pickup': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'picked_up': return 'Picked Up';
      case 'ready_for_pickup': return 'Ready for Pickup';
      case 'pending': return 'Pending';
      case 'delivered': return 'Delivered';
      default: return 'Unknown';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Delivery Dashboard</h1>
            <p className="text-gray-600">Manage your deliveries and track earnings</p>
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
                    <div className="flex flex-col items-end">
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className={`text-sm font-medium ${stat.color}`}>
                        {stat.change}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Orders Table */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Active Orders</CardTitle>
                  <CardDescription>Manage pickups and deliveries</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Distance</TableHead>
                        <TableHead>ETA</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.address}</TableCell>
                          <TableCell>{order.distance}</TableCell>
                          <TableCell>{order.eta}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                View
                              </Button>
                              {order.status === 'ready_for_pickup' && (
                                <Button size="sm" className="bg-eco-green hover:bg-eco-dark">
                                  Pickup
                                </Button>
                              )}
                              {order.status === 'picked_up' && (
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  Deliver
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Map Section */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Live Route Map</CardTitle>
                  <CardDescription>Optimized delivery routes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <p className="text-gray-600 mb-4">Interactive map with route optimization</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-3 rounded">
                        <p className="font-medium">Current Location</p>
                        <p className="text-gray-600">FC Road, Pune</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="font-medium">Next Delivery</p>
                        <p className="text-gray-600">MG Road, Pune</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Latest updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Earnings Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Summary</CardTitle>
                  <CardDescription>This week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Monday</span>
                      <span className="font-medium">₹850</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tuesday</span>
                      <span className="font-medium">₹920</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Wednesday</span>
                      <span className="font-medium">₹1,100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Thursday</span>
                      <span className="font-medium">₹1,250</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total</span>
                        <span className="text-eco-green">₹4,120</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full" variant="outline">
                      Go Online/Offline
                    </Button>
                    <Button className="w-full" variant="outline">
                      Emergency Support
                    </Button>
                    <Button className="w-full" variant="outline">
                      Payment History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Order Details</h3>
                  <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
                    ✕
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-medium">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium">{selectedOrder.customer}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Address</p>
                    <p className="font-medium">{selectedOrder.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-medium">{selectedOrder.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Items</p>
                      <p className="font-medium">{selectedOrder.items} items</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <Button variant="outline" className="flex-1">
                    Call Customer
                  </Button>
                  <Button className="flex-1 bg-eco-green hover:bg-eco-dark">
                    Start Navigation
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

export default DeliveryAgentDashboard;
