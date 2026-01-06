import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

type Step = "initial" | "reason" | "final";

const reasons = [
  "Not finding useful discounts",
  "App experience issues",
  "Using another app",
  "Other",
];

const DeleteAccountModal = ({ isOpen, onClose, onDeleted }: DeleteAccountModalProps) => {
  const [step, setStep] = useState<Step>("initial");
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClose = () => {
    setStep("initial");
    setSelectedReason(null);
    setOtherReason("");
    onClose();
  };

  const handleContinue = () => {
    setStep("reason");
  };

  const handleReasonNext = () => {
    setStep("final");
  };

  const handleSkip = () => {
    setStep("final");
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsDeleting(false);
    handleClose();
    onDeleted();
  };

  const renderContent = () => {
    switch (step) {
      case "initial":
        return (
          <motion.div
            key="initial"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Sad Emoji */}
            <div className="text-center mb-6">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="text-6xl"
              >
                😔
              </motion.span>
            </div>

            <h3 className="text-2xl font-bold text-foreground text-center mb-3">
              We're sorry to see you go
            </h3>
            <p className="text-foreground/70 text-center mb-8">
              Your feedback helps us improve PocketFriend for everyone.
            </p>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinue}
                className="w-full btn-premium py-4 font-semibold"
              >
                Continue
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                className="w-full py-4 font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        );

      case "reason":
        return (
          <motion.div
            key="reason"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="text-xl font-bold text-foreground mb-2">
              What's the main reason you're leaving?
            </h3>
            <p className="text-foreground/60 text-sm mb-6">
              This helps us make PocketFriend better.
            </p>

            {/* Reason Options */}
            <div className="space-y-2 mb-6">
              {reasons.map((reason) => (
                <motion.button
                  key={reason}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedReason(reason)}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all border-2 ${
                    selectedReason === reason
                      ? "border-primary bg-primary/20 text-foreground"
                      : "border-border/30 bg-secondary/30 text-foreground/80 hover:border-primary/50"
                  }`}
                >
                  {reason}
                </motion.button>
              ))}
            </div>

            {/* Other Text Input */}
            <AnimatePresence>
              {selectedReason === "Other" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <textarea
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Please tell us more..."
                    className="w-full p-4 rounded-xl bg-secondary/50 border border-border/30 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary resize-none h-24 transition-colors"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSkip}
                className="flex-1 py-4 font-medium text-foreground/60 hover:text-foreground transition-colors border border-border/30 rounded-xl"
              >
                Skip
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReasonNext}
                disabled={!selectedReason}
                className="flex-1 btn-premium py-4 font-semibold disabled:opacity-50"
              >
                Done
              </motion.button>
            </div>
          </motion.div>
        );

      case "final":
        return (
          <motion.div
            key="final"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Warning Icon */}
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="p-4 rounded-full bg-destructive/20"
              >
                <AlertTriangle className="w-10 h-10 text-destructive" />
              </motion.div>
            </div>

            <h3 className="text-2xl font-bold text-foreground text-center mb-3">
              Are you sure?
            </h3>
            <p className="text-foreground/70 text-center mb-2">
              Deleting your account will remove your profile and history.
            </p>
            <p className="text-destructive/80 text-center text-sm font-medium mb-8">
              This action is irreversible.
            </p>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full py-4 font-semibold bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl transition-colors disabled:opacity-50"
              >
                {isDeleting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Deleting...
                  </span>
                ) : (
                  "Yes, Delete My Account"
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                className="w-full py-4 font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md">
            <div className="card-premium p-6 rounded-3xl relative">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-secondary/50"
              >
                <X className="w-5 h-5 text-foreground/60" />
              </motion.button>

              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeleteAccountModal;
