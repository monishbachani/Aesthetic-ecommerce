import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Package, User, Heart, Clock, LogOut } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { formatPrice } from '@/lib/utils';

const Account: React.FC = () => {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  // Determine active tab from URL
  const queryParams = new URLSearchParams(location.split('?')[1] || '');
  const initialTab = queryParams.get('view') || 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // User form state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setLocation(`/account?view=${value}`);
  };
  
  // Fetch user orders
  const { 
    data: orders = [], 
    isLoading: isOrdersLoading 
  } = useQuery({
    queryKey: ['/api/orders', user?.id],
    enabled: isAuthenticated && !!user?.id,
  });
  
  // Update user profile
  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) return;
    
    setIsSubmitting(true);
    try {
      await apiRequest('PUT', `/api/users/${user.id}`, {
        name,
        email,
        phone,
        address
      });
      
      toast({
        title: 'Profile updated',
        description: 'Your profile information has been updated successfully.',
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast({
        title: 'Update failed',
        description: 'Could not update your profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal();
    }
  }, [isAuthenticated, openAuthModal]);
  
  // Update form values when user data changes
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user]);
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center h-48">
          <h1 className="text-2xl font-heading font-semibold mb-4">Please Login to Access Your Account</h1>
          <Button onClick={openAuthModal} className="bg-primary text-white hover:bg-primary/90">
            Login or Register
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Account - Dazzle Fashion</title>
        <meta name="description" content="Manage your Dazzle Fashion account, view orders, wishlists, and update your profile." />
        <meta name="robots" content="noindex" /> {/* Don't index private account pages */}
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">My Account</h1>
          <Button variant="outline" onClick={logout} className="mt-4 md:mt-0 flex items-center gap-2">
            <LogOut size={16} /> Logout
          </Button>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="w-full justify-start mb-8 overflow-x-auto scrollbar-hide">
            <TabsTrigger 
              value="profile" 
              className="flex items-center gap-2 py-2 px-4 text-base"
            >
              <User size={16} /> Profile
            </TabsTrigger>
            <TabsTrigger 
              value="orders" 
              className="flex items-center gap-2 py-2 px-4 text-base"
            >
              <Package size={16} /> Orders
            </TabsTrigger>
            <TabsTrigger 
              value="wishlist" 
              className="flex items-center gap-2 py-2 px-4 text-base"
            >
              <Heart size={16} /> Wishlist
            </TabsTrigger>
            <TabsTrigger 
              value="track" 
              className="flex items-center gap-2 py-2 px-4 text-base"
            >
              <Clock size={16} /> Track Order
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="pt-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-heading font-semibold mb-6">Your Profile</h2>
              <form onSubmit={updateProfile} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    type="email"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <Textarea 
                    id="address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your complete address"
                    rows={4}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-6 bg-primary text-white hover:bg-primary/90 font-accent font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                    </>
                  ) : 'Save Changes'}
                </Button>
              </form>
            </div>
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders" className="pt-4">
            <h2 className="text-2xl font-heading font-semibold mb-6">Your Orders</h2>
            
            {isOrdersLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12 bg-neutral-light rounded-lg">
                <Package className="h-12 w-12 mx-auto text-neutral-dark/50 mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-2">No Orders Yet</h3>
                <p className="text-neutral-dark/70 mb-6">You haven't placed any orders yet.</p>
                <Button 
                  onClick={() => setLocation('/collections')} 
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-neutral-light p-4 flex flex-wrap items-center justify-between">
                      <div>
                        <span className="text-sm text-neutral-dark/70">Order ID:</span>
                        <span className="font-medium ml-2">#{order.id}</span>
                      </div>
                      <div>
                        <span className="text-sm text-neutral-dark/70">Date:</span>
                        <span className="font-medium ml-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-neutral-dark/70">Status:</span>
                        <span className={`font-medium ml-2 ${
                          order.status === 'completed' ? 'text-green-600' :
                          order.status === 'processing' ? 'text-amber-600' :
                          order.status === 'cancelled' ? 'text-red-600' :
                          'text-primary'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-neutral-dark/70">Total:</span>
                        <span className="font-medium ml-2">{formatPrice(order.totalAmount)}</span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-medium mb-2">Items</h4>
                      <div className="space-y-2">
                        {(order.items as any[]).map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-12 h-12 bg-neutral-light rounded mr-3 overflow-hidden">
                              {item.productDetails?.imageUrls?.[0] && (
                                <img 
                                  src={item.productDetails.imageUrls[0]} 
                                  alt={item.productDetails.name} 
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-grow">
                              <div className="font-medium">{item.productDetails?.name}</div>
                              <div className="text-sm text-neutral-dark/70">
                                Qty: {item.quantity} 
                                {item.size && ` | Size: ${item.size}`}
                                {item.color && ` | Color: ${item.color}`}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="pt-4">
            <div className="text-center py-12 bg-neutral-light rounded-lg">
              <Heart className="h-12 w-12 mx-auto text-neutral-dark/50 mb-4" />
              <h3 className="text-xl font-heading font-semibold mb-2">Your Wishlist is Empty</h3>
              <p className="text-neutral-dark/70 mb-6">Save your favorite items to your wishlist</p>
              <Button 
                onClick={() => setLocation('/collections')} 
                className="bg-primary text-white hover:bg-primary/90"
              >
                Start Shopping
              </Button>
            </div>
          </TabsContent>
          
          {/* Track Order Tab */}
          <TabsContent value="track" className="pt-4">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-heading font-semibold mb-6">Track Your Order</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="order-id" className="block text-sm font-medium mb-1">
                    Order ID
                  </label>
                  <Input id="order-id" placeholder="Enter your order ID" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email address" />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-6 bg-primary text-white hover:bg-primary/90 font-accent font-semibold"
                >
                  Track Order
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Account;
