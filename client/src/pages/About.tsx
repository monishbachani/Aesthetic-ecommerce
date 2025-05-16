import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { AnimatedImage } from '@/components/ui/animated-image';
import { Button } from '@/components/ui/button';
import { GemIcon, HeartIcon, StarIcon, UsersIcon } from 'lucide-react';

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Dazzle Fashion</title>
        <meta 
          name="description" 
          content="Learn about Dazzle Fashion's journey, our passion for ethnic kurtis, and our commitment to blending traditional craftsmanship with contemporary style." 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-neutral-dark">
          <div 
            className="absolute inset-0 opacity-70 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
            }}
          />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
                Our Story
              </h1>
              <p className="mt-4 text-lg text-white/90">
                Celebrating the rich heritage of Indian craftsmanship with a contemporary vision.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-accent font-bold text-sm tracking-wider">OUR JOURNEY</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold leading-tight">
                Crafting Elegance Since 2010
              </h2>
              <p className="mt-4 text-neutral-dark/80 leading-relaxed">
                Dazzle Fashion began with a simple yet profound vision: to create ethnic wear that honors tradition while embracing modernity. Founded by Deepak, a passionate entrepreneur with a love for authentic ethnic fashion, our manufacturing unit has grown from a small workshop in Jaipur to one of India's most respected ethnic kurti manufacturers.
              </p>
              <p className="mt-4 text-neutral-dark/80 leading-relaxed">
                Our journey is defined by an unwavering commitment to quality craftsmanship, sustainable practices, and designs that celebrate the diverse cultural heritage of India. Each Dazzle Fashion piece tells a story—of artisans who pour their heart into every stitch, of traditions passed down through generations, and of contemporary women who embrace their cultural roots with pride.
              </p>
              <Link href="/collections">
                <Button className="mt-8 bg-primary text-white hover:bg-primary/90">
                  Explore Our Collections
                </Button>
              </Link>
            </motion.div>
            
            <div className="relative">
              <AnimatedImage
                src="https://images.unsplash.com/photo-1614251056798-0a63eda2bb25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
                alt="Dazzle Fashion Craftsmanship"
                className="w-full h-auto rounded-lg shadow-xl"
                delay={0.2}
              />
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <div className="flex items-center space-x-3">
                  <StarIcon className="text-primary" />
                  <div>
                    <h4 className="font-heading font-semibold text-sm">Handcrafted Excellence</h4>
                    <p className="text-xs text-neutral-dark/70">Every piece tells a story</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Our Values</h2>
            <p className="mt-3 text-neutral-dark/70 max-w-2xl mx-auto">
              The principles that guide everything we do at Dazzle Fashion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center text-primary mb-4">
                <HeartIcon size={24} />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Passionate Craftsmanship</h3>
              <p className="text-neutral-dark/70">
                We pour our heart into every creation, honoring the artisanal traditions that make each piece special.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center text-primary mb-4">
                <GemIcon size={24} />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Quality Above All</h3>
              <p className="text-neutral-dark/70">
                We never compromise on materials, processes, or attention to detail, ensuring each garment exceeds expectations.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center text-primary mb-4">
                <UsersIcon size={24} />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Community Impact</h3>
              <p className="text-neutral-dark/70">
                We support local artisans and communities, ensuring fair wages and preserving traditional crafts for future generations.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 22c1.25-1.67 2.09-3.67 3-5.5 2.5 1.5 5.5 1.5 8 0 2.5 1.5 5.5 1.5 8 0 .91 1.83 1.75 3.83 3 5.5H2Z"/>
                  <path d="M20 8c-1.67-1.25-3.67-2.09-5.5-3 1.5-2.5 1.5-5.5 0-8 1.5 2.5 1.5 5.5 0 8Z"/>
                  <path d="M4 8c1.67-1.25 3.67-2.09 5.5-3-1.5-2.5-1.5-5.5 0-8-1.5 2.5-1.5 5.5 0 8Z"/>
                  <path d="M12 2c-1.5 2.5-1.5 5.5 0 8-1.5-2.5-1.5-5.5 0-8Z"/>
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Sustainable Practices</h3>
              <p className="text-neutral-dark/70">
                We are committed to environmentally responsible production methods and reducing our ecological footprint.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16" id="team">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Meet Our Team</h2>
            <p className="mt-3 text-neutral-dark/70 max-w-2xl mx-auto">
              The creative minds and skilled hands behind Dazzle Fashion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="h-64 w-64 mx-auto rounded-full overflow-hidden mb-6 bg-neutral-light">
                <div className="w-full h-full flex items-center justify-center text-neutral-dark/30 text-3xl">
                  PS
                </div>
              </div>
              <h3 className="font-heading font-semibold text-xl">Deepak</h3>
              <p className="text-primary font-medium mb-3">Owner & Founder</p>
              <p className="text-neutral-dark/70 max-w-xs mx-auto">
                With a passion for traditional craftsmanship, Deepak leads Dazzle Fashion with a vision to create authentic, high-quality ethnic kurtis.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="h-64 w-64 mx-auto rounded-full overflow-hidden mb-6 bg-neutral-light">
                <div className="w-full h-full flex items-center justify-center text-neutral-dark/30 text-3xl">
                  AK
                </div>
              </div>
              <h3 className="font-heading font-semibold text-xl">Aditya Kumar</h3>
              <p className="text-primary font-medium mb-3">Head of Operations</p>
              <p className="text-neutral-dark/70 max-w-xs mx-auto">
                Aditya ensures seamless operations from production to delivery, maintaining our commitment to quality and timeliness.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="h-64 w-64 mx-auto rounded-full overflow-hidden mb-6 bg-neutral-light">
                <div className="w-full h-full flex items-center justify-center text-neutral-dark/30 text-3xl">
                  MR
                </div>
              </div>
              <h3 className="font-heading font-semibold text-xl">Meera Reddy</h3>
              <p className="text-primary font-medium mb-3">Lead Designer</p>
              <p className="text-neutral-dark/70 max-w-xs mx-auto">
                Meera blends traditional embroidery techniques with modern silhouettes, creating unique designs that define Dazzle Fashion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section className="py-16 bg-gradient-to-r from-secondary/20 to-primary/20" id="store-locations">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Visit Our Manufacturing Unit</h2>
            <p className="mt-3 text-neutral-dark/70 max-w-2xl mx-auto">
              Explore our manufacturing facility and see how we create our elegant ethnic kurtis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="h-64 bg-neutral-light">
                <img 
                  src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Dazzle Fashion Delhi Boutique" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-2">Jaipur Manufacturing Unit</h3>
                <p className="text-neutral-dark/70 mb-4">
                  Sikar House<br />
                  Jaipur, Rajasthan
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Opening Hours</p>
                    <p className="text-neutral-dark/70">
                      Mon-Sat: 10:00 AM - 8:00 PM<br />
                      Sun: 11:00 AM - 6:00 PM
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-neutral-dark/70">
                      +91 98765 43210<br />
                      info@dazzlefashion.com
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="h-64 bg-neutral-light">
                <img 
                  src="https://images.unsplash.com/photo-1561049501-e1f96bdd98fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=85" 
                  alt="Dazzle Fashion Showroom" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-2">Factory Showroom</h3>
                <p className="text-neutral-dark/70 mb-4">
                  Sikar House<br />
                  Jaipur, Rajasthan
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Opening Hours</p>
                    <p className="text-neutral-dark/70">
                      Mon-Sat: 10:00 AM - 8:00 PM<br />
                      Sun: 11:00 AM - 6:00 PM
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-neutral-dark/70">
                      +91 98765 43211<br />
                      mumbai@dazzlefashion.com
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-16" id="careers">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Join Our Team</h2>
            <p className="mt-3 text-neutral-dark/70 max-w-2xl mx-auto">
              Be part of our growing family and help us create beautiful ethnic wear
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <p className="text-lg mb-6">
              We're always looking for talented individuals who are passionate about fashion, craftsmanship, and customer service to join our team. Working at Dazzle Fashion means being part of a creative, collaborative environment where your ideas are valued.
            </p>
            
            <h3 className="font-heading font-semibold text-xl mb-4">Current Openings</h3>
            <div className="space-y-4 mb-8">
              <div className="border-b pb-4">
                <h4 className="font-medium text-lg">Senior Textile Designer</h4>
                <p className="text-neutral-dark/70 mb-2">Delhi | Full-time</p>
                <p>Create innovative designs for our seasonal collections, working with traditional techniques and contemporary aesthetics.</p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-medium text-lg">E-commerce Specialist</h4>
                <p className="text-neutral-dark/70 mb-2">Remote | Full-time</p>
                <p>Manage and optimize our online shopping experience, improving customer journeys and increasing digital engagement.</p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-medium text-lg">Retail Store Associate</h4>
                <p className="text-neutral-dark/70 mb-2">Mumbai | Full-time</p>
                <p>Provide exceptional customer service and styling advice in our Mumbai boutique, helping customers find their perfect pieces.</p>
              </div>
            </div>
            
            <div className="text-center">
              <Button className="bg-primary text-white hover:bg-primary/90">
                View All Openings
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Experience the Dazzle Difference
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Discover our exquisite collection of ethnic kurtis and add a touch of traditional elegance to your wardrobe.
          </p>
          <Link href="/collections">
            <Button className="bg-white text-primary hover:bg-white/90 font-accent font-semibold px-8 py-3">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
