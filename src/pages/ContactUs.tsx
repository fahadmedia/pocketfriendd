import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, User, MessageSquare, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const ContactUs = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        issue: "",
    });
    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        issue: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {
            fullName: "",
            email: "",
            issue: "",
        };

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.issue.trim()) {
            newErrors.issue = "Please describe your issue";
        }

        setErrors(newErrors);
        return !newErrors.fullName && !newErrors.email && !newErrors.issue;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setShowSuccessModal(true);
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        setFormData({
            fullName: "",
            email: "",
            issue: "",
        });
    };

    const isFormValid = formData.fullName.trim() &&
        formData.email.trim() &&
        validateEmail(formData.email) &&
        formData.issue.trim();

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
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full bg-secondary/50 border border-border/30"
                    >
                        <ArrowLeft className="w-5 h-5 text-foreground" />
                    </motion.button>
                    <h1 className="text-2xl font-bold text-foreground">Contact Us</h1>
                </motion.div>

                {/* Support Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex justify-center mb-8"
                >
                    <div className="relative">
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 3,
                                ease: "easeInOut"
                            }}
                            className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
                        >
                            <MessageSquare className="w-12 h-12 text-primary" />
                        </motion.div>
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                        />
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card-premium p-6 mb-6"
                >
                    <h2 className="text-lg font-bold text-foreground mb-2">How can we help?</h2>
                    <p className="text-foreground/60 text-sm mb-6">
                        We're here to assist you. Please fill out the form below and we'll get back to you as soon as possible.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-foreground font-medium text-sm mb-2">
                                Full Name <span className="text-primary">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className={`w-full pl-11 pr-4 py-3 bg-secondary/50 border ${errors.fullName ? 'border-destructive' : 'border-border/30'
                                        } rounded-xl text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none transition-colors`}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {errors.fullName && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-destructive text-xs mt-1"
                                >
                                    {errors.fullName}
                                </motion.p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-foreground font-medium text-sm mb-2">
                                Email Address <span className="text-primary">*</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`w-full pl-11 pr-4 py-3 bg-secondary/50 border ${formData.email && !validateEmail(formData.email) ? 'border-destructive' : 'border-border/30'
                                        } rounded-xl text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none transition-colors`}
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            {formData.email && !validateEmail(formData.email) && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="text-destructive text-xs mt-1"
                                >
                                    Please enter a valid Email Address
                                </motion.p>
                            )}
                        </div>

                        {/* Issue Description */}
                        <div>
                            <label className="block text-foreground font-medium text-sm mb-2">
                                Describe Your Issue <span className="text-primary">*</span>
                            </label>
                            <motion.textarea
                                whileFocus={{ scale: 1.01 }}
                                value={formData.issue}
                                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                                rows={5}
                                className={`w-full px-4 py-3 bg-secondary/50 border ${errors.issue ? 'border-destructive' : 'border-border/30'
                                    } rounded-xl text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none transition-colors resize-none`}
                                placeholder="Tell us what's going wrong or how we can help…"
                            />
                            {errors.issue && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-destructive text-xs mt-1"
                                >
                                    {errors.issue}
                                </motion.p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={!isFormValid || isSubmitting}
                            whileHover={isFormValid && !isSubmitting ? { scale: 1.02 } : {}}
                            whileTap={isFormValid && !isSubmitting ? { scale: 0.98 } : {}}
                            className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${isFormValid && !isSubmitting
                                ? 'btn-premium'
                                : 'bg-secondary/50 text-foreground/40 cursor-not-allowed'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Submit
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Direct Email Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card-premium p-6"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-full bg-primary/20">
                            <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">Prefer Email?</h3>
                    </div>
                    <p className="text-foreground/60 text-sm mb-3">
                        If you'd like to reach us directly, you can email us at:
                    </p>
                    <motion.a
                        href="mailto:pocketfriend.au@gmail.com?subject=Hey, I need help"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="block w-full py-3 px-4 bg-secondary/50 border border-border/30 rounded-xl text-primary font-medium text-center hover:bg-secondary/70 transition-colors"
                    >
                        pocketfriend.au@gmail.com
                    </motion.a>
                </motion.div>
            </main>

            <BottomNav />

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleModalClose}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto"
                        >
                            <div className="card-premium p-8 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                                >
                                    <CheckCircle className="w-10 h-10 text-green-400" />
                                </motion.div>

                                <h2 className="text-xl font-bold text-foreground mb-3">
                                    We're Really Sorry About the Trouble
                                </h2>

                                <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                                    Thank you for reaching out. We're really sorry for any inconvenience you're experiencing.
                                    Our team has received your message and will get back to you as soon as possible.
                                    We appreciate your patience and support.
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleModalClose}
                                    className="w-full btn-premium py-3 rounded-xl font-semibold"
                                >
                                    Got it
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContactUs;
