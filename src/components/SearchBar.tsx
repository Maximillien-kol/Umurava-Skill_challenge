import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { SearchBarProps } from '@/types';

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Search courses..." 
}) => {
  const [inputValue, setInputValue] = useState(value);

  // Sync input value with prop value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    onSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        
        {inputValue && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={handleClear}
              className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;