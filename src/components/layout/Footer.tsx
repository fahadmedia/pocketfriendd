import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer = () => {
    const navLinks = [
        { label: "Home", path: "/" },
        { label: "Deals", path: "/deals" },
        { label: "Contact Us", path: "/contact-us" },
    ];

    const handleNavClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden md:block w-full bg-gradient-to-b from-secondary/20 to-secondary/40 border-t border-border/30"
        >
            <div className="container mx-auto px-6 py-16 max-w-6xl">
                <div className="grid grid-cols-3 gap-12">
                    {/* Branding Block */}
                    <div className="flex flex-col gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                        >
                            <img
                                src="https://res.cloudinary.com/drhirocfg/image/upload/v1765561127/logo-removebg-preview_pjcvqj.png"
                                alt="Pocket Friend Logo"
                                className="h-16 w-auto mb-3"
                            />
                            <h3 className="text-2xl font-bold text-foreground">
                                Pocket Friend
                            </h3>
                            <p className="text-sm text-foreground/60 mt-2 leading-relaxed">
                                Your pocket-sized friend for everyday savings on the best food deals.
                            </p>
                        </motion.div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-4">
                        <motion.h4
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-lg font-semibold text-foreground mb-2"
                        >
                            Quick Links
                        </motion.h4>
                        <nav className="flex flex-col gap-3">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.path + link.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={handleNavClick}
                                        className="text-foreground/70 hover:text-primary transition-colors duration-200 text-sm inline-block hover:translate-x-1 transform"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Information */}
                    <div className="flex flex-col gap-4">
                        <motion.h4
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-lg font-semibold text-foreground mb-2"
                        >
                            Get in Touch
                        </motion.h4>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="flex flex-col gap-4"
                        >
                            <a
                                href="mailto:pocketfriend.au@gmail.com"
                                className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors duration-200 group"
                            >
                                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <div className="text-xs text-foreground/50 mb-1">Email</div>
                                    <div className="text-sm font-medium">pocketfriend.au@gmail.com</div>
                                </div>
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-12 pt-8 border-t border-border/30 flex items-center justify-between"
                >
                    <p className="text-sm text-foreground/50">
                        © {new Date().getFullYear()} Pocket Friend. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            to="/terms-policies"
                            onClick={handleNavClick}
                            className="text-sm text-foreground/50 hover:text-primary transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/terms-policies"
                            onClick={handleNavClick}
                            className="text-sm text-foreground/50 hover:text-primary transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;
