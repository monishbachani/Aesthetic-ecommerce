import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import CartDrawer from '@/components/cart/CartDrawer';
import AuthModal from '@/components/auth/AuthModal';
import { Menu, Search, User, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, openCart } = useCart();
  const { isAuthenticated, openAuthModal, logout, user } = useAuth();
  const [location] = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}>
        {/* Top announcement bar */}
        <div className="bg-primary text-white text-center py-2 text-sm">
          <p>Free shipping on orders above ₹1999 | Use code DAZZLE10 for 10% off</p>
        </div>
        
        {/* Main Header */}
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-4 px-4 md:px-6">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl md:text-3xl font-heading font-bold text-primary">
                Dazzle Fashion
              </Link>
            </div>
            
            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className={`menu-item font-medium hover:text-primary transition-colors ${location === '/' ? 'text-primary' : ''}`}>
                Home
              </Link>
              <Link href="/collections" className={`menu-item font-medium hover:text-primary transition-colors ${location === '/collections' ? 'text-primary' : ''}`}>
                Collections
              </Link>
              <Link href="/collections?new=true" className={`menu-item font-medium hover:text-primary transition-colors ${location.includes('new=true') ? 'text-primary' : ''}`}>
                New Arrivals
              </Link>
              <Link href="/about" className={`menu-item font-medium hover:text-primary transition-colors ${location === '/about' ? 'text-primary' : ''}`}>
                About
              </Link>
              <Link href="/contact" className={`menu-item font-medium hover:text-primary transition-colors ${location === '/contact' ? 'text-primary' : ''}`}>
                Contact
              </Link>
            </nav>
            
            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="hover:text-primary transition-colors" aria-label="Search">
                <Search size={20} />
              </button>
              
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hover:text-primary transition-colors" aria-label="Account">
                      <User size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/account" className="w-full">
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/account?view=orders" className="w-full">
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button 
                  className="hover:text-primary transition-colors" 
                  aria-label="Account"
                  onClick={openAuthModal}
                >
                  <User size={20} />
                </button>
              )}
              
              <button 
                className="hover:text-primary transition-colors relative" 
                aria-label="Cart"
                onClick={openCart}
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                className="md:hidden px-4 pb-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col space-y-3">
                  <Link href="/" className="py-2 font-medium hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Link href="/collections" className="py-2 font-medium hover:text-primary transition-colors">
                    Collections
                  </Link>
                  <Link href="/collections?new=true" className="py-2 font-medium hover:text-primary transition-colors">
                    New Arrivals
                  </Link>
                  <Link href="/about" className="py-2 font-medium hover:text-primary transition-colors">
                    About
                  </Link>
                  <Link href="/contact" className="py-2 font-medium hover:text-primary transition-colors">
                    Contact
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
      
      <CartDrawer />
      <AuthModal />
    </>
  );
};

export default Header;
