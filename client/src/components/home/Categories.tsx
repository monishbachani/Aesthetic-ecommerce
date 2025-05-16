import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Category } from '@shared/schema';

const Categories: React.FC = () => {
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mx-auto"></div>
            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse mx-auto mt-3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Shop By Category</h2>
          <p className="mt-3 text-neutral-dark/70">Find your perfect style from our curated collections</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category: Category, index: number) => (
            <motion.div 
              key={category.id} 
              className="relative overflow-hidden rounded-lg shadow-lg group h-80"
              variants={itemVariants}
            >
              <img 
                src={category.imageUrl || '/images/categories/cat1.jpg'} 
                alt={category.name} 
                className="w-full h-full object-contain bg-neutral-light/30 transition-transform duration-500 group-hover:scale-110"
                style={{ objectPosition: "center 25%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-white">{category.name}</h3>
                  <p className="text-white text-sm mt-1 font-medium">{category.description}</p>
                  <Link href={`/collections/${category.id}`} className="inline-block mt-3 text-white font-accent text-sm font-semibold border-b border-white/70 hover:border-white">
                    EXPLORE <ArrowRight size={14} className="ml-1 inline" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
