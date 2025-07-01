import React, { useState, useEffect, useCallback } from 'react';

import Button from '../../components/ui/Button';

import FilterChips from './components/FilterChips';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import BulkActionBar from './components/BulkActionBar';
import EmptyState from './components/EmptyState';
import RecipeGrid from './components/RecipeGrid';

const RecipeManagement = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('dateNewest');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: [],
    difficulty: [],
    cookingTime: [],
    dietary: []
  });

  const translations = {
    en: {
      myRecipes: 'My Recipes',
      filter: 'Filter',
      noRecipes: 'No recipes found',
      selectAll: 'Select All',
      deselectAll: 'Deselect All',
      pullToRefresh: 'Pull to refresh'
    },
    es: {
      myRecipes: 'Mis Recetas',
      filter: 'Filtrar',
      noRecipes: 'No se encontraron recetas',
      selectAll: 'Seleccionar Todo',
      deselectAll: 'Deseleccionar Todo',
      pullToRefresh: 'Desliza para actualizar'
    },
    fr: {
      myRecipes: 'Mes Recettes',
      filter: 'Filtrer',
      noRecipes: 'Aucune recette trouvée',
      selectAll: 'Tout Sélectionner',
      deselectAll: 'Tout Désélectionner',
      pullToRefresh: 'Tirer pour actualiser'
    }
  };

  // Mock recipe data
  const mockRecipes = [
    {
      id: 1,
      title: "Classic Spaghetti Carbonara",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
      category: "dinner",
      cookingTime: 25,
      servings: 4,
      difficulty: "medium",
      rating: 4.8,
      isFavorite: true,
      dateAdded: new Date('2024-01-15'),
      dietary: ["vegetarian"]
    },
    {
      id: 2,
      title: "Avocado Toast with Poached Egg",
      image: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?w=400&h=300&fit=crop",
      category: "breakfast",
      cookingTime: 10,
      servings: 2,
      difficulty: "easy",
      rating: 4.5,
      isFavorite: false,
      dateAdded: new Date('2024-01-20'),
      dietary: ["vegetarian", "glutenFree"]
    },
    {
      id: 3,
      title: "Chocolate Chip Cookies",
      image: "https://images.pixabay.com/photo/2017/05/11/19/44/fresh-cookies-2305938_1280.jpg?w=400&h=300&fit=crop",
      category: "dessert",
      cookingTime: 45,
      servings: 24,
      difficulty: "easy",
      rating: 4.9,
      isFavorite: true,
      dateAdded: new Date('2024-01-10'),
      dietary: ["vegetarian"]
    },
    {
      id: 4,
      title: "Grilled Salmon with Herbs",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      category: "dinner",
      cookingTime: 20,
      servings: 2,
      difficulty: "medium",
      rating: 4.7,
      isFavorite: false,
      dateAdded: new Date('2024-01-25'),
      dietary: ["glutenFree", "lowCarb"]
    },
    {
      id: 5,
      title: "Greek Salad Bowl",
      image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?w=400&h=300&fit=crop",
      category: "lunch",
      cookingTime: 15,
      servings: 2,
      difficulty: "easy",
      rating: 4.3,
      isFavorite: false,
      dateAdded: new Date('2024-01-18'),
      dietary: ["vegetarian", "glutenFree"]
    },
    {
      id: 6,
      title: "Beef Stir Fry",
      image: "https://images.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg?w=400&h=300&fit=crop",
      category: "dinner",
      cookingTime: 30,
      servings: 4,
      difficulty: "medium",
      rating: 4.6,
      isFavorite: true,
      dateAdded: new Date('2024-01-12'),
      dietary: ["glutenFree"]
    },
    {
      id: 7,
      title: "Blueberry Pancakes",
      image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop",
      category: "breakfast",
      cookingTime: 20,
      servings: 4,
      difficulty: "easy",
      rating: 4.4,
      isFavorite: false,
      dateAdded: new Date('2024-01-22'),
      dietary: ["vegetarian"]
    },
    {
      id: 8,
      title: "Quinoa Buddha Bowl",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=300&fit=crop",
      category: "lunch",
      cookingTime: 35,
      servings: 2,
      difficulty: "medium",
      rating: 4.5,
      isFavorite: true,
      dateAdded: new Date('2024-01-08'),
      dietary: ["vegan", "glutenFree"]
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setRecipes(mockRecipes);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [recipes, filters, currentSort, searchQuery]);

  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...recipes];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(recipe => filters.category.includes(recipe.category));
    }

    // Apply difficulty filter
    if (filters.difficulty.length > 0) {
      filtered = filtered.filter(recipe => filters.difficulty.includes(recipe.difficulty));
    }

    // Apply cooking time filter
    if (filters.cookingTime.length > 0) {
      filtered = filtered.filter(recipe => {
        return filters.cookingTime.some(timeFilter => {
          switch (timeFilter) {
            case 'under15': return recipe.cookingTime < 15;
            case 'under30': return recipe.cookingTime < 30;
            case 'under60': return recipe.cookingTime < 60;
            case 'over60': return recipe.cookingTime >= 60;
            default: return true;
          }
        });
      });
    }

    // Apply dietary filter
    if (filters.dietary.length > 0) {
      filtered = filtered.filter(recipe =>
        filters.dietary.some(diet => recipe.dietary.includes(diet))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'nameAsc':
          return a.title.localeCompare(b.title);
        case 'nameDesc':
          return b.title.localeCompare(a.title);
        case 'dateNewest':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        case 'dateOldest':
          return new Date(a.dateAdded) - new Date(b.dateAdded);
        case 'cookingTimeAsc':
          return a.cookingTime - b.cookingTime;
        case 'cookingTimeDesc':
          return b.cookingTime - a.cookingTime;
        case 'ratingDesc':
          return (b.rating || 0) - (a.rating || 0);
        case 'ratingAsc':
          return (a.rating || 0) - (b.rating || 0);
        default:
          return 0;
      }
    });

    setFilteredRecipes(filtered);
  }, [recipes, filters, currentSort, searchQuery]);

  const getActiveFilters = () => {
    const activeFilters = [];
    
    Object.entries(filters).forEach(([type, values]) => {
      values.forEach(value => {
        activeFilters.push({ type, value });
      });
    });
    
    return activeFilters;
  };

  const handleRemoveFilter = (filterToRemove) => {
    setFilters(prev => ({
      ...prev,
      [filterToRemove.type]: prev[filterToRemove.type].filter(value => value !== filterToRemove.value)
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      category: [],
      difficulty: [],
      cookingTime: [],
      dietary: []
    });
    setSearchQuery('');
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSelectRecipe = (recipeId) => {
    if (!selectionMode) {
      setSelectionMode(true);
    }
    
    setSelectedRecipes(prev => 
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleToggleFavorite = (recipeId) => {
    setRecipes(prev => prev.map(recipe =>
      recipe.id === recipeId
        ? { ...recipe, isFavorite: !recipe.isFavorite }
        : recipe
    ));
  };

  const handleSelectAll = () => {
    if (selectedRecipes.length === filteredRecipes.length) {
      setSelectedRecipes([]);
      setSelectionMode(false);
    } else {
      setSelectedRecipes(filteredRecipes.map(recipe => recipe.id));
    }
  };

  const handleBulkDelete = () => {
    setRecipes(prev => prev.filter(recipe => !selectedRecipes.includes(recipe.id)));
    setSelectedRecipes([]);
    setSelectionMode(false);
  };

  const handleBulkExport = () => {
    // Mock export functionality
    console.log('Exporting recipes:', selectedRecipes);
    setSelectedRecipes([]);
    setSelectionMode(false);
  };

  const handleBulkCategorize = () => {
    // Mock categorize functionality
    console.log('Categorizing recipes:', selectedRecipes);
    setSelectedRecipes([]);
    setSelectionMode(false);
  };

  const handleCancelSelection = () => {
    setSelectedRecipes([]);
    setSelectionMode(false);
  };

  const handlePullToRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const t = translations[currentLanguage];
  const activeFilters = getActiveFilters();
  const hasFilters = activeFilters.length > 0 || searchQuery.trim();

  return (
    <div className="min-h-screen bg-background pt-header pb-bottom-nav lg:pb-6 lg:pl-64">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading font-bold text-2xl text-text-primary">
            {t.myRecipes}
          </h1>
          
          {selectionMode && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              iconName={selectedRecipes.length === filteredRecipes.length ? "Square" : "CheckSquare"}
              iconSize={16}
            >
              {selectedRecipes.length === filteredRecipes.length ? t.deselectAll : t.selectAll}
            </Button>
          )}
        </div>

        {/* Filter Chips */}
        <FilterChips
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => setIsFilterPanelOpen(true)}
            iconName="Filter"
            iconPosition="left"
            className="lg:hidden"
          >
            {t.filter}
          </Button>
          
          <SortDropdown
            currentSort={currentSort}
            onSortChange={setCurrentSort}
          />
        </div>

        {/* Desktop Layout */}
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                onApplyFilters={handleApplyFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Pull to Refresh Indicator */}
            {refreshing && (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="ml-2 text-sm text-text-secondary">{t.pullToRefresh}</span>
              </div>
            )}

            {/* Recipe Grid */}
            {filteredRecipes.length > 0 ? (
              <RecipeGrid
                recipes={filteredRecipes}
                selectedRecipes={selectedRecipes}
                onSelectRecipe={handleSelectRecipe}
                onToggleFavorite={handleToggleFavorite}
                selectionMode={selectionMode}
                loading={loading}
              />
            ) : !loading ? (
              <EmptyState
                hasFilters={hasFilters}
                onClearFilters={handleClearAllFilters}
              />
            ) : (
              <RecipeGrid
                recipes={[]}
                selectedRecipes={[]}
                onSelectRecipe={() => {}}
                onToggleFavorite={() => {}}
                selectionMode={false}
                loading={true}
              />
            )}
          </div>
        </div>

        {/* Mobile Filter Panel */}
        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          filters={filters}
          onApplyFilters={handleApplyFilters}
        />

        {/* Bulk Action Bar */}
        <BulkActionBar
          selectedCount={selectedRecipes.length}
          onDelete={handleBulkDelete}
          onExport={handleBulkExport}
          onCategorize={handleBulkCategorize}
          onCancel={handleCancelSelection}
        />
      </div>
    </div>
  );
};

export default RecipeManagement;