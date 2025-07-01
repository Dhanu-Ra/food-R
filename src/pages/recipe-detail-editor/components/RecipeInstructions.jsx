import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const RecipeInstructions = ({ recipe, isEditing, onInstructionsChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const translations = {
    en: {
      instructions: 'Instructions',
      addStep: 'Add Step',
      step: 'Step',
      instruction: 'Instruction',
      remove: 'Remove',
      moveUp: 'Move Up',
      moveDown: 'Move Down',
      addImage: 'Add Image',
      cookingMode: 'Cooking Mode',
      checkOffSteps: 'Check off steps as you complete them'
    },
    es: {
      instructions: 'Instrucciones',
      addStep: 'Agregar Paso',
      step: 'Paso',
      instruction: 'Instrucción',
      remove: 'Eliminar',
      moveUp: 'Subir',
      moveDown: 'Bajar',
      addImage: 'Agregar Imagen',
      cookingMode: 'Modo Cocina',
      checkOffSteps: 'Marca los pasos mientras los completas'
    },
    fr: {
      instructions: 'Instructions',
      addStep: 'Ajouter Étape',
      step: 'Étape',
      instruction: 'Instruction',
      remove: 'Supprimer',
      moveUp: 'Monter',
      moveDown: 'Descendre',
      addImage: 'Ajouter Image',
      cookingMode: 'Mode Cuisine',
      checkOffSteps: 'Cochez les étapes au fur et à mesure'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleInstructionChange = (index, field, value) => {
    const updatedInstructions = [...recipe.instructions];
    updatedInstructions[index] = {
      ...updatedInstructions[index],
      [field]: value
    };
    onInstructionsChange(updatedInstructions);
  };

  const handleAddStep = () => {
    const newStep = {
      id: Date.now(),
      text: '',
      image: null
    };
    onInstructionsChange([...recipe.instructions, newStep]);
  };

  const handleRemoveStep = (index) => {
    const updatedInstructions = recipe.instructions.filter((_, i) => i !== index);
    onInstructionsChange(updatedInstructions);
  };

  const handleMoveStep = (index, direction) => {
    const updatedInstructions = [...recipe.instructions];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < updatedInstructions.length) {
      [updatedInstructions[index], updatedInstructions[newIndex]] = 
      [updatedInstructions[newIndex], updatedInstructions[index]];
      onInstructionsChange(updatedInstructions);
    }
  };

  const handleStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepIndex)) {
      newCompleted.delete(stepIndex);
    } else {
      newCompleted.add(stepIndex);
    }
    setCompletedSteps(newCompleted);
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInstructionChange(index, 'image', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const t = translations[currentLanguage];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="List" size={24} />
          <span>{t.instructions}</span>
        </h2>
        
        {!isEditing && (
          <Button
            variant="outline"
            iconName="ChefHat"
            iconSize={16}
            size="sm"
          >
            {t.cookingMode}
          </Button>
        )}
      </div>

      {/* Cooking Mode Helper */}
      {!isEditing && recipe.instructions.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-md p-3">
          <p className="text-sm text-primary font-caption flex items-center space-x-2">
            <Icon name="Info" size={16} />
            <span>{t.checkOffSteps}</span>
          </p>
        </div>
      )}

      {/* Instructions List */}
      <div className="space-y-4">
        {recipe.instructions.map((instruction, index) => (
          <div key={instruction.id || index} className="bg-surface rounded-md p-4">
            {isEditing ? (
              <div className="space-y-3">
                {/* Step Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="font-medium text-text-primary">{t.step} {index + 1}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      onClick={() => handleMoveStep(index, 'up')}
                      iconName="ChevronUp"
                      iconSize={16}
                      className="p-1"
                      disabled={index === 0}
                      aria-label={t.moveUp}
                    />
                    <Button
                      variant="ghost"
                      onClick={() => handleMoveStep(index, 'down')}
                      iconName="ChevronDown"
                      iconSize={16}
                      className="p-1"
                      disabled={index === recipe.instructions.length - 1}
                      aria-label={t.moveDown}
                    />
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveStep(index)}
                      iconName="Trash2"
                      iconSize={16}
                      className="p-1 text-error hover:bg-error/10"
                      aria-label={t.remove}
                    />
                  </div>
                </div>
                
                {/* Instruction Text */}
                <textarea
                  value={instruction.text}
                  onChange={(e) => handleInstructionChange(index, 'text', e.target.value)}
                  placeholder={`${t.instruction} ${index + 1}...`}
                  className="w-full min-h-20 p-3 bg-background border border-border rounded-md resize-none focus:ring-2 focus:ring-primary focus:border-primary"
                  rows="3"
                />
                
                {/* Image Upload */}
                <div className="flex items-center space-x-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(index, e)}
                    className="hidden"
                    id={`step-image-${index}`}
                  />
                  <label
                    htmlFor={`step-image-${index}`}
                    className="cursor-pointer flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-smooth"
                  >
                    <Icon name="ImagePlus" size={16} />
                    <span>{t.addImage}</span>
                  </label>
                  
                  {instruction.image && (
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <img
                        src={instruction.image}
                        alt={`Step ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleInstructionChange(index, 'image', null)}
                        className="absolute top-1 right-1 w-5 h-5 bg-error text-white rounded-full flex items-center justify-center text-xs hover:bg-error/80 transition-smooth"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                {/* Step Number & Checkbox */}
                <div className="flex-shrink-0 flex flex-col items-center space-y-2">
                  <button
                    onClick={() => handleStepComplete(index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-smooth ${
                      completedSteps.has(index)
                        ? 'bg-success text-white' :'bg-primary text-primary-foreground hover:bg-primary/80'
                    }`}
                  >
                    {completedSteps.has(index) ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      index + 1
                    )}
                  </button>
                  
                  {index < recipe.instructions.length - 1 && (
                    <div className="w-0.5 h-8 bg-border"></div>
                  )}
                </div>
                
                {/* Step Content */}
                <div className="flex-1 space-y-3">
                  <p className={`text-text-primary leading-relaxed transition-smooth ${
                    completedSteps.has(index) ? 'line-through text-text-secondary' : ''
                  }`}>
                    {instruction.text}
                  </p>
                  
                  {instruction.image && (
                    <div className="w-32 h-24 rounded-md overflow-hidden">
                      <img
                        src={instruction.image}
                        alt={`Step ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Step Button */}
      {isEditing && (
        <Button
          variant="outline"
          onClick={handleAddStep}
          iconName="Plus"
          iconSize={16}
          className="w-full"
        >
          {t.addStep}
        </Button>
      )}

      {/* Empty State */}
      {recipe.instructions.length === 0 && (
        <div className="text-center py-8 text-text-secondary">
          <Icon name="List" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <p className="font-medium mb-2">No instructions added yet</p>
          {isEditing && (
            <p className="text-sm">Click "Add Step" to get started</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeInstructions;