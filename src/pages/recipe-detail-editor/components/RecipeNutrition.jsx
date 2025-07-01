import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const RecipeNutrition = ({ recipe, isEditing, onNutritionChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translations = {
    en: {
      nutrition: 'Nutrition Information',
      perServing: 'Per Serving',
      calories: 'Calories',
      protein: 'Protein',
      carbs: 'Carbohydrates',
      fat: 'Fat',
      fiber: 'Fiber',
      sugar: 'Sugar',
      sodium: 'Sodium',
      kcal: 'kcal',
      grams: 'g',
      milligrams: 'mg',
      notSpecified: 'Not specified'
    },
    es: {
      nutrition: 'Información Nutricional',
      perServing: 'Por Porción',
      calories: 'Calorías',
      protein: 'Proteína',
      carbs: 'Carbohidratos',
      fat: 'Grasa',
      fiber: 'Fibra',
      sugar: 'Azúcar',
      sodium: 'Sodio',
      kcal: 'kcal',
      grams: 'g',
      milligrams: 'mg',
      notSpecified: 'No especificado'
    },
    fr: {
      nutrition: 'Informations Nutritionnelles',
      perServing: 'Par Portion',
      calories: 'Calories',
      protein: 'Protéine',
      carbs: 'Glucides',
      fat: 'Graisse',
      fiber: 'Fibre',
      sugar: 'Sucre',
      sodium: 'Sodium',
      kcal: 'kcal',
      grams: 'g',
      milligrams: 'mg',
      notSpecified: 'Non spécifié'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleNutritionChange = (field, value) => {
    onNutritionChange(field, value);
  };

  const getNutritionColor = (value, type) => {
    if (!value) return 'text-text-secondary';
    
    // Simple color coding based on general nutritional guidelines
    switch (type) {
      case 'calories':
        return value > 500 ? 'text-warning' : value > 300 ? 'text-accent' : 'text-success';
      case 'protein':
        return value > 20 ? 'text-success' : value > 10 ? 'text-accent' : 'text-text-primary';
      case 'fat':
        return value > 20 ? 'text-warning' : value > 10 ? 'text-accent' : 'text-success';
      case 'sodium':
        return value > 800 ? 'text-error' : value > 400 ? 'text-warning' : 'text-success';
      default:
        return 'text-text-primary';
    }
  };

  const t = translations[currentLanguage];

  const nutritionItems = [
    {
      key: 'calories',
      label: t.calories,
      value: recipe.nutrition?.calories,
      unit: t.kcal,
      icon: 'Zap',
      color: getNutritionColor(recipe.nutrition?.calories, 'calories')
    },
    {
      key: 'protein',
      label: t.protein,
      value: recipe.nutrition?.protein,
      unit: t.grams,
      icon: 'Dumbbell',
      color: getNutritionColor(recipe.nutrition?.protein, 'protein')
    },
    {
      key: 'carbs',
      label: t.carbs,
      value: recipe.nutrition?.carbs,
      unit: t.grams,
      icon: 'Wheat',
      color: 'text-text-primary'
    },
    {
      key: 'fat',
      label: t.fat,
      value: recipe.nutrition?.fat,
      unit: t.grams,
      icon: 'Droplet',
      color: getNutritionColor(recipe.nutrition?.fat, 'fat')
    },
    {
      key: 'fiber',
      label: t.fiber,
      value: recipe.nutrition?.fiber,
      unit: t.grams,
      icon: 'Leaf',
      color: 'text-success'
    },
    {
      key: 'sugar',
      label: t.sugar,
      value: recipe.nutrition?.sugar,
      unit: t.grams,
      icon: 'Candy',
      color: 'text-text-primary'
    },
    {
      key: 'sodium',
      label: t.sodium,
      value: recipe.nutrition?.sodium,
      unit: t.milligrams,
      icon: 'Saltshaker',
      color: getNutritionColor(recipe.nutrition?.sodium, 'sodium')
    }
  ];

  const hasNutritionData = nutritionItems.some(item => item.value);

  return (
    <div className="space-y-4">
      {/* Header */}
      <h2 className="text-xl font-heading font-semibold text-text-primary flex items-center space-x-2">
        <Icon name="Activity" size={24} />
        <span>{t.nutrition}</span>
      </h2>

      {/* Per Serving Note */}
      <div className="bg-accent/5 border border-accent/20 rounded-md p-3">
        <p className="text-sm text-accent font-caption flex items-center space-x-2">
          <Icon name="Info" size={16} />
          <span>{t.perServing} ({recipe.servings || 1} servings total)</span>
        </p>
      </div>

      {/* Nutrition Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {nutritionItems.map((item) => (
          <div key={item.key} className="bg-surface rounded-md p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Icon 
                name={item.icon} 
                size={20} 
                color={item.value ? item.color : 'var(--color-text-secondary)'} 
              />
            </div>
            
            <div className="text-xs text-text-secondary font-caption mb-1">
              {item.label}
            </div>
            
            {isEditing ? (
              <Input
                type="number"
                value={item.value || ''}
                onChange={(e) => handleNutritionChange(item.key, e.target.value)}
                className="text-sm font-medium text-center"
                min="0"
                step="0.1"
                placeholder="0"
              />
            ) : (
              <div className={`text-sm font-medium ${item.color}`}>
                {item.value ? `${item.value} ${item.unit}` : t.notSpecified}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Nutrition Summary */}
      {hasNutritionData && !isEditing && (
        <div className="bg-primary/5 border border-primary/20 rounded-md p-4">
          <h3 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="BarChart3" size={18} />
            <span>Macronutrient Breakdown</span>
          </h3>
          
          <div className="space-y-2">
            {/* Calories from macros */}
            {recipe.nutrition?.protein && recipe.nutrition?.carbs && recipe.nutrition?.fat && (
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Calories from macros:</span>
                <span className="text-text-primary font-medium">
                  {(recipe.nutrition.protein * 4) + (recipe.nutrition.carbs * 4) + (recipe.nutrition.fat * 9)} kcal
                </span>
              </div>
            )}
            
            {/* Protein percentage */}
            {recipe.nutrition?.calories && recipe.nutrition?.protein && (
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Protein:</span>
                <span className="text-success font-medium">
                  {Math.round((recipe.nutrition.protein * 4 / recipe.nutrition.calories) * 100)}%
                </span>
              </div>
            )}
            
            {/* Carbs percentage */}
            {recipe.nutrition?.calories && recipe.nutrition?.carbs && (
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Carbohydrates:</span>
                <span className="text-accent font-medium">
                  {Math.round((recipe.nutrition.carbs * 4 / recipe.nutrition.calories) * 100)}%
                </span>
              </div>
            )}
            
            {/* Fat percentage */}
            {recipe.nutrition?.calories && recipe.nutrition?.fat && (
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Fat:</span>
                <span className="text-warning font-medium">
                  {Math.round((recipe.nutrition.fat * 9 / recipe.nutrition.calories) * 100)}%
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!hasNutritionData && !isEditing && (
        <div className="text-center py-8 text-text-secondary">
          <Icon name="Activity" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <p className="font-medium mb-2">No nutrition information available</p>
          <p className="text-sm">Enable edit mode to add nutrition data</p>
        </div>
      )}
    </div>
  );
};

export default RecipeNutrition;