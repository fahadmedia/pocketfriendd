import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import allCategoryLogo from "@/assets/all-category-logo.png";
import pizzaIcon from "@/assets/pizza-icon.png";
import burgerIcon from "@/assets/burger-icon.png";
import kebabIcon from "@/assets/kebab-icon.png";
import continentalIcon from "@/assets/continental-icon.png";

const pastaIcon = "https://res.cloudinary.com/drhirocfg/image/upload/v1767346710/Gemini_Generated_Image_lm18fvlm18fvlm18-removebg-preview_zyyntn.png";
const asianIcon = "https://res.cloudinary.com/drhirocfg/image/upload/v1767346710/Gemini_Generated_Image_6331ql6331ql6331-removebg-preview_gl3oj7.png";
const indianIcon = "https://res.cloudinary.com/drhirocfg/image/upload/v1767346710/Gemini_Generated_Image_bceynrbceynrbcey-removebg-preview_cqyb4w.png";

const categories = [
  { id: "all", name: "All", icon: allCategoryLogo, gradient: "from-primary/20 to-orange-500/20" },
  { id: "pizza", name: "Pizza", icon: pizzaIcon, gradient: "from-red-500/20 to-orange-500/20" },
  { id: "burgers", name: "Burgers", icon: burgerIcon, gradient: "from-yellow-500/20 to-orange-500/20" },
  { id: "kebabs", name: "Kebabs", icon: kebabIcon, gradient: "from-amber-500/20 to-red-500/20" },
  { id: "continental", name: "Continental", icon: continentalIcon, gradient: "from-purple-500/20 to-pink-500/20" },
  { id: "pasta", name: "Pasta", icon: pastaIcon, gradient: "from-green-500/20 to-emerald-500/20" },
  { id: "asian", name: "Asian", icon: asianIcon, gradient: "from-rose-500/20 to-red-500/20" },
  { id: "indian", name: "Indian", icon: indianIcon, gradient: "from-orange-500/20 to-amber-500/20" },
];

const FoodCategories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      return () => scrollContainer.removeEventListener("scroll", checkScrollButtons);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 120;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="px-4 md:px-6 py-6">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6"
      >
        Food Categories for you
      </motion.h2>

      <div className="relative">
        {/* Left Arrow - Desktop Only */}
        {!isMobile && canScrollLeft && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-card/95 backdrop-blur-sm border border-border/30 rounded-full shadow-xl hover:bg-primary/20 hover:border-primary/50 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </motion.button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category, index) => (
            <Link key={category.id} to={`/deals?type=${category.id}`} className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.08, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`category-btn bg-gradient-to-br ${category.gradient} w-[90px] h-[110px] md:w-[120px] md:h-[140px]`}
              >
                <motion.img
                  src={category.icon}
                  alt={category.name}
                  className="w-14 h-14 md:w-20 md:h-20 object-contain"
                  whileHover={{
                    y: [0, -4, 0],
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5, ease: "easeInOut" }
                  }}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-xs md:text-sm font-medium text-foreground/90 text-center">
                  {category.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Right Arrow - Desktop Only */}
        {!isMobile && canScrollRight && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-card/95 backdrop-blur-sm border border-border/30 rounded-full shadow-xl hover:bg-primary/20 hover:border-primary/50 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default FoodCategories;
