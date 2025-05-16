import React, { createContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { CartItem, Product } from '@shared/schema';

interface CartContextType {
  items: CartItem[];
  cartId: number | null;
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  addItem: (product: Product, quantity: number, size?: string, color?: string) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  isLoading: boolean;
}

export const CartContext = createContext<CartContextType>({
  items: [],
  cartId: null,
  isOpen: false,
  totalItems: 0,
  subtotal: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  openCart: () => {},
  closeCart: () => {},
  isLoading: false,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Calculate total items and subtotal
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => {
    const price = item.productDetails?.price || 0;
    return total + (price * item.quantity);
  }, 0);

  // Initialize cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // For demo, use a fixed user ID. In a real app, get this from auth context
        const userId = 1;
        const response = await fetch(`/api/cart/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }
        
        const data = await response.json();
        setItems(data.items || []);
        setCartId(data.id || null);
      } catch (error) {
        console.error('Error fetching cart:', error);
        toast({
          title: "Error",
          description: "Failed to load your cart. Please try again.",
          variant: "destructive",
        });
      }
    };
    
    fetchCart();
  }, [toast]);

  // Save cart to server whenever items change
  useEffect(() => {
    const saveCart = async () => {
      if (!cartId) return;
      
      try {
        setIsLoading(true);
        await apiRequest('PUT', `/api/cart/${cartId}`, { items });
      } catch (error) {
        console.error('Error saving cart:', error);
        toast({
          title: "Error",
          description: "Failed to update your cart. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (items.length > 0 && cartId) {
      saveCart();
    }
  }, [items, cartId, toast]);

  const addItem = (product: Product, quantity: number, size?: string, color?: string) => {
    setItems(prevItems => {
      // Check if the item is already in the cart
      const existingItemIndex = prevItems.findIndex(item => 
        item.productId === product.id && 
        item.size === size && 
        item.color === color
      );
      
      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Cart updated",
          description: `Updated quantity of ${product.name}`,
        });
        
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        const newItem: CartItem = {
          productId: product.id,
          quantity,
          size,
          color,
          productDetails: product,
        };
        
        toast({
          title: "Item added",
          description: `${product.name} has been added to your cart`,
        });
        
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (productId: number) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.productId !== productId);
      
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
      
      return updatedItems;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.productId === productId) {
          return { ...item, quantity };
        }
        return item;
      });
      
      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        cartId,
        isOpen,
        totalItems,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
