import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoSection from '@/components/home/PromoSection';
import Testimonials from '@/components/home/Testimonials';
import StoreSection from '@/components/home/StoreSection';
import Newsletter from '@/components/home/Newsletter';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Dazzle Fashion - Ethnic Kurti Collection</title>
        <meta 
          name="description" 
          content="Discover our exquisite collection of handcrafted ethnic kurtis that blend tradition with contemporary style at Dazzle Fashion." 
        />
      </Helmet>
      
      <Hero />
      <Categories />
      <FeaturedProducts />
      <PromoSection />
      <Testimonials />
      <StoreSection />
      <Newsletter />
    </>
  );
};

export default Home;
