import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [mascotState, setMascotState] = useState<"idle" | "nod" | "sad">("idle");

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleContinue = () => {
        if (!email.trim()) {
            setError("Please enter your email address");
            setMascotState("sad");
            // Shake animation will be handled by framer-motion
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            setMascotState("sad");
            return;
        }

        // Simulate checking if email exists
        // In production, this would be an API call
        const emailExists = false; // Simulating email not found

        if (!emailExists) {
            setError("We couldn't find an account linked to this email.");
            setMascotState("sad");
        } else {
            setMascotState("nod");
            // Navigate to password or continue login flow
            setTimeout(() => navigate("/"), 1000);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (error) {
            setError("");
            setMascotState("idle");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/20 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 text-6xl">🍕</div>
                <div className="absolute top-40 right-20 text-5xl">🍔</div>
                <div className="absolute bottom-40 left-20 text-5xl">🌮</div>
                <div className="absolute bottom-20 right-10 text-6xl">🍜</div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen px-6 py-12">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/auth")}
                    className="self-start p-3 rounded-full bg-secondary/50 border border-border/30 mb-8"
                >
                    <ArrowLeft className="w-5 h-5 text-foreground" />
                </motion.button>

                <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
                    {/* Kangaroo Mascot */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{
                            scale: 1,
                            y: mascotState === "idle" ? [0, -2, 0] : mascotState === "nod" ? [-3, 0, -3] : 0,
                            rotate: mascotState === "sad" ? [-2, 2, -2, 2, 0] : 0,
                        }}
                        transition={{
                            scale: { type: "spring", stiffness: 200, damping: 15 },
                            y: {
                                repeat: mascotState === "idle" ? Infinity : mascotState === "nod" ? 3 : 0,
                                duration: mascotState === "nod" ? 0.3 : 3,
                                ease: "easeInOut"
                            },
                            rotate: {
                                duration: 0.5,
                            }
                        }}
                        className="mb-8 relative"
                    >
                        {/* Soft shadow */}
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 3,
                                ease: "easeInOut"
                            }}
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-6 bg-black/10 rounded-full blur-xl"
                        />
                        <img
                            src="https://res.cloudinary.com/drhirocfg/image/upload/v1765561127/logo-removebg-preview_pjcvqj.png"
                            alt="PocketFriend Kangaroo"
                            className={`w-48 h-48 object-contain drop-shadow-2xl transition-opacity ${mascotState === "sad" ? "opacity-60" : "opacity-100"
                                }`}
                        />
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-2xl font-bold text-foreground mb-2">
                            Welcome back!
                        </h1>
                        <p className="text-foreground/60 text-sm">
                            Enter your email to continue
                        </p>
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            x: error ? [-10, 10, -10, 10, 0] : 0,
                        }}
                        transition={{
                            opacity: { delay: 0.2 },
                            y: { delay: 0.2 },
                            x: { duration: 0.4 }
                        }}
                        className="w-full mb-6"
                    >
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="your.email@example.com"
                                className={`w-full pl-12 pr-4 py-4 bg-secondary/50 border-2 ${error ? 'border-destructive' : 'border-border/30'
                                    } rounded-2xl text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none transition-colors`}
                            />
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-destructive text-sm mt-2 ml-1"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Continue Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleContinue}
                        className="w-full btn-premium py-4 rounded-2xl font-semibold text-lg shadow-lg mb-4"
                    >
                        Continue
                    </motion.button>

                    {/* Create Account Link */}
                    <AnimatePresence>
                        {error === "We couldn't find an account linked to this email." && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate("/signup")}
                                className="w-full py-4 rounded-2xl font-semibold border-2 border-primary text-primary bg-transparent hover:bg-primary/10 transition-colors"
                            >
                                Create Account
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Login;
