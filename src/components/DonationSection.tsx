"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Heart, Coffee, Pizza, UtensilsCrossed, Wallet, CreditCard, Smartphone, Building2, QrCode } from "lucide-react";
import { AIRecommendation } from "./AIRecommendation";
import { PaymentDialog } from "./PaymentDialog";
import { PaymentSuccessScreen } from "./PaymentSuccessScreen";
import { AnimatedModal } from "./AnimatedModal";

const donationAmounts = [
  { amount: 2, label: "₹2", description: "A helping hand", icon: Heart },
  { amount: 50, label: "₹50", description: "A cup of tea & snack", icon: Coffee },
  { amount: 100, label: "₹100", description: "A nutritious meal", icon: Pizza },
  { amount: 500, label: "₹500", description: "Feed a family", icon: UtensilsCrossed },
];

type PaymentMethod = "wallet" | "upi" | "qr" | "card" | "netbanking";

const paymentMethods = [
  { id: "qr" as PaymentMethod, label: "QR Code", description: "Scan & Pay", icon: QrCode },
  { id: "upi" as PaymentMethod, label: "UPI", description: "GPay, PhonePe, etc.", icon: Smartphone },
  // { id: "wallet" as PaymentMethod, label: "Charity Wallet", description: "Use wallet balance", icon: Wallet },
  // { id: "card" as PaymentMethod, label: "Card", description: "Credit/Debit Card", icon: CreditCard },
  // { id: "netbanking" as PaymentMethod, label: "Net Banking", description: "Online banking", icon: Building2 },
];

// Mock wallet balance - in a real app, this would come from a backend
const WALLET_BALANCE = 1250;

export function DonationSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("qr");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [lastTransactionId, setLastTransactionId] = useState("");
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "Invalid Amount",
    message: ""
  });

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount < 1) {
      setAlertState({
        isOpen: true,
        title: "Invalid Amount",
        message: "Please enter a valid donation amount"
      });
      return;
    }

    // Open payment dialog
    setShowPaymentDialog(true);
  };

  const handlePaymentSuccess = () => {
    // Generate transaction ID
    const txnId = `NH${Date.now()}${Math.floor(Math.random() * 1000)}`;
    setLastTransactionId(txnId);

    // Close payment dialog and show success screen
    setShowPaymentDialog(false);
    setShowSuccessScreen(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessScreen(false);
    // Reset form
    setSelectedAmount(null);
    setCustomAmount("");
    setDonorName("");
    setDonorEmail("");
  };

  const handleAIAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    // Smooth scroll to donation form
    setTimeout(() => {
      document.getElementById("donation-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      <section id="donate-section" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl mb-4 text-foreground">Make a Difference Today</h2>
              <p className="text-muted-foreground text-lg">
                Every rupee counts. Choose an amount or enter your own
              </p>
            </div>

            {/* AI Recommendation Section */}
            <div className="mb-8">
              <AIRecommendation onSelectAmount={handleAIAmountSelect} />
            </div>

            <Card id="donation-form" className="shadow-xl scroll-mt-8">
              <CardHeader>
                <CardTitle>Your Donation</CardTitle>
                <CardDescription>
                  Select a preset amount or enter a custom donation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Preset Amounts */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {donationAmounts.map(({ amount, label, description, icon: Icon }) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`p-6 rounded-xl border-2 transition-all hover:scale-105 cursor-pointer ${selectedAmount === amount
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                        }`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-3 ${selectedAmount === amount ? "text-primary" : "text-muted-foreground"
                        }`} />
                      <div className={`mb-1 ${selectedAmount === amount ? "text-primary" : "text-foreground"
                        }`}>
                        {label}
                      </div>
                      <div className="text-xs text-muted-foreground">{description}</div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block mb-2 text-foreground">Custom Amount (₹)</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="text-lg"
                    min="1"
                  />
                </div>

                {/* Payment Method Selection */}
                <div>
                  <label className="block mb-3 text-foreground">Payment Method</label>
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                    {paymentMethods.map(({ id, label, description, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setPaymentMethod(id)}
                        className={`p-4 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer ${paymentMethod === id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/50"
                          }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === id ? "text-primary" : "text-muted-foreground"
                          }`} />
                        <div className={`text-sm mb-1 ${paymentMethod === id ? "text-primary" : "text-foreground"
                          }`}>
                          {label}
                        </div>
                        <div className="text-xs text-muted-foreground">{description}</div>
                      </button>
                    ))}
                  </div>
                  {paymentMethod === "wallet" && (
                    <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Available Balance:</span>
                        <span className="text-primary">₹{WALLET_BALANCE}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Donor Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-foreground">Name (Optional)</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-foreground">Email (Optional)</label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Donate Button */}
                <Button
                  onClick={handleDonate}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg"
                  size="lg"
                >
                  <Heart className="w-5 h-5 mr-2 fill-current" />
                  Donate {selectedAmount ? `₹${selectedAmount}` : customAmount ? `₹${customAmount}` : "Now"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  🔒 Secure payment · 100% of your donation goes to feeding the hungry
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Payment Dialog */}
      <PaymentDialog
        isOpen={showPaymentDialog}
        onClose={() => setShowPaymentDialog(false)}
        amount={selectedAmount || parseFloat(customAmount) || 0}
        paymentMethod={paymentMethod}
        walletBalance={WALLET_BALANCE}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Success Screen */}
      <PaymentSuccessScreen
        isOpen={showSuccessScreen}
        onClose={handleSuccessClose}
        amount={selectedAmount || parseFloat(customAmount) || 0}
        donorName={donorName}
        transactionId={lastTransactionId}
      />

      <AnimatedModal
        isOpen={alertState.isOpen}
        onClose={() => setAlertState((prev) => ({ ...prev, isOpen: false }))}
        title={alertState.title}
        description={alertState.message}
        variant="error"
      />
    </>
  );
}
