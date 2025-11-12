import { Button } from "@/components/ui/button";
import { ChefHat, Sparkles, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-cooking.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Smart Recipe Discovery</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground">What should I</span>
                <br />
                <span className="bg-gradient-warm bg-clip-text text-transparent">cook today?</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                Eat better, spend smarter, waste less. Discover recipes that match your ingredients, 
                budget, and time—all while learning the science behind delicious cooking.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" className="group">
                <ChefHat className="w-5 h-5 group-hover:rotate-12 transition-bounce" />
                Start Cooking
              </Button>
              <Button variant="outline" size="lg">
                Explore Bundles
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">10k+</p>
                <p className="text-sm text-muted-foreground">Recipes</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">50k+</p>
                <p className="text-sm text-muted-foreground">Happy Cooks</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Leaf className="w-5 h-5 text-secondary" />
                  <p className="text-2xl font-bold text-foreground">30%</p>
                </div>
                <p className="text-sm text-muted-foreground">Less Waste</p>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[600px] hidden lg:block">
            <div className="absolute inset-0 bg-gradient-warm opacity-20 blur-3xl rounded-full" />
            <img
              src={heroImage}
              alt="Fresh ingredients and cooking"
              className="relative w-full h-full object-cover rounded-3xl shadow-soft-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
