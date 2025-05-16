import React from 'react';
import { Link } from 'wouter';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-6">Dazzle Fashion</h3>
            <p className="text-white/70 mb-6">
              Celebrating the rich heritage of Indian ethnic wear with modern designs 
              that empower and inspire.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white/70 hover:text-white transition-colors" 
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white/70 hover:text-white transition-colors" 
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white/70 hover:text-white transition-colors" 
                aria-label="Linkedin"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white/70 hover:text-white transition-colors" 
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-accent font-semibold text-lg mb-6">Shopping</h4>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link href="/collections?new=true" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections?bestseller=true" className="hover:text-white transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/collections/1" className="hover:text-white transition-colors">
                  Casual Kurtis
                </Link>
              </li>
              <li>
                <Link href="/collections/2" className="hover:text-white transition-colors">
                  Festive Collection
                </Link>
              </li>
              <li>
                <Link href="/collections/3" className="hover:text-white transition-colors">
                  Designer Fusion
                </Link>
              </li>
              <li>
                <Link href="/collections?sale=true" className="hover:text-white transition-colors">
                  Sale & Offers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Account & Info */}
          <div>
            <h4 className="font-accent font-semibold text-lg mb-6">Account</h4>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/account?view=orders" className="hover:text-white transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/account?view=wishlist" className="hover:text-white transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/account?view=track" className="hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/account?view=returns" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>
          
          {/* About Column */}
          <div>
            <h4 className="font-accent font-semibold text-lg mb-6">Information</h4>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about#store-locations" className="hover:text-white transition-colors">
                  Store Locations
                </Link>
              </li>
              <li>
                <Link href="/about#careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Dazzle Fashion. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              {/* Payment Methods Icons */}
              <span className="text-white/60 text-sm">Payment methods:</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="24"
                viewBox="0 0 36 24"
                className="h-6"
              >
                <rect width="36" height="24" rx="4" fill="#16216A" />
                <path
                  d="M14.5 6.5H21.5V17.5H14.5V6.5Z"
                  fill="#FF5F00"
                />
                <path
                  d="M15 12C15 9.5 16.25 7.3 18 6C16.5 4.7 14.5 4 12.5 4C8.1 4 4.5 7.6 4.5 12C4.5 16.4 8.1 20 12.5 20C14.5 20 16.5 19.3 18 18C16.25 16.7 15 14.5 15 12Z"
                  fill="#EB001B"
                />
                <path
                  d="M31.5 12C31.5 16.4 27.9 20 23.5 20C21.5 20 19.5 19.3 18 18C19.75 16.7 21 14.5 21 12C21 9.5 19.75 7.3 18 6C19.5 4.7 21.5 4 23.5 4C27.9 4 31.5 7.6 31.5 12Z"
                  fill="#F79E1B"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="24"
                viewBox="0 0 36 24"
                className="h-6"
              >
                <rect width="36" height="24" rx="4" fill="#1A1F71" />
                <path
                  d="M14.5 9L12.4 15H10.5L8.5 10.5L8 15H6.3L7 9H9.3L11 14L12 9H14.5Z"
                  fill="white"
                />
                <path
                  d="M15.8 15H17.5L18.5 9H16.8L15.8 15Z"
                  fill="white"
                />
                <path
                  d="M26 9L25.7 10H24.3C24.7 10.4 25 11 25 11.6C25 13.4 23.5 15 21.5 15C19.6 15 18 13.4 18 11.5C18 9.6 19.6 8 21.5 8C22.3 8 23 8.2 23.6 8.7L24.1 9H26Z"
                  fill="white"
                />
                <path
                  d="M29.7 12.5C29.7 13.4 29 14.1 28.1 14.1C27.3 14.1 26.6 13.4 26.6 12.5C26.6 11.6 27.3 10.9 28.1 10.9C29 10.9 29.7 11.7 29.7 12.5Z"
                  fill="white"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="24"
                viewBox="0 0 36 24"
                className="h-6"
              >
                <rect width="36" height="24" rx="4" fill="#113984" />
                <path
                  d="M18 8.5C20.2 8.5 22 10.3 22 12.5C22 14.7 20.2 16.5 18 16.5C15.8 16.5 14 14.7 14 12.5C14 10.3 15.8 8.5 18 8.5Z"
                  fill="#009EE3"
                />
                <path
                  d="M24.5 8.5H28.5C29.3 8.5 30 9.2 30 10V15C30 15.8 29.3 16.5 28.5 16.5H24.5V8.5Z"
                  fill="#009EE3"
                />
                <path
                  d="M11.5 8.5H7.5C6.7 8.5 6 9.2 6 10V15C6 15.8 6.7 16.5 7.5 16.5H11.5V8.5Z"
                  fill="#009EE3"
                />
              </svg>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="36" 
                height="24" 
                viewBox="0 0 36 24"
                className="h-6"
              >
                <rect width="36" height="24" rx="4" fill="#5F6368" />
                <path 
                  d="M18 7C15.2 7 13 9.2 13 12C13 14.8 15.2 17 18 17C20.8 17 23 14.8 23 12C23 9.2 20.8 7 18 7ZM18 15.5C16.1 15.5 14.5 13.9 14.5 12C14.5 10.1 16.1 8.5 18 8.5C19.9 8.5 21.5 10.1 21.5 12C21.5 13.9 19.9 15.5 18 15.5Z" 
                  fill="white" 
                />
                <path 
                  d="M25 15.5V8.5H23.5V9.2C23 8.7 22.3 8.5 21.5 8.5V10C22.3 10 23 10.7 23 11.5V15.5H25Z" 
                  fill="white" 
                />
                <path 
                  d="M12.5 15.5V8.5H11V9.2C10.5 8.7 9.8 8.5 9 8.5V10C9.8 10 10.5 10.7 10.5 11.5V15.5H12.5Z" 
                  fill="white" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
