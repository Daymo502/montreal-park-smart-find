
import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterToggle: () => void;
}

const SearchBar = ({ onSearch, onFilterToggle }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Mock suggestions based on input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 2) {
      // In a real app, this would come from an API
      const mockSuggestions = [
        `${value} Street`,
        `${value} Boulevard`,
        `Place ${value}`,
        `${value} Metro Station`
      ];
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSuggestions([]);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setSuggestions([]);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setIsFocused(false);
  };

  return (
    <div className="relative w-full">
      <form 
        onSubmit={handleSubmit}
        className={cn(
          "relative flex items-center w-full bg-white rounded-full montreal-shadow transition-all duration-200",
          isFocused ? "ring-2 ring-montreal-teal ring-opacity-50" : ""
        )}
      >
        <Search className="ml-4 w-5 h-5 text-gray-400 flex-shrink-0" />
        
        <input
          type="text"
          placeholder="Search destination or address"
          className="py-3 px-3 w-full bg-transparent focus:outline-none text-montreal-darkGray placeholder:text-gray-400"
          value={searchQuery}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="mr-2 p-1 hover:bg-gray-100 rounded-full"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
        
        <button
          type="button"
          onClick={onFilterToggle}
          className="mr-4 p-1 hover:bg-gray-100 rounded-full"
          aria-label="Toggle filters"
        >
          <Filter className="w-5 h-5 text-montreal-teal" />
        </button>
      </form>
      
      {/* Search suggestions */}
      {suggestions.length > 0 && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg montreal-shadow overflow-hidden z-20 animate-fade-in">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center"
                >
                  <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                  <span className="text-montreal-darkGray">{suggestion}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
