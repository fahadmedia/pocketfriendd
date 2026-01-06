import { motion, AnimatePresence } from "framer-motion";
import { X, Image, Camera, AlertCircle, RotateCcw, Trash2 } from "lucide-react";
import { useState, useRef } from "react";

// Default profile picture URL
export const DEFAULT_PROFILE_IMAGE = "https://res.cloudinary.com/drhirocfg/image/upload/v1767280153/ChatGPT_Image_Jan_1__2026__08_07_09_PM-removebg-preview_siutw9.png";

interface PhotoSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoSelected: (imageUrl: string) => void;
  currentImage?: string | null;
}

const PhotoSelectionModal = ({ isOpen, onClose, onPhotoSelected, currentImage }: PhotoSelectionModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = async () => {
    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());

      // Create a file input with camera capture
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.capture = "user";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            onPhotoSelected(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } catch (error) {
      setPermissionDenied(true);
    }
  };

  const handleRestoreDefault = () => {
    onPhotoSelected(DEFAULT_PROFILE_IMAGE);
  };

  const handleDeletePhoto = () => {
    onPhotoSelected(DEFAULT_PROFILE_IMAGE);
  };

  const hasCustomImage = currentImage && currentImage !== DEFAULT_PROFILE_IMAGE;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 bottom-8 z-50 max-w-md mx-auto"
          >
            <div className="card-premium p-6 rounded-3xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">Change Photo</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 rounded-full bg-secondary/50"
                >
                  <X className="w-5 h-5 text-foreground/60" />
                </motion.button>
              </div>

              {/* Permission Denied Message */}
              <AnimatePresence>
                {permissionDenied && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-3 rounded-xl bg-destructive/20 border border-destructive/30 flex items-center gap-2"
                  >
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    <p className="text-destructive text-sm">
                      Camera permission denied. Please enable it in your device settings.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Options */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGalleryClick}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border border-border/30 transition-colors hover:bg-secondary/70"
                >
                  <div className="p-3 rounded-full bg-primary/20">
                    <Image className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Choose from Gallery</p>
                    <p className="text-foreground/60 text-sm">Select a photo from your device</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCameraClick}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border border-border/30 transition-colors hover:bg-secondary/70"
                >
                  <div className="p-3 rounded-full bg-primary/20">
                    <Camera className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Open Camera</p>
                    <p className="text-foreground/60 text-sm">Take a new photo</p>
                  </div>
                </motion.button>

                {hasCustomImage && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleRestoreDefault}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border border-border/30 transition-colors hover:bg-secondary/70"
                    >
                      <div className="p-3 rounded-full bg-blue-500/20">
                        <RotateCcw className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-foreground">Restore to Default</p>
                        <p className="text-foreground/60 text-sm">Use the default profile picture</p>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeletePhoto}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-destructive/10 border border-destructive/30 transition-colors hover:bg-destructive/20"
                    >
                      <div className="p-3 rounded-full bg-destructive/20">
                        <Trash2 className="w-6 h-6 text-destructive" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-destructive">Delete Photo</p>
                        <p className="text-foreground/60 text-sm">Remove and use default picture</p>
                      </div>
                    </motion.button>
                  </>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PhotoSelectionModal;
