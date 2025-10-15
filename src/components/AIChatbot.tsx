"use client"

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
};

// Mock AI responses based on keywords
const getAIResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();

  if (message.includes("hello") || message.includes("hi") || message.includes("hey") || message.includes("namaste")) {
    return "Hello! I'm Nobelica AI, your intelligent assistant at Nobel Hands. I'm here to help you make a difference in fighting hunger. How can I assist you today?";
  }

  if (message.includes("donate") || message.includes("donation")) {
    return "You can donate starting from just ₹2! Even small amounts make a huge difference. Would you like me to suggest a donation amount based on the impact you want to create?";
  }

  if (message.includes("wallet") || message.includes("charity wallet")) {
    return "Our Charity Wallet lets you store funds and donate instantly without entering payment details each time. It's convenient and helps you donate quickly when you feel inspired!";
  }

  if (message.includes("impact") || message.includes("help") || message.includes("difference")) {
    return "Every donation creates real impact! ₹2 provides a helping hand, ₹50 can buy tea and snacks, ₹100 provides a nutritious meal, and ₹500 can feed an entire family. What matters most is your kindness!";
  }

  if (message.includes("who") || message.includes("beneficiary") || message.includes("feed")) {
    return "We help elderly beggars, homeless individuals, street children, and families who can't afford meals. 100% of your donation goes directly to feeding those in need.";
  }

  if (message.includes("safe") || message.includes("secure") || message.includes("trust")) {
    return "Your donations are 100% secure. We use encrypted payment gateways and 100% of your contribution goes directly to feeding the hungry. We're transparent about where every rupee goes!";
  }

  if (message.includes("tax") || message.includes("receipt") || message.includes("80g")) {
    return "Yes! All donations are eligible for tax exemption under Section 80G. You'll receive a donation receipt via email that you can use for tax filing.";
  }

  if (message.includes("how") || message.includes("work") || message.includes("process")) {
    return "It's simple! Choose a donation amount, select your payment method (we now have a Charity Wallet option!), and complete the payment. We immediately use your funds to provide meals to those in need.";
  }

  if (message.includes("minimum") || message.includes("₹2") || message.includes("rs 2")) {
    return "Yes, you can donate as little as ₹2! We believe every contribution matters. Small donations from many kind hearts can create massive impact together.";
  }

  if (message.includes("thank")) {
    return "Thank YOU for your compassion and generosity! Together, we're making a real difference in fighting hunger. 🙏";
  }

  if (message.includes("name") || message.includes("who are you") || message.includes("nobelica")) {
    return "I'm Nobelica AI! I'm an intelligent assistant created to help donors like you make the most meaningful impact in fighting hunger through Nobel Hands. I can answer questions, provide donation guidance, and help you understand the real-world impact of your generosity.";
  }

  // Default response
  return "That's a great question! I can help you with information about donations, our charity wallet, the impact of your contribution, who we help, and how Nobel Hands works. What would you like to know?";
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "🙏 Namaste! I'm Nobelica AI, your intelligent companion at Nobel Hands. I'm here to help you understand how your donation can fight hunger and make a meaningful impact. Ask me anything!",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputMessage),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 relative"
              size="icon"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-orange-500 items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </span>
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)]"
          >
            <Card className="shadow-2xl border-2">
              <CardHeader className="bg-primary text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Bot className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-white">Nobelica AI</CardTitle>
                      <div className="flex items-center gap-1 text-xs text-white/80">
                        <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
                        Online • Ready to help
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Messages Area */}
                <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-muted/20">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                    >
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === "ai"
                            ? "bg-primary text-white"
                            : "bg-orange-100 text-orange-600"
                          }`}
                      >
                        {message.sender === "ai" ? (
                          <Bot className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </div>
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2 ${message.sender === "ai"
                            ? "bg-white border border-border"
                            : "bg-primary text-white"
                          }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-white border border-border rounded-2xl px-4 py-2">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      size="icon"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Nobelica AI • Powered by compassion & intelligence
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
