import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for joining our newsletter."
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Join Our Community</h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            Subscribe to our newsletter and be the first to know about new collections, 
            exclusive offers, and styling tips.
          </p>
          
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-white/30 outline-none" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <motion.button 
              type="submit" 
              className="px-6 py-3 bg-white text-primary font-accent font-semibold rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
            </motion.button>
          </form>
          
          <div className="mt-8 flex justify-center space-x-6">
            <motion.a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-white hover:text-white/80 transition-colors" 
              aria-label="Instagram"
              whileHover={{ scale: 1.2 }}
            >
              <Instagram size={24} />
            </motion.a>
            <motion.a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-white hover:text-white/80 transition-colors" 
              aria-label="Facebook"
              whileHover={{ scale: 1.2 }}
            >
              <Facebook size={24} />
            </motion.a>
            <motion.a 
              href="https://pinterest.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-white hover:text-white/80 transition-colors" 
              aria-label="Linkedin"
              whileHover={{ scale: 1.2 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-white hover:text-white/80 transition-colors" 
              aria-label="YouTube"
              whileHover={{ scale: 1.2 }}
            >
              <Youtube size={24} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
