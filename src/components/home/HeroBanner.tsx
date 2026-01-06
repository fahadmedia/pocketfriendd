import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";
import pizzaIcon from "@/assets/pizza-icon.png";
import burgerIcon from "@/assets/burger-icon.png";
import kebabIcon from "@/assets/kebab-icon.png";
import continentalIcon from "@/assets/continental-icon.png";

const floatingIcons = [
  { icon: pizzaIcon, delay: 0, x: "10%", y: "20%", size: "w-16 h-16 md:w-20 md:h-20" },
  { icon: burgerIcon, delay: 0.5, x: "85%", y: "30%", size: "w-16 h-16 md:w-20 md:h-20" },
  { icon: kebabIcon, delay: 1, x: "15%", y: "70%", size: "w-16 h-16 md:w-20 md:h-20" },
  { icon: continentalIcon, delay: 1.5, x: "80%", y: "75%", size: "w-16 h-16 md:w-20 md:h-20" },
];

const HeroBanner = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative rounded-3xl overflow-hidden mx-4 mt-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/90" />
      </div>

      {/* Floating Food Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{
            delay: item.delay + 0.5,
            type: "spring",
            y: {
              repeat: Infinity,
              duration: 2.5,
              delay: item.delay,
              ease: "easeInOut"
            }
          }}
          className="absolute"
          style={{ left: item.x, top: item.y }}
        >
          <img
            src={item.icon}
            alt="food icon"
            className={`${item.size} object-contain drop-shadow-lg`}
          />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
            Unlock{" "}
            <span className="text-gradient-orange">Exclusive</span>
            <br />
            Restaurant Deals
          </h1>
          <p className="text-foreground/70 text-sm md:text-base mb-6">
            Near You in Melbourne
          </p>
          <Link to="/deals">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-premium text-sm md:text-base"
            >
              Explore Deals
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroBanner;
