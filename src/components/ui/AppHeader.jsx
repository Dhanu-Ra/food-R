import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';

const AppHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();

  const translations = {
    en: {
      searchPlaceholder: 'Search recipes...',
      brandName: 'FoodPrep'
    },
    es: {
      searchPlaceholder: 'Buscar recetas...',
      brandName: 'FoodPrep'
    },
    fr: {
      searchPlaceholder: 'Rechercher des recettes...',
      brandName: 'FoodPrep'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const isAuthPage = ['/user-registration', '/user-login', '/password-reset'].includes(location.pathname);

  if (isAuthPage) {
    return null;
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const t = translations[currentLanguage];

  return (
    <header className="fixed top-0 left-0 right-0 h-header bg-background border-b border-border z-header">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2 transition-smooth hover:opacity-80">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <Icon name="ChefHat" size={20} color="var(--color-primary-foreground)" />
          </div>
          <span className="font-heading font-semibold text-xl text-primary hidden sm:block">
            {t.brandName}
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <div className={`relative transition-smooth ${isSearchFocused ? 'transform scale-105' : ''}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon 
                name="Search" 
                size={18} 
                color={isSearchFocused ? 'var(--color-primary)' : 'var(--color-text-secondary)'} 
              />
            </div>
            <Input
              type="search"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="pl-10 pr-4 py-2 w-full bg-surface border-border rounded-sm focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center transition-smooth hover:opacity-70"
              >
                <Icon name="X" size={16} color="var(--color-text-secondary)" />
              </button>
            )}
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-sm hover:bg-surface transition-smooth">
            <Icon name="Bell" size={20} color="var(--color-text-secondary)" />
          </button>
          <button className="p-2 rounded-sm hover:bg-surface transition-smooth">
            <Icon name="User" size={20} color="var(--color-text-secondary)" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;