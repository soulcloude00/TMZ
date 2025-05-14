
import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Filter options
const BRANDS = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'OnePlus', 'Nothing', 'Motorola'];
const PRICE_RANGES = [
  { label: '₹5,000 - ₹10,000', value: '5000-10000' },
  { label: '₹10,000 - ₹20,000', value: '10000-20000' },
  { label: '₹20,000 - ₹40,000', value: '20000-40000' },
  { label: '₹40,000 - ₹70,000', value: '40000-70000' },
  { label: '₹70,000+', value: '70000-1000000' }
];
const OS_OPTIONS = ['Android', 'iOS'];
const FEATURES = ['5G', 'AMOLED', 'OLED', 'Dual SIM', 'Fast Charging', 'Wireless Charging'];

interface FilterState {
  brands: string[];
  priceRanges: string[];
  os: string[];
  features: string[];
}

interface MobileFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClose?: () => void;
}

const MobileFilters = ({ filters, onFilterChange, onClose }: MobileFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  
  // Update local state when parent filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  // Update a specific filter category
  const updateFilter = (category: keyof FilterState, item: string) => {
    const currentFilters = [...localFilters[category]];
    
    if (currentFilters.includes(item)) {
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
      brands: [],
      priceRanges: [],
      os: [],
      features: []
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
      {(localFilters.brands.length > 0 || 
        localFilters.priceRanges.length > 0 || 
        localFilters.os.length > 0 || 
        localFilters.features.length > 0) && (
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
      
      {/* Operating System Filter */}
      <Collapsible defaultOpen={true} className="mb-6 border-b border-gray-800 pb-4">
        <CollapsibleTrigger className="flex justify-between items-center w-full py-2">
          <h3 className="font-medium text-white">Operating System</h3>
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="block w-2 h-2 border-r-2 border-b-2 border-white transform rotate-45 translate-y-[-4px] group-data-[state=open]:rotate-[225deg]"></span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 mt-2">
            {OS_OPTIONS.map(os => (
              <div key={os} className="flex items-center space-x-2">
                <Checkbox 
                  id={`os-${os}`}
                  checked={localFilters.os.includes(os)}
                  onCheckedChange={() => updateFilter('os', os)}
                />
                <Label htmlFor={`os-${os}`} className="text-gray-300 cursor-pointer">
                  {os}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Features Filter */}
      <Collapsible defaultOpen={true} className="mb-2">
        <CollapsibleTrigger className="flex justify-between items-center w-full py-2">
          <h3 className="font-medium text-white">Features</h3>
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="block w-2 h-2 border-r-2 border-b-2 border-white transform rotate-45 translate-y-[-4px] group-data-[state=open]:rotate-[225deg]"></span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 mt-2">
            {FEATURES.map(feature => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox 
                  id={`feature-${feature}`}
                  checked={localFilters.features.includes(feature)}
                  onCheckedChange={() => updateFilter('features', feature)}
                />
                <Label htmlFor={`feature-${feature}`} className="text-gray-300 cursor-pointer">
                  {feature}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default MobileFilters;
