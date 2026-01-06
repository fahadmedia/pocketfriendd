import { motion, AnimatePresence } from "framer-motion";
import { X, Lightbulb, AlertTriangle, Send } from "lucide-react";
import { useState } from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (type: "upgrade" | "issue") => void;
}

const FeedbackModal = ({ isOpen, onClose, onSubmit }: FeedbackModalProps) => {
  const [name, setName] = useState("");
  const [feedbackType, setFeedbackType] = useState<"upgrade" | "issue" | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (feedbackType) {
      onSubmit(feedbackType);
      setName("");
      setFeedbackType(null);
      setDescription("");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl"
            style={{ backgroundColor: "#041C45" }}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-bold text-white mb-6 pr-8"
            >
              We truly value your feedback
            </motion.h2>

            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-4"
            >
              <label className="block text-white/80 text-sm mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF8A00] transition-colors"
              />
            </motion.div>

            {/* Feedback Type Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <label className="block text-white/80 text-sm mb-2">What is your feedback about?</label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFeedbackType("upgrade")}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    feedbackType === "upgrade"
                      ? "border-[#FF8A00] bg-[#FF8A00]/20"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <motion.div
                    animate={feedbackType === "upgrade" ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Lightbulb className={`w-6 h-6 ${feedbackType === "upgrade" ? "text-[#FF8A00]" : "text-white/70"}`} />
                  </motion.div>
                  <span className={`text-sm font-medium ${feedbackType === "upgrade" ? "text-[#FF8A00]" : "text-white/70"}`}>
                    Suggest an Upgrade
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFeedbackType("issue")}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    feedbackType === "issue"
                      ? "border-[#FF8A00] bg-[#FF8A00]/20"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <motion.div
                    animate={feedbackType === "issue" ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <AlertTriangle className={`w-6 h-6 ${feedbackType === "issue" ? "text-[#FF8A00]" : "text-white/70"}`} />
                  </motion.div>
                  <span className={`text-sm font-medium ${feedbackType === "issue" ? "text-[#FF8A00]" : "text-white/70"}`}>
                    Report an Issue
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Description Textarea */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-6"
            >
              <label className="block text-white/80 text-sm mb-2">Describe your feedback</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us more..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF8A00] transition-colors resize-none"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 138, 0, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={!feedbackType}
              className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#FF8A00" }}
            >
              <Send className="w-5 h-5" />
              Submit Feedback
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;
