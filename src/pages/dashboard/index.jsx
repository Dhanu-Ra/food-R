import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StatsCard from './components/StatsCard';
import RecentRecipeCard from './components/RecentRecipeCard';
import MealPlanCard from './components/MealPlanCard';
import ActivityItem from './components/ActivityItem';
import QuickActions from './components/QuickActions';
import WelcomeHeader from './components/WelcomeHeader';

const Dashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  const translations = {
    en: {
      dashboard: 'Dashboard',
      recentRecipes: 'Recent Recipes',
      viewAll: 'View All',
      upcomingMeals: 'Upcoming Meals',
      recentActivity: 'Recent Activity',
      totalRecipes: 'Total Recipes',
      favoriteRecipes: 'Favorite Recipes',
      cookingTime: 'Cooking Time',
      completedMeals: 'Completed Meals',
      noRecentRecipes: 'No recent recipes found',
      noUpcomingMeals: 'No upcoming meals planned',
      noRecentActivity: 'No recent activity',
      minutes: 'minutes',
      meals: 'meals'
    },
    es: {
      dashboard: 'Panel',
      recentRecipes: 'Recetas Recientes',
      viewAll: 'Ver Todo',
      upcomingMeals: 'Próximas Comidas',
      recentActivity: 'Actividad Reciente',
      totalRecipes: 'Total de Recetas',
      favoriteRecipes: 'Recetas Favoritas',
      cookingTime: 'Tiempo de Cocina',
      completedMeals: 'Comidas Completadas',
      noRecentRecipes: 'No se encontraron recetas recientes',
      noUpcomingMeals: 'No hay comidas próximas planificadas',
      noRecentActivity: 'No hay actividad reciente',
      minutes: 'minutos',
      meals: 'comidas'
    },
    fr: {
      dashboard: 'Tableau de Bord',
      recentRecipes: 'Recettes Récentes',
      viewAll: 'Voir Tout',
      upcomingMeals: 'Repas à Venir',
      recentActivity: 'Activité Récente',
      totalRecipes: 'Total des Recettes',
      favoriteRecipes: 'Recettes Favorites',
      cookingTime: 'Temps de Cuisson',
      completedMeals: 'Repas Terminés',
      noRecentRecipes: 'Aucune recette récente trouvée',
      noUpcomingMeals: 'Aucun repas à venir planifié',
      noRecentActivity: 'Aucune activité récente',
      minutes: 'minutes',
      meals: 'repas'
    }
  };

  // Mock data
  const recentRecipes = [
    {
      id: 1,
      title: "Mediterranean Quinoa Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      cookTime: "25 min",
      servings: "4",
      rating: 4,
      reviews: 12,
      isFavorite: true
    },
    {
      id: 2,
      title: "Spicy Thai Basil Chicken",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=400&h=300&fit=crop",
      cookTime: "30 min",
      servings: "2",
      rating: 5,
      reviews: 8,
      isFavorite: false
    },
    {
      id: 3,
      title: "Classic Beef Tacos",
      image: "https://images.pixabay.com/photo/2017/05/12/09/23/taco-2306677_1280.jpg?w=400&h=300&fit=crop",
      cookTime: "20 min",
      servings: "6",
      rating: 4,
      reviews: 15,
      isFavorite: true
    },
    {
      id: 4,
      title: "Creamy Mushroom Risotto",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
      cookTime: "45 min",
      servings: "4",
      rating: 5,
      reviews: 20,
      isFavorite: false
    }
  ];

  const upcomingMeals = [
    {
      date: "Today",
      dayName: "Monday",
      meals: [
        {
          name: "Avocado Toast",
          type: "breakfast",
          time: "8:00 AM",
          image: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?w=100&h=100&fit=crop"
        },
        {
          name: "Caesar Salad",
          type: "lunch",
          time: "12:30 PM",
          image: "https://images.pixabay.com/photo/2016/03/05/19/02/salad-1238250_1280.jpg?w=100&h=100&fit=crop"
        },
        {
          name: "Grilled Salmon",
          type: "dinner",
          time: "7:00 PM",
          image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=100&h=100&fit=crop"
        }
      ]
    },
    {
      date: "Tomorrow",
      dayName: "Tuesday",
      meals: [
        {
          name: "Greek Yogurt Bowl",
          type: "breakfast",
          time: "8:00 AM",
          image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=100&h=100&fit=crop"
        },
        {
          name: "Chicken Wrap",
          type: "lunch",
          time: "1:00 PM",
          image: "https://images.pixabay.com/photo/2017/05/12/09/23/taco-2306677_1280.jpg?w=100&h=100&fit=crop"
        }
      ]
    },
    {
      date: "Wednesday",
      dayName: "Wednesday",
      meals: [
        {
          name: "Pancakes",
          type: "breakfast",
          time: "8:30 AM",
          image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=100&h=100&fit=crop"
        },
        {
          name: "Pasta Primavera",
          type: "lunch",
          time: "12:00 PM",
          image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=100&h=100&fit=crop"
        }
      ]
    }
  ];

  const recentActivity = [
    {
      type: "created",
      recipeName: "Mediterranean Quinoa Bowl",
      timestamp: "2 hours ago"
    },
    {
      type: "cooked",
      recipeName: "Spicy Thai Basil Chicken",
      timestamp: "5 hours ago"
    },
    {
      type: "favorited",
      recipeName: "Classic Beef Tacos",
      timestamp: "1 day ago"
    },
    {
      type: "updated",
      recipeName: "Creamy Mushroom Risotto",
      timestamp: "2 days ago"
    },
    {
      type: "shared",
      recipeName: "Chocolate Chip Cookies",
      timestamp: "3 days ago"
    }
  ];

  const stats = [
    {
      title: translations[currentLanguage].totalRecipes,
      value: "47",
      icon: "BookOpen",
      color: "var(--color-primary)",
      trend: { type: "positive", value: "+3 this week" }
    },
    {
      title: translations[currentLanguage].favoriteRecipes,
      value: "12",
      icon: "Heart",
      color: "var(--color-error)",
      trend: { type: "positive", value: "+2 this week" }
    },
    {
      title: translations[currentLanguage].cookingTime,
      value: "156",
      icon: "Clock",
      color: "var(--color-accent)",
      trend: { type: "neutral", value: `${translations[currentLanguage].minutes} saved` }
    },
    {
      title: translations[currentLanguage].completedMeals,
      value: "23",
      icon: "ChefHat",
      color: "var(--color-success)",
      trend: { type: "positive", value: `+5 ${translations[currentLanguage].meals}` }
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const t = translations[currentLanguage];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-header pb-bottom-nav lg:pb-6 lg:pl-64">
        <div className="p-4 lg:p-6 space-y-6">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            <div className="h-32 bg-surface rounded-md mb-6"></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-surface rounded-md"></div>
              ))}
            </div>
            <div className="h-48 bg-surface rounded-md mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 bg-surface rounded-md"></div>
              <div className="h-64 bg-surface rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-header pb-bottom-nav lg:pb-6 lg:pl-64">
      <div className="p-4 lg:p-6 space-y-6">
        {/* Welcome Header */}
        <WelcomeHeader currentLanguage={currentLanguage} />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Recent Recipes */}
        <div className="bg-surface rounded-md p-4 shadow-elevation-1 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold text-text-primary">{t.recentRecipes}</h2>
            <Link to="/recipe-management">
              <Button variant="ghost" iconName="ArrowRight" iconPosition="right" className="text-sm">
                {t.viewAll}
              </Button>
            </Link>
          </div>
          
          {recentRecipes.length > 0 ? (
            <div className="flex space-x-4 overflow-x-auto pb-2 -mx-1 px-1">
              {recentRecipes.map((recipe) => (
                <RecentRecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="BookOpen" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
              <p className="text-text-secondary font-caption">{t.noRecentRecipes}</p>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Meals */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-md p-4 shadow-elevation-1 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-heading font-semibold text-text-primary">{t.upcomingMeals}</h2>
                <Button variant="ghost" iconName="Calendar" iconPosition="right" className="text-sm">
                  {t.viewAll}
                </Button>
              </div>
              
              {upcomingMeals.length > 0 ? (
                <div className="space-y-4">
                  {upcomingMeals.slice(0, 3).map((meal, index) => (
                    <MealPlanCard key={index} meal={meal} currentLanguage={currentLanguage} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="Calendar" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
                  <p className="text-text-secondary font-caption">{t.noUpcomingMeals}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions currentLanguage={currentLanguage} />

            {/* Recent Activity */}
            <div className="bg-surface rounded-md p-4 shadow-elevation-1 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-medium text-text-primary">{t.recentActivity}</h3>
                <Button variant="ghost" iconName="MoreHorizontal" className="text-sm p-2" />
              </div>
              
              {recentActivity.length > 0 ? (
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {recentActivity.map((activity, index) => (
                    <ActivityItem 
                      key={index} 
                      activity={activity} 
                      currentLanguage={currentLanguage} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="Activity" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
                  <p className="text-text-secondary font-caption">{t.noRecentActivity}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;