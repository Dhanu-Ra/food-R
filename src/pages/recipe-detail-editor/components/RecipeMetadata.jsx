import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const RecipeMetadata = ({ recipe, isEditing, onMetadataChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translations = {
    en: {
      prepTime: 'Prep Time',
      cookTime: 'Cook Time',
      totalTime: 'Total Time',
      servings: 'Servings',
      difficulty: 'Difficulty',
      category: 'Category',
      cuisine: 'Cuisine',
      minutes: 'min',
      people: 'people',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard'
    },
    es: {
      prepTime: 'Tiempo Prep',
      cookTime: 'Tiempo Cocción',
      totalTime: 'Tiempo Total',
      servings: 'Porciones',
      difficulty: 'Dificultad',
      category: 'Categoría',
      cuisine: 'Cocina',
      minutes: 'min',
      people: 'personas',
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil'
    },
    fr: {
      prepTime: 'Temps Préparation',
      cookTime: 'Temps Cuisson',
      totalTime: 'Temps Total',
      servings: 'Portions',
      difficulty: 'Difficulté',
      category: 'Catégorie',
      cuisine: 'Cuisine',
      minutes: 'min',
      people: 'personnes',
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': case'fácil': case'facile':
        return 'text-success';
      case 'medium': case'medio': case'moyen':
        return 'text-warning';
      case 'hard': case'difícil': case'difficile':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': case'fácil': case'facile':
        return 'Circle';
      case 'medium': case'medio': case'moyen':
        return 'CircleDot';
      case 'hard': case'difícil': case'difficile':
        return 'CircleDashed';
      default:
        return 'Circle';
    }
  };

  const handleInputChange = (field, value) => {
    onMetadataChange(field, value);
  };

  const t = translations[currentLanguage];

  const metadataItems = [
    {
      key: 'prepTime',
      label: t.prepTime,
      value: recipe.prepTime,
      icon: 'Clock',
      suffix: t.minutes,
      type: 'number'
    },
    {
      key: 'cookTime',
      label: t.cookTime,
      value: recipe.cookTime,
      icon: 'Timer',
      suffix: t.minutes,
      type: 'number'
    },
    {
      key: 'servings',
      label: t.servings,
      value: recipe.servings,
      icon: 'Users',
      suffix: t.people,
      type: 'number'
    },
    {
      key: 'difficulty',
      label: t.difficulty,
      value: recipe.difficulty,
      icon: getDifficultyIcon(recipe.difficulty),
      type: 'select',
      options: [
        { value: 'easy', label: t.easy },
        { value: 'medium', label: t.medium },
        { value: 'hard', label: t.hard }
      ]
    }
  ];

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <div className="space-y-4">
      {/* Time and Servings Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metadataItems.map((item) => (
          <div key={item.key} className="bg-surface rounded-md p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Icon 
                name={item.icon} 
                size={20} 
                color={item.key === 'difficulty' ? getDifficultyColor(item.value) : 'var(--color-primary)'} 
              />
            </div>
            
            <div className="text-xs text-text-secondary font-caption mb-1">
              {item.label}
            </div>
            
            {isEditing ? (
              item.type === 'select' ? (
                <select
                  value={item.value || ''}
                  onChange={(e) => handleInputChange(item.key, e.target.value)}
                  className="w-full text-sm font-medium text-center bg-transparent border border-border rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select...</option>
                  {item.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  type={item.type}
                  value={item.value || ''}
                  onChange={(e) => handleInputChange(item.key, e.target.value)}
                  className="text-sm font-medium text-center"
                  min="0"
                />
              )
            ) : (
              <div className={`text-sm font-medium ${item.key === 'difficulty' ? getDifficultyColor(item.value) : 'text-text-primary'}`}>
                {item.value || 0}
                {item.suffix && ` ${item.suffix}`}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Total Time Display */}
      {totalTime > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-md p-3 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Clock" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">
              {t.totalTime}: {totalTime} {t.minutes}
            </span>
          </div>
        </div>
      )}

      {/* Category and Cuisine */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary flex items-center space-x-2">
            <Icon name="Tag" size={16} />
            <span>{t.category}</span>
          </label>
          {isEditing ? (
            <Input
              type="text"
              value={recipe.category || ''}
              onChange={(e) => handleInputChange('category', e.target.value)}
              placeholder="e.g., Breakfast, Dinner"
              className="w-full"
            />
          ) : (
            <div className="text-text-secondary">
              {recipe.category || 'Not specified'}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary flex items-center space-x-2">
            <Icon name="Globe" size={16} />
            <span>{t.cuisine}</span>
          </label>
          {isEditing ? (
            <Input
              type="text"
              value={recipe.cuisine || ''}
              onChange={(e) => handleInputChange('cuisine', e.target.value)}
              placeholder="e.g., Italian, Mexican"
              className="w-full"
            />
          ) : (
            <div className="text-text-secondary">
              {recipe.cuisine || 'Not specified'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeMetadata;