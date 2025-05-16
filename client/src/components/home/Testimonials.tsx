import React from 'react';
import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Priya S.",
    location: "Delhi, India",
    rating: 5,
    comment: "The quality of the fabric and stitching is exceptional. I've received so many compliments on my Zari Embroidered Kurti. Will definitely be shopping here again!"
  },
  {
    id: 2,
    name: "Ananya R.",
    location: "Mumbai, India",
    rating: 5,
    comment: "Fast delivery and the kurti fits perfectly. The colors are vibrant and the embroidery detail is even more beautiful in person. Excellent customer service too!"
  },
  {
    id: 3,
    name: "Meera K.",
    location: "Bangalore, India",
    rating: 4.5,
    comment: "I love how unique their designs are. The Mirror Work Cotton Kurti I purchased is both comfortable for daily wear and elegant enough for special occasions. Highly recommend!"
  }
];

const Testimonials: React.FC = () => {
  // Animation variants
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

  // Helper to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="text-accent-gold" size={16} fill="currentColor" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="text-accent-gold" size={16} fill="currentColor" />);
    }
    
    return stars;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Our Customers Love Us</h2>
          <p className="mt-3 text-neutral-dark/70 max-w-2xl mx-auto">
            See what our customers are saying about their shopping experience and our ethnic kurti collection
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              className="bg-neutral-light p-6 rounded-lg shadow-sm"
              variants={itemVariants}
            >
              <div className="flex text-accent-gold mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-neutral-dark/80 italic">"{testimonial.comment}"</p>
              <div className="mt-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-heading font-semibold">{testimonial.name}</h4>
                  <p className="text-xs text-neutral-dark/60">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
