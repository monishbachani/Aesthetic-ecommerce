import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'wouter';
import ProductGrid from '@/components/products/ProductGrid';
import FilterSidebar from '@/components/products/FilterSidebar';
import SearchBar from '@/components/common/SearchBar';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sliders, X } from 'lucide-react';

const Products: React.FC = () => {
  const { categoryId } = useParams();
  const [location] = useLocation();
  const queryParams = new URLSearchParams(location.split('?')[1] || '');
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    categoryId ? parseInt(categoryId) : undefined
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]); // 0 to ₹5000 in paise
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || '');
  const [isNewArrival, setIsNewArrival] = useState(queryParams.get('new') === 'true');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Fetch categories
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['/api/categories'],
  });
  
  // Construct API query based on filters
  const buildQueryKey = () => {
    const query: Record<string, any> = {};
    
    if (selectedCategory) {
      query.category = selectedCategory;
    }
    
    if (isNewArrival) {
      query.newArrivals = true;
    }
    
    if (searchQuery) {
      query.search = searchQuery;
    }
    
    return ['/api/products', query];
  };
  
  // Fetch products
  const { 
    data: allProducts = [], 
    isLoading: isProductsLoading 
  } = useQuery({
    queryKey: buildQueryKey(),
  });
  
  // Apply client-side filters (size, color, price)
  const filteredProducts = allProducts.filter(product => {
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Size filter
    if (selectedSizes.length > 0 && product.sizes) {
      if (!product.sizes.some(size => selectedSizes.includes(size))) {
        return false;
      }
    }
    
    // Color filter
    if (selectedColors.length > 0 && product.colors) {
      if (!product.colors.some(color => selectedColors.includes(color))) {
        return false;
      }
    }
    
    return true;
  });
  
  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'newest':
        return a.isNewArrival ? -1 : 1;
      case 'rating':
        return b.averageRating - a.averageRating;
      default: // featured
        return a.isFeatured ? -1 : 1;
    }
  });
  
  // Find max price for price range slider
  const maxPrice = allProducts.length > 0 
    ? Math.max(...allProducts.map(p => p.price))
    : 500000; // Default max price (₹5000)
  
  // Reset filters
  const handleClearFilters = () => {
    setSelectedCategory(undefined);
    setPriceRange([0, maxPrice]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy('featured');
    setSearchQuery('');
    setIsNewArrival(false);
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  // Handle category change
  const handleCategoryChange = (catId: number | undefined) => {
    setSelectedCategory(catId);
  };
  
  // Set page title based on current view
  const getPageTitle = () => {
    if (searchQuery) {
      return `Search: ${searchQuery} - Dazzle Fashion`;
    }
    
    if (isNewArrival) {
      return 'New Arrivals - Dazzle Fashion';
    }
    
    if (selectedCategory) {
      const category = categories.find(c => c.id === selectedCategory);
      return category ? `${category.name} - Dazzle Fashion` : 'Collections - Dazzle Fashion';
    }
    
    return 'All Collections - Dazzle Fashion';
  };
  
  // Update the page title when filters change
  useEffect(() => {
    document.title = getPageTitle();
  }, [selectedCategory, searchQuery, isNewArrival, categories]);
  
  return (
    <>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta 
          name="description" 
          content="Explore our wide range of ethnic kurtis, from casual everyday wear to festive occasion pieces. Quality craftsmanship with modern designs." 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold">
                {searchQuery ? `Search: ${searchQuery}` : 
                 isNewArrival ? 'New Arrivals' :
                 selectedCategory ? 
                   categories.find(c => c.id === selectedCategory)?.name : 
                   'All Collections'}
              </h1>
              <p className="text-neutral-dark/70 mt-2">
                {sortedProducts.length} products
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <SearchBar 
                onSearch={handleSearch} 
                className="min-w-[200px] md:min-w-[300px]" 
              />
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Best Rating</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2 md:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Sliders size={16} /> Filters
              </Button>
            </div>
          </div>
          
          {/* Active filters */}
          {(selectedCategory || selectedSizes.length > 0 || selectedColors.length > 0 || 
            searchQuery || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">Active Filters:</span>
              
              {selectedCategory && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs flex items-center gap-1"
                  onClick={() => setSelectedCategory(undefined)}
                >
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <X size={14} />
                </Button>
              )}
              
              {selectedSizes.map(size => (
                <Button 
                  key={size}
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs flex items-center gap-1"
                  onClick={() => setSelectedSizes(selectedSizes.filter(s => s !== size))}
                >
                  Size: {size}
                  <X size={14} />
                </Button>
              ))}
              
              {selectedColors.map(color => (
                <Button 
                  key={color}
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs flex items-center gap-1"
                  onClick={() => setSelectedColors(selectedColors.filter(c => c !== color))}
                >
                  Color: {color}
                  <X size={14} />
                </Button>
              ))}
              
              {searchQuery && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs flex items-center gap-1"
                  onClick={() => setSearchQuery('')}
                >
                  Search: {searchQuery}
                  <X size={14} />
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-xs text-primary"
                onClick={handleClearFilters}
              >
                Clear All
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-[250px] shrink-0">
            <FilterSidebar 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              maxPrice={maxPrice}
              selectedSizes={selectedSizes}
              onSizeChange={setSelectedSizes}
              selectedColors={selectedColors}
              onColorChange={setSelectedColors}
              onClearFilters={handleClearFilters}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>
          
          {/* Sidebar - Mobile */}
          <FilterSidebar 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            maxPrice={maxPrice}
            selectedSizes={selectedSizes}
            onSizeChange={setSelectedSizes}
            selectedColors={selectedColors}
            onColorChange={setSelectedColors}
            onClearFilters={handleClearFilters}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          
          {/* Product Grid */}
          <div className="flex-grow">
            <ProductGrid 
              products={sortedProducts} 
              isLoading={isProductsLoading || isCategoriesLoading} 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
