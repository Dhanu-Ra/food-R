import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationLayout = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();

  const translations = {
    en: {
      brandName: 'FoodPrep',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      forgotPassword: 'Forgot Password',
      backToLogin: 'Back to Login'
    },
    es: {
      brandName: 'FoodPrep',
      signIn: 'Iniciar Sesión',
      signUp: 'Registrarse',
      forgotPassword: 'Olvidé mi Contraseña',
      backToLogin: 'Volver al Login'
    },
    fr: {
      brandName: 'FoodPrep',
      signIn: 'Se Connecter',
      signUp: 'S\'inscrire',
      forgotPassword: 'Mot de Passe Oublié',
      backToLogin: 'Retour à la Connexion'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getNavigationLinks = () => {
    const t = translations[currentLanguage];
    
    switch (location.pathname) {
      case '/user-login':
        return [
          { label: t.signUp, path: '/user-registration' },
          { label: t.forgotPassword, path: '/password-reset' }
        ];
      case '/user-registration':
        return [
          { label: t.signIn, path: '/user-login' },
          { label: t.forgotPassword, path: '/password-reset' }
        ];
      case '/password-reset':
        return [
          { label: t.backToLogin, path: '/user-login' },
          { label: t.signUp, path: '/user-registration' }
        ];
      default:
        return [];
    }
  };

  const t = translations[currentLanguage];
  const navigationLinks = getNavigationLinks();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Authentication Header */}
      <header className="w-full bg-background border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/user-login" className="flex items-center space-x-2 transition-smooth hover:opacity-80">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <Icon name="ChefHat" size={20} color="var(--color-primary-foreground)" />
            </div>
            <span className="font-heading font-semibold text-xl text-primary">
              {t.brandName}
            </span>
          </Link>

          {/* Language Selector */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => {
                const newLang = currentLanguage === 'en' ? 'es' : currentLanguage === 'es' ? 'fr' : 'en';
                setCurrentLanguage(newLang);
                localStorage.setItem('language', newLang);
              }}
              className="p-2 rounded-sm hover:bg-surface transition-smooth"
            >
              <Icon name="Globe" size={18} color="var(--color-text-secondary)" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Form Container */}
          <div className="bg-surface rounded-md shadow-elevation-2 p-6 lg:p-8">
            {children}
          </div>

          {/* Navigation Links */}
          {navigationLinks.length > 0 && (
            <div className="mt-6 text-center space-y-2">
              {navigationLinks.map((link, index) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-text-secondary hover:text-primary transition-smooth font-caption"
                  >
                    {link.label}
                  </Link>
                  {index < navigationLinks.length - 1 && (
                    <span className="mx-2 text-text-secondary">•</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-background border-t border-border">
        <div className="max-w-md mx-auto px-4 py-4 text-center">
          <p className="text-xs text-text-secondary font-caption">
            © 2024 {t.brandName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthenticationLayout;