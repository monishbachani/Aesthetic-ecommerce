import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string) => void;
  isExpandable?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  className = '', 
  onSearch,
  isExpandable = false
}) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(!isExpandable);
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim() === '') return;
    
    if (onSearch) {
      onSearch(query);
    } else {
      // Default behavior: redirect to search page
      setLocation(`/collections?search=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (isExpandable) {
      setIsExpanded(false);
    }
  };

  const toggleExpand = () => {
    if (isExpandable) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isExpandable && !isExpanded ? (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleExpand}
          aria-label="Search"
        >
          <Search size={20} />
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10 focus-visible:ring-primary"
              autoFocus={isExpandable}
            />
            {query && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-dark/60 hover:text-primary"
                onClick={handleClear}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <Button 
            type="submit" 
            variant="ghost" 
            size="icon"
            className="ml-2"
            aria-label="Search"
          >
            <Search size={20} />
          </Button>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
