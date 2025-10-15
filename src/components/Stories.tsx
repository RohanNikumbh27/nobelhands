import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Quote } from "lucide-react";

const stories = [
  {
    image: "https://images.unsplash.com/photo-1724301964759-374723c8ee7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwaW5kaWFuJTIwd29tYW4lMjBwb3ZlcnR5fGVufDF8fHx8MTc1OTMyOTE1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote: "I couldn't afford food for days. Thanks to Nobel Hands, I get a warm meal daily. May God bless all the donors.",
    name: "Kamala Devi, 72 years",
    location: "Delhi",
  },
  {
    image: "https://images.unsplash.com/photo-1632718322435-835db1f80b9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHJlZXQlMjBjaGlsZHJlbnxlbnwxfHx8fDE3NTkzMjkxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote: "My children used to sleep hungry. Now they smile because of your donations. Even ₹2 makes a huge difference.",
    name: "Raju, Father of 3",
    location: "Mumbai",
  },
  {
    image: "https://images.unsplash.com/photo-1544186196-6908a9d76ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwaW5kaWFuJTIwbWFuJTIwcG9vcnxlbnwxfHx8fDE3NTkzMjkxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote: "At my age, finding work is impossible. This organization ensures I don't sleep on an empty stomach. I'm forever grateful.",
    name: "Ramesh, 68 years",
    location: "Kolkata",
  },
];

export function Stories() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl mb-4 text-foreground">Stories of Hope</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from the people whose lives have been touched by your generosity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 italic leading-relaxed">
                  "{story.quote}"
                </p>
                <div>
                  <div className="text-foreground">{story.name}</div>
                  <div className="text-sm text-muted-foreground">{story.location}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
