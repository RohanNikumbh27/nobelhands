import { ImageWithFallback } from "./figma/ImageWithFallback";

const beneficiaries = [
  {
    image: "https://images.unsplash.com/photo-1724301964759-374723c8ee7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwaW5kaWFuJTIwd29tYW4lMjBwb3ZlcnR5fGVufDF8fHx8MTc1OTMyOTE1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Elderly Women",
    description: "Many elderly women live alone without family support, struggling to afford even basic meals.",
  },
  {
    image: "https://images.unsplash.com/photo-1544186196-6908a9d76ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwaW5kaWFuJTIwbWFuJTIwcG9vcnxlbnwxfHx8fDE3NTkzMjkxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Elderly Men",
    description: "Aging daily wage workers who can no longer find work and have no means to feed themselves.",
  },
  {
    image: "https://images.unsplash.com/photo-1632718322435-835db1f80b9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHJlZXQlMjBjaGlsZHJlbnxlbnwxfHx8fDE3NTkzMjkxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Street Children",
    description: "Young children living on streets who often go days without a proper meal.",
  },
  {
    image: "https://images.unsplash.com/photo-1572969426256-52727bb44d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29yJTIwaW5kaWFuJTIwY2hpbGRyZW4lMjBodW5ncnl8ZW58MXx8fHwxNzU5MzI5MTU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Underprivileged Families",
    description: "Families living below the poverty line, struggling to provide one meal a day for their children.",
  },
];

export function WhoWeHelp() {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl mb-4 text-foreground">Who We Help</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your small contribution reaches those who need it the most - elderly beggars, street children, 
            and families struggling to afford even one meal a day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {beneficiaries.map((beneficiary, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <ImageWithFallback
                  src={beneficiary.image}
                  alt={beneficiary.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="mb-2 text-white">{beneficiary.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {beneficiary.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-primary/10 border-2 border-primary/30 rounded-2xl p-8 max-w-3xl">
            <p className="text-foreground text-lg leading-relaxed">
              <span className="text-primary">Every donation counts.</span> Whether it's ₹2, ₹50, or ₹500, 
              your contribution directly helps feed these vulnerable members of our society who often go days 
              without a proper meal. Together, we can ensure no one sleeps hungry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
