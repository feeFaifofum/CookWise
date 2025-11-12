import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ShoppingCart, ChevronRight } from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: { name: string; amount: string; unit: string }[];
  [key: string]: any;
}

const IngredientList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRecipes = (location.state?.selectedRecipes as Recipe[]) || [];

  // Calculate total ingredients across all recipes
  const getTotalIngredients = () => {
    const ingredientMap = new Map<string, { total: number; unit: string; recipes: string[] }>();

    selectedRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const key = ingredient.name.toLowerCase();
        const amount = parseFloat(ingredient.amount) || 0;

        if (ingredientMap.has(key)) {
          const existing = ingredientMap.get(key)!;
          existing.total += amount;
          existing.recipes.push(recipe.title);
        } else {
          ingredientMap.set(key, {
            total: amount,
            unit: ingredient.unit,
            recipes: [recipe.title],
          });
        }
      });
    });

    return Array.from(ingredientMap.entries()).map(([name, data]) => ({
      name,
      ...data,
    }));
  };

  const totalIngredients = getTotalIngredients();

  if (selectedRecipes.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-foreground mb-4">No Recipes Selected</h2>
          <p className="text-muted-foreground mb-6">
            You haven't added any recipes to your bundle yet.
          </p>
          <Button onClick={() => navigate("/")}>Browse Recipes</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Shopping List</h1>
              <p className="text-sm text-muted-foreground">
                {selectedRecipes.length} {selectedRecipes.length === 1 ? "recipe" : "recipes"} in your bundle
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Total Ingredients Overview */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingCart className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Total Ingredients Needed</h2>
          </div>
          <Card className="p-6">
            <div className="space-y-4">
              {totalIngredients.map((ingredient, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground capitalize">{ingredient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Used in: {ingredient.recipes.join(", ")}
                      </p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {ingredient.total} {ingredient.unit}
                    </Badge>
                  </div>
                  {index < totalIngredients.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Per-Recipe Breakdown */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Selected Recipes</h2>
          <div className="space-y-6">
            {selectedRecipes.map((recipe) => (
              <Card 
                key={recipe.id} 
                className="p-6 hover:shadow-lg transition-smooth cursor-pointer"
                onClick={() => navigate(`/recipe/${recipe.id}`, { state: { recipe, selectedRecipes } })}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-4">{recipe.title}</h3>
                    <div className="space-y-3">
                      {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-foreground capitalize">{ingredient.name}</span>
                          <span className="text-muted-foreground">
                            {ingredient.amount} {ingredient.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Tap to view full recipe with steps and cooking tips
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <div className="mt-8 flex gap-4">
          <Button onClick={() => navigate("/")} variant="outline" className="flex-1">
            Add More Recipes
          </Button>
          <Button className="flex-1">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Export List
          </Button>
        </div>
      </main>
    </div>
  );
};

export default IngredientList;
