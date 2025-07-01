import React, { useState, useEffect, useRef } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecipeHeroImage = ({ recipe, isEditing, onImageChange, onImageGalleryOpen }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const translations = {
    en: {
      uploadImage: 'Upload Image',
      changeImage: 'Change Image',
      viewGallery: 'View Gallery',
      dragDropText: 'Drag & drop an image here, or click to select',
      supportedFormats: 'Supports JPG, PNG, WebP up to 5MB'
    },
    es: {
      uploadImage: 'Subir Imagen',
      changeImage: 'Cambiar Imagen',
      viewGallery: 'Ver Galería',
      dragDropText: 'Arrastra y suelta una imagen aquí, o haz clic para seleccionar',
      supportedFormats: 'Soporta JPG, PNG, WebP hasta 5MB'
    },
    fr: {
      uploadImage: 'Télécharger Image',
      changeImage: 'Changer Image',
      viewGallery: 'Voir Galerie',
      dragDropText: 'Glissez-déposez une image ici, ou cliquez pour sélectionner',
      supportedFormats: 'Supporte JPG, PNG, WebP jusqu\'à 5MB'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onImageChange(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const t = translations[currentLanguage];

  return (
    <div className="relative w-full h-64 lg:h-80 overflow-hidden rounded-md bg-surface">
      {recipe.image ? (
        <>
          <Image
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          
          {/* Image Overlay Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-smooth flex items-center justify-center space-x-3">
            {isEditing && (
              <Button
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                iconName="Camera"
                iconSize={16}
                size="sm"
              >
                {t.changeImage}
              </Button>
            )}
            
            <Button
              variant="secondary"
              onClick={onImageGalleryOpen}
              iconName="Images"
              iconSize={16}
              size="sm"
            >
              {t.viewGallery}
            </Button>
          </div>
        </>
      ) : (
        <div
          className={`w-full h-full flex flex-col items-center justify-center border-2 border-dashed transition-smooth ${
            dragOver 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => isEditing && fileInputRef.current?.click()}
        >
          <Icon 
            name="ImagePlus" 
            size={48} 
            color="var(--color-text-secondary)" 
            className="mb-4"
          />
          
          <div className="text-center px-4">
            <p className="text-text-primary font-medium mb-2">
              {isEditing ? t.dragDropText : 'No image available'}
            </p>
            
            {isEditing && (
              <>
                <p className="text-xs text-text-secondary mb-4">
                  {t.supportedFormats}
                </p>
                
                <Button
                  variant="primary"
                  iconName="Upload"
                  iconSize={16}
                  size="sm"
                >
                  {t.uploadImage}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {/* Recipe Gallery Indicator */}
      {recipe.gallery && recipe.gallery.length > 1 && (
        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-sm text-xs font-caption">
          +{recipe.gallery.length - 1} more
        </div>
      )}
    </div>
  );
};

export default RecipeHeroImage;