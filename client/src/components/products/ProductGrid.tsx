import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '@shared/schema';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <h3 className="text-2xl font-heading font-bold text-neutral-dark/70 mb-4">No Products Found</h3>
        <p className="text-neutral-dark/60">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
