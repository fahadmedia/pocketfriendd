import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import kangarooLogo from "@/assets/kangaroo-logo.png";

interface IntroSplashProps {
  onComplete: () => void;
}

const IntroSplash = ({ onComplete }: IntroSplashProps) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    // Phase timing
    const holdTimer = setTimeout(() => setPhase("hold"), 800);
    const exitTimer = setTimeout(() => setPhase("exit"), 2200);
    const completeTimer = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#041C45] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#FF8A00]/20"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: -50,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  delay: Math.random() * 1.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Glowing ring effect */}
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,138,0,0.15) 0%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 1.2], 
              opacity: [0, 0.8, 0.4] 
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeOut",
              times: [0, 0.6, 1]
            }}
          />

          {/* Logo container */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0 
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {/* Logo with glow */}
            <motion.div
              className="relative"
              animate={{ 
                filter: ["drop-shadow(0 0 0px #FF8A00)", "drop-shadow(0 0 30px #FF8A00)", "drop-shadow(0 0 15px #FF8A00)"]
              }}
              transition={{ 
                duration: 1.5,
                times: [0, 0.5, 1],
                ease: "easeInOut"
              }}
            >
              <motion.img
                src={kangarooLogo}
                alt="PocketFriend Kangaroo"
                className="w-56 h-56 object-contain"
                initial={{ rotate: -10, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 120
                }}
              />
            </motion.div>

            {/* App name with letter animation */}
            <motion.div
              className="mt-6 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.h1
                className="text-3xl font-bold text-white tracking-wide"
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
              >
                Pocket
                <span className="text-[#FF8A00]">Friend</span>
              </motion.h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="mt-2 text-white/60 text-sm tracking-wider text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              Melbourne's discounts in your pocket
            </motion.p>

            {/* Loading dots */}
            <motion.div
              className="flex gap-1.5 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#FF8A00]"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom wave decoration */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-24"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <svg
              viewBox="0 0 1440 120"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,90 1440,60 L1440,120 L0,120 Z"
                fill="rgba(255,138,0,0.1)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroSplash;
