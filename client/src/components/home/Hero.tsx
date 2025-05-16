import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Hero image with overlay */}
      <div className="absolute inset-0 w-full h-full bg-neutral-dark">
        <div 
          className="absolute inset-0 opacity-70 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
          }}
        />
      </div>
      
      {/* Hero Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
              Embrace Your Ethnic Elegance
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Discover our exquisite collection of handcrafted kurtis that blend tradition with contemporary style.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/collections" className="inline-block px-8 py-3 bg-primary text-white rounded-md font-accent font-semibold shadow-lg">
                  SHOP NOW
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/about" className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/40 rounded-md font-accent font-semibold">
                  EXPLORE
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
