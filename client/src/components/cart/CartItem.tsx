import React from 'react';
import { formatPrice } from '@/lib/utils';
import { CartItem as CartItemType } from '@shared/schema';
import { useCart } from '@/hooks/useCart';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { productDetails, quantity, size, color } = item;

  if (!productDetails) {
    return null;
  }

  const incrementQuantity = () => {
    updateQuantity(item.productId, quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      updateQuantity(item.productId, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(item.productId);
  };

  return (
    <div className="flex py-4 border-b">
      {/* Product Image */}
      <div className="w-20 h-24 rounded overflow-hidden">
        <img 
          src={productDetails.imageUrls[0]} 
          alt={productDetails.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product Info */}
      <div className="ml-4 flex-grow">
        <h4 className="font-heading font-semibold">{productDetails.name}</h4>
        <p className="text-sm text-neutral-dark/70">
          {size && `Size: ${size}`} 
          {size && color && ' | '} 
          {color && `Color: ${color}`}
        </p>
        
        <div className="flex justify-between items-center mt-2">
          {/* Quantity Controls */}
          <div className="flex items-center border rounded">
            <button 
              className="px-2 py-1 text-neutral-dark"
              onClick={decrementQuantity}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-2 py-1 text-sm">{quantity}</span>
            <button 
              className="px-2 py-1 text-neutral-dark"
              onClick={incrementQuantity}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          
          {/* Price */}
          <span className="font-accent font-semibold">
            {formatPrice(productDetails.price * quantity)}
          </span>
        </div>
      </div>
      
      {/* Remove Button */}
      <button 
        className="ml-2 text-neutral-dark/50 hover:text-primary self-start"
        onClick={handleRemove}
        aria-label="Remove item"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default CartItem;
