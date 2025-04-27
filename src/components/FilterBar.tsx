
import React from 'react';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  filters: {
    free: boolean;
    paid: boolean;
    available: boolean;
  };
  onFilterChange: (filter: keyof typeof filters) => void;
}

const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      <button
        className={cn(
          "filter-chip",
          filters.free && "filter-chip-active"
        )}
        onClick={() => onFilterChange('free')}
      >
        Free Parking
      </button>
      <button
        className={cn(
          "filter-chip",
          filters.paid && "filter-chip-active"
        )}
        onClick={() => onFilterChange('paid')}
      >
        Paid Parking
      </button>
      <button
        className={cn(
          "filter-chip",
          filters.available && "filter-chip-active"
        )}
        onClick={() => onFilterChange('available')}
      >
        Available Only
      </button>
    </div>
  );
};

export default FilterBar;
