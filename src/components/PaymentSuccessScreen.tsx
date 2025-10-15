import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { CheckCircle2, Download, Share2, Heart, Users, UtensilsCrossed, X } from "lucide-react";
import { motion } from "motion/react";

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
        // Fallback if share fails
        alert("Share feature not available. You can manually share your contribution!");
      });
    } else {
      alert("Share feature not available on this device.");
    }
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert("Receipt download feature will be available in the production version. You'll receive a receipt via email.");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden" aria-describedby="success-description">
        {/* Accessible title - visually hidden but available to screen readers */}
        <DialogTitle className="sr-only">
          Payment Successful
        </DialogTitle>
        <DialogDescription id="success-description" className="sr-only">
          Your donation of ₹{amount} to Nobel Hands was successful. {impactMessage()}
        </DialogDescription>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* Success Animation Background */}
        <div className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4 sm:p-6 md:p-8 pb-4 sm:pb-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-center"
          >
            {/* Success Icon */}
            <div className="inline-flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-green-100 items-center justify-center mb-4 sm:mb-6 relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              >
                <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-600" />
              </motion.div>
              
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 sm:border-4 border-green-200"
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
              <h2 className="text-xl sm:text-2xl md:text-3xl mb-2 text-foreground px-2">
                Thank You{donorName ? `, ${donorName}` : ""}!
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-2 sm:mb-1 px-2">
                Your donation was successful
              </p>
              <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl text-primary">₹{amount}</span>
              </div>
            </motion.div>

            {/* Impact Message */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-orange-100 mb-4 sm:mb-6"
            >
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2 sm:mb-3 fill-primary" />
              <p className="text-base sm:text-lg mb-3 sm:mb-4 px-2">{impactMessage()}</p>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div>
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary mx-auto mb-1" />
                  <p className="text-lg sm:text-xl md:text-2xl text-primary">{peopleHelped}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">People Helped</p>
                </div>
                <div>
                  <UtensilsCrossed className="h-5 w-5 sm:h-6 sm:w-6 text-primary mx-auto mb-1" />
                  <p className="text-lg sm:text-xl md:text-2xl text-primary">{peopleHelped * 3}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Meals</p>
                </div>
                <div>
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary mx-auto mb-1" />
                  <p className="text-lg sm:text-xl md:text-2xl text-primary">100%</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Impact</p>
                </div>
              </div>
            </motion.div>

            {/* Transaction Details */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center mb-4 sm:mb-6 px-2"
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
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="p-4 sm:p-6 pt-0 space-y-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleDownloadReceipt} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Receipt
            </Button>
            <Button variant="outline" onClick={handleShare} className="w-full">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          
          <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90">
            Done
          </Button>

          <p className="text-xs text-center text-muted-foreground pt-2">
            A confirmation email has been sent with your donation receipt
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
