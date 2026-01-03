"use client"
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MessageCircle, X, Send, Bot, User, Sparkles, Minimize2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  options?: string[];
};

type AIResponse = {
  text: string;
  options?: string[];
};

// ... keep existing getAIResponse function ...
const getAIResponse = (userMessage: string): AIResponse => {
  const message = userMessage.toLowerCase();

  // Greetings
  if (message.includes("hello") || message.includes("hi") || message.includes("hey") || message.includes("namaste")) {
    return {
      text: "Hello! I'm Nobelica AI, your intelligent assistant at Nobel Hands. I'm here to help you make a difference in fighting hunger. How can I assist you today?",
      options: ["Donate Now", "Charity Wallet", "Our Impact", "Who We Help"]
    };
  }

  // Donation
  if (message.includes("donate") || message.includes("donation")) {
    return {
      text: "You can donate starting from just ₹2! Even small amounts make a huge difference. Would you like to know about our Charity Wallet or proceed to donate?",
      options: ["Donate Now", "Charity Wallet", "Tax Benefits", "Donation Safety"]
    };
  }

  // Charity Wallet
  if (message.includes("wallet") || message.includes("charity wallet")) {
    return {
      text: "Our Charity Wallet lets you store funds and donate instantly without entering payment details each time. It's convenient and helps you donate quickly when you feel inspired!",
      options: ["Create Wallet", "How it Work?", "Donate Now"]
    };
  }

  // Impact
  if (message.includes("impact") || message.includes("help") || message.includes("difference")) {
    return {
      text: "Every donation creates real impact! ₹2 provides a helping hand, ₹50 can buy tea and snacks, ₹100 provides a nutritious meal, and ₹500 can feed an entire family. What matters most is your kindness!",
      options: ["Donate ₹50", "Donate ₹100", "See Stories", "Who We Help"]
    };
  }

  // Beneficiaries
  if (message.includes("who") || message.includes("beneficiary") || message.includes("feed")) {
    return {
      text: "We help elderly beggars, homeless individuals, street children, and families who can't afford meals. 100% of your donation goes directly to feeding those in need.",
      options: ["Our Mission", "Success Stories", "Donate Now"]
    };
  }

  // Safety
  if (message.includes("safe") || message.includes("secure") || message.includes("trust")) {
    return {
      text: "Your donations are 100% secure. We use encrypted payment gateways and 100% of your contribution goes directly to feeding the hungry. We're transparent about where every rupee goes!",
      options: ["View Transparency Reports", "Donate Now"]
    };
  }

  // Tax
  if (message.includes("tax") || message.includes("receipt") || message.includes("80g")) {
    return {
      text: "Yes! All donations are eligible for tax exemption under Section 80G. You'll receive a donation receipt via email immediately after your donation.",
      options: ["Donate & Save Tax"]
    };
  }

  // Process
  if (message.includes("how") || message.includes("work") || message.includes("process")) {
    return {
      text: "It's simple! Choose a donation amount, select your payment method (we now have a Charity Wallet option!), and complete the payment. We immediately use your funds to provide meals to those in need.",
      options: ["Start Donation", "Charity Wallet"]
    };
  }

  // Minimum Donation
  if (message.includes("minimum") || message.includes("₹2") || message.includes("rs 2")) {
    return {
      text: "Yes, you can donate as little as ₹2! We believe every contribution matters. Small donations from many kind hearts can create massive impact together.",
      options: ["Donate ₹2 Now", "Other Amount"]
    };
  }

  // Thank You
  if (message.includes("thank")) {
    return {
      text: "Thank YOU for your compassion and generosity! Together, we're making a real difference in fighting hunger. 🙏",
      options: ["Donate Again", "Share"]
    };
  }

  // Identity
  if (message.includes("name") || message.includes("who are you") || message.includes("nobelica")) {
    return {
      text: "I'm Nobelica AI! I'm an intelligent assistant created to help donors like you make the most meaningful impact in fighting hunger through Nobel Hands.",
      options: ["What can you do?", "Donate Now"]
    };
  }

  // Default
  return {
    text: "Ji, I can help you with information about donations, our charity wallet, the impact of your contribution, who we help, and how Nobel Hands works. What would you like to know?",
    options: ["Make a Donation", "Charity Wallet", "Our Impact", "Contact Support"]
  };
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "🙏 Namaste! I'm Nobelica AI. Ask me how even ₹2 can feed a hungry soul today.",
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
  }, [messages, isOpen]); // Scroll when opened too

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputMessage;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = getAIResponse(messageText);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "ai",
        timestamp: new Date(),
        options: response.options,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
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
              className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-primary to-orange-600 hover:shadow-primary/25 hover:scale-105 transition-all duration-300 relative group p-0 overflow-hidden border-2 border-white/20"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 group-hover:opacity-30 transition-opacity" />
              <MessageCircle className="h-8 w-8 text-white relative z-10" />
              <span className="absolute top-3 right-3 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed z-50 
              inset-0 md:inset-auto md:bottom-6 md:right-6 
              w-full h-full md:w-[400px] md:h-[600px] md:max-h-[calc(100vh-2rem)]"
          >
            <Card className="h-full flex flex-col shadow-2xl overflow-hidden border-0 md:border md:rounded-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-orange-600 p-4 shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-inner">
                      <Bot className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Nobelica AI</h3>
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                        </span>
                        <span className="text-white/90 text-xs font-medium">Online Now</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-full h-10 w-10 transition-colors"
                  >
                    {window.innerWidth < 768 ? <Minimize2 className="h-5 w-5" /> : <X className="h-6 w-6" />}
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/30 scroll-smooth">
                {messages.map((message) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={message.id}
                    className={`flex flex-col gap-2 ${message.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className={`flex gap-3 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      {message.sender === "ai" && (
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-5 py-3 shadow-sm text-sm leading-relaxed ${message.sender === "ai"
                          ? "bg-white text-foreground border border-border/50 rounded-tl-none"
                          : "bg-gradient-to-br from-primary to-orange-600 text-white rounded-tr-none shadow-md"
                          }`}
                      >
                        {message.text}
                      </div>
                    </div>

                    {/* Render Options if available */}
                    {message.sender === "ai" && message.options && (
                      <div className="flex flex-wrap gap-2 ml-11 max-w-[85%]">
                        {message.options.map((option, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * idx }}
                            onClick={() => handleSendMessage(option)}
                            className="text-xs bg-white hover:bg-primary text-primary hover:text-white border border-primary/20 px-3 py-1.5 rounded-full transition-all flex items-center gap-1 shadow-sm hover:shadow-md cursor-pointer"
                          >
                            {option}
                            <ChevronRight className="h-3 w-3" />
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="bg-white border border-border/50 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5 h-[44px]">
                      <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="p-4 bg-background border-t border-border/50 shrink-0">
                <div className="flex items-end gap-2 bg-secondary/50 p-1.5 rounded-3xl border border-input focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-3 h-auto min-h-[44px] max-h-[120px]"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isTyping}
                    size="icon"
                    className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 shrink-0 mb-0.5 mr-0.5 transition-transform hover:scale-105 active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-3 opacity-60">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <p className="text-[10px] uppercase tracking-wider font-medium">Powered by Nobel Hands AI</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
