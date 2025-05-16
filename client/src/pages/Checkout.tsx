import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'wouter';
import { useCart } from '@/hooks/useCart';
import CheckoutForm from '@/components/checkout/CheckoutForm';

const Checkout: React.FC = () => {
  const { items, totalItems } = useCart();
  const [, setLocation] = useLocation();
  
  // Redirect to home if cart is empty
  useEffect(() => {
    if (totalItems === 0) {
      setLocation('/');
    }
  }, [totalItems, setLocation]);

  if (totalItems === 0) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Checkout - Dazzle Fashion</title>
        <meta name="description" content="Complete your purchase with our secure checkout process." />
        <meta name="robots" content="noindex" /> {/* Don't index checkout pages */}
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">Checkout</h1>
        
        <CheckoutForm />
      </div>
    </>
  );
};

export default Checkout;
