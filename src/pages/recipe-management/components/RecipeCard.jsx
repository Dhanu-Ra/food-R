import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecipeCard = ({ recipe, isSelected, onSelect, onToggleFavorite, selectionMode }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  const translations = {
    en: {
      minutes: 'min',
      servings: 'servings',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard'
    },
    es: {
      minutes: 'min',
      servings: 'porciones',
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil'
    },
    fr: {
      minutes: 'min',
      servings: 'portions',
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleCardClick = (e) => {
    if (selectionMode) {
      e.preventDefault();
      onSelect(recipe.id);
    } else {
      navigate('/recipe-detail-editor', { state: { recipe } });
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(recipe.id);
  };

  const handleSelectClick = (e) => {
    e.stopPropagation();
    onSelect(recipe.id);
  };

  const getDifficultyText = (difficulty) => {
    const t = translations[currentLanguage];
    switch (difficulty) {
      case 'easy': return t.easy;
      case 'medium': return t.medium;
      case 'hard': return t.hard;
      default: return t.easy;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-error';
      default: return 'text-success';
    }
  };

  const t = translations[currentLanguage];

  return (
    <div 
      className={`bg-surface rounded-md shadow-elevation-1 hover:shadow-elevation-2 transition-smooth cursor-pointer overflow-hidden ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* Recipe Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        
        {/* Selection Checkbox */}
        {selectionMode && (
          <div className="absolute top-2 left-2">
            <button
              onClick={handleSelectClick}
              className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center transition-smooth ${
                isSelected 
                  ? 'bg-primary border-primary' :'bg-background border-border hover:border-primary'
              }`}
            >
              {isSelected && (
                <Icon name="Check" size={14} color="var(--color-primary-foreground)" />
              )}
            </button>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 bg-background/80 rounded-full hover:bg-background transition-smooth"
        >
          <Icon 
            name={recipe.isFavorite ? "Heart" : "Heart"} 
            size={16} 
            color={recipe.isFavorite ? "var(--color-error)" : "var(--color-text-secondary)"}
            fill={recipe.isFavorite ? "var(--color-error)" : "none"}
          />
        </button>

        {/* Category Badge */}
        <div className="absolute bottom-2 left-2">
          <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-caption rounded-sm">
            {recipe.category}
          </span>
        </div>
      </div>

      {/* Recipe Info */}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} color="var(--color-text-secondary)" />
            <span>{recipe.cookingTime} {t.minutes}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} color="var(--color-text-secondary)" />
            <span>{recipe.servings} {t.servings}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={14} color="var(--color-text-secondary)" />
            <span className={`text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
              {getDifficultyText(recipe.difficulty)}
            </span>
          </div>
          
          {recipe.rating && (
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} color="var(--color-warning)" fill="var(--color-warning)" />
              <span className="text-sm font-medium text-text-primary">{recipe.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;