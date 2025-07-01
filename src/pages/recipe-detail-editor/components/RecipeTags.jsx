import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RecipeTags = ({ recipe, isEditing, onTagsChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [newTag, setNewTag] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const translations = {
    en: {
      tags: 'Tags & Categories',
      addTag: 'Add Tag',
      enterTag: 'Enter tag name...',
      popularTags: 'Popular Tags',
      remove: 'Remove tag'
    },
    es: {
      tags: 'Etiquetas y Categorías',
      addTag: 'Agregar Etiqueta',
      enterTag: 'Ingresa nombre de etiqueta...',
      popularTags: 'Etiquetas Populares',
      remove: 'Eliminar etiqueta'
    },
    fr: {
      tags: 'Tags et Catégories',
      addTag: 'Ajouter Tag',
      enterTag: 'Entrez le nom du tag...',
      popularTags: 'Tags Populaires',
      remove: 'Supprimer le tag'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const popularTags = [
    'Quick & Easy', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free', 
    'Low-Carb', 'High-Protein', 'Comfort Food', 'Spicy', 'Sweet',
    'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert',
    'Italian', 'Mexican', 'Asian', 'Mediterranean', 'American',
    'One-Pot', 'Make-Ahead', 'Freezer-Friendly', 'Kid-Friendly', 'Date Night'
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !recipe.tags.includes(newTag.trim())) {
      onTagsChange([...recipe.tags, newTag.trim()]);
      setNewTag('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onTagsChange(recipe.tags.filter(tag => tag !== tagToRemove));
  };

  const handleSuggestionClick = (tag) => {
    if (!recipe.tags.includes(tag)) {
      onTagsChange([...recipe.tags, tag]);
    }
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const getTagColor = (tag) => {
    const colors = [
      'bg-primary/10 text-primary border-primary/20',
      'bg-secondary/10 text-secondary border-secondary/20',
      'bg-accent/10 text-accent border-accent/20',
      'bg-success/10 text-success border-success/20',
      'bg-warning/10 text-warning border-warning/20'
    ];
    
    // Simple hash function to consistently assign colors
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const filteredSuggestions = popularTags.filter(tag => 
    !recipe.tags.includes(tag) && 
    tag.toLowerCase().includes(newTag.toLowerCase())
  );

  const t = translations[currentLanguage];

  return (
    <div className="space-y-4">
      {/* Header */}
      <h2 className="text-xl font-heading font-semibold text-text-primary flex items-center space-x-2">
        <Icon name="Tags" size={24} />
        <span>{t.tags}</span>
      </h2>

      {/* Current Tags */}
      {recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag, index) => (
            <div
              key={index}
              className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border transition-smooth ${getTagColor(tag)}`}
            >
              <span>{tag}</span>
              {isEditing && (
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:opacity-70 transition-smooth"
                  aria-label={`${t.remove}: ${tag}`}
                >
                  <Icon name="X" size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Tag Input */}
      {isEditing && (
        <div className="space-y-3">
          <div className="relative">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  value={newTag}
                  onChange={(e) => {
                    setNewTag(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder={t.enterTag}
                  className="w-full"
                  onFocus={() => setShowSuggestions(newTag.length > 0)}
                />
                
                {/* Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-elevation-2 max-h-48 overflow-y-auto z-10">
                    <div className="p-2">
                      <p className="text-xs text-text-secondary font-caption mb-2">{t.popularTags}</p>
                      {filteredSuggestions.slice(0, 8).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleSuggestionClick(tag)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-surface rounded-sm transition-smooth"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Button
                variant="primary"
                onClick={handleAddTag}
                iconName="Plus"
                iconSize={16}
                disabled={!newTag.trim()}
              >
                {t.addTag}
              </Button>
            </div>
          </div>

          {/* Popular Tags Quick Add */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-text-primary">{t.popularTags}:</p>
            <div className="flex flex-wrap gap-2">
              {popularTags.slice(0, 12).filter(tag => !recipe.tags.includes(tag)).map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSuggestionClick(tag)}
                  className="px-3 py-1 text-xs bg-surface hover:bg-primary/10 border border-border hover:border-primary/20 rounded-full transition-smooth"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {recipe.tags.length === 0 && (
        <div className="text-center py-8 text-text-secondary">
          <Icon name="Tags" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <p className="font-medium mb-2">No tags added yet</p>
          {isEditing && (
            <p className="text-sm">Add tags to help categorize and find this recipe</p>
          )}
        </div>
      )}

      {/* Tag Statistics */}
      {recipe.tags.length > 0 && !isEditing && (
        <div className="bg-surface rounded-md p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Total tags:</span>
            <span className="text-text-primary font-medium">{recipe.tags.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeTags;