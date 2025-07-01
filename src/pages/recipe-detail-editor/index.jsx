import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/ui/Button';
import RecipeHeader from './components/RecipeHeader';
import RecipeHeroImage from './components/RecipeHeroImage';
import RecipeMetadata from './components/RecipeMetadata';
import RecipeIngredients from './components/RecipeIngredients';
import RecipeInstructions from './components/RecipeInstructions';
import RecipeNutrition from './components/RecipeNutrition';
import RecipeTags from './components/RecipeTags';
import ImageGalleryModal from './components/ImageGalleryModal';

const RecipeDetailEditor = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [recipe, setRecipe] = useState({
    id: 1,
    title: "Mediterranean Quinoa Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    description: `A nutritious and colorful Mediterranean-inspired quinoa bowl packed with fresh vegetables, creamy feta cheese, and a zesty lemon-herb dressing.\n\nThis wholesome meal combines the nutty flavor of quinoa with the vibrant tastes of the Mediterranean, creating a satisfying dish that's perfect for lunch or dinner.`,
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "easy",
    category: "Main Course",
    cuisine: "Mediterranean",
    ingredients: [
      { id: 1, quantity: "1", unit: "cup", name: "quinoa, rinsed" },
      { id: 2, quantity: "2", unit: "cups", name: "vegetable broth" },
      { id: 3, quantity: "1", unit: "cup", name: "cherry tomatoes, halved" },
      { id: 4, quantity: "1", unit: "cup", name: "cucumber, diced" },
      { id: 5, quantity: "1/2", unit: "cup", name: "red onion, finely chopped" },
      { id: 6, quantity: "1/2", unit: "cup", name: "kalamata olives, pitted" },
      { id: 7, quantity: "1/2", unit: "cup", name: "feta cheese, crumbled" },
      { id: 8, quantity: "1/4", unit: "cup", name: "fresh parsley, chopped" },
      { id: 9, quantity: "3", unit: "tbsp", name: "extra virgin olive oil" },
      { id: 10, quantity: "2", unit: "tbsp", name: "lemon juice" },
      { id: 11, quantity: "1", unit: "tsp", name: "dried oregano" },
      { id: 12, quantity: "1/2", unit: "tsp", name: "salt" },
      { id: 13, quantity: "1/4", unit: "tsp", name: "black pepper" }
    ],
    instructions: [
      {
        id: 1,
        text: "Rinse quinoa under cold water until water runs clear. In a medium saucepan, bring vegetable broth to a boil.",
        image: null
      },
      {
        id: 2,
        text: "Add quinoa to boiling broth, reduce heat to low, cover and simmer for 15 minutes until liquid is absorbed.",
        image: null
      },
      {
        id: 3,
        text: "Remove from heat and let stand 5 minutes. Fluff with a fork and let cool to room temperature.",
        image: null
      },
      {
        id: 4,
        text: "While quinoa cools, prepare vegetables: halve cherry tomatoes, dice cucumber, and finely chop red onion.",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop"
      },
      {
        id: 5,
        text: "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper to make dressing.",
        image: null
      },
      {
        id: 6,
        text: "In a large bowl, combine cooled quinoa, prepared vegetables, olives, and feta cheese.",
        image: null
      },
      {
        id: 7,
        text: "Pour dressing over quinoa mixture and toss gently to combine. Garnish with fresh parsley and serve.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
      }
    ],
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 14,
      fiber: 6,
      sugar: 8,
      sodium: 580
    },
    tags: ["Healthy", "Vegetarian", "Mediterranean", "Quick & Easy", "High-Protein", "Gluten-Free"],
    gallery: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop"
    ],
    createdAt: new Date('2024-01-15'),updatedAt: new Date('2024-01-20')
  });

  const location = useLocation();

  const translations = {
    en: {
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      printRecipe: 'Print Recipe',
      description: 'Description'
    },
    es: {
      saveChanges: 'Guardar Cambios',
      saving: 'Guardando...',
      printRecipe: 'Imprimir Receta',
      description: 'Descripción'
    },
    fr: {
      saveChanges: 'Sauvegarder',
      saving: 'Sauvegarde...',
      printRecipe: 'Imprimer Recette',
      description: 'Description'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Check if we're coming from recipe management with edit intent
    if (location.state?.edit) {
      setIsEditing(true);
    }
  }, [location.state]);

  const handleToggleEdit = () => {
    if (isEditing && hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to cancel editing?')) {
        setIsEditing(false);
        setHasUnsavedChanges(false);
      }
    } else {
      setIsEditing(!isEditing);
    }
  };

  const handleSave = () => {
    // Mock save functionality
    setTimeout(() => {
      setHasUnsavedChanges(false);
      setIsEditing(false);
      // Show success message
      alert('Recipe saved successfully!');
    }, 1000);
  };

  const handleTitleChange = (newTitle) => {
    setRecipe(prev => ({ ...prev, title: newTitle }));
    setHasUnsavedChanges(true);
  };

  const handleImageChange = (newImage) => {
    setRecipe(prev => ({ ...prev, image: newImage }));
    setHasUnsavedChanges(true);
  };

  const handleMetadataChange = (field, value) => {
    setRecipe(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleIngredientsChange = (newIngredients) => {
    setRecipe(prev => ({ ...prev, ingredients: newIngredients }));
    setHasUnsavedChanges(true);
  };

  const handleInstructionsChange = (newInstructions) => {
    setRecipe(prev => ({ ...prev, instructions: newInstructions }));
    setHasUnsavedChanges(true);
  };

  const handleNutritionChange = (field, value) => {
    setRecipe(prev => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleTagsChange = (newTags) => {
    setRecipe(prev => ({ ...prev, tags: newTags }));
    setHasUnsavedChanges(true);
  };

  const handleDescriptionChange = (newDescription) => {
    setRecipe(prev => ({ ...prev, description: newDescription }));
    setHasUnsavedChanges(true);
  };

  const handleGalleryUpdate = (newGallery) => {
    setRecipe(prev => ({ ...prev, gallery: newGallery }));
    setHasUnsavedChanges(true);
  };

  const handlePrintRecipe = () => {
    window.print();
  };

  const t = translations[currentLanguage];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <RecipeHeader
        recipe={recipe}
        isEditing={isEditing}
        onToggleEdit={handleToggleEdit}
        onSave={handleSave}
        hasUnsavedChanges={hasUnsavedChanges}
        onTitleChange={handleTitleChange}
      />

      {/* Main Content */}
      <main className="pb-20 lg:pb-8">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Image */}
              <RecipeHeroImage
                recipe={recipe}
                isEditing={isEditing}
                onImageChange={handleImageChange}
                onImageGalleryOpen={() => setShowImageGallery(true)}
              />

              {/* Description */}
              <div className="space-y-3">
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  {t.description}
                </h2>
                {isEditing ? (
                  <textarea
                    value={recipe.description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    className="w-full min-h-24 p-4 bg-surface border border-border rounded-md resize-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Describe your recipe..."
                    rows="4"
                  />
                ) : (
                  <div className="bg-surface rounded-md p-4">
                    <p className="text-text-primary leading-relaxed whitespace-pre-line">
                      {recipe.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <RecipeInstructions
                recipe={recipe}
                isEditing={isEditing}
                onInstructionsChange={handleInstructionsChange}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Metadata */}
              <RecipeMetadata
                recipe={recipe}
                isEditing={isEditing}
                onMetadataChange={handleMetadataChange}
              />

              {/* Ingredients */}
              <RecipeIngredients
                recipe={recipe}
                isEditing={isEditing}
                onIngredientsChange={handleIngredientsChange}
              />

              {/* Nutrition */}
              <RecipeNutrition
                recipe={recipe}
                isEditing={isEditing}
                onNutritionChange={handleNutritionChange}
              />

              {/* Tags */}
              <RecipeTags
                recipe={recipe}
                isEditing={isEditing}
                onTagsChange={handleTagsChange}
              />

              {/* Print Button */}
              {!isEditing && (
                <Button
                  variant="outline"
                  onClick={handlePrintRecipe}
                  iconName="Printer"
                  iconSize={16}
                  className="w-full"
                >
                  {t.printRecipe}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Save Button */}
      {isEditing && hasUnsavedChanges && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 lg:bottom-6 z-fab">
          <Button
            variant="primary"
            onClick={handleSave}
            iconName="Save"
            iconSize={16}
            size="lg"
            className="shadow-elevation-3 hover:shadow-elevation-4"
          >
            {t.saveChanges}
          </Button>
        </div>
      )}

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={showImageGallery}
        onClose={() => setShowImageGallery(false)}
        recipe={recipe}
        onPrimaryImageChange={handleImageChange}
        onGalleryUpdate={handleGalleryUpdate}
      />
    </div>
  );
};

export default RecipeDetailEditor;