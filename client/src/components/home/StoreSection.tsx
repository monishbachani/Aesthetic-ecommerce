import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, CalendarCheck } from 'lucide-react';
import { AnimatedImage } from '@/components/ui/animated-image';

const StoreSection: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-accent font-bold text-sm tracking-wider">
              OUR BOUTIQUE
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold leading-tight">
              Visit Our Elegant Store
            </h2>
            <p className="mt-4 text-neutral-dark/80">
              Experience our collection in person at our flagship boutique. 
              Our knowledgeable staff will help you find the perfect kurti 
              that complements your style and personality.
            </p>
            
            <motion.div 
              className="mt-8 space-y-6"
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
                <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold">Location</h4>
                  <p className="text-sm text-neutral-dark/70">
                    42 Fashion Street, Hauz Khas Village<br />
                    New Delhi, 110016
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
                <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold">Opening Hours</h4>
                  <p className="text-sm text-neutral-dark/70">
                    Monday to Saturday: 10:00 AM - 8:00 PM<br />
                    Sunday: 11:00 AM - 6:00 PM
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
                <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold">Contact</h4>
                  <p className="text-sm text-neutral-dark/70">
                    +91 98765 43210<br />
                    contact@dazzlefashion.com
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
              <Link href="https://maps.google.com" target="_blank" className="inline-block px-8 py-3 bg-white border border-primary text-primary rounded-md font-accent font-semibold hover:bg-primary hover:text-white transition-colors">
                GET DIRECTIONS
              </Link>
            </motion.div>
          </motion.div>
          
          <div className="relative">
            <AnimatedImage
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Dazzle Fashion Boutique Interior"
              className="w-full h-auto rounded-lg shadow-xl"
            />
            
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="flex items-center space-x-4">
                <CalendarCheck className="text-primary text-xl" />
                <div>
                  <h4 className="font-heading font-semibold text-sm">Book an Appointment</h4>
                  <p className="text-xs text-neutral-dark/70">For personalized styling</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreSection;
