import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import DownloadApp from "@/components/layout/DownloadApp";
import Footer from "@/components/layout/Footer";
import RestaurantCard from "@/components/home/RestaurantCard";
import AppDownloadModal from "@/components/modals/AppDownloadModal";
import SEO from "@/components/SEO";
import { hasShownAppDownloadModal, markAppDownloadModalAsShown } from "@/utils/sessionStorage";
import pizzaImg from "@/assets/pizza-restaurant.jpg";
import burgerImg from "@/assets/burger-restaurant.jpg";
import kebabImg from "@/assets/kebab-restaurant.jpg";
import continentalImg from "@/assets/continental-restaurant.jpg";
import pizzaIcon from "@/assets/pizza-icon.png";
import burgerIcon from "@/assets/burger-icon.png";
import kebabIcon from "@/assets/kebab-icon.png";
import continentalIcon from "@/assets/continental-icon.png";
import allCategoryIcon from "@/assets/all-category-logo.png";
import { Star, MapPin, Flame, RotateCcw, Sparkles } from "lucide-react";

type Category = "All" | "Pizza" | "Burgers" | "Kebabs" | "Continental";
type SortOption = "none" | "rating" | "nearest" | "discount";

interface Deal {
  id: string;
  image: string;
  name: string;
  subtitle: string;
  description: string;
  discount: number;
  rating: number;
  location: string;
  category: Category;
  distance: number; // in km
}

const deals: Deal[] = [
  {
    id: "dough-pizzeria",
    image: pizzaImg,
    name: "Dough Pizzeria & Pasta Ashwood",
    subtitle: "Pizza - Pasta - Italian Cuisine",
    description: "Authentic pizza & pasta classics with a juicy 30% OFF across the entire menu. Melbourne's favorite Ashwood spot!",
    discount: 30,
    rating: 4.5,
    location: "Ashwood, VIC 3147",
    category: "Pizza",
    distance: 1.2,
  },
  {
    id: "burger-joint",
    image: burgerImg,
    name: "The Burger Joint Clayton",
    subtitle: "Burgers - Fries - Shakes",
    description: "Smashed patties, crispy fries and thick shakes at 25% OFF. Perfect fuel for late-night study sessions!",
    discount: 25,
    rating: 4.7,
    location: "Clayton, VIC 3168",
    category: "Burgers",
    distance: 0.8,
  },
  {
    id: "kebab-king",
    image: kebabImg,
    name: "Kebab King Caulfield",
    subtitle: "Kebabs - Wraps - Middle Eastern",
    description: "Loaded kebabs and fresh wraps with 35% OFF. The ultimate late-night student deal!",
    discount: 35,
    rating: 4.3,
    location: "Caulfield, VIC 3162",
    category: "Kebabs",
    distance: 2.5,
  },
  {
    id: "continental-cafe",
    image: continentalImg,
    name: "Continental Cafe & Grill",
    subtitle: "Continental - European - Fine Dining",
    description: "Experience European flavors at 20% OFF. Perfect for impressing your date or celebrating with friends!",
    discount: 20,
    rating: 4.8,
    location: "South Yarra, VIC 3141",
    category: "Continental",
    distance: 3.1,
  },
  {
    id: "pizza-paradise",
    image: pizzaImg,
    name: "Pizza Paradise Box Hill",
    subtitle: "Pizza - Garlic Bread - Desserts",
    description: "Wood-fired pizzas at 40% OFF! The biggest pizza discount in Melbourne right now.",
    discount: 40,
    rating: 4.2,
    location: "Box Hill, VIC 3128",
    category: "Pizza",
    distance: 4.0,
  },
  {
    id: "grill-masters",
    image: burgerImg,
    name: "Grill Masters Brunswick",
    subtitle: "Burgers - Steaks - Grilled Chicken",
    description: "Flame-grilled burgers and steaks at 15% OFF. Quality meat, quality price!",
    discount: 15,
    rating: 4.9,
    location: "Brunswick, VIC 3056",
    category: "Burgers",
    distance: 5.2,
  },
];

const categories: { name: Category; icon: string; gradient: string }[] = [
  { name: "All", icon: allCategoryIcon, gradient: "from-primary/20 to-orange-500/20" },
  { name: "Pizza", icon: pizzaIcon, gradient: "from-red-500/20 to-orange-500/20" },
  { name: "Burgers", icon: burgerIcon, gradient: "from-yellow-500/20 to-orange-500/20" },
  { name: "Kebabs", icon: kebabIcon, gradient: "from-amber-500/20 to-red-500/20" },
  { name: "Continental", icon: continentalIcon, gradient: "from-purple-500/20 to-pink-500/20" },
];

const sortOptions: { key: SortOption; label: string; icon: React.ReactNode }[] = [
  { key: "rating", label: "Top Rated", icon: <Star className="w-4 h-4" /> },
  { key: "nearest", label: "Nearest", icon: <MapPin className="w-4 h-4" /> },
  { key: "discount", label: "Best Discount", icon: <Flame className="w-4 h-4" /> },
];

const Deals = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState<SortOption>("none");
  const [showAppModal, setShowAppModal] = useState(false);

  useEffect(() => {
    // Show modal only on desktop and if not shown in this session
    const shouldShow = !hasShownAppDownloadModal();
    if (shouldShow) {
      // Delay modal appearance slightly for better UX
      const timer = setTimeout(() => {
        setShowAppModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseAppModal = () => {
    setShowAppModal(false);
    markAppDownloadModalAsShown();
  };

  const filteredAndSortedDeals = useMemo(() => {
    // First filter by category
    let result = selectedCategory === "All"
      ? [...deals]
      : deals.filter(deal => deal.category === selectedCategory);

    // Then sort
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "nearest":
        result.sort((a, b) => a.distance - b.distance);
        break;
      case "discount":
        result.sort((a, b) => b.discount - a.discount);
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSortBy("none");
  };

  const hasActiveFilters = selectedCategory !== "All" || sortBy !== "none";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="All Restaurant Deals in Melbourne - PocketFriend"
        description="Browse all exclusive restaurant deals in Melbourne. Save up to 50% on pizza, burgers, kebabs, and fine dining. Filter by category, rating, distance, and discount percentage."
        keywords="all restaurant deals Melbourne, food deals Victoria, pizza discounts, burger offers, kebab deals, Melbourne dining discounts, restaurant coupons, food vouchers Australia"
        ogTitle="Discover All Restaurant Deals in Melbourne | PocketFriend"
        ogDescription="Explore hundreds of exclusive restaurant deals in Melbourne. Filter by cuisine, rating, and location to find the perfect discount for your next meal."
        canonicalUrl="https://pocketfriend.app/deals"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Restaurant Deals in Melbourne",
          "description": "Exclusive restaurant deals and discounts in Melbourne",
          "numberOfItems": filteredAndSortedDeals.length,
          "itemListElement": filteredAndSortedDeals.slice(0, 10).map((deal, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Offer",
              "name": deal.name,
              "description": deal.description,
              "discount": `${deal.discount}%`,
              "availability": "https://schema.org/InStock"
            }
          }))
        }}
      />

      <Header />
      <main className="pt-20 px-4 pb-28">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden mb-6 p-6 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20"
        >
          <motion.div
            className="absolute top-4 right-4 w-16 h-16"
            animate={{
              y: [0, -5, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-full h-full text-primary/30" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            All Deals
          </h1>
          <p className="text-foreground/70 text-sm">
            Discover exclusive discounts at Melbourne's best restaurants
          </p>
        </motion.div>

        {/* Category Tiles Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-lg font-bold text-foreground mb-4 px-4">
            Food Categories for you
          </h2>

          <div className="px-4">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {categories.map((cat, index) => (
                <motion.button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.08, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`category-btn bg-gradient-to-br ${cat.gradient} w-[90px] h-[110px] flex-shrink-0 ${selectedCategory === cat.name ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                    }`}
                >
                  <motion.img
                    src={cat.icon}
                    alt={cat.name}
                    className="w-14 h-14 object-contain"
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
                  <span className="text-xs font-medium text-foreground/90 text-center">
                    {cat.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sort Options Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="text-foreground/50 text-xs font-medium">Sort:</span>
          <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-hide">
            {sortOptions.map((option) => (
              <motion.button
                key={option.key}
                onClick={() => setSortBy(sortBy === option.key ? "none" : option.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 whitespace-nowrap ${sortBy === option.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/50 bg-card/30 text-foreground/70 hover:border-primary/50"
                  }`}
              >
                {option.icon}
                <span className="text-xs font-medium">{option.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Reset Button */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={resetFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-destructive/50 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all duration-300"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="text-xs font-medium">Reset</span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <p className="text-foreground/50 text-sm">
            {filteredAndSortedDeals.length} {filteredAndSortedDeals.length === 1 ? "deal" : "deals"} found
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {sortBy !== "none" && ` • Sorted by ${sortOptions.find(s => s.key === sortBy)?.label}`}
          </p>
        </motion.div>

        {/* Deals Grid */}
        <AnimatePresence mode="wait">
          {filteredAndSortedDeals.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${sortBy}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredAndSortedDeals.map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RestaurantCard {...deal} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-16 px-6"
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 mb-6 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <Sparkles className="w-10 h-10 text-primary/60" />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No deals found for this category right now
              </h3>
              <p className="text-foreground/60 text-sm text-center mb-6">
                Try another category or check back later!
              </p>
              <motion.button
                onClick={resetFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
              >
                <RotateCcw className="w-4 h-4" />
                Show All Deals
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <DownloadApp />
      <Footer />
      <BottomNav />

      <AppDownloadModal isOpen={showAppModal} onClose={handleCloseAppModal} />
    </div>
  );
};

export default Deals;
