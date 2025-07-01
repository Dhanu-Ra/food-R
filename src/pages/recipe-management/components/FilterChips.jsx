import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translations = {
    en: {
      clearAll: 'Clear All',
      category: 'Category',
      difficulty: 'Difficulty',
      cookingTime: 'Cooking Time',
      dietary: 'Dietary'
    },
    es: {
      clearAll: 'Limpiar Todo',
      category: 'Categoría',
      difficulty: 'Dificultad',
      cookingTime: 'Tiempo de Cocción',
      dietary: 'Dietético'
    },
    fr: {
      clearAll: 'Tout Effacer',
      category: 'Catégorie',
      difficulty: 'Difficulté',
      cookingTime: 'Temps de Cuisson',
      dietary: 'Diététique'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  if (!activeFilters || activeFilters.length === 0) {
    return null;
  }

  const t = translations[currentLanguage];

  const getFilterLabel = (filter) => {
    switch (filter.type) {
      case 'category':
        return `${t.category}: ${filter.value}`;
      case 'difficulty':
        return `${t.difficulty}: ${filter.value}`;
      case 'cookingTime':
        return `${t.cookingTime}: ${filter.value}`;
      case 'dietary':
        return `${t.dietary}: ${filter.value}`;
      default:
        return filter.value;
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 min-w-max">
        {activeFilters.map((filter, index) => (
          <div
            key={`${filter.type}-${filter.value}-${index}`}
            className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-caption whitespace-nowrap"
          >
            <span>{getFilterLabel(filter)}</span>
            <button
              onClick={() => onRemoveFilter(filter)}
              className="p-0.5 hover:bg-primary/20 rounded-full transition-smooth"
            >
              <Icon name="X" size={12} color="var(--color-primary)" />
            </button>
          </div>
        ))}
        
        {activeFilters.length > 1 && (
          <button
            onClick={onClearAll}
            className="px-3 py-1 text-text-secondary hover:text-error text-sm font-caption whitespace-nowrap transition-smooth"
          >
            {t.clearAll}
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;