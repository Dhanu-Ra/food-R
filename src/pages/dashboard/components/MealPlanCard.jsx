import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const MealPlanCard = ({ meal, currentLanguage }) => {
  const translations = {
    en: {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      snack: 'Snack'
    },
    es: {
      breakfast: 'Desayuno',
      lunch: 'Almuerzo',
      dinner: 'Cena',
      snack: 'Merienda'
    },
    fr: {
      breakfast: 'Petit-déjeuner',
      lunch: 'Déjeuner',
      dinner: 'Dîner',
      snack: 'Collation'
    }
  };

  const t = translations[currentLanguage];

  return (
    <div className="bg-surface rounded-md p-4 shadow-elevation-1 border border-border">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-heading font-medium text-text-primary">{meal.date}</h4>
        <span className="text-xs text-text-secondary bg-primary/10 px-2 py-1 rounded-full">
          {meal.dayName}
        </span>
      </div>
      
      <div className="space-y-3">
        {meal.meals.map((mealItem, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-sm overflow-hidden flex-shrink-0">
              <Image
                src={mealItem.image}
                alt={mealItem.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{mealItem.name}</p>
              <p className="text-xs text-text-secondary">{t[mealItem.type]}</p>
            </div>
            <div className="flex items-center text-xs text-text-secondary">
              <Icon name="Clock" size={12} className="mr-1" />
              <span>{mealItem.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanCard;