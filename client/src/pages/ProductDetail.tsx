import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import ProductDetails from '@/components/products/ProductDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Star, StarHalf } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/products/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const productId = parseInt(id);
  
  // Fetch product details
  const { 
    data: product, 
    isLoading: isProductLoading,
    isError
  } = useQuery({
    queryKey: [`/api/products/${productId}`],
    enabled: !isNaN(productId)
  });
  
  // Fetch product reviews
  const { 
    data: reviews = [], 
    isLoading: isReviewsLoading 
  } = useQuery({
    queryKey: [`/api/products/${productId}/reviews`],
    enabled: !isNaN(productId)
  });
  
  // Fetch similar products (from same category)
  const { 
    data: similarProducts = [], 
    isLoading: isSimilarLoading 
  } = useQuery({
    queryKey: ['/api/products', { category: product?.categoryId }],
    enabled: !!product?.categoryId
  });
  
  // Filter out current product from similar products
  const filteredSimilarProducts = similarProducts.filter(p => p.id !== productId).slice(0, 4);
  
  // Redirect to products page if product not found
  useEffect(() => {
    if (isError || (!isProductLoading && !product)) {
      setLocation('/collections');
    }
  }, [isError, isProductLoading, product, setLocation]);
  
  // Helper to render stars based on rating
  const renderStars = (rating: number = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
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
  
  if (isProductLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (!product) return null;
  
  return (
    <>
      <Helmet>
        <title>{product.name} - Dazzle Fashion</title>
        <meta name="description" content={product.description || `Buy ${product.name} from Dazzle Fashion's ethnic kurti collection. Quality craftsmanship with modern designs.`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-neutral-dark/70 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:text-primary">Collections</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-dark">{product.name}</span>
        </div>
        
        {/* Product Details */}
        <ProductDetails product={product} />
        
        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto">
              <TabsTrigger 
                value="description" 
                className="text-lg font-heading data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 data-[state=active]:shadow-none"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="text-lg font-heading data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 data-[state=active]:shadow-none"
              >
                Reviews ({reviews.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none">
                <p className="text-neutral-dark/80 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-heading font-semibold mb-4">Features</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Premium quality fabric for comfort</li>
                      <li>Intricate detailing with traditional craftsmanship</li>
                      <li>Versatile design suitable for various occasions</li>
                      <li>Easy to maintain and long-lasting colors</li>
                      <li>Elegant fit that complements all body types</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-heading font-semibold mb-4">Care Instructions</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Gentle machine wash or hand wash recommended</li>
                      <li>Wash with similar colors</li>
                      <li>Dry in shade to maintain vibrant colors</li>
                      <li>Iron on medium heat</li>
                      <li>Do not bleach</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-6">
              {isReviewsLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="text-xl font-heading font-semibold mb-2">No Reviews Yet</h3>
                  <p className="text-neutral-dark/70 mb-6">Be the first to review this product</p>
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    Write a Review
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 rounded-full bg-neutral-light overflow-hidden mr-4">
                          {review.userImage ? (
                            <img 
                              src={review.userImage} 
                              alt={review.userName || 'User'} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-medium">
                              {(review.userName || 'U')[0].toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-heading font-semibold">{review.userName || 'Anonymous'}</h4>
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {renderStars(review.rating)}
                            </div>
                            {review.userLocation && (
                              <span className="text-xs text-neutral-dark/60">
                                {review.userLocation}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-neutral-dark/80">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Similar Products */}
        {filteredSimilarProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredSimilarProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
