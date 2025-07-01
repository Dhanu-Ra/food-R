/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#8B4513', // warm brown
        'primary-foreground': '#FEFCF8', // warm off-white
        
        // Secondary Colors
        'secondary': '#6B8E23', // olive green
        'secondary-foreground': '#FEFCF8', // warm off-white
        
        // Accent Colors
        'accent': '#D2691E', // paprika orange
        'accent-foreground': '#FEFCF8', // warm off-white
        
        // Background Colors
        'background': '#FEFCF8', // warm off-white
        'surface': '#F5F3F0', // subtle warm gray
        
        // Text Colors
        'text-primary': '#2D2D2D', // rich charcoal
        'text-secondary': '#6B6B6B', // medium gray
        
        // Status Colors
        'success': '#228B22', // forest green
        'success-foreground': '#FEFCF8', // warm off-white
        'warning': '#FF8C00', // amber orange
        'warning-foreground': '#2D2D2D', // rich charcoal
        'error': '#CD5C5C', // muted red
        'error-foreground': '#FEFCF8', // warm off-white
        
        // Border Colors
        'border': 'rgba(107, 107, 107, 0.2)', // medium gray with opacity
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Source Sans Pro', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      height: {
        'header': '56px',
        'bottom-nav': '60px',
        'fab': '56px',
      },
      width: {
        'fab': '56px',
      },
      zIndex: {
        'header': '100',
        'bottom-nav': '90',
        'fab': '80',
        'modal': '200',
      },
      animation: {
        'shimmer': 'shimmer 1.5s linear infinite',
        'fade-in': 'fadeIn 150ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-up': 'slideUp 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        'scale-in': 'scaleIn 150ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      boxShadow: {
        'elevation-1': '0 2px 4px rgba(139, 69, 19, 0.1)',
        'elevation-2': '0 4px 8px rgba(139, 69, 19, 0.1)',
        'elevation-3': '0 8px 16px rgba(139, 69, 19, 0.1)',
        'elevation-4': '0 16px 32px rgba(139, 69, 19, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}