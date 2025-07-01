import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const FloatingActionButton = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const translations = {
    en: {
      createRecipe: 'Create Recipe',
      addRecipe: 'Add Recipe'
    },
    es: {
      createRecipe: 'Crear Receta',
      addRecipe: 'Agregar Receta'
    },
    fr: {
      createRecipe: 'Créer une Recette',
      addRecipe: 'Ajouter une Recette'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const authPages = ['/user-registration', '/user-login', '/password-reset'];
    const hideOnPages = [...authPages, '/recipe-detail-editor'];
    setIsVisible(!hideOnPages.includes(location.pathname));
  }, [location.pathname]);

  const handleClick = () => {
    navigate('/recipe-detail-editor');
  };

  if (!isVisible) {
    return null;
  }

  const t = translations[currentLanguage];

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 w-fab h-fab bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-elevation-3 hover:shadow-elevation-4 transition-smooth z-fab group"
      aria-label={t.createRecipe}
    >
      <div className="flex items-center justify-center w-full h-full">
        <Icon 
          name="Plus" 
          size={24} 
          color="var(--color-accent-foreground)" 
          className="transition-smooth group-hover:scale-110" 
        />
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-text-primary text-background text-sm font-caption rounded-sm opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap">
        {t.addRecipe}
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-primary"></div>
      </div>
    </button>
  );
};

export default FloatingActionButton;