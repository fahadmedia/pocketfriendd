import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";

const DownloadApp = () => {
    return (
        <section className="hidden md:block w-full py-16 bg-background">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-primary via-orange-500 to-orange-600 rounded-3xl p-12 shadow-2xl"
                >
                    <div className="flex items-center justify-between gap-12">
                        {/* Left: Text Content */}
                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="flex items-center gap-2 mb-4"
                            >
                                <Smartphone className="w-5 h-5 text-white/90" />
                                <span className="text-white/90 text-sm font-medium uppercase tracking-wider">
                                    Mobile App
                                </span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
                            >
                                Get the Pocket Friend App
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-lg text-white/90 max-w-xl leading-relaxed"
                            >
                                Download the Pocket Friend app for a seamless deal-hunting experience on the go. Save more, eat better, all from your phone.
                            </motion.p>
                        </div>

                        {/* Right: Download Buttons */}
                        <div className="flex items-center gap-4">
                            {/* Google Play Button */}
                            <motion.a
                                href="#"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-3 px-6 py-3.5 bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-black/40 transition-all shadow-lg"
                            >
                                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-xs opacity-90 font-medium">GET IT ON</div>
                                    <div className="text-base font-bold">Google Play</div>
                                </div>
                            </motion.a>

                            {/* Apple App Store Button */}
                            <motion.a
                                href="#"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.4 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-3 px-6 py-3.5 bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-black/40 transition-all shadow-lg"
                            >
                                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-xs opacity-90 font-medium">Download on the</div>
                                    <div className="text-base font-bold">App Store</div>
                                </div>
                            </motion.a>

                            {/* App Gallery Button */}
                            <motion.a
                                href="#"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7, duration: 0.4 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-3 px-6 py-3.5 bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-black/40 transition-all shadow-lg"
                            >
                                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-xs opacity-90 font-medium">EXPLORE IT ON</div>
                                    <div className="text-base font-bold">App Gallery</div>
                                </div>
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DownloadApp;
