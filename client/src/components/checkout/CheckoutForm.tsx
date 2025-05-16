import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { formatPrice } from '@/lib/utils';
import { useLocation } from 'wouter';

// Checkout form schema
const checkoutSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  additionalNotes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutForm: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate totals
  const shippingCost = subtotal >= 199900 ? 0 : 9900; // Free shipping over ₹1999
  const totalAmount = subtotal + shippingCost;

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: '',
      state: '',
      postalCode: '',
      paymentMethod: 'cod',
      additionalNotes: '',
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    if (items.length === 0) {
      toast({
        title: 'Your cart is empty',
        description: 'Please add some items to your cart before checkout.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create order object
      const orderData = {
        userId: user?.id || null,
        items: items,
        status: 'pending',
        totalAmount,
        shippingAddress: {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          address: values.address,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          additionalNotes: values.additionalNotes,
        },
        paymentMethod: values.paymentMethod,
      };
      
      // Submit order to API
      await apiRequest('POST', '/api/orders', orderData);
      
      // Show success message
      toast({
        title: 'Order placed successfully!',
        description: 'Thank you for your purchase.',
      });
      
      // Clear cart
      clearCart();
      
      // Redirect to success page (or can implement a proper order confirmation page)
      setLocation('/');
    } catch (error) {
      console.error('Failed to place order:', error);
      toast({
        title: 'Failed to place order',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Checkout Form */}
      <div className="lg:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your complete address" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="delhi">Delhi</SelectItem>
                              <SelectItem value="maharashtra">Maharashtra</SelectItem>
                              <SelectItem value="karnataka">Karnataka</SelectItem>
                              <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                              <SelectItem value="telangana">Telangana</SelectItem>
                              <SelectItem value="gujarat">Gujarat</SelectItem>
                              <SelectItem value="westbengal">West Bengal</SelectItem>
                              <SelectItem value="uttarpradesh">Uttar Pradesh</SelectItem>
                              <SelectItem value="rajasthan">Rajasthan</SelectItem>
                              <SelectItem value="punjab">Punjab</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your postal code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Payment Method</h2>
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-3"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="cod" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Cash on Delivery
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="card" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Credit/Debit Card
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="upi" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            UPI Payment
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any special instructions for delivery" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full py-6 bg-primary text-white hover:bg-primary/90 font-accent font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'PLACE ORDER'}
            </Button>
          </form>
        </Form>
      </div>
      
      {/* Order Summary */}
      <div className="bg-neutral-light p-6 rounded-lg h-fit">
        <h2 className="text-2xl font-heading font-bold mb-4">Order Summary</h2>
        
        {/* Items */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="flex py-2 border-b">
              <div className="w-16 h-16 bg-white rounded overflow-hidden">
                <img 
                  src={item.productDetails?.imageUrls[0]} 
                  alt={item.productDetails?.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3 flex-grow">
                <h4 className="font-medium">{item.productDetails?.name}</h4>
                <p className="text-xs text-neutral-dark/70">
                  {item.size && `Size: ${item.size}`} 
                  {item.size && item.color && ' | '} 
                  {item.color && `Color: ${item.color}`}
                </p>
                <div className="flex justify-between mt-1">
                  <span className="text-sm">Qty: {item.quantity}</span>
                  <span className="font-semibold">
                    {formatPrice((item.productDetails?.price || 0) * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Totals */}
        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span>
            <span>{formatPrice(totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
