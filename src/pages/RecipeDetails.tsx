import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Clock, DollarSign, Utensils, Lightbulb, ChefHat } from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: string;
  cost: string;
  difficulty: string;
  tags: string[];
  ingredients: { name: string; amount: string; unit: string }[];
  appliances: string[];
  steps: string[];
  foodScienceTips?: string[];
}

const RecipeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe as Recipe;

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-foreground mb-4">Recipe Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The recipe you're looking for doesn't exist.
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
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">{recipe.title}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Image */}
        <div className="relative h-80 md:h-96 rounded-lg overflow-hidden mb-8">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        </div>

        {/* Recipe Meta */}
        <div className="flex flex-wrap gap-2 mb-6">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-around mb-8 p-6 bg-muted/30 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <Clock className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-foreground">{recipe.time}</span>
            <span className="text-xs text-muted-foreground">Time</span>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="flex flex-col items-center gap-2">
            <DollarSign className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-foreground">{recipe.cost}</span>
            <span className="text-xs text-muted-foreground">Cost</span>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="flex flex-col items-center gap-2">
            <Utensils className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-foreground">{recipe.difficulty}</span>
            <span className="text-xs text-muted-foreground">Difficulty</span>
          </div>
        </div>

        {/* Appliances Needed */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ChefHat className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Appliances Needed</h2>
          </div>
          <Card className="p-6">
            <div className="flex flex-wrap gap-2">
              {recipe.appliances.map((appliance, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {appliance}
                </Badge>
              ))}
            </div>
          </Card>
        </section>

        {/* Ingredients */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ingredients</h2>
          <Card className="p-6">
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-foreground capitalize">{ingredient.name}</span>
                  <span className="text-muted-foreground font-semibold">
                    {ingredient.amount} {ingredient.unit}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Cooking Steps */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Cooking Steps</h2>
          <Card className="p-6">
            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </span>
                  <p className="text-foreground pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </Card>
        </section>

        {/* Food Science Tips */}
        {recipe.foodScienceTips && recipe.foodScienceTips.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Learn While You Cook</h2>
            </div>
            <Card className="p-6 bg-muted/30">
              <p className="text-sm text-muted-foreground mb-4">
                Evidence-based food science tips to maximize nutrition and flavor
              </p>
              <ul className="space-y-3">
                {recipe.foodScienceTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary mt-0.5 text-lg">•</span>
                    <span className="text-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        )}

        <div className="flex gap-4">
          <Button onClick={() => navigate("/ingredient-list", { state: location.state })} variant="outline" className="flex-1">
            Back to Shopping List
          </Button>
          <Button onClick={() => navigate("/")} className="flex-1">
            Find More Recipes
          </Button>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetails;
