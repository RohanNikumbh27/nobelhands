"use client"

import { Users, Heart, Utensils, MapPin } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
}

function StatCard({ icon, value, label, suffix = "+" }: StatCardProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={cardRef} className="flex flex-col items-center text-center p-8 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <div className="text-primary">
          {icon}
        </div>
      </div>
      <div className="text-4xl mb-2 text-foreground">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}

export function ImpactStats() {
  return (
    <section id="impact-section" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl mb-4 text-foreground">Our Impact</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Together, we're making a real difference in the lives of those who need it most
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Utensils className="w-8 h-8" />}
            value={50000}
            label="Meals Served"
          />
          <StatCard
            icon={<Users className="w-8 h-8" />}
            value={12500}
            label="Lives Touched"
          />
          <StatCard
            icon={<Heart className="w-8 h-8" />}
            value={8200}
            label="Kind Donors"
          />
          <StatCard
            icon={<MapPin className="w-8 h-8" />}
            value={45}
            label="Cities Reached"
          />
        </div>
      </div>
    </section>
  );
}
