import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const QuickActions = ({ currentLanguage }) => {
  const translations = {
    en: {
      quickActions: 'Quick Actions',
      addRecipe: 'Add Recipe',
      viewRecipes: 'View Recipes',
      planMeals: 'Plan Meals',
      shoppingList: 'Shopping List'
    },
    es: {
      quickActions: 'Acciones Rápidas',
      addRecipe: 'Agregar Receta',
      viewRecipes: 'Ver Recetas',
      planMeals: 'Planificar Comidas',
      shoppingList: 'Lista de Compras'
    },
    fr: {
      quickActions: 'Actions Rapides',
      addRecipe: 'Ajouter une Recette',
      viewRecipes: 'Voir les Recettes',
      planMeals: 'Planifier les Repas',
      shoppingList: 'Liste de Courses'
    }
  };

  const t = translations[currentLanguage];

  const actions = [
    {
      label: t.addRecipe,
      icon: 'Plus',
      variant: 'primary',
      path: '/recipe-detail-editor'
    },
    {
      label: t.viewRecipes,
      icon: 'BookOpen',
      variant: 'secondary',
      path: '/recipe-management'
    },
    {
      label: t.planMeals,
      icon: 'Calendar',
      variant: 'outline',
      path: '/dashboard'
    },
    {
      label: t.shoppingList,
      icon: 'ShoppingCart',
      variant: 'ghost',
      path: '/dashboard'
    }
  ];

  return (
    <div className="bg-surface rounded-md p-4 shadow-elevation-1 border border-border">
      <h3 className="font-heading font-medium text-text-primary mb-4">{t.quickActions}</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link key={index} to={action.path}>
            <Button
              variant={action.variant}
              iconName={action.icon}
              iconPosition="left"
              fullWidth
              className="justify-start text-sm py-3"
            >
              {action.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;