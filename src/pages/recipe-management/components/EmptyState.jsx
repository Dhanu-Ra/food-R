import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ hasFilters, onClearFilters }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  const translations = {
    en: {
      noRecipes: 'No Recipes Found',
      noRecipesDesc: 'Start building your recipe collection by adding your first recipe.',
      noFilterResults: 'No Recipes Match Your Filters',
      noFilterResultsDesc: 'Try adjusting your filters or search terms to find more recipes.',
      addFirstRecipe: 'Add Your First Recipe',
      clearFilters: 'Clear Filters',
      createRecipe: 'Create Recipe'
    },
    es: {
      noRecipes: 'No se Encontraron Recetas',
      noRecipesDesc: 'Comienza a construir tu colección de recetas agregando tu primera receta.',
      noFilterResults: 'Ninguna Receta Coincide con tus Filtros',
      noFilterResultsDesc: 'Intenta ajustar tus filtros o términos de búsqueda para encontrar más recetas.',
      addFirstRecipe: 'Agregar tu Primera Receta',
      clearFilters: 'Limpiar Filtros',
      createRecipe: 'Crear Receta'
    },
    fr: {
      noRecipes: 'Aucune Recette Trouvée',
      noRecipesDesc: 'Commencez à construire votre collection de recettes en ajoutant votre première recette.',
      noFilterResults: 'Aucune Recette ne Correspond à vos Filtres',
      noFilterResultsDesc: 'Essayez d\'ajuster vos filtres ou termes de recherche pour trouver plus de recettes.',
      addFirstRecipe: 'Ajouter votre Première Recette',
      clearFilters: 'Effacer les Filtres',
      createRecipe: 'Créer une Recette'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleCreateRecipe = () => {
    navigate('/recipe-detail-editor');
  };

  const t = translations[currentLanguage];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6">
        <Icon 
          name={hasFilters ? "Search" : "ChefHat"} 
          size={48} 
          color="var(--color-text-secondary)" 
        />
      </div>
      
      <h3 className="font-heading font-semibold text-xl text-text-primary mb-2">
        {hasFilters ? t.noFilterResults : t.noRecipes}
      </h3>
      
      <p className="text-text-secondary mb-8 max-w-md">
        {hasFilters ? t.noFilterResultsDesc : t.noRecipesDesc}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {hasFilters ? (
          <>
            <Button
              variant="outline"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              {t.clearFilters}
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateRecipe}
              iconName="Plus"
              iconPosition="left"
            >
              {t.createRecipe}
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            onClick={handleCreateRecipe}
            iconName="Plus"
            iconPosition="left"
          >
            {t.addFirstRecipe}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;