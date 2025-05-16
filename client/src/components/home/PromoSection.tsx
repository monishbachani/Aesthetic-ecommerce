import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Gem, PaintbrushVertical, Shirt } from 'lucide-react';
import { AnimatedImage } from '@/components/ui/animated-image';

const PromoSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-secondary/20 to-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-accent font-bold text-sm tracking-wider">
              NEW SEASON COLLECTION
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold leading-tight">
              Handcrafted Luxury <br />For Every Occasion
            </h2>
            <p className="mt-4 text-neutral-dark/80">
              Embrace the beauty of traditional craftsmanship with our new season collection. 
              Each piece is meticulously designed to celebrate your unique style while 
              honoring time-honored techniques.
            </p>
            
            <motion.div 
              className="mt-8 space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, staggerChildren: 0.1 }}
            >
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-primary/10 p-2 rounded-full text-primary mr-4">
                  <Gem size={20} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold">Premium Fabrics</h4>
                  <p className="text-sm text-neutral-dark/70">
                    Carefully selected materials for comfort and elegance
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="bg-primary/10 p-2 rounded-full text-primary mr-4">
                  <PaintbrushVertical size={20} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold">Artisanal Craftsmanship</h4>
                  <p className="text-sm text-neutral-dark/70">
                    Each piece carries the richness of traditional techniques
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="bg-primary/10 p-2 rounded-full text-primary mr-4">
                  <Shirt size={20} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold">Contemporary Designs</h4>
                  <p className="text-sm text-neutral-dark/70">
                    Modern silhouettes that honor ethnic traditions
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Link href="/collections" className="inline-block px-8 py-3 bg-primary text-white rounded-md font-accent font-semibold hover-scale shadow-md">
                EXPLORE COLLECTION
              </Link>
            </motion.div>
          </motion.div>
          
          <div className="order-1 md:order-2 relative">
            <AnimatedImage
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
              alt="Handcrafted Luxury Ethnic Wear"
              className="w-full h-auto rounded-lg shadow-xl"
            />
            
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-4">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"></div>
                </div>
                <div>
                  <div className="flex text-accent-gold text-xs">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-accent-gold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs font-semibold">Loved by 2500+ customers</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
