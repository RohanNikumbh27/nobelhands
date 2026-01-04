"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "motion/react";

interface AnimatedModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description: string;
    actionLabel?: string;
    variant?: "default" | "success" | "error";
}

export function AnimatedModal({
    isOpen,
    onClose,
    title = "Notification",
    description,
    actionLabel = "OK",
    variant = "default",
}: AnimatedModalProps) {

    const getIcon = () => {
        switch (variant) {
            case "success":
                return (
                    <div className="relative mb-6 group">
                        <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full group-hover:bg-green-500/30 transition-all duration-500" />
                        <div className="relative bg-card rounded-full p-4 ring-1 ring-border shadow-xl">
                            <CheckCircle2 className="h-10 w-10 text-green-600 drop-shadow-sm" />
                        </div>
                    </div>
                );
            case "error":
                return (
                    <div className="relative mb-6 group">
                        {/* Changed from destructive (red) to primary (orange) as requested */}
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />
                        <div className="relative bg-card rounded-full p-4 ring-1 ring-primary/20 shadow-xl">
                            <XCircle className="h-10 w-10 text-primary drop-shadow-sm" />
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="relative mb-6 group">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />
                        <div className="relative bg-card rounded-full p-4 ring-1 ring-primary/20 shadow-xl">
                            <AlertCircle className="h-10 w-10 text-primary drop-shadow-sm" />
                        </div>
                    </div>
                );
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-[380px] p-0 border-none bg-transparent shadow-none">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="flex flex-col items-center text-center p-8 bg-card/95 backdrop-blur-2xl border border-border/50 shadow-2xl rounded-3xl"
                >
                    {getIcon()}
                    <AlertDialogHeader className="items-center text-center space-y-3 w-full">
                        <AlertDialogTitle className="text-2xl font-bold tracking-tight text-foreground">
                            {title}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-base text-muted-foreground leading-relaxed">
                            {description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8 w-full">
                        <AlertDialogAction
                            onClick={onClose}
                            className="w-full h-12 rounded-xl text-base font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/25"
                        >
                            {actionLabel}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </motion.div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
