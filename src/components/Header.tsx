"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "./ui/sheet";
import { Menu, Heart, Home, TrendingUp, Users, DollarSign, Target, BookOpen, Mail } from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Our Impact", href: "#impact-section", icon: TrendingUp },
  { name: "Who We Help", href: "#who-we-help", icon: Users },
  { name: "Donate", href: "#donate-section", icon: DollarSign },
  { name: "Mission", href: "#mission", icon: Target },
  { name: "Stories", href: "#stories", icon: BookOpen },
  { name: "Contact", href: "#footer", icon: Mail },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="font-semibold text-lg text-foreground">Nobel Hands</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                onClick={() => handleNavClick(item.href)}
                className="text-foreground hover:text-primary hover:bg-primary/10"
              >
                {item.name}
              </Button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary fill-primary" />
                  Nobel Hands
                </SheetTitle>
                <SheetDescription>
                  Navigate through our website and make a difference
                </SheetDescription>
              </SheetHeader>
              <motion.div
                initial="hidden"
                animate="show"
                className="flex flex-col h-full"
              >
                <motion.nav
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2,
                      },
                    },
                  }}
                  className="flex flex-col gap-2 mt-8 px-2"
                >
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          show: { opacity: 1, x: 0 },
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-left"
                      >
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="font-medium text-lg">{item.name}</span>
                      </motion.button>
                    );
                  })}
                </motion.nav>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-auto mb-8 p-4 bg-secondary rounded-lg"
                >
                  <p className="text-sm text-muted-foreground mb-3">
                    Every contribution matters. Help us feed those in need.
                  </p>
                  <Button
                    onClick={() => handleNavClick("#donate-section")}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Donate Now
                  </Button>
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
