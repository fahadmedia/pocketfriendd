import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AuthWelcome = () => {
    const navigate = useNavigate();
    const [mascotState, setMascotState] = useState<"idle" | "happy">("idle");

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/20 relative overflow-hidden">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 text-6xl">🍕</div>
                <div className="absolute top-40 right-20 text-5xl">🍔</div>
                <div className="absolute bottom-40 left-20 text-5xl">🌮</div>
                <div className="absolute bottom-20 right-10 text-6xl">🍜</div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl opacity-30">💰</div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
                {/* Kangaroo Mascot */}
                <motion.div
                    initial={{ scale: 0, y: -50 }}
                    animate={{
                        scale: 1,
                        y: mascotState === "happy" ? [0, -3, 0] : [0, -2, 0],
                    }}
                    transition={{
                        scale: { type: "spring", stiffness: 200, damping: 15 },
                        y: {
                            repeat: Infinity,
                            duration: mascotState === "happy" ? 1.5 : 3,
                            ease: "easeInOut"
                        }
                    }}
                    className="mb-8 relative"
                >
                    {/* Soft shadow underneath */}
                    <motion.div
                        animate={{
                            scale: mascotState === "happy" ? [1, 1.1, 1] : [1, 1.05, 1],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut"
                        }}
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/10 rounded-full blur-xl"
                    />
                    <img
                        src="https://res.cloudinary.com/drhirocfg/image/upload/v1765561127/logo-removebg-preview_pjcvqj.png"
                        alt="PocketFriend Kangaroo"
                        className="w-56 h-56 object-contain drop-shadow-2xl"
                    />
                </motion.div>

                {/* Welcome Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl font-bold text-foreground mb-3">
                        Welcome to PocketFriend
                    </h1>
                    <p className="text-foreground/60 text-base max-w-sm">
                        Your pocket-sized friend for everyday savings
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-sm space-y-4"
                >
                    {/* Log In Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/login")}
                        onHoverStart={() => setMascotState("happy")}
                        onHoverEnd={() => setMascotState("idle")}
                        className="w-full btn-premium py-4 rounded-2xl font-semibold text-lg shadow-lg"
                    >
                        Log In
                    </motion.button>

                    {/* Create Account Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/signup")}
                        onHoverStart={() => setMascotState("happy")}
                        onHoverEnd={() => setMascotState("idle")}
                        className="w-full py-4 rounded-2xl font-semibold text-lg border-2 border-primary text-primary bg-transparent hover:bg-primary/10 transition-colors"
                    >
                        Create Account
                    </motion.button>
                </motion.div>

                {/* Footer Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-foreground/40 text-sm mt-8 text-center"
                >
                    Join thousands of students saving money daily
                </motion.p>
            </div>
        </div>
    );
};

export default AuthWelcome;
