import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price from cents/paise to display format
export function formatPrice(price: number | undefined): string {
  if (price === undefined) return "₹0";
  
  // Convert from paise to rupees
  const rupees = price / 100;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(rupees);
}

// Calculate discount percentage
export function calculateDiscount(price: number, discountedPrice: number): number {
  if (!price || !discountedPrice) return 0;
  return Math.round(((discountedPrice - price) / discountedPrice) * 100);
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Generate star ratings
export function generateStarRating(rating: number): string[] {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  const stars = [];
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push('full');
  }
  
  // Add half star if needed
  if (halfStar) {
    stars.push('half');
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push('empty');
  }
  
  return stars;
}

// Helper function to generate image URL based on product name
export function getProductImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  return `${imagePath}`;
}
