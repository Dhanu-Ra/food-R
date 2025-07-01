import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ currentLanguage, userName = "Chef" }) => {
  const translations = {
    en: {
      goodMorning: 'Good Morning',
      goodAfternoon: 'Good Afternoon',
      goodEvening: 'Good Evening',
      welcomeBack: 'Welcome back',
      todayQuote: "Let\'s create something delicious today!"
    },
    es: {
      goodMorning: 'Buenos Días',
      goodAfternoon: 'Buenas Tardes',
      goodEvening: 'Buenas Noches',
      welcomeBack: 'Bienvenido de vuelta',
      todayQuote: '¡Creemos algo delicioso hoy!'
    },
    fr: {
      goodMorning: 'Bonjour',
      goodAfternoon: 'Bon Après-midi',
      goodEvening: 'Bonsoir',
      welcomeBack: 'Bon retour',
      todayQuote: 'Créons quelque chose de délicieux aujourd\'hui!'
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    const t = translations[currentLanguage];
    
    if (hour < 12) return t.goodMorning;
    if (hour < 17) return t.goodAfternoon;
    return t.goodEvening;
  };

  const t = translations[currentLanguage];

  return (
    <div className="bg-gradient-to-r from-primary to-accent rounded-md p-6 text-primary-foreground shadow-elevation-2">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-heading font-semibold mb-1">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-primary-foreground/80 font-caption">
            {t.welcomeBack}
          </p>
          <p className="text-sm text-primary-foreground/90 mt-2 font-caption">
            {t.todayQuote}
          </p>
        </div>
        <div className="ml-4 hidden sm:block">
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Icon name="ChefHat" size={32} color="var(--color-primary-foreground)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;