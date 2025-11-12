import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import RecipeCard from "@/components/RecipeCard";
import CommunityFeed from "@/components/CommunityFeed";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X, ShoppingCart } from "lucide-react";
import stirfryImg from "@/assets/recipe-stirfry.jpg";
import smoothieImg from "@/assets/recipe-smoothie.jpg";
import soupImg from "@/assets/recipe-soup.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);

  const recipes = [
    {
      id: "1",
      title: "Spinach Stir-Fry",
      image: stirfryImg,
      time: "15 min",
      cost: "$8",
      difficulty: "Easy",
      tags: ["Asian", "Quick", "Vegetarian"],
      ingredients: [
        { name: "spinach", amount: "300", unit: "g" },
        { name: "garlic", amount: "3", unit: "cloves" },
        { name: "soy sauce", amount: "2", unit: "tbsp" },
        { name: "sesame oil", amount: "1", unit: "tbsp" },
      ],
      appliances: ["Wok or Large Pan", "Knife", "Cutting Board"],
      steps: [
        "Wash and drain the spinach thoroughly",
        "Mince the garlic cloves finely",
        "Heat the wok over high heat and add sesame oil",
        "Add garlic and stir-fry for 30 seconds until fragrant",
        "Add spinach and stir-fry for 2-3 minutes until wilted",
        "Add soy sauce and toss to combine",
        "Serve immediately while hot"
      ],
      foodScienceTips: [
        "Cook spinach briefly to preserve vitamin C and folate",
        "Add garlic at the end to maintain its beneficial allicin compounds",
        "Sesame oil contains healthy unsaturated fats that aid vitamin absorption"
      ],
    },
    {
      id: "2",
      title: "Green Power Smoothie",
      image: smoothieImg,
      time: "5 min",
      cost: "$5",
      difficulty: "Beginner",
      tags: ["Breakfast", "Healthy", "Quick"],
      ingredients: [
        { name: "spinach", amount: "100", unit: "g" },
        { name: "banana", amount: "1", unit: "piece" },
        { name: "almond milk", amount: "250", unit: "ml" },
        { name: "honey", amount: "1", unit: "tbsp" },
      ],
      appliances: ["Blender", "Measuring Cup"],
      steps: [
        "Add spinach to the blender first",
        "Peel and break the banana into chunks",
        "Add banana chunks to the blender",
        "Pour in the almond milk",
        "Add honey",
        "Blend on high speed for 1-2 minutes until smooth",
        "Pour into a glass and enjoy immediately"
      ],
      foodScienceTips: [
        "Vitamin C in banana enhances iron absorption from spinach",
        "Blend spinach first to break down cell walls for better nutrient release",
        "Consume immediately to preserve enzymes and antioxidants"
      ],
    },
    {
      id: "3",
      title: "Hearty Vegetable Soup",
      image: soupImg,
      time: "30 min",
      cost: "$10",
      difficulty: "Easy",
      tags: ["Comfort", "Healthy", "Budget-friendly"],
      ingredients: [
        { name: "spinach", amount: "150", unit: "g" },
        { name: "carrots", amount: "2", unit: "pieces" },
        { name: "celery", amount: "2", unit: "stalks" },
        { name: "vegetable broth", amount: "1", unit: "liter" },
        { name: "garlic", amount: "2", unit: "cloves" },
      ],
      appliances: ["Large Pot", "Knife", "Cutting Board", "Ladle"],
      steps: [
        "Dice carrots and celery into small pieces",
        "Mince the garlic cloves",
        "Heat the pot over medium heat and add a drizzle of oil",
        "Sauté garlic for 1 minute until fragrant",
        "Add carrots and celery, cook for 5 minutes",
        "Pour in vegetable broth and bring to a gentle simmer",
        "Cook for 15 minutes until vegetables are tender",
        "Add spinach in the last 2 minutes of cooking",
        "Season with salt and pepper to taste",
        "Serve hot in bowls"
      ],
      foodScienceTips: [
        "Add spinach last to minimize nutrient loss from prolonged heat",
        "Beta-carotene in carrots is enhanced when cooked with a small amount of fat",
        "Keeping broth below boiling preserves heat-sensitive vitamins"
      ],
    },
  ];

  const handleSwipeLeft = () => {
    console.log("Rejected recipe:", recipes[currentRecipeIndex].title);
    nextRecipe();
  };

  const handleSwipeRight = () => {
    const recipeId = recipes[currentRecipeIndex].id;
    if (!selectedRecipes.includes(recipeId)) {
      setSelectedRecipes([...selectedRecipes, recipeId]);
    }
    console.log("Added to bundle:", recipes[currentRecipeIndex].title);
    nextRecipe();
  };

  const handleViewIngredients = () => {
    const selected = recipes.filter((recipe) => selectedRecipes.includes(recipe.id));
    navigate("/ingredient-list", { state: { selectedRecipes: selected } });
  };

  const nextRecipe = () => {
    if (currentRecipeIndex < recipes.length - 1) {
      setCurrentRecipeIndex(currentRecipeIndex + 1);
    } else {
      setCurrentRecipeIndex(0);
    }
  };

  const previousRecipe = () => {
    if (currentRecipeIndex > 0) {
      setCurrentRecipeIndex(currentRecipeIndex - 1);
    } else {
      setCurrentRecipeIndex(recipes.length - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Build Your Recipe Bundle
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Swipe right to add recipes that share ingredients. Reduce waste and maximize your grocery budget!
            </p>
          </div>

          <FilterBar onFilterChange={setSelectedFilters} />

          {selectedRecipes.length > 0 && (
            <div className="mt-8 flex items-center justify-center">
              <Button onClick={handleViewIngredients} size="lg" className="gap-2">
                <ShoppingCart className="w-5 h-5" />
                View Ingredient List
                <Badge variant="secondary" className="ml-2">
                  {selectedRecipes.length}
                </Badge>
              </Button>
            </div>
          )}

          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="relative w-full max-w-md">
              <RecipeCard
                {...recipes[currentRecipeIndex]}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              />
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-16 h-16"
                onClick={handleSwipeLeft}
              >
                <X className="w-6 h-6 text-destructive" />
              </Button>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={previousRecipe}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <span className="text-sm text-muted-foreground px-4">
                  {currentRecipeIndex + 1} / {recipes.length}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextRecipe}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-16 h-16 border-secondary hover:bg-secondary"
                onClick={handleSwipeRight}
              >
                <ChevronRight className="w-6 h-6 text-secondary" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Drag cards left or right, or use the buttons
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <CommunityFeed />
        </div>
      </section>

      <footer className="py-8 border-t border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-warm bg-clip-text text-transparent">
                CookWise
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2024 CookWise. Eat better, spend smarter, waste less.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
