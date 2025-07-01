import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ 
  recipes, 
  selectedRecipes, 
  onSelectRecipe, 
  onToggleFavorite, 
  selectionMode,
  loading 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-surface rounded-md shadow-elevation-1 overflow-hidden animate-pulse">
            <div className="h-48 bg-border"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-border rounded w-3/4"></div>
              <div className="h-3 bg-border rounded w-1/2"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-border rounded w-1/4"></div>
                <div className="h-3 bg-border rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isSelected={selectedRecipes.includes(recipe.id)}
          onSelect={onSelectRecipe}
          onToggleFavorite={onToggleFavorite}
          selectionMode={selectionMode}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;