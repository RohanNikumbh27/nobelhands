import { Card, CardContent } from "./ui/card";
import { Target, Users, TrendingUp, Shield } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To ensure no one in our community goes to bed hungry by making it easy for everyone to contribute, even with the smallest amount.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description: "We believe every donation matters. Whether it's ₹2 or ₹2000, your contribution helps feed someone in need.",
  },
  {
    icon: TrendingUp,
    title: "Transparency",
    description: "100% of your donation goes directly to feeding the hungry. We maintain complete transparency in our operations.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "We work directly with verified local communities and organizations to ensure every meal reaches those who need it most.",
  },
];

export function Mission() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl mb-4 text-foreground">Why Nobel Hands?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're committed to ending hunger, one meal at a time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-primary/5 border-l-4 border-primary rounded-lg p-8">
          <p className="text-foreground text-lg leading-relaxed">
            <span className="text-primary">Did you know?</span> A meal that costs just ₹50 can provide essential nutrition to someone who hasn't eaten all day. With your help, we've already served over 50,000 meals. Together, we can do so much more.
          </p>
        </div>
      </div>
    </section>
  );
}
