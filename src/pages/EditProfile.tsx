import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, User, Camera, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import PhotoSelectionModal, { DEFAULT_PROFILE_IMAGE } from "@/components/modals/PhotoSelectionModal";

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("John Smith");
  const [email, setEmail] = useState("john.smith@email.com");
  const [profileImage, setProfileImage] = useState<string>(DEFAULT_PROFILE_IMAGE);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoSelected = (imageUrl: string) => {
    setProfileImage(imageUrl);
    setIsPhotoModalOpen(false);
  };

  const handleSaveChanges = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Navigate back after showing success message
    setTimeout(() => {
      navigate("/settings");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-28 px-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/settings")}
            className="p-2 rounded-full bg-secondary/50 border border-border/30"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
        </motion.div>

        {/* Profile Picture Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPhotoModalOpen(true)}
              className="w-28 h-28 rounded-full border-3 border-primary/30 bg-secondary flex items-center justify-center overflow-hidden cursor-pointer"
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPhotoModalOpen(true)}
              className="absolute -bottom-1 -right-1 p-3 rounded-full bg-primary glow-orange"
            >
              <Camera className="w-4 h-4 text-primary-foreground" />
            </motion.button>
          </div>
          <p className="text-foreground/60 text-sm mt-3">Tap to change photo</p>
        </motion.div>

        {/* Form Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-8"
        >
          {/* Name Field */}
          <div className="card-premium p-4">
            <label className="block text-foreground/60 text-sm mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent text-foreground text-lg font-medium outline-none border-b-2 border-border/30 focus:border-primary pb-2 transition-colors"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div className="card-premium p-4">
            <label className="block text-foreground/60 text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-foreground text-lg font-medium outline-none border-b-2 border-border/30 focus:border-primary pb-2 transition-colors"
              placeholder="Enter your email"
            />
          </div>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-2 mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30"
            >
              <Check className="w-5 h-5 text-green-400" />
              <p className="text-green-400 font-medium">Your changes have been applied successfully.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveChanges}
          disabled={isSubmitting || showSuccess}
          className="w-full btn-premium py-4 text-lg font-semibold disabled:opacity-50 disabled:transform-none"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              Saving...
            </span>
          ) : (
            "Confirm Changes"
          )}
        </motion.button>
      </main>

      <BottomNav />

      {/* Photo Selection Modal */}
      <PhotoSelectionModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onPhotoSelected={handlePhotoSelected}
        currentImage={profileImage}
      />
    </div>
  );
};

export default EditProfile;
