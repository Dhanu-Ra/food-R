import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();

  const translations = {
    en: {
      dashboard: 'Dashboard',
      recipes: 'Recipes',
      profile: 'Profile'
    },
    es: {
      dashboard: 'Panel',
      recipes: 'Recetas',
      profile: 'Perfil'
    },
    fr: {
      dashboard: 'Tableau',
      recipes: 'Recettes',
      profile: 'Profil'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const navigationItems = [
    {
      label: translations[currentLanguage].dashboard,
      path: '/dashboard',
      icon: 'LayoutDashboard',
      activeIcon: 'LayoutDashboard'
    },
    {
      label: translations[currentLanguage].recipes,
      path: '/recipe-management',
      icon: 'BookOpen',
      activeIcon: 'BookOpen'
    },
    {
      label: translations[currentLanguage].profile,
      path: '/profile',
      icon: 'User',
      activeIcon: 'User'
    }
  ];

  const isAuthPage = ['/user-registration', '/user-login', '/password-reset'].includes(location.pathname);

  if (isAuthPage) {
    return null;
  }

  const isActiveTab = (path) => {
    if (path === '/recipe-management') {
      return location.pathname === '/recipe-management' || location.pathname === '/recipe-detail-editor';
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-bottom-nav bg-background border-t border-border z-bottom-nav">
        <div className="flex items-center justify-around h-full px-safe-left pr-safe-right pb-safe-bottom">
          {navigationItems.map((item) => {
            const isActive = isActiveTab(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center min-w-0 flex-1 py-1 transition-smooth ${
                  isActive 
                    ? 'text-primary' :'text-text-secondary hover:text-primary'
                }`}
              >
                <div className={`p-1 rounded-xs transition-smooth ${isActive ? 'bg-primary/10' : ''}`}>
                  <Icon 
                    name={isActive ? item.activeIcon : item.icon} 
                    size={22} 
                    color={isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)'} 
                  />
                </div>
                <span className={`text-xs font-caption mt-1 transition-smooth ${
                  isActive ? 'font-medium' : 'font-normal'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:block fixed left-0 top-header bottom-0 w-64 bg-background border-r border-border z-bottom-nav">
        <div className="flex flex-col h-full p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = isActiveTab(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-sm transition-smooth ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-elevation-1' 
                      : 'text-text-secondary hover:bg-surface hover:text-primary'
                  }`}
                >
                  <Icon 
                    name={isActive ? item.activeIcon : item.icon} 
                    size={20} 
                    color={isActive ? 'var(--color-primary-foreground)' : 'var(--color-text-secondary)'} 
                  />
                  <span className={`font-body transition-smooth ${
                    isActive ? 'font-medium' : 'font-normal'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomTabNavigation;