"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Sparkles, TrendingUp, Heart, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

type DonationProfile = {
  recommendedAmount: number;
  impact: string;
  reasoning: string;
  frequency: string;
};

const getAIRecommendation = (): DonationProfile => {
  // Simulate AI analysis based on "user profile" - in real app, this would use actual AI/ML
  const profiles: DonationProfile[] = [
    {
      recommendedAmount: 100,
      impact: "Feed 1 person a nutritious meal daily",
      reasoning: "Based on typical donation patterns, ₹100 creates meaningful impact while being accessible to most donors.",
      frequency: "weekly",
    },
    {
      recommendedAmount: 50,
      impact: "Provide tea and snacks to 1 person",
      reasoning: "A smaller, regular contribution adds up! Many donors find ₹50 comfortable for frequent giving.",
      frequency: "bi-weekly",
    },
    {
      recommendedAmount: 250,
      impact: "Feed 2-3 people nutritious meals",
      reasoning: "You can create significant impact! This amount helps multiple people and shows strong commitment to the cause.",
      frequency: "monthly",
    },
    {
      recommendedAmount: 500,
      impact: "Feed an entire family for a day",
      reasoning: "Transform lives of a whole family! This generous amount provides comprehensive nutrition support.",
      frequency: "monthly",
    },
  ];

  // Randomly select one for demo purposes
  return profiles[Math.floor(Math.random() * profiles.length)];
};

export function AIRecommendation({ onSelectAmount }: { onSelectAmount: (amount: number) => void }) {
  const [recommendation, setRecommendation] = useState<DonationProfile | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRecommendation = () => {
    setIsGenerating(true);
    // Simulate AI processing time
    setTimeout(() => {
      setRecommendation(getAIRecommendation());
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-orange-50/50 to-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="flex items-center gap-2">
              AI Donation Assistant
              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                BETA
              </span>
            </CardTitle>
            <CardDescription>
              Get personalized donation recommendations based on impact analysis
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {!recommendation && !isGenerating && (
          <div className="text-center py-8">
            <div className="mb-4">
              <div className="inline-flex h-16 w-16 rounded-full bg-primary/10 items-center justify-center mb-3">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground mb-6">
                Let our AI analyze the optimal donation amount for maximum impact
              </p>
            </div>
            <Button
              onClick={generateRecommendation}
              className="bg-primary hover:bg-primary/90"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Get AI Recommendation
            </Button>
          </div>
        )}

        {isGenerating && (
          <div className="text-center py-8">
            <div className="inline-flex h-16 w-16 rounded-full bg-primary/10 items-center justify-center mb-4 relative">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p className="text-muted-foreground">Analyzing donation patterns...</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Calculating optimal impact
            </p>
          </div>
        )}

        {recommendation && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl text-primary">₹{recommendation.recommendedAmount}</span>
                <span className="text-sm text-muted-foreground">/ {recommendation.frequency}</span>
              </div>
              <p className="text-sm text-muted-foreground">Recommended contribution</p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm">
                    <strong>Impact:</strong> {recommendation.impact}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm">
                    <strong>AI Insight:</strong> {recommendation.reasoning}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm">
                    <strong>Community:</strong> Join {Math.floor(Math.random() * 500) + 200} donors giving similar amounts
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => onSelectAmount(recommendation.recommendedAmount)}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Use This Amount
              </Button>
              <Button
                onClick={generateRecommendation}
                variant="outline"
                className="flex-1"
              >
                Get New Suggestion
              </Button>
            </div>
          </motion.div>
        )}

        <div className="text-xs text-center text-muted-foreground pt-2 border-t">
          💡 AI analyzes donation patterns to suggest optimal amounts for maximum impact
        </div>
      </CardContent>
    </Card>
  );
}
