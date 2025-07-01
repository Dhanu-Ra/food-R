import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const translations = {
    en: {
      sortBy: 'Sort by',
      nameAsc: 'Name (A-Z)',
      nameDesc: 'Name (Z-A)',
      dateNewest: 'Date Added (Newest)',
      dateOldest: 'Date Added (Oldest)',
      cookingTimeAsc: 'Cooking Time (Shortest)',
      cookingTimeDesc: 'Cooking Time (Longest)',
      ratingDesc: 'Rating (Highest)',
      ratingAsc: 'Rating (Lowest)'
    },
    es: {
      sortBy: 'Ordenar por',
      nameAsc: 'Nombre (A-Z)',
      nameDesc: 'Nombre (Z-A)',
      dateNewest: 'Fecha Agregada (Más Reciente)',
      dateOldest: 'Fecha Agregada (Más Antigua)',
      cookingTimeAsc: 'Tiempo de Cocción (Más Corto)',
      cookingTimeDesc: 'Tiempo de Cocción (Más Largo)',
      ratingDesc: 'Calificación (Más Alta)',
      ratingAsc: 'Calificación (Más Baja)'
    },
    fr: {
      sortBy: 'Trier par',
      nameAsc: 'Nom (A-Z)',
      nameDesc: 'Nom (Z-A)',
      dateNewest: 'Date Ajoutée (Plus Récente)',
      dateOldest: 'Date Ajoutée (Plus Ancienne)',
      cookingTimeAsc: 'Temps de Cuisson (Plus Court)',
      cookingTimeDesc: 'Temps de Cuisson (Plus Long)',
      ratingDesc: 'Note (Plus Élevée)',
      ratingAsc: 'Note (Plus Basse)'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = translations[currentLanguage];

  const sortOptions = [
    { value: 'nameAsc', label: t.nameAsc, icon: 'ArrowUp' },
    { value: 'nameDesc', label: t.nameDesc, icon: 'ArrowDown' },
    { value: 'dateNewest', label: t.dateNewest, icon: 'Calendar' },
    { value: 'dateOldest', label: t.dateOldest, icon: 'Calendar' },
    { value: 'cookingTimeAsc', label: t.cookingTimeAsc, icon: 'Clock' },
    { value: 'cookingTimeDesc', label: t.cookingTimeDesc, icon: 'Clock' },
    { value: 'ratingDesc', label: t.ratingDesc, icon: 'Star' },
    { value: 'ratingAsc', label: t.ratingAsc, icon: 'Star' }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === currentSort);
    return option ? option.label : t.nameAsc;
  };

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-sm hover:bg-background transition-smooth"
      >
        <Icon name="ArrowUpDown" size={16} color="var(--color-text-secondary)" />
        <span className="text-sm text-text-secondary hidden sm:inline">{t.sortBy}:</span>
        <span className="text-sm text-text-primary font-medium">{getCurrentSortLabel()}</span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          color="var(--color-text-secondary)" 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-64 bg-background border border-border rounded-sm shadow-elevation-3 z-50">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-surface transition-smooth ${
                  currentSort === option.value ? 'bg-primary/10 text-primary' : 'text-text-secondary'
                }`}
              >
                <Icon 
                  name={option.icon} 
                  size={16} 
                  color={currentSort === option.value ? 'var(--color-primary)' : 'var(--color-text-secondary)'} 
                />
                <span className="text-sm">{option.label}</span>
                {currentSort === option.value && (
                  <Icon name="Check" size={16} color="var(--color-primary)" className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;