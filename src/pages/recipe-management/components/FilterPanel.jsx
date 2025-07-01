import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ isOpen, onClose, filters, onApplyFilters }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    difficulty: false,
    cookingTime: false,
    dietary: false
  });

  const translations = {
    en: {
      filters: 'Filters',
      category: 'Category',
      difficulty: 'Difficulty Level',
      cookingTime: 'Cooking Time',
      dietary: 'Dietary Restrictions',
      apply: 'Apply Filters',
      clear: 'Clear All',
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      dessert: 'Dessert',
      snack: 'Snack',
      appetizer: 'Appetizer',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      under15: 'Under 15 min',
      under30: 'Under 30 min',
      under60: 'Under 60 min',
      over60: 'Over 60 min',
      vegetarian: 'Vegetarian',
      vegan: 'Vegan',
      glutenFree: 'Gluten Free',
      dairyFree: 'Dairy Free',
      lowCarb: 'Low Carb',
      keto: 'Keto'
    },
    es: {
      filters: 'Filtros',
      category: 'Categoría',
      difficulty: 'Nivel de Dificultad',
      cookingTime: 'Tiempo de Cocción',
      dietary: 'Restricciones Dietéticas',
      apply: 'Aplicar Filtros',
      clear: 'Limpiar Todo',
      breakfast: 'Desayuno',
      lunch: 'Almuerzo',
      dinner: 'Cena',
      dessert: 'Postre',
      snack: 'Merienda',
      appetizer: 'Aperitivo',
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil',
      under15: 'Menos de 15 min',
      under30: 'Menos de 30 min',
      under60: 'Menos de 60 min',
      over60: 'Más de 60 min',
      vegetarian: 'Vegetariano',
      vegan: 'Vegano',
      glutenFree: 'Sin Gluten',
      dairyFree: 'Sin Lácteos',
      lowCarb: 'Bajo en Carbohidratos',
      keto: 'Keto'
    },
    fr: {
      filters: 'Filtres',
      category: 'Catégorie',
      difficulty: 'Niveau de Difficulté',
      cookingTime: 'Temps de Cuisson',
      dietary: 'Restrictions Alimentaires',
      apply: 'Appliquer les Filtres',
      clear: 'Tout Effacer',
      breakfast: 'Petit-déjeuner',
      lunch: 'Déjeuner',
      dinner: 'Dîner',
      dessert: 'Dessert',
      snack: 'Collation',
      appetizer: 'Apéritif',
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile',
      under15: 'Moins de 15 min',
      under30: 'Moins de 30 min',
      under60: 'Moins de 60 min',
      over60: 'Plus de 60 min',
      vegetarian: 'Végétarien',
      vegan: 'Végétalien',
      glutenFree: 'Sans Gluten',
      dairyFree: 'Sans Produits Laitiers',
      lowCarb: 'Faible en Glucides',
      keto: 'Kéto'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const t = translations[currentLanguage];

  const filterOptions = {
    category: [
      { value: 'breakfast', label: t.breakfast },
      { value: 'lunch', label: t.lunch },
      { value: 'dinner', label: t.dinner },
      { value: 'dessert', label: t.dessert },
      { value: 'snack', label: t.snack },
      { value: 'appetizer', label: t.appetizer }
    ],
    difficulty: [
      { value: 'easy', label: t.easy },
      { value: 'medium', label: t.medium },
      { value: 'hard', label: t.hard }
    ],
    cookingTime: [
      { value: 'under15', label: t.under15 },
      { value: 'under30', label: t.under30 },
      { value: 'under60', label: t.under60 },
      { value: 'over60', label: t.over60 }
    ],
    dietary: [
      { value: 'vegetarian', label: t.vegetarian },
      { value: 'vegan', label: t.vegan },
      { value: 'glutenFree', label: t.glutenFree },
      { value: 'dairyFree', label: t.dairyFree },
      { value: 'lowCarb', label: t.lowCarb },
      { value: 'keto', label: t.keto }
    ]
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (type, value) => {
    setLocalFilters(prev => {
      const currentValues = prev[type] || [];
      const isSelected = currentValues.includes(value);
      
      return {
        ...prev,
        [type]: isSelected 
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
      };
    });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      category: [],
      difficulty: [],
      cookingTime: [],
      dietary: []
    };
    setLocalFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-text-primary/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Filter Panel */}
      <div className={`fixed inset-x-0 bottom-0 bg-background rounded-t-lg shadow-elevation-4 z-50 max-h-[80vh] overflow-hidden lg:relative lg:inset-auto lg:rounded-md lg:shadow-elevation-2 lg:max-h-none`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading font-semibold text-lg text-text-primary">{t.filters}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-sm transition-smooth lg:hidden"
          >
            <Icon name="X" size={20} color="var(--color-text-secondary)" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-120px)] lg:max-h-none">
          {Object.entries(filterOptions).map(([type, options]) => (
            <div key={type} className="border-b border-border last:border-b-0">
              <button
                onClick={() => toggleSection(type)}
                className="w-full flex items-center justify-between p-4 hover:bg-surface transition-smooth"
              >
                <span className="font-medium text-text-primary">
                  {type === 'category' && t.category}
                  {type === 'difficulty' && t.difficulty}
                  {type === 'cookingTime' && t.cookingTime}
                  {type === 'dietary' && t.dietary}
                </span>
                <Icon 
                  name={expandedSections[type] ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  color="var(--color-text-secondary)" 
                />
              </button>
              
              {expandedSections[type] && (
                <div className="px-4 pb-4 space-y-2">
                  {options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={(localFilters[type] || []).includes(option.value)}
                        onChange={() => handleFilterChange(type, option.value)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="text-text-secondary">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-4 border-t border-border bg-surface">
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex-1"
          >
            {t.clear}
          </Button>
          <Button
            variant="primary"
            onClick={handleApply}
            className="flex-1"
          >
            {t.apply}
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;