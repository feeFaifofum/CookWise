import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Bookmark } from "lucide-react";

interface FeedPost {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  recipe: {
    title: string;
    image: string;
    story: string;
  };
  ingredients: string[];
  likes: number;
  comments: number;
}

const CommunityFeed = () => {
  const samplePosts: FeedPost[] = [
    {
      id: "1",
      author: {
        name: "Maria Chen",
        avatar: "",
      },
      recipe: {
        title: "Grandma's Congee",
        image: "",
        story: "This recipe has been passed down in my family for three generations. My grandmother used to make this every Sunday morning...",
      },
      ingredients: ["Rice", "Ginger", "Scallions", "Century egg", "Pork"],
      likes: 234,
      comments: 18,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Community Wisdom</h2>
        <Badge variant="secondary">New</Badge>
      </div>

      <div className="space-y-4">
        {samplePosts.map((post) => (
          <Card key={post.id} className="overflow-hidden shadow-soft-md">
            <div className="p-4 flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {post.author.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>

            <div className="relative h-64 overflow-hidden bg-muted">
              {post.recipe.image ? (
                <img
                  src={post.recipe.image}
                  alt={post.recipe.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Recipe Image
                </div>
              )}
            </div>

            <div className="p-4 space-y-3">
              <h3 className="text-xl font-bold text-foreground">{post.recipe.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.recipe.story}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.ingredients.slice(0, 4).map((ingredient) => (
                  <Badge key={ingredient} variant="outline" className="text-xs">
                    {ingredient}
                  </Badge>
                ))}
                {post.ingredients.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{post.ingredients.length - 4} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-border">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-smooth">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-smooth">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="ml-auto text-muted-foreground hover:text-secondary transition-smooth">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;
