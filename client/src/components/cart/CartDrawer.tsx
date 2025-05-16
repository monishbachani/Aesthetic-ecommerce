import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import CartItem from './CartItem';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Link } from 'wouter';
import { formatPrice } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const CartDrawer: React.FC = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    totalItems, 
    subtotal,
    isLoading 
  } = useCart();

  const drawerVariants = {
    hidden: { 
      x: '100%', 
      transition: { 
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3
      }
    },
    visible: { 
      x: 0, 
      transition: { 
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            className="fixed inset-0 bg-black/50 z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeCart}
          />

          {/* Cart Drawer */}
          <motion.div 
            className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl z-50 flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <div className="py-4 px-6 border-b flex justify-between items-center">
              <h3 className="font-heading font-bold text-xl">
                Your Shopping Bag ({totalItems})
              </h3>
              <Button variant="ghost" size="icon" onClick={closeCart} aria-label="Close cart">
                <X size={20} />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto py-4 px-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg className="w-16 h-16 text-neutral-light mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h4 className="font-heading font-semibold text-lg mb-2">Your bag is empty</h4>
                  <p className="text-neutral-dark/70 mb-6">Looks like you haven't added any items to your bag yet.</p>
                  <Button 
                    onClick={closeCart}
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                items.map(item => (
                  <CartItem key={`${item.productId}-${item.size}-${item.color}`} item={item} />
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="py-4 px-6 border-t">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span className="font-accent font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm text-neutral-dark/70">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <div className="mt-4">
                  <Link href="/checkout" onClick={closeCart}>
                    <Button className="w-full py-6 bg-primary text-white hover:bg-primary/90 font-accent font-semibold">
                      CHECKOUT
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full py-6 mt-2 border border-primary text-primary font-accent font-semibold hover:bg-primary hover:text-white transition-colors"
                    onClick={closeCart}
                  >
                    CONTINUE SHOPPING
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
