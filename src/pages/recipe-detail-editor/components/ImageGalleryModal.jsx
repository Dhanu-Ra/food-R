import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ImageGalleryModal = ({ isOpen, onClose, recipe, onPrimaryImageChange, onGalleryUpdate }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedImage, setSelectedImage] = useState(0);

  const translations = {
    en: {
      imageGallery: 'Image Gallery',
      setPrimary: 'Set as Primary',
      deleteImage: 'Delete Image',
      addImages: 'Add Images',
      close: 'Close',
      previous: 'Previous',
      next: 'Next',
      noImages: 'No images in gallery',
      uploadImages: 'Upload images to get started'
    },
    es: {
      imageGallery: 'Galería de Imágenes',
      setPrimary: 'Establecer como Principal',
      deleteImage: 'Eliminar Imagen',
      addImages: 'Agregar Imágenes',
      close: 'Cerrar',
      previous: 'Anterior',
      next: 'Siguiente',
      noImages: 'No hay imágenes en la galería',
      uploadImages: 'Sube imágenes para comenzar'
    },
    fr: {
      imageGallery: 'Galerie d\'Images',
      setPrimary: 'Définir comme Principal',
      deleteImage: 'Supprimer Image',
      addImages: 'Ajouter Images',
      close: 'Fermer',
      previous: 'Précédent',
      next: 'Suivant',
      noImages: 'Aucune image dans la galerie',
      uploadImages: 'Téléchargez des images pour commencer'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        handlePrevious();
        break;
      case 'ArrowRight':
        handleNext();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedImage]);

  const handlePrevious = () => {
    if (recipe.gallery && recipe.gallery.length > 0) {
      setSelectedImage((prev) => 
        prev === 0 ? recipe.gallery.length - 1 : prev - 1
      );
    }
  };

  const handleNext = () => {
    if (recipe.gallery && recipe.gallery.length > 0) {
      setSelectedImage((prev) => 
        prev === recipe.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleSetPrimary = () => {
    if (recipe.gallery && recipe.gallery[selectedImage]) {
      onPrimaryImageChange(recipe.gallery[selectedImage]);
    }
  };

  const handleDeleteImage = () => {
    if (recipe.gallery && recipe.gallery.length > 0) {
      const updatedGallery = recipe.gallery.filter((_, index) => index !== selectedImage);
      onGalleryUpdate(updatedGallery);
      
      if (selectedImage >= updatedGallery.length) {
        setSelectedImage(Math.max(0, updatedGallery.length - 1));
      }
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newGallery = [...(recipe.gallery || []), e.target.result];
        onGalleryUpdate(newGallery);
      };
      reader.readAsDataURL(file);
    });
  };

  if (!isOpen) return null;

  const t = translations[currentLanguage];
  const hasImages = recipe.gallery && recipe.gallery.length > 0;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-4xl max-h-[90vh] w-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            {t.imageGallery}
          </h2>
          
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="gallery-upload"
            />
            <label htmlFor="gallery-upload">
              <Button
                variant="outline"
                iconName="Plus"
                iconSize={16}
                size="sm"
                as="span"
              >
                {t.addImages}
              </Button>
            </label>
            
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
              iconSize={20}
              className="p-2"
              aria-label={t.close}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {hasImages ? (
            <>
              {/* Main Image */}
              <div className="flex-1 flex items-center justify-center bg-black/5 relative">
                <Image
                  src={recipe.gallery[selectedImage]}
                  alt={`${recipe.title} - Image ${selectedImage + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
                
                {/* Navigation Arrows */}
                {recipe.gallery.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth"
                      aria-label={t.previous}
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </button>
                    
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth"
                      aria-label={t.next}
                    >
                      <Icon name="ChevronRight" size={20} />
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImage + 1} / {recipe.gallery.length}
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-80 border-l border-border flex flex-col">
                {/* Actions */}
                <div className="p-4 border-b border-border space-y-2">
                  <Button
                    variant="primary"
                    onClick={handleSetPrimary}
                    iconName="Star"
                    iconSize={16}
                    className="w-full"
                  >
                    {t.setPrimary}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleDeleteImage}
                    iconName="Trash2"
                    iconSize={16}
                    className="w-full text-error hover:bg-error/10"
                  >
                    {t.deleteImage}
                  </Button>
                </div>

                {/* Thumbnail Grid */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="grid grid-cols-3 gap-2">
                    {recipe.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-md overflow-hidden border-2 transition-smooth ${
                          selectedImage === index
                            ? 'border-primary' :'border-transparent hover:border-border'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Icon name="Images" size={64} color="var(--color-text-secondary)" className="mx-auto mb-4" />
                <p className="text-lg font-medium text-text-primary mb-2">{t.noImages}</p>
                <p className="text-text-secondary mb-4">{t.uploadImages}</p>
                
                <label htmlFor="gallery-upload-empty">
                  <Button
                    variant="primary"
                    iconName="Upload"
                    iconSize={16}
                    as="span"
                  >
                    {t.addImages}
                  </Button>
                </label>
                
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="gallery-upload-empty"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryModal;