import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, icon, color = 'var(--color-primary)', trend = null }) => {
  return (
    <div className="bg-surface rounded-md p-4 shadow-elevation-1 border border-border">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-caption text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-heading font-semibold text-text-primary">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-xs ${
              trend.type === 'positive' ? 'text-success' : 
              trend.type === 'negative' ? 'text-error' : 'text-text-secondary'
            }`}>
              <Icon 
                name={trend.type === 'positive' ? 'TrendingUp' : trend.type === 'negative' ? 'TrendingDown' : 'Minus'} 
                size={14} 
                className="mr-1" 
              />
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div className="ml-4">
          <div 
            className="w-12 h-12 rounded-sm flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon name={icon} size={24} color={color} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;