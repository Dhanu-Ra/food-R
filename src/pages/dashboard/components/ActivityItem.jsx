import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityItem = ({ activity, currentLanguage }) => {
  const translations = {
    en: {
      created: 'created',
      updated: 'updated',
      deleted: 'deleted',
      favorited: 'favorited',
      cooked: 'cooked',
      shared: 'shared'
    },
    es: {
      created: 'creó',
      updated: 'actualizó',
      deleted: 'eliminó',
      favorited: 'marcó como favorito',
      cooked: 'cocinó',
      shared: 'compartió'
    },
    fr: {
      created: 'a créé',
      updated: 'a mis à jour',
      deleted: 'a supprimé',
      favorited: 'a mis en favori',
      cooked: 'a cuisiné',
      shared: 'a partagé'
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'created': return 'Plus';
      case 'updated': return 'Edit';
      case 'deleted': return 'Trash2';
      case 'favorited': return 'Heart';
      case 'cooked': return 'ChefHat';
      case 'shared': return 'Share2';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'created': return 'var(--color-success)';
      case 'updated': return 'var(--color-primary)';
      case 'deleted': return 'var(--color-error)';
      case 'favorited': return 'var(--color-error)';
      case 'cooked': return 'var(--color-accent)';
      case 'shared': return 'var(--color-secondary)';
      default: return 'var(--color-text-secondary)';
    }
  };

  const t = translations[currentLanguage];

  return (
    <div className="flex items-start space-x-3 py-3">
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${getActivityColor(activity.type)}20` }}
      >
        <Icon 
          name={getActivityIcon(activity.type)} 
          size={14} 
          color={getActivityColor(activity.type)} 
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-primary">
          <span className="font-medium">You</span> {t[activity.type]} <span className="font-medium">{activity.recipeName}</span>
        </p>
        <p className="text-xs text-text-secondary mt-1">{activity.timestamp}</p>
      </div>
    </div>
  );
};

export default ActivityItem;