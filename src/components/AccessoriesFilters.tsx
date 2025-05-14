
import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Filter options
const CATEGORIES = ['Chargers', 'Cases', 'Earphones', 'Screen Guards', 'Smartwatches', 'Cables', 'Power Banks'];
const BRANDS = ['Apple', 'Samsung', 'Boat', 'Xiaomi', 'Tiara', 'OnePlus', 'JBL'];
const PRICE_RANGES = [
  { label: 'Under ₹500', value: '0-500' },
  { label: '₹500 - ₹1,000', value: '500-1000' },
  { label: '₹1,000 - ₹2,000', value: '1000-2000' },
  { label: '₹2,000 - ₹5,000', value: '2000-5000' },
  { label: 'Above ₹5,000', value: '5000-1000000' }
];

interface FilterState {
  categories: string[];
  brands: string[];
  priceRanges: string[];
  inStock: boolean | null;
}

interface AccessoriesFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClose?: () => void;
}

const AccessoriesFilters = ({ filters, onFilterChange, onClose }: AccessoriesFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  
  // Update local state when parent filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  // Update a specific filter category
  const updateFilter = (category: keyof FilterState, item: string | boolean) => {
    if (category === 'inStock') {
      // Handle the inStock toggle differently since it's boolean | null
      const newValue = item === true ? true : item === false ? false : null;
      
      setLocalFilters({
        ...localFilters,
        inStock: newValue as boolean | null
      });
      
      onFilterChange({
        ...localFilters,
        inStock: newValue as boolean | null
      });
      
      return;
    }
    
    // Handle array-based filters (categories, brands, priceRanges)
    const currentFilters = [...localFilters[category as keyof Omit<FilterState, 'inStock'>]];
    
    if (currentFilters.includes(item as string)) {
      // Remove the item
      const newFilters = currentFilters.filter(i => i !== item);
      
      setLocalFilters({
        ...localFilters,
        [category]: newFilters
      });
      
      onFilterChange({
        ...localFilters,
        [category]: newFilters
      });
    } else {
      // Add the item
      const newFilters = [...currentFilters, item];
      
      setLocalFilters({
        ...localFilters,
        [category]: newFilters
      });
      
      onFilterChange({
        ...localFilters,
        [category]: newFilters
      });
    }
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    const emptyFilters = {
      categories: [],
      brands: [],
      priceRanges: [],
      inStock: null
    };
    
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };
  
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      {/* Mobile View Header with Close Button */}
      {onClose && (
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h3 className="font-medium text-white">Filters</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      
      {/* Clear All Button (only show if filters are active) */}
      {(localFilters.categories.length > 0 || 
        localFilters.brands.length > 0 || 
        localFilters.priceRanges.length > 0 || 
        localFilters.inStock !== null) && (
        <div className="mb-4">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-tiara-gold hover:text-tiara-lightgold hover:bg-transparent p-0"
            onClick={clearAllFilters}
          >
            Clear all filters
          </Button>
        </div>
      )}
      
      {/* Categories Filter */}
      <Collapsible defaultOpen={true} className="mb-6 border-b border-gray-800 pb-4">
        <CollapsibleTrigger className="flex justify-between items-center w-full py-2">
          <h3 className="font-medium text-white">Categories</h3>
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="block w-2 h-2 border-r-2 border-b-2 border-white transform rotate-45 translate-y-[-4px] group-data-[state=open]:rotate-[225deg]"></span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 mt-2">
            {CATEGORIES.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox 
                  id={`cat-${category}`}
                  checked={localFilters.categories.includes(category)}
                  onCheckedChange={() => updateFilter('categories', category)}
                />
                <Label htmlFor={`cat-${category}`} className="text-gray-300 cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Brand Filter */}
      <Collapsible defaultOpen={true} className="mb-6 border-b border-gray-800 pb-4">
        <CollapsibleTrigger className="flex justify-between items-center w-full py-2">
          <h3 className="font-medium text-white">Brand</h3>
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="block w-2 h-2 border-r-2 border-b-2 border-white transform rotate-45 translate-y-[-4px] group-data-[state=open]:rotate-[225deg]"></span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 mt-2">
            {BRANDS.map(brand => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox 
                  id={`brand-${brand}`}
                  checked={localFilters.brands.includes(brand)}
                  onCheckedChange={() => updateFilter('brands', brand)}
                />
                <Label htmlFor={`brand-${brand}`} className="text-gray-300 cursor-pointer">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Price Range Filter */}
      <Collapsible defaultOpen={true} className="mb-6 border-b border-gray-800 pb-4">
        <CollapsibleTrigger className="flex justify-between items-center w-full py-2">
          <h3 className="font-medium text-white">Price Range</h3>
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="block w-2 h-2 border-r-2 border-b-2 border-white transform rotate-45 translate-y-[-4px] group-data-[state=open]:rotate-[225deg]"></span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 mt-2">
            {PRICE_RANGES.map(range => (
              <div key={range.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`price-${range.value}`}
                  checked={localFilters.priceRanges.includes(range.value)}
                  onCheckedChange={() => updateFilter('priceRanges', range.value)}
                />
                <Label htmlFor={`price-${range.value}`} className="text-gray-300 cursor-pointer">
                  {range.label}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Availability Filter */}
      <Collapsible defaultOpen={true} className="mb-2">
        <CollapsibleTrigger className="flex justify-between items-center w-full py-2">
          <h3 className="font-medium text-white">Availability</h3>
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="block w-2 h-2 border-r-2 border-b-2 border-white transform rotate-45 translate-y-[-4px] group-data-[state=open]:rotate-[225deg]"></span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="in-stock"
                checked={localFilters.inStock === true}
                onCheckedChange={() => updateFilter('inStock', true)}
              />
              <Label htmlFor="in-stock" className="text-gray-300 cursor-pointer">
                In Stock Only
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AccessoriesFilters;
