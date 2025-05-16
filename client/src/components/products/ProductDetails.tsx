import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { Product } from '@shared/schema';
import { useCart } from '@/hooks/useCart';
import { Heart, Share2, Star, StarHalf, Truck, Package, ShieldCheck } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [selectedImage, setSelectedImage] = useState(product.imageUrls[0]);
  
  const { addItem } = useCart();
  
  // Calculate discount percentage
  const discountPercentage = product.discountedPrice ? 
    calculateDiscount(product.price, product.discountedPrice) : 0;
    
  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
  };
  
  // Helper to render stars based on rating
  const renderStars = (rating: number | null = 0) => {
    const stars = [];
    const ratingValue = rating || 0;
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="text-accent-gold" size={18} fill="currentColor" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="text-accent-gold" size={18} fill="currentColor" />);
    }
    
    // Add empty stars to make total 5
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300" size={18} />);
    }
    
    return stars;
  };
  
  // Increment and decrement quantity
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Images */}
      <div>
        <div className="mb-4 rounded-lg overflow-hidden">
          <motion.img 
            src={selectedImage} 
            alt={product.name} 
            className="w-full object-contain h-[500px] bg-neutral-light/50"
            style={{ objectPosition: "center 25%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Thumbnail Gallery */}
        {product.imageUrls.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.imageUrls.map((imageUrl, index) => (
              <div 
                key={index}
                className={`rounded overflow-hidden cursor-pointer border-2 ${
                  selectedImage === imageUrl ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(imageUrl)}
              >
                <img 
                  src={imageUrl} 
                  alt={`${product.name} thumbnail ${index + 1}`} 
                  className="w-full h-24 object-contain bg-white"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div>
        {/* Tags */}
        <div className="flex space-x-2 mb-3">
          {product.isNewArrival && (
            <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-accent">
              NEW ARRIVAL
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-accent">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
        
        {/* Product Title */}
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark">
          {product.name}
        </h1>
        
        {/* Rating */}
        <div className="flex items-center mt-3">
          <div className="flex">
            {renderStars(product.averageRating)}
          </div>
          <span className="text-sm text-neutral-dark/60 ml-2">
            {product.reviewCount} reviews
          </span>
        </div>
        
        {/* Price */}
        <div className="mt-4 flex items-baseline">
          <span className="text-2xl font-accent font-semibold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.discountedPrice && (
            <span className="text-neutral-dark/60 line-through ml-2">
              {formatPrice(product.discountedPrice)}
            </span>
          )}
        </div>
        
        {/* Description */}
        <div className="mt-6">
          <p className="text-neutral-dark/80 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        {/* Divider */}
        <div className="my-6 border-t border-neutral-light"></div>
        
        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <h3 className="font-heading font-semibold mb-2">Size</h3>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map(size => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-6">
            <h3 className="font-heading font-semibold mb-2">Color</h3>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {product.colors.map(color => (
                  <SelectItem key={color} value={color}>{color}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {/* Quantity */}
        <div className="mb-6">
          <h3 className="font-heading font-semibold mb-2">Quantity</h3>
          <div className="flex items-center">
            <button
              className="px-3 py-1 border border-neutral-light rounded-l-md bg-neutral-light text-neutral-dark"
              onClick={decrementQuantity}
            >
              -
            </button>
            <span className="px-4 py-1 border-y border-neutral-light text-center min-w-[50px]">
              {quantity}
            </span>
            <button
              className="px-3 py-1 border border-neutral-light rounded-r-md bg-neutral-light text-neutral-dark"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Button 
            onClick={handleAddToCart} 
            className="flex-1 bg-primary text-white hover:bg-primary/90 py-6"
          >
            Add to Cart
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-neutral-light"
          >
            <Heart size={18} /> Wishlist
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-neutral-light"
          >
            <Share2 size={18} /> Share
          </Button>
        </div>
        
        {/* Product Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Truck className="text-primary mr-2" size={20} />
            <span className="text-sm">Free Shipping over ₹1999</span>
          </div>
          <div className="flex items-center">
            <Package className="text-primary mr-2" size={20} />
            <span className="text-sm">Easy Returns</span>
          </div>
          <div className="flex items-center">
            <ShieldCheck className="text-primary mr-2" size={20} />
            <span className="text-sm">Quality Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
