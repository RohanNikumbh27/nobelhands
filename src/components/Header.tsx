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
            <SheetContent side="right" className="w-[300px] sm:w-[340px] p-0 flex flex-col">
              {/* Sidebar Header with Gradient */}
              <div className="bg-gradient-to-br from-primary via-primary to-orange-500 px-5 py-5 relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <Heart className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <SheetTitle className="text-white text-xl font-bold">
                      Nobel Hands
                    </SheetTitle>
                    <p className="text-white/80 text-sm">Feed the hungry</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <motion.div
                initial="hidden"
                animate="show"
                className="flex flex-col flex-1 overflow-y-auto"
              >
                <motion.nav
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.15,
                      },
                    },
                  }}
                  className="flex flex-col gap-0.5 px-3 py-3"
                >
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isHighlight = item.name === "Donate";
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          show: { opacity: 1, x: 0 },
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group ${isHighlight
                          ? "bg-gradient-to-r from-primary to-orange-500 text-white shadow-md my-1"
                          : "hover:bg-secondary"
                          }`}
                      >
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${isHighlight
                          ? "bg-white/20"
                          : "bg-primary/10"
                          }`}>
                          <Icon className={`w-4 h-4 ${isHighlight ? "text-white" : "text-primary"}`} />
                        </div>
                        <span className={`font-medium text-sm ${isHighlight ? "text-white" : "text-foreground"}`}>
                          {item.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.nav>

                {/* Bottom CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="mt-auto p-3"
                >
                  <div className="bg-gradient-to-br from-primary/5 to-orange-50/50 rounded-xl p-4 border border-primary/10">
                    <p className="text-xs text-muted-foreground mb-3 text-center">Every ₹2 helps feed someone in need</p>
                    <Button
                      onClick={() => handleNavClick("#donate-section")}
                      className="w-full h-10 bg-gradient-to-r from-primary to-orange-500 hover:opacity-90 rounded-lg text-sm font-semibold"
                    >
                      Donate Now
                    </Button>
                  </div>
                </motion.div>
              </motion.div>

              {/* Hidden description for accessibility */}
              <SheetDescription className="sr-only">
                Navigate through our website and make a difference
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header >
  );
}
