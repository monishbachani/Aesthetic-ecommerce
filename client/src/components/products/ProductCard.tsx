import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { Product } from '@shared/schema';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { Star, StarHalf } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };
  
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement quick view functionality
  };
  
  // Calculate discount percentage
  const discountPercentage = product.discountedPrice ? 
    calculateDiscount(product.price, product.discountedPrice) : 0;
  
  // Render stars based on rating
  const renderStars = (rating: number | null = 0) => {
    const ratingValue = rating || 0;
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="text-accent-gold" size={14} fill="currentColor" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="text-accent-gold" size={14} fill="currentColor" />);
    }
    
    return stars;
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card group rounded-lg overflow-hidden shadow-md bg-white cursor-pointer">
        <div className="relative overflow-hidden">
          <img 
            src={product.imageUrls[0]} 
            alt={product.name} 
            className="w-full h-80 object-contain bg-neutral-light/30 transition-all duration-300"
            style={{ objectPosition: "center 30%" }}
          />
          
          {/* Tags */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNewArrival && (
              <span className="bg-primary text-white text-xs px-3 py-1 rounded-sm font-accent">NEW</span>
            )}
            {product.averageRating && product.averageRating >= 4.5 && (
              <span className="bg-accent-terracotta text-white text-xs px-3 py-1 rounded-sm font-accent">BESTSELLER</span>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <motion.button 
              className="bg-white text-primary p-3 rounded-full mx-2 hover:bg-primary hover:text-white transition-colors"
              onClick={handleAddToCart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag size={16} />
            </motion.button>
            <motion.button 
              className="bg-white text-primary p-3 rounded-full mx-2 hover:bg-primary hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={16} />
            </motion.button>
            <motion.button 
              className="bg-white text-primary p-3 rounded-full mx-2 hover:bg-primary hover:text-white transition-colors"
              onClick={handleQuickView}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye size={16} />
            </motion.button>
          </div>
        </div>
        
        <div className="product-info p-4 transition-transform duration-300">
          <h3 className="font-heading font-semibold text-lg">{product.name}</h3>
          
          <div className="flex items-center mt-1">
            <div className="flex">
              {renderStars(product.averageRating)}
            </div>
            <span className="text-xs text-neutral-dark/60 ml-2">
              ({product.reviewCount} reviews)
            </span>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div>
              <span className="text-primary font-accent font-semibold">
                {formatPrice(product.price)}
              </span>
              {product.discountedPrice && (
                <span className="text-neutral-dark/60 text-sm line-through ml-2">
                  {formatPrice(product.discountedPrice)}
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <div className="text-sm">
                <span className="text-green-600 font-semibold">{discountPercentage}% OFF</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
