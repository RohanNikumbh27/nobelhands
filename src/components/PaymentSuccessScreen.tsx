import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogPortal, DialogOverlay } from "./ui/dialog";
import { Button } from "./ui/button";
import { CheckCircle2, Download, Share2, Heart, Users, UtensilsCrossed, X } from "lucide-react";
import { motion } from "motion/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "./ui/utils";

interface PaymentSuccessScreenProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  donorName?: string;
  transactionId: string;
}

export function PaymentSuccessScreen({
  isOpen,
  onClose,
  amount,
  donorName,
  transactionId,
}: PaymentSuccessScreenProps) {
  const impactMessage = () => {
    if (amount >= 500) return "You've fed an entire family today!";
    if (amount >= 100) return "You've provided a nutritious meal!";
    if (amount >= 50) return "You've given tea and snacks to someone in need!";
    return "Your kindness makes a difference!";
  };

  const peopleHelped = Math.floor(amount / 100) || 1;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "I donated to Nobel Hands",
        text: `I just donated ₹${amount} to help feed the hungry through Nobel Hands. Join me in making a difference!`,
        url: window.location.href,
      }).catch(() => {
        alert("Share feature not available. You can manually share your contribution!");
      });
    } else {
      alert("Share feature not available on this device.");
    }
  };

  const handleDownloadReceipt = () => {
    alert("Receipt download feature will be available in the production version. You'll receive a receipt via email.");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            "fixed z-50 bg-background",
            // Mobile: Full screen with scroll
            "inset-0 overflow-y-auto",
            // Desktop: Centered modal with max-height
            "md:inset-auto md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%]",
            "md:w-full md:max-w-md md:max-h-[90vh] md:overflow-y-auto md:rounded-2xl md:shadow-2xl md:border",
            // Animation
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "md:data-[state=closed]:zoom-out-95 md:data-[state=open]:zoom-in-95"
          )}
        >
          {/* Accessible title - visually hidden but available to screen readers */}
          <DialogTitle className="sr-only">
            Payment Successful
          </DialogTitle>
          <DialogDescription className="sr-only">
            Your donation of ₹{amount} to Nobel Hands was successful. {impactMessage()}
          </DialogDescription>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            <X className="h-5 w-5 text-foreground" />
            <span className="sr-only">Close</span>
          </button>

          {/* Content Container */}
          <div className="min-h-screen md:min-h-0 flex flex-col">
            {/* Success Header */}
            <div className="bg-gradient-to-br from-green-50 via-white to-orange-50 px-6 py-8 md:py-10 text-center flex-shrink-0">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                {/* Success Icon */}
                <div className="inline-flex h-20 w-20 md:h-24 md:w-24 rounded-full bg-green-100 items-center justify-center mb-6 relative mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle2 className="h-10 w-10 md:h-12 md:w-12 text-green-600" />
                  </motion.div>

                  {/* Animated ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-green-200"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>

                {/* Success Message */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                    Thank You{donorName ? `, ${donorName}` : ""}!
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Your donation was successful
                  </p>
                  <div className="inline-block px-5 py-2 bg-primary/10 rounded-full">
                    <span className="text-2xl md:text-3xl font-bold text-primary">₹{amount}</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Impact Section */}
            <div className="px-6 py-6 flex-1">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 shadow-sm border border-orange-100 mb-6"
              >
                <Heart className="h-8 w-8 text-primary mx-auto mb-3 fill-primary" />
                <p className="text-lg font-medium text-center mb-5">{impactMessage()}</p>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">{peopleHelped}</p>
                    <p className="text-xs text-muted-foreground">People Helped</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <UtensilsCrossed className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">{peopleHelped * 3}</p>
                    <p className="text-xs text-muted-foreground">Meals</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <Heart className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">100%</p>
                    <p className="text-xs text-muted-foreground">Impact</p>
                  </div>
                </div>
              </motion.div>

              {/* Transaction Details */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-center mb-6"
              >
                <p className="text-xs text-muted-foreground break-all">
                  Transaction ID: <span className="font-mono">{transactionId}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date().toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleDownloadReceipt} className="w-full h-12 rounded-xl">
                    <Download className="h-4 w-4 mr-2" />
                    Receipt
                  </Button>
                  <Button variant="outline" onClick={handleShare} className="w-full h-12 rounded-xl">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <Button onClick={onClose} className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-lg font-semibold">
                  Done
                </Button>

                <p className="text-xs text-center text-muted-foreground pt-2">
                  A confirmation email has been sent with your donation receipt
                </p>
              </motion.div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

