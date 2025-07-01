import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecipeHeader = ({ 
  recipe, 
  isEditing, 
  onToggleEdit, 
  onSave, 
  hasUnsavedChanges,
  onTitleChange 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showActionMenu, setShowActionMenu] = useState(false);
  const navigate = useNavigate();

  const translations = {
    en: {
      back: 'Back',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      share: 'Share',
      favorite: 'Favorite',
      delete: 'Delete',
      more: 'More options',
      unsavedChanges: 'You have unsaved changes'
    },
    es: {
      back: 'Atrás',
      edit: 'Editar',
      save: 'Guardar',
      cancel: 'Cancelar',
      share: 'Compartir',
      favorite: 'Favorito',
      delete: 'Eliminar',
      more: 'Más opciones',
      unsavedChanges: 'Tienes cambios sin guardar'
    },
    fr: {
      back: 'Retour',
      edit: 'Modifier',
      save: 'Sauvegarder',
      cancel: 'Annuler',
      share: 'Partager',
      favorite: 'Favori',
      delete: 'Supprimer',
      more: 'Plus d\'options',
      unsavedChanges: 'Vous avez des modifications non sauvegardées'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      if (window.confirm(t.unsavedChanges)) {
        navigate('/recipe-management');
      }
    } else {
      navigate('/recipe-management');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Check out this recipe: ${recipe.title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    setShowActionMenu(false);
  };

  const handleFavorite = () => {
    // Mock favorite functionality
    setShowActionMenu(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      navigate('/recipe-management');
    }
    setShowActionMenu(false);
  };

  const t = translations[currentLanguage];

  return (
    <header className="sticky top-0 bg-background border-b border-border z-10 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            onClick={handleBack}
            iconName="ArrowLeft"
            iconSize={20}
            className="p-2"
            aria-label={t.back}
          />
          
          {isEditing ? (
            <input
              type="text"
              value={recipe.title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="text-lg font-heading font-semibold bg-transparent border-none outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1 max-w-xs"
              placeholder="Recipe title..."
            />
          ) : (
            <h1 className="text-lg font-heading font-semibold text-text-primary truncate max-w-xs">
              {recipe.title}
            </h1>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={onToggleEdit}
                size="sm"
              >
                {t.cancel}
              </Button>
              <Button
                variant="primary"
                onClick={onSave}
                size="sm"
                iconName="Check"
                iconSize={16}
              >
                {t.save}
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={onToggleEdit}
                iconName="Edit"
                iconSize={18}
                className="p-2"
                aria-label={t.edit}
              />
              
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowActionMenu(!showActionMenu)}
                  iconName="MoreVertical"
                  iconSize={18}
                  className="p-2"
                  aria-label={t.more}
                />
                
                {showActionMenu && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-border rounded-md shadow-elevation-2 py-1 z-20">
                    <button
                      onClick={handleShare}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-surface transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="Share" size={16} />
                      <span>{t.share}</span>
                    </button>
                    <button
                      onClick={handleFavorite}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-surface transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="Heart" size={16} />
                      <span>{t.favorite}</span>
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-surface transition-smooth flex items-center space-x-2 text-error"
                    >
                      <Icon name="Trash2" size={16} />
                      <span>{t.delete}</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Unsaved Changes Indicator */}
      {hasUnsavedChanges && (
        <div className="mt-2 px-3 py-1 bg-warning/10 border border-warning/20 rounded-sm">
          <p className="text-xs text-warning font-caption">{t.unsavedChanges}</p>
        </div>
      )}
    </header>
  );
};

export default RecipeHeader;