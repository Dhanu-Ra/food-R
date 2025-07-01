import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RecentRecipeCard = ({ recipe }) => {
  return (
    <Link 
      to="/recipe-detail-editor" 
      className="flex-shrink-0 w-64 bg-surface rounded-md shadow-elevation-1 border border-border overflow-hidden hover:shadow-elevation-2 transition-smooth"
    >
      <div className="relative h-32 overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <button className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-smooth">
            <Icon 
              name={recipe.isFavorite ? 'Heart' : 'Heart'} 
              size={16} 
              color={recipe.isFavorite ? 'var(--color-error)' : 'var(--color-text-secondary)'} 
              fill={recipe.isFavorite ? 'var(--color-error)' : 'none'}
            />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-medium text-text-primary mb-2 line-clamp-2">{recipe.title}</h3>
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <div className="flex items-center">
            <Icon name="Clock" size={14} className="mr-1" />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center">
            <Icon name="Users" size={14} className="mr-1" />
            <span>{recipe.servings}</span>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={12}
                color={i < recipe.rating ? 'var(--color-warning)' : 'var(--color-border)'}
                fill={i < recipe.rating ? 'var(--color-warning)' : 'none'}
              />
            ))}
          </div>
          <span className="text-xs text-text-secondary ml-2">({recipe.reviews})</span>
        </div>
      </div>
    </Link>
  );
};

export default RecentRecipeCard;