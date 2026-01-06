import { motion } from "framer-motion";
import { QrCode, Camera, Flashlight, Image } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const savedQRs = [
  { id: 1, name: "Bella Italia - 35% OFF", validUntil: "Dec 31, 2024" },
  { id: 2, name: "Grill Masters - 50% OFF", validUntil: "Dec 25, 2024" },
  { id: 3, name: "Sultan's Kitchen - 40% OFF", validUntil: "Jan 15, 2025" },
];

const QRScanner = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-28 px-4">
        {/* Scanner Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square max-w-sm mx-auto mb-8 rounded-3xl overflow-hidden"
        >
          {/* Scanner Frame */}
          <div className="absolute inset-0 bg-secondary/50 backdrop-blur-sm flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative w-64 h-64"
            >
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-lg" />

              {/* Scanning Line */}
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
              />

              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <QrCode className="w-16 h-16 text-foreground/30" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Hint Text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 left-0 right-0 text-center text-foreground/70 text-sm"
          >
            Point camera at QR code to scan
          </motion.p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="p-4 rounded-full glass">
              <Flashlight className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-foreground/60 text-xs">Flash</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="p-4 rounded-full bg-primary glow-orange animate-pulse-glow">
              <Camera className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-foreground/60 text-xs">Scan</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="p-4 rounded-full glass">
              <Image className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-foreground/60 text-xs">Gallery</span>
          </motion.button>
        </motion.div>

        {/* Saved QR Codes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-bold text-foreground mb-4">Your QR Codes</h3>
          
          <div className="space-y-3">
            {savedQRs.map((qr, index) => (
              <motion.div
                key={qr.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="card-premium p-4 flex items-center gap-4"
              >
                <div className="p-3 rounded-xl bg-primary/20">
                  <QrCode className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{qr.name}</p>
                  <p className="text-foreground/50 text-xs">Valid until {qr.validUntil}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-premium py-2 px-4 text-xs"
                >
                  Show
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
};

export default QRScanner;
