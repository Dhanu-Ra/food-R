import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const BulkActionBar = ({ selectedCount, onDelete, onExport, onCategorize, onCancel }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translations = {
    en: {
      selected: 'selected',
      delete: 'Delete',
      export: 'Export',
      categorize: 'Categorize',
      cancel: 'Cancel'
    },
    es: {
      selected: 'seleccionados',
      delete: 'Eliminar',
      export: 'Exportar',
      categorize: 'Categorizar',
      cancel: 'Cancelar'
    },
    fr: {
      selected: 'sélectionnés',
      delete: 'Supprimer',
      export: 'Exporter',
      categorize: 'Catégoriser',
      cancel: 'Annuler'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  if (selectedCount === 0) return null;

  const t = translations[currentLanguage];

  return (
    <div className="fixed bottom-20 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 bg-primary text-primary-foreground rounded-md shadow-elevation-4 z-30">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">{selectedCount}</span>
          </div>
          <span className="font-medium">{selectedCount} {t.selected}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-primary-foreground hover:bg-primary-foreground/10"
            iconName="Trash2"
            iconSize={16}
          >
            <span className="hidden sm:inline">{t.delete}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onExport}
            className="text-primary-foreground hover:bg-primary-foreground/10"
            iconName="Download"
            iconSize={16}
          >
            <span className="hidden sm:inline">{t.export}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onCategorize}
            className="text-primary-foreground hover:bg-primary-foreground/10"
            iconName="Tag"
            iconSize={16}
          >
            <span className="hidden sm:inline">{t.categorize}</span>
          </Button>
          
          <div className="w-px h-6 bg-primary-foreground/20 mx-2" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-primary-foreground hover:bg-primary-foreground/10"
            iconName="X"
            iconSize={16}
          >
            {t.cancel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionBar;