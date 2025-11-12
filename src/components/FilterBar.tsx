import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FilterBarProps {
  onFilterChange: (filters: string[]) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filterOptions = [
    { id: "quick", label: "Quick (< 30min)" },
    { id: "budget", label: "Budget-friendly" },
    { id: "minimal", label: "Minimal equipment" },
    { id: "vegetarian", label: "Vegetarian" },
    { id: "spicy", label: "Spicy" },
    { id: "asian", label: "Asian cuisine" },
  ];

  const toggleFilter = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter((f) => f !== filterId)
      : [...selectedFilters, filterId];
    
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    onFilterChange([]);
  };

  return (
    <div className="w-full bg-card shadow-soft-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-2 overflow-x-auto">
            {selectedFilters.length > 0 ? (
              <>
                {selectedFilters.map((filterId) => {
                  const filter = filterOptions.find((f) => f.id === filterId);
                  return (
                    <Badge
                      key={filterId}
                      variant="default"
                      className="flex items-center gap-1 whitespace-nowrap"
                    >
                      {filter?.label}
                      <button
                        onClick={() => toggleFilter(filterId)}
                        className="ml-1 hover:text-primary-foreground/80"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
                <button
                  onClick={clearFilters}
                  className="text-xs text-muted-foreground hover:text-foreground underline whitespace-nowrap"
                >
                  Clear all
                </button>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No filters applied</p>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 whitespace-nowrap">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Recipes</SheetTitle>
                <SheetDescription>
                  Select your preferences to find the perfect recipes
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {filterOptions.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => toggleFilter(filter.id)}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
