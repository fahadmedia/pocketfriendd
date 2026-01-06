import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Flame, RotateCcw, Repeat, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import DownloadApp from "@/components/layout/DownloadApp";
import Footer from "@/components/layout/Footer";
import RestaurantCard from "@/components/home/RestaurantCard";
import pizzaImg from "@/assets/pizza-restaurant.jpg";
import burgerImg from "@/assets/burger-restaurant.jpg";
import kebabImg from "@/assets/kebab-restaurant.jpg";
import continentalImg from "@/assets/continental-restaurant.jpg";
import allCategoryLogo from "@/assets/all-category-logo.png";
import pizzaIcon from "@/assets/pizza-icon.png";
import burgerIcon from "@/assets/burger-icon.png";
import kebabIcon from "@/assets/kebab-icon.png";
import continentalIcon from "@/assets/continental-icon.png";

const pastaIcon = "https://res.cloudinary.com/drhirocfg/image/upload/v1767346710/Gemini_Generated_Image_lm18fvlm18fvlm18-removebg-preview_zyyntn.png";
const asianIcon = "https://res.cloudinary.com/drhirocfg/image/upload/v1767346710/Gemini_Generated_Image_6331ql6331ql6331-removebg-preview_gl3oj7.png";
const indianIcon = "https://res.cloudinary.com/drhirocfg/image/upload/v1767346710/Gemini_Generated_Image_bceynrbceynrbcey-removebg-preview_cqyb4w.png";

type SortOption = "none" | "goto" | "rating" | "nearest" | "discount";
type Category = "all" | "pizza" | "burgers" | "kebabs" | "continental" | "pasta" | "asian" | "indian";

const categories: { id: Category; label: string; emoji: string; icon: string; gradient: string }[] = [
  { id: "all", label: "All", emoji: "🍽️", icon: allCategoryLogo, gradient: "from-primary/20 to-orange-500/20" },
  { id: "pizza", label: "Pizza", emoji: "🍕", icon: pizzaIcon, gradient: "from-red-500/20 to-orange-500/20" },
  { id: "burgers", label: "Burgers", emoji: "🍔", icon: burgerIcon, gradient: "from-yellow-500/20 to-orange-500/20" },
  { id: "kebabs", label: "Kebabs", emoji: "🥙", icon: kebabIcon, gradient: "from-amber-500/20 to-red-500/20" },
  { id: "continental", label: "Continental", emoji: "🍽️", icon: continentalIcon, gradient: "from-purple-500/20 to-pink-500/20" },
  { id: "pasta", label: "Pasta", emoji: "🍝", icon: pastaIcon, gradient: "from-green-500/20 to-emerald-500/20" },
  { id: "asian", label: "Asian", emoji: "🥡", icon: asianIcon, gradient: "from-rose-500/20 to-red-500/20" },
  { id: "indian", label: "Indian", emoji: "🍛", icon: indianIcon, gradient: "from-orange-500/20 to-amber-500/20" },
];

const categoryData: Record<string, { title: string; emoji: string; image: string; icon: string }> = {
  all: { title: "All Deals", emoji: "🍽️", image: pizzaImg, icon: allCategoryLogo },
  pizza: { title: "Pizza Deals", emoji: "🍕", image: pizzaImg, icon: pizzaIcon },
  burgers: { title: "Burger Deals", emoji: "🍔", image: burgerImg, icon: burgerIcon },
  kebabs: { title: "Kebab Deals", emoji: "🥙", image: kebabImg, icon: kebabIcon },
  continental: { title: "Continental Deals", emoji: "🍽️", image: continentalImg, icon: continentalIcon },
  pasta: { title: "Pasta Deals", emoji: "🍝", image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", icon: pastaIcon },
  asian: { title: "Asian Deals", emoji: "🥡", image: "https://images.pexels.com/photos/3297801/pexels-photo-3297801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", icon: asianIcon },
  indian: { title: "Indian Deals", emoji: "🍛", image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", icon: indianIcon },
};

const allRestaurants = [
  {
    id: "dough-pizzeria",
    image: pizzaImg,
    name: "Dough Pizzeria & Pasta Ashwood",
    subtitle: "Pizza • Pasta • Italian Cuisine",
    description: "Authentic pizza & pasta classics with a juicy 30% OFF across the entire menu.",
    discount: 30,
    rating: 4.5,
    distance: 1.2,
    location: "Ashwood, VIC 3147",
    category: "pizza",
    userRedemptionCount: 0, // Track how many times current user redeemed this deal
    totalRedemptions: 0, // Track global redemption count
    logo: "https://xugskhncmrrczstnlapl.supabase.co/storage/v1/object/public/restaurant%20info/dough%20pizzeria/21372893_345083582598063_4127533630962532352_a.jpg",
    dealHeadline: "30% OFF - Entire Menu",
  },
  {
    id: "pizza-hut-clayton",
    image: pizzaImg,
    name: "Pizza Hut Clayton",
    subtitle: "Pizza • Wings • Sides",
    description: "Classic pizzas and combos with 25% student discount.",
    discount: 25,
    rating: 4.2,
    distance: 2.5,
    location: "Clayton, VIC 3168",
    category: "pizza",
    userRedemptionCount: 0,
    totalRedemptions: 0,
  },
  {
    id: "dominos-burwood",
    image: pizzaImg,
    name: "Domino's Burwood",
    subtitle: "Pizza • Garlic Bread • Desserts",
    description: "Fast delivery with 20% OFF on all orders.",
    discount: 20,
    rating: 4.0,
    distance: 0.8,
    location: "Burwood, VIC 3125",
    category: "pizza",
    userRedemptionCount: 0,
    totalRedemptions: 0,
  },
  {
    id: "burger-lab",
    image: burgerImg,
    name: "Burger Lab Melbourne",
    subtitle: "Burgers • Fries • Shakes",
    description: "Gourmet burgers with 35% OFF for students.",
    discount: 35,
    rating: 4.7,
    distance: 3.1,
    location: "Melbourne CBD, VIC 3000",
    category: "burgers",
    userRedemptionCount: 0,
    totalRedemptions: 0,
  },
  {
    id: "grilld-chadstone",
    image: burgerImg,
    name: "Grill'd Chadstone",
    subtitle: "Burgers • Salads • Chips",
    description: "Healthy burgers with 15% student discount.",
    discount: 15,
    rating: 4.3,
    distance: 4.2,
    location: "Chadstone, VIC 3148",
    category: "burgers",
    userRedemptionCount: 0,
    totalRedemptions: 0,
  },
  {
    id: "kebab-station",
    image: kebabImg,
    name: "Kebab Station Box Hill",
    subtitle: "Kebabs • Wraps • Plates",
    description: "Fresh kebabs with 40% OFF on all wraps.",
    discount: 40,
    rating: 4.6,
    distance: 1.8,
    location: "Box Hill, VIC 3128",
    category: "kebabs",
    userRedemptionCount: 0,
    totalRedemptions: 0,
  },
  {
    id: "kebab-king",
    image: kebabImg,
    name: "Kebab King Glen Waverley",
    subtitle: "Kebabs • HSP • Falafels",
    description: "Best HSP in town with 30% student discount.",
    discount: 30,
    rating: 4.4,
    distance: 2.9,
    location: "Glen Waverley, VIC 3150",
    category: "kebabs",
    userRedemptionCount: 0,
    totalRedemptions: 0,
  },
  {
    id: "continental-cafe",
    image: continentalImg,
    name: "Continental Café",
    subtitle: "European • Fine Dining • Wine",
    description: "Elegant European cuisine with 25% OFF.",
    discount: 25,
    rating: 4.8,
    distance: 5.0,
    location: "South Yarra, VIC 3141",
    category: "continental",
    userRedemptionCount: 0,
    totalRedemptions: 0,
  },
  {
    id: "euro-bistro",
    image: continentalImg,
    name: "Euro Bistro Richmond",
    subtitle: "Continental • Steaks • Seafood",
    description: "Classic continental dishes with 20% student discount.",
    discount: 20,
    rating: 4.5,
    distance: 3.5,
    location: "Richmond, VIC 3121",
    category: "continental",
    userRedemptionCount: 0,
    totalRedemptions: 0,
  },
];

const sortOptions = [
  { id: "goto" as SortOption, label: "Your Go-To Deals", icon: Repeat },
  { id: "rating" as SortOption, label: "Top Rated", icon: Star },
  { id: "nearest" as SortOption, label: "Nearest", icon: MapPin },
  { id: "discount" as SortOption, label: "Best Discount", icon: Flame },
];

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = (searchParams.get("type") as Category) || "all";
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>("none");

  // Scroll state for category navigation
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

  const category = categoryData[selectedCategory] || categoryData.all;

  const filteredAndSortedRestaurants = useMemo(() => {
    // Step 1: Filter by category (always applied first)
    let results = selectedCategory === "all"
      ? allRestaurants
      : allRestaurants.filter(r => r.category === selectedCategory);

    // Step 2: Apply sorting based on active filter
    switch (sortBy) {
      case "goto":
        // Your Go-To Deals: Sort by user redemption count (most redeemed by current user)
        // If no redemptions yet, show all deals unsorted
        results = [...results].sort((a, b) => {
          if (b.userRedemptionCount === 0 && a.userRedemptionCount === 0) {
            return 0; // Keep original order if no user redemptions
          }
          return b.userRedemptionCount - a.userRedemptionCount;
        });
        break;

      case "rating":
        // Top Rated: Sort by global total redemptions (most popular deals)
        // If no redemptions yet, show all deals unsorted
        results = [...results].sort((a, b) => {
          if (b.totalRedemptions === 0 && a.totalRedemptions === 0) {
            return 0; // Keep original order if no global redemptions
          }
          return b.totalRedemptions - a.totalRedemptions;
        });
        break;

      case "nearest":
        // Nearest: Sort by distance (ascending)
        // Currently all deals are in Melbourne, but logic is ready for GPS-based sorting
        results = [...results].sort((a, b) => a.distance - b.distance);
        break;

      case "discount":
        // Best Discount: Sort by discount percentage (descending)
        results = [...results].sort((a, b) => b.discount - a.discount);
        break;

      case "none":
      default:
        // No sorting applied, keep filtered results in original order
        break;
    }

    return results;
  }, [selectedCategory, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSortBy("none");
  };
  const isFilterActive = sortBy !== "none" || selectedCategory !== "all";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-28">
        {/* Category Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-48 mx-4 rounded-3xl overflow-hidden mb-6"
        >
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          {/* Back Button */}
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 left-4 p-2 rounded-full glass"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
          </Link>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-4 left-4"
          >
            <img
              src={category.icon}
              alt={category.title}
              className="w-14 h-14 object-contain mb-2"
            />
            <h1 className="text-2xl font-bold text-foreground">{category.title}</h1>
          </motion.div>
        </motion.div>

        {/* Category Tiles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="px-4 md:px-6 mb-6"
        >
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6">
            Food Categories for you
          </h2>
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

            <div
              ref={scrollRef}
              className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories.map((cat, index) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.08, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`category-btn bg-gradient-to-br ${cat.gradient} w-[90px] h-[110px] md:w-[120px] md:h-[140px] flex-shrink-0 ${isActive
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : ""
                      }`}
                  >
                    <motion.img
                      src={cat.icon}
                      alt={cat.label}
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
                      {cat.label}
                    </span>
                  </motion.button>
                );
              })}
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
        </motion.div>

        {/* Sort Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-4 mb-6"
        >
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
            {sortOptions.map((option) => {
              const Icon = option.icon;
              const isActive = sortBy === option.id;
              return (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSortBy(isActive ? "none" : option.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "glass text-foreground/70 hover:text-foreground"
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "fill-current" : ""}`} />
                  <span>{option.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Restaurant Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-4 mb-6"
        >
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedRestaurants.length > 0 ? (
                filteredAndSortedRestaurants.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <RestaurantCard {...restaurant} index={index} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-foreground/50 text-sm">
                    No deals found for this category right now 😔<br />
                    Try another category or check back later!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      <DownloadApp />
      <Footer />
      <BottomNav />
    </div>
  );
};

export default CategoryPage;
