import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

interface AppDownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AppDownloadModal = ({ isOpen, onClose }: AppDownloadModalProps) => {
    const [qrCode, setQrCode] = useState("");

    useEffect(() => {
        // Generate QR code URL (using a QR code API)
        const appUrl = "https://pocketfriend.app/download";
        setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(appUrl)}`);
    }, []);

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
                        className="hidden md:block fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="hidden md:flex fixed inset-0 items-center justify-center z-50 pointer-events-none"
                    >
                        <div className="card-premium max-w-lg w-full mx-4 p-8 pointer-events-auto relative">
                            {/* Close Button */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary/50 transition-colors"
                            >
                                <X className="w-5 h-5 text-foreground/60" />
                            </motion.button>

                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                                className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center"
                            >
                                <Smartphone className="w-8 h-8 text-white" />
                            </motion.div>

                            {/* Headline */}
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl font-bold text-foreground text-center mb-3"
                            >
                                Get the best deals on your phone 📱
                            </motion.h2>

                            {/* Subtext */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-center mb-8"
                            >
                                <p className="text-foreground/80 mb-2">
                                    Pocket Friend works best on mobile.
                                </p>
                                <p className="text-foreground/80">
                                    Download the app to unlock exclusive restaurant discounts near you.
                                </p>
                            </motion.div>

                            {/* App Store Buttons & QR Code */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col md:flex-row gap-6 items-center justify-center mb-8"
                            >
                                {/* App Store Buttons */}
                                <div className="flex flex-col gap-3">
                                    <motion.a
                                        href="https://play.google.com/store"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
                                    >
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                        </svg>
                                        Google Play
                                    </motion.a>

                                    <motion.a
                                        href="https://apps.apple.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-3 px-6 py-3 rounded-xl bg-foreground text-background font-semibold shadow-lg hover:shadow-xl transition-shadow"
                                    >
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                                        </svg>
                                        App Store
                                    </motion.a>

                                    <motion.a
                                        href="https://appgallery.huawei.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
                                    >
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
                                        </svg>
                                        App Gallery
                                    </motion.a>
                                </div>

                                {/* QR Code */}
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="p-3 bg-white rounded-xl shadow-lg mb-2"
                                    >
                                        <img
                                            src={qrCode}
                                            alt="Download QR Code"
                                            className="w-32 h-32"
                                        />
                                    </motion.div>
                                    <p className="text-xs text-foreground/60 text-center">
                                        Scan to download instantly
                                    </p>
                                </div>
                            </motion.div>

                            {/* OK Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onClose}
                                className="w-full py-3 rounded-xl bg-secondary/50 hover:bg-secondary/70 text-foreground font-semibold transition-colors"
                            >
                                OK
                            </motion.button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AppDownloadModal;
