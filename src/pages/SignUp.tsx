import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User, Mail, ArrowLeft, Check } from "lucide-react";

type Step = "name" | "email" | "success";

const SignUp = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<Step>("name");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [mascotState, setMascotState] = useState<"idle" | "nod" | "celebrate">("idle");

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isEmailValid = validateEmail(email);

    const handleNameNext = () => {
        if (name.trim()) {
            setMascotState("nod");
            setTimeout(() => {
                setStep("email");
                setMascotState("idle");
            }, 500);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (emailError) {
            setEmailError("");
        }
    };

    const handleEmailNext = () => {
        if (!email.trim()) {
            setEmailError("Please enter your email address");
            return;
        }

        if (!isEmailValid) {
            setEmailError("Please enter a valid email address");
            return;
        }

        // Success!
        setMascotState("celebrate");
        setStep("success");

        // Auto-navigate to home after celebration
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    const handleBack = () => {
        if (step === "email") {
            setStep("name");
            setMascotState("idle");
        } else {
            navigate("/auth");
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

            <AnimatePresence mode="wait">
                {step === "success" ? (
                    // Success Screen
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6"
                    >
                        {/* Kangaroo Mascot */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                                delay: 0.1
                            }}
                            className="mb-8"
                        >
                            <img
                                src="https://res.cloudinary.com/drhirocfg/image/upload/v1765561127/logo-removebg-preview_pjcvqj.png"
                                alt="PocketFriend Kangaroo"
                                className="w-56 h-56 object-contain drop-shadow-2xl"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center"
                        >
                            <h1 className="text-3xl font-bold text-foreground mb-3">
                                Congratulations! Your account is ready
                            </h1>
                            <p className="text-foreground/60 text-base max-w-sm mx-auto">
                                You're all set to start saving on food you love. Let's get you inside.
                            </p>
                        </motion.div>
                    </motion.div>
                ) : (
                    // Name & Email Steps
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="relative z-10 flex flex-col min-h-screen px-6 py-12"
                    >
                        {/* Back Button */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleBack}
                            className="self-start p-3 rounded-full bg-secondary/50 border border-border/30 mb-8"
                        >
                            <ArrowLeft className="w-5 h-5 text-foreground" />
                        </motion.button>

                        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
                            {/* Kangaroo Mascot */}
                            <motion.div
                                animate={{
                                    y: mascotState === "idle" ? [0, -2, 0] : mascotState === "nod" ? [-3, 0, -3] : 0,
                                }}
                                transition={{
                                    y: {
                                        repeat: mascotState === "idle" ? Infinity : mascotState === "nod" ? 3 : 0,
                                        duration: mascotState === "nod" ? 0.3 : 3,
                                        ease: "easeInOut"
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
                                    className="w-48 h-48 object-contain drop-shadow-2xl"
                                />
                            </motion.div>

                            {step === "name" ? (
                                // Name Step
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center mb-8"
                                    >
                                        <h1 className="text-2xl font-bold text-foreground mb-2">
                                            Let's get to know you!
                                        </h1>
                                        <p className="text-foreground/60 text-sm">
                                            What should we call you?
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="w-full mb-6"
                                    >
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter your name"
                                                className="w-full pl-12 pr-4 py-4 bg-secondary/50 border-2 border-border/30 rounded-2xl text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none transition-colors"
                                                onKeyPress={(e) => e.key === 'Enter' && handleNameNext()}
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleNameNext}
                                        disabled={!name.trim()}
                                        className={`w-full py-4 rounded-2xl font-semibold text-lg shadow-lg transition-all ${name.trim()
                                            ? 'btn-premium'
                                            : 'bg-secondary/50 text-foreground/40 cursor-not-allowed'
                                            }`}
                                    >
                                        Next
                                    </motion.button>
                                </>
                            ) : (
                                // Email Step
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center mb-8"
                                    >
                                        <h1 className="text-2xl font-bold text-foreground mb-2">
                                            Nice to meet you, {name}!
                                        </h1>
                                        <p className="text-foreground/60 text-sm">
                                            What's your email address?
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="w-full mb-6"
                                    >
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={handleEmailChange}
                                                placeholder="your.email@example.com"
                                                className={`w-full pl-12 pr-12 py-4 bg-secondary/50 border-2 ${email && isEmailValid ? 'border-green-500' : emailError ? 'border-destructive' : 'border-border/30'
                                                    } rounded-2xl text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none transition-colors`}
                                                onKeyPress={(e) => e.key === 'Enter' && handleEmailNext()}
                                            />
                                            {email && isEmailValid && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                                >
                                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                                        <Check className="w-4 h-4 text-white" />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>

                                        <AnimatePresence>
                                            {email && !isEmailValid && !emailError && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-foreground/60 text-sm mt-2 ml-1"
                                                >
                                                    Please enter a valid email address
                                                </motion.p>
                                            )}
                                            {emailError && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-destructive text-sm mt-2 ml-1"
                                                >
                                                    {emailError}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleEmailNext}
                                        disabled={!email.trim() || !isEmailValid}
                                        className={`w-full py-4 rounded-2xl font-semibold text-lg shadow-lg transition-all ${email.trim() && isEmailValid
                                            ? 'btn-premium'
                                            : 'bg-secondary/50 text-foreground/40 cursor-not-allowed'
                                            }`}
                                    >
                                        Create Account
                                    </motion.button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SignUp;
