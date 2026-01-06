import { useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import DownloadApp from "@/components/layout/DownloadApp";
import Footer from "@/components/layout/Footer";
import RestaurantCard from "@/components/home/RestaurantCard";
import pizzaImg from "@/assets/pizza-restaurant.jpg";
import burgerImg from "@/assets/burger-restaurant.jpg";
import continentalImg from "@/assets/continental-restaurant.jpg";

// All available deals
const allDeals = [
  {
    id: "dough-pizzeria",
    image: pizzaImg,
    name: "Dough Pizzeria & Pasta Ashwood",
    subtitle: "Pizza • Pasta • Italian Cuisine",
    description: "Authentic pizza & pasta classics with a juicy 30% OFF across the entire menu.",
    discount: 30,
    rating: 4.5,
    location: "Ashwood, VIC 3147",
    category: "pizza",
    logo: "https://xugskhncmrrczstnlapl.supabase.co/storage/v1/object/public/restaurant%20info/dough%20pizzeria/21372893_345083582598063_4127533630962532352_a.jpg",
    dealHeadline: "30% OFF - Entire Menu",
    keywords: ["pizza", "pasta", "italian", "dough", "pizzeria", "ashwood", "30%", "discount"],
  },
  {
    id: "pizza-hut-clayton",
    image: pizzaImg,
    name: "Pizza Hut Clayton",
    subtitle: "Pizza • Wings • Sides",
    description: "Classic pizzas and combos with 25% student discount.",
    discount: 25,
    rating: 4.2,
    location: "Clayton, VIC 3168",
    category: "pizza",
    keywords: ["pizza", "hut", "wings", "clayton", "25%", "student", "discount"],
  },
  {
    id: "dominos-burwood",
    image: pizzaImg,
    name: "Domino's Burwood",
    subtitle: "Pizza • Fast Food",
    description: "Get 20% off on all orders over $30.",
    discount: 20,
    rating: 4.0,
    location: "Burwood, VIC 3125",
    category: "pizza",
    keywords: ["pizza", "dominos", "domino's", "burwood", "20%", "fast food", "discount"],
  },
  {
    id: "grilld-chadstone",
    image: burgerImg,
    name: "Grill'd Chadstone",
    subtitle: "Burgers • Healthy Options",
    description: "Premium burgers with 15% off your entire order.",
    discount: 15,
    rating: 4.6,
    location: "Chadstone, VIC 3148",
    category: "burgers",
    keywords: ["burger", "burgers", "grilld", "grill'd", "chadstone", "15%", "healthy", "discount"],
  },
  {
    id: "betty-burgers-glen",
    image: burgerImg,
    name: "Betty's Burgers Glen Waverley",
    subtitle: "Burgers • Shakes • Fries",
    description: "Enjoy 20% off all menu items including our famous concrete shakes.",
    discount: 20,
    rating: 4.4,
    location: "Glen Waverley, VIC 3150",
    category: "burgers",
    keywords: ["burger", "burgers", "betty", "betty's", "glen waverley", "20%", "shakes", "fries", "discount"],
  },
  {
    id: "schnitz-oakleigh",
    image: continentalImg,
    name: "Schnitz Oakleigh",
    subtitle: "Schnitzel • European",
    description: "Classic schnitzels with 25% off for students.",
    discount: 25,
    rating: 4.3,
    location: "Oakleigh, VIC 3166",
    category: "continental",
    keywords: ["schnitzel", "schnitz", "european", "oakleigh", "25%", "student", "discount"],
  },
];

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Filter deals based on search query - show all when empty
  const filteredDeals = query.trim()
    ? allDeals.filter((deal) => {
      const searchTerm = query.toLowerCase();
      return (
        deal.name.toLowerCase().includes(searchTerm) ||
        deal.subtitle.toLowerCase().includes(searchTerm) ||
        deal.description.toLowerCase().includes(searchTerm) ||
        deal.location.toLowerCase().includes(searchTerm) ||
        deal.category.toLowerCase().includes(searchTerm) ||
        deal.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))
      );
    })
    : allDeals;

  const hasResults = filteredDeals.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 pb-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Search Input */}
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <Input
              type="text"
              placeholder="Search restaurants, deals, cuisine..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-secondary/50 border-border/30 rounded-xl text-base placeholder:text-foreground/40 focus:border-primary"
            />
          </div>

          {/* Search Results */}
          {hasResults ? (
            <div className="space-y-4">
              {query.trim() && (
                <p className="text-foreground/60 text-sm">
                  Found {filteredDeals.length} {filteredDeals.length === 1 ? 'deal' : 'deals'} matching "{query}"
                </p>
              )}
              <div className="grid grid-cols-1 gap-4">
                {filteredDeals.map((deal, index) => (
                  <RestaurantCard key={deal.id} {...deal} index={index} />
                ))}
              </div>
            </div>
          ) : (
            // Empty State
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-premium p-8 text-center mt-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <SearchIcon className="w-10 h-10 text-primary" />
              </motion.div>

              <h2 className="text-xl font-bold text-foreground mb-2">
                No results found
              </h2>

              <p className="text-foreground/60 text-sm leading-relaxed mb-6 max-w-md mx-auto">
                We couldn't find any deals matching your search, but there are plenty of great discounts waiting for you.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/deals')}
                className="btn-premium py-3 px-6 rounded-xl font-semibold inline-flex items-center gap-2"
              >
                Explore All Deals
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </main>
      <DownloadApp />
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Search;
