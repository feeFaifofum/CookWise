import { useState } from "react";
import { Heart, Clock, DollarSign, Utensils } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecipeCardProps {
  title: string;
  image: string;
  time: string;
  cost: string;
  difficulty: string;
  tags: string[];
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const RecipeCard = ({
  title,
  image,
  time,
  cost,
  difficulty,
  tags,
  onSwipeLeft,
  onSwipeRight,
}: RecipeCardProps) => {
  const [liked, setLiked] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offsetX = e.clientX - dragStart.x;
    const offsetY = e.clientY - dragStart.y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(dragOffset.x) > 100) {
      if (dragOffset.x > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    }
    
    setDragOffset({ x: 0, y: 0 });
  };

  const rotation = isDragging ? dragOffset.x / 20 : 0;
  const opacity = Math.max(0.7, 1 - Math.abs(dragOffset.x) / 500);

  return (
    <Card
      className="relative w-full max-w-sm mx-auto overflow-hidden cursor-grab active:cursor-grabbing shadow-soft-lg transition-smooth"
      style={{
        transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
        opacity,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-card/90 backdrop-blur-sm shadow-soft-md hover:scale-110 transition-bounce"
        >
          <Heart
            className={`w-6 h-6 ${
              liked ? "fill-accent text-accent" : "text-muted-foreground"
            } transition-smooth`}
          />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{cost}</span>
          </div>
          <div className="flex items-center gap-1">
            <Utensils className="w-4 h-4" />
            <span>{difficulty}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecipeCard;
