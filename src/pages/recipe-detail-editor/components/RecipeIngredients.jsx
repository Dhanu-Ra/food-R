import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RecipeIngredients = ({ recipe, isEditing, onIngredientsChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());

  const translations = {
    en: {
      ingredients: 'Ingredients',
      addIngredient: 'Add Ingredient',
      quantity: 'Quantity',
      unit: 'Unit',
      ingredient: 'Ingredient',
      remove: 'Remove',
      addToShoppingList: 'Add to Shopping List',
      checkOff: 'Check off as you cook'
    },
    es: {
      ingredients: 'Ingredientes',
      addIngredient: 'Agregar Ingrediente',
      quantity: 'Cantidad',
      unit: 'Unidad',
      ingredient: 'Ingrediente',
      remove: 'Eliminar',
      addToShoppingList: 'Agregar a Lista de Compras',
      checkOff: 'Marcar mientras cocinas'
    },
    fr: {
      ingredients: 'Ingrédients',
      addIngredient: 'Ajouter Ingrédient',
      quantity: 'Quantité',
      unit: 'Unité',
      ingredient: 'Ingrédient',
      remove: 'Supprimer',
      addToShoppingList: 'Ajouter à la Liste de Courses',
      checkOff: 'Cocher en cuisinant'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const commonUnits = [
    'cup', 'cups', 'tbsp', 'tsp', 'oz', 'lb', 'g', 'kg', 'ml', 'l', 
    'piece', 'pieces', 'clove', 'cloves', 'slice', 'slices'
  ];

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value
    };
    onIngredientsChange(updatedIngredients);
  };

  const handleAddIngredient = () => {
    const newIngredient = {
      id: Date.now(),
      quantity: '',
      unit: '',
      name: ''
    };
    onIngredientsChange([...recipe.ingredients, newIngredient]);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
    onIngredientsChange(updatedIngredients);
  };

  const handleIngredientCheck = (ingredientId) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(ingredientId)) {
      newChecked.delete(ingredientId);
    } else {
      newChecked.add(ingredientId);
    }
    setCheckedIngredients(newChecked);
  };

  const handleAddToShoppingList = () => {
    // Mock shopping list functionality
    alert('Ingredients added to shopping list!');
  };

  const t = translations[currentLanguage];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="ShoppingCart" size={24} />
          <span>{t.ingredients}</span>
        </h2>
        
        {!isEditing && recipe.ingredients.length > 0 && (
          <Button
            variant="outline"
            onClick={handleAddToShoppingList}
            iconName="Plus"
            iconSize={16}
            size="sm"
          >
            {t.addToShoppingList}
          </Button>
        )}
      </div>

      {/* Cooking Mode Helper */}
      {!isEditing && recipe.ingredients.length > 0 && (
        <div className="bg-accent/5 border border-accent/20 rounded-md p-3">
          <p className="text-sm text-accent font-caption flex items-center space-x-2">
            <Icon name="Info" size={16} />
            <span>{t.checkOff}</span>
          </p>
        </div>
      )}

      {/* Ingredients List */}
      <div className="space-y-3">
        {recipe.ingredients.map((ingredient, index) => (
          <div key={ingredient.id || index} className="bg-surface rounded-md p-4">
            {isEditing ? (
              <div className="grid grid-cols-12 gap-3 items-center">
                {/* Quantity */}
                <div className="col-span-3">
                  <Input
                    type="text"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                    placeholder={t.quantity}
                    className="text-sm"
                  />
                </div>
                
                {/* Unit */}
                <div className="col-span-3">
                  <select
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                    className="w-full text-sm bg-background border border-border rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">{t.unit}</option>
                    {commonUnits.map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                
                {/* Ingredient Name */}
                <div className="col-span-5">
                  <Input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    placeholder={t.ingredient}
                    className="text-sm"
                  />
                </div>
                
                {/* Remove Button */}
                <div className="col-span-1">
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveIngredient(index)}
                    iconName="Trash2"
                    iconSize={16}
                    className="p-2 text-error hover:bg-error/10"
                    aria-label={t.remove}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* Checkbox */}
                <button
                  onClick={() => handleIngredientCheck(ingredient.id || index)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-smooth ${
                    checkedIngredients.has(ingredient.id || index)
                      ? 'bg-success border-success' :'border-border hover:border-primary'
                  }`}
                >
                  {checkedIngredients.has(ingredient.id || index) && (
                    <Icon name="Check" size={14} color="white" />
                  )}
                </button>
                
                {/* Ingredient Text */}
                <div className={`flex-1 transition-smooth ${
                  checkedIngredients.has(ingredient.id || index)
                    ? 'line-through text-text-secondary' :'text-text-primary'
                }`}>
                  <span className="font-medium">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                  <span className="ml-2">{ingredient.name}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Ingredient Button */}
      {isEditing && (
        <Button
          variant="outline"
          onClick={handleAddIngredient}
          iconName="Plus"
          iconSize={16}
          className="w-full"
        >
          {t.addIngredient}
        </Button>
      )}

      {/* Empty State */}
      {recipe.ingredients.length === 0 && (
        <div className="text-center py-8 text-text-secondary">
          <Icon name="ShoppingCart" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <p className="font-medium mb-2">No ingredients added yet</p>
          {isEditing && (
            <p className="text-sm">Click "Add Ingredient" to get started</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeIngredients;