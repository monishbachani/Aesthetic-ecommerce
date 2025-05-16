import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Category } from '@shared/schema';
import { X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory?: number;
  onCategoryChange: (categoryId: number | undefined) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
  selectedSizes: string[];
  onSizeChange: (sizes: string[]) => void;
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  maxPrice,
  selectedSizes,
  onSizeChange,
  selectedColors,
  onColorChange,
  onClearFilters,
  isOpen,
  onClose
}) => {
  // Available sizes and colors (these would typically come from your data)
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableColors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Pink', 'Purple', 'Beige', 'Gold', 'Maroon'];

  // Handle size selection
  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      onSizeChange(selectedSizes.filter(s => s !== size));
    } else {
      onSizeChange([...selectedSizes, size]);
    }
  };

  // Handle color selection
  const handleColorToggle = (color: string) => {
    if (selectedColors.includes(color)) {
      onColorChange(selectedColors.filter(c => c !== color));
    } else {
      onColorChange([...selectedColors, color]);
    }
  };

  // Handle price range change
  const handlePriceChange = (values: number[]) => {
    onPriceRangeChange([values[0], values[1]]);
  };

  // Get sidebar animation variants based on isOpen state
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    closed: { 
      x: "-100%",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  // Mobile sidebar overlay
  const overlayVariants = {
    open: { opacity: 1, display: "block" },
    closed: { 
      opacity: 0, 
      transitionEnd: { 
        display: "none" 
      } 
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <motion.div 
        className="fixed inset-0 bg-black/50 z-40 hidden md:hidden"
        variants={overlayVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.aside
        className="fixed md:relative top-0 left-0 w-[280px] h-screen md:h-auto bg-white z-50 md:z-auto overflow-y-auto md:overflow-visible p-6 border-r"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h2 className="font-heading font-bold text-xl">Filters</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="mb-8">
          <h3 className="font-heading font-semibold text-lg mb-4">Categories</h3>
          <div className="space-y-2">
            <div 
              className={`cursor-pointer px-2 py-1 rounded hover:bg-neutral-light ${!selectedCategory ? 'bg-primary/10 text-primary font-medium' : ''}`}
              onClick={() => onCategoryChange(undefined)}
            >
              All Categories
            </div>
            {categories.map(category => (
              <div 
                key={category.id}
                className={`cursor-pointer px-2 py-1 rounded hover:bg-neutral-light ${selectedCategory === category.id ? 'bg-primary/10 text-primary font-medium' : ''}`}
                onClick={() => onCategoryChange(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>

        <Accordion type="single" collapsible defaultValue="price" className="w-full">
          <AccordionItem value="price">
            <AccordionTrigger className="font-heading font-semibold text-lg">Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="pt-4">
                <Slider
                  defaultValue={[priceRange[0], priceRange[1]]}
                  min={0}
                  max={maxPrice}
                  step={100}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={handlePriceChange}
                  className="mb-6"
                />
                <div className="flex justify-between items-center">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="size">
            <AccordionTrigger className="font-heading font-semibold text-lg">Size</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 pt-4">
                {availableSizes.map(size => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`size-${size}`} 
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={() => handleSizeToggle(size)}
                    />
                    <Label htmlFor={`size-${size}`} className="cursor-pointer">{size}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="color">
            <AccordionTrigger className="font-heading font-semibold text-lg">Color</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 pt-4">
                {availableColors.map(color => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`color-${color}`} 
                      checked={selectedColors.includes(color)}
                      onCheckedChange={() => handleColorToggle(color)}
                    />
                    <Label htmlFor={`color-${color}`} className="cursor-pointer">{color}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button 
          variant="outline" 
          className="w-full mt-8" 
          onClick={onClearFilters}
        >
          Clear All Filters
        </Button>
      </motion.aside>
    </>
  );
};

export default FilterSidebar;
