import { motion, AnimatePresence } from "framer-motion";
import { X, Wrench, HeartHandshake } from "lucide-react";

interface IssueConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IssueConfirmationModal = ({ isOpen, onClose }: IssueConfirmationModalProps) => {
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
            className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl text-center"
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

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: "rgba(255, 138, 0, 0.2)" }}
            >
              <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <Wrench className="w-10 h-10 text-[#FF8A00]" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold text-white mb-3"
            >
              Sorry for the inconvenience
            </motion.h2>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-white/70 mb-4"
            >
              We will fix this issue as soon as possible.
            </motion.p>

            {/* Heart Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mb-6"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <HeartHandshake className="w-8 h-8 text-[#FF8A00]/60" />
              </motion.div>
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 138, 0, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-4 rounded-xl font-semibold text-white transition-all"
              style={{ backgroundColor: "#FF8A00" }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IssueConfirmationModal;
