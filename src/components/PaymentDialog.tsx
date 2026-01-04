import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Wallet, CreditCard, Smartphone, Building2, Loader2, CheckCircle2, ArrowLeft, QrCode, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import QRCode from "qrcode";

type PaymentMethod = "wallet" | "upi" | "qr" | "card" | "netbanking";

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  paymentMethod: PaymentMethod;
  walletBalance: number;
  onPaymentSuccess: () => void;
}

// UPI Configuration
const UPI_VPA = "nobelhands@ybl";
const UPI_NAME = "Nobel Hands Charity";
const TRANSACTION_NOTE = "Thank you for your Donation";

export function PaymentDialog({
  isOpen,
  onClose,
  amount,
  paymentMethod,
  walletBalance,
  onPaymentSuccess,
}: PaymentDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"form" | "processing" | "success">("form");

  // Form states for different payment methods
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [bankName, setBankName] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const handlePayment = async () => {
    setIsProcessing(true);
    setStep("processing");

    // Simulate payment processing
    setTimeout(() => {
      setStep("success");
      setIsProcessing(false);

      // Call success callback after showing success for 2 seconds
      setTimeout(() => {
        onPaymentSuccess();
        handleClose();
      }, 3000);
    }, 2500);
  };

  const handleClose = () => {
    setStep("form");
    setIsProcessing(false);
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvv("");
    setBankName("");
    onClose();
  };

  const canSubmit = () => {
    if (paymentMethod === "wallet") return amount <= walletBalance;
    if (paymentMethod === "upi") return true; // UPI is now intent-based/manual verification
    if (paymentMethod === "qr") return true; // QR is always ready once generated
    if (paymentMethod === "card") return cardNumber.length >= 16 && cardName.length > 0 && cardExpiry.length > 0 && cardCvv.length >= 3;
    if (paymentMethod === "netbanking") return bankName.length > 0;
    return false;
  };

  // UPI String generation
  const getUpiString = () => {
    return `upi://pay?pa=${UPI_VPA}&pn=${encodeURIComponent(UPI_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(TRANSACTION_NOTE)}`;
  };

  // Generate QR code when QR payment method is selected
  useEffect(() => {
    if ((paymentMethod === "qr" || paymentMethod === "upi") && isOpen) {
      QRCode.toDataURL(getUpiString(), {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
        .then((url: string) => {
          setQrCodeUrl(url);
        })
        .catch((err) => {
          console.error("QR Code generation error:", err);
        });
    }
  }, [paymentMethod, amount, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                  {paymentMethod === "wallet" && <Wallet className="h-5 w-5 text-primary" />}
                  {paymentMethod === "upi" && <Smartphone className="h-5 w-5 text-primary" />}
                  {paymentMethod === "qr" && <QrCode className="h-5 w-5 text-primary" />}
                  {paymentMethod === "card" && <CreditCard className="h-5 w-5 text-primary" />}
                  {paymentMethod === "netbanking" && <Building2 className="h-5 w-5 text-primary" />}
                  Complete Payment
                </DialogTitle>
                <DialogDescription className="text-sm">
                  You&apos;re donating ₹{amount} to feed the hungry
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4 sm:mt-6">
                {/* Charity Wallet Payment */}
                {paymentMethod === "wallet" && (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="p-3 sm:p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Available Balance</span>
                        <span className="text-primary">₹{walletBalance}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Amount to Deduct</span>
                        <span className="text-foreground">₹{amount}</span>
                      </div>
                      <div className="border-t border-primary/20 mt-2 pt-2 flex justify-between items-center">
                        <span className="text-sm">Remaining Balance</span>
                        <span className="text-primary">₹{walletBalance - amount}</span>
                      </div>
                    </div>
                    {amount > walletBalance && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                        Insufficient balance. Please top up your wallet or choose another payment method.
                      </div>
                    )}
                  </div>
                )}

                {/* UPI Payment (Intent Flow) */}
                {paymentMethod === "upi" && (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-white rounded-lg border-2 border-primary/10">
                      <Smartphone className="h-12 w-12 mx-auto text-primary mb-3" />
                      <h4 className="font-medium text-foreground mb-2">Pay via UPI App</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Click the button below to pay using GPay, PhonePe, Paytm, or any other UPI app installed on your device.
                      </p>

                      <a
                        href={getUpiString()}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      >
                        Pay ₹{amount} with App
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or scan QR code</span>
                      </div>
                    </div>

                    {/* Fallback QR for Desktop users who selected UPI */}
                    <div className="text-center">
                      {qrCodeUrl ? (
                        <div className="inline-block p-2 bg-white rounded-lg border shadow-sm">
                          <img
                            src={qrCodeUrl}
                            alt="Payment QR Code"
                            className="w-32 h-32 mx-auto"
                          />
                        </div>
                      ) : (
                        <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                          <Loader2 className="h-6 w-6 text-primary animate-spin" />
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">Scan with any UPI app</p>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-600">
                      After completing the payment in your app, click &quot;I&apos;ve Paid&quot; below.
                    </div>
                  </div>
                )}

                {/* QR Code Payment */}
                {paymentMethod === "qr" && (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 border-2 border-primary/20">
                      <div className="text-center">
                        <p className="text-sm mb-4">Scan this QR code with any UPI app to pay</p>
                        {qrCodeUrl ? (
                          <div className="inline-block p-4 bg-white rounded-lg shadow-sm border">
                            <img
                              src={qrCodeUrl}
                              alt="Payment QR Code"
                              className="w-48 h-48 sm:w-64 sm:h-64 mx-auto"
                            />
                          </div>
                        ) : (
                          <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                          </div>
                        )}
                        <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                          <p className="text-sm">
                            <strong>Amount:</strong> ₹{amount}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Paying: {UPI_NAME}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-600 text-center">
                      After scanning and completing payment, click &quot;I&apos;ve Paid&quot; below
                    </div>
                  </div>
                )}

                {/* Card Payment */}
                {paymentMethod === "card" && (
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').slice(0, 16))}
                        className="mt-2"
                        maxLength={16}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="Name on card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="mt-2"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.slice(0, 3))}
                          className="mt-2"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Banking */}
                {paymentMethod === "netbanking" && (
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <Label htmlFor="bank">Select Your Bank</Label>
                      <select
                        id="bank"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="mt-2 w-full h-10 px-3 rounded-md border border-input bg-background"
                      >
                        <option value="">Choose a bank...</option>
                        <option value="SBI">State Bank of India</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="Axis">Axis Bank</option>
                        <option value="PNB">Punjab National Bank</option>
                        <option value="Kotak">Kotak Mahindra Bank</option>
                        <option value="BOB">Bank of Baroda</option>
                      </select>
                    </div>
                    {bankName && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-600">
                        You&apos;ll be redirected to {bankName} online banking portal to complete the payment.
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                    disabled={isProcessing}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handlePayment}
                    disabled={!canSubmit() || isProcessing}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    {(paymentMethod === "qr" || paymentMethod === "upi") ? "I've Paid" : `Pay ₹${amount}`}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-12"
            >
              <div className="text-center">
                <div className="inline-flex h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary/10 items-center justify-center mb-4 sm:mb-6 relative">
                  <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-primary animate-spin" />
                </div>
                <h3 className="text-lg sm:text-xl mb-2">Verifying Payment</h3>
                <p className="text-muted-foreground">
                  Please wait while we verify your transaction...
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-8 sm:py-12 px-4"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-green-100 items-center justify-center mb-4 sm:mb-6"
                >
                  <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                </motion.div>
                <h3 className="text-lg sm:text-xl mb-2">Payment Recorded!</h3>
                <p className="text-sm sm:text-base text-muted-foreground px-4">
                  Thank you for your generous contribution of ₹{amount}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
