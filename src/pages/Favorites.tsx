import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import DownloadApp from "@/components/layout/DownloadApp";
import Footer from "@/components/layout/Footer";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/contexts/FavoritesContext";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Favorite Deals ❤️
          </h1>
          <p className="text-muted-foreground">
            {favorites.length > 0
              ? `You have ${favorites.length} saved ${favorites.length === 1 ? "deal" : "deals"}`
              : "Save your favorite deals to access them quickly"}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {favorites.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                <Heart className="w-20 h-20 text-primary/30 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                No Favorites Yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Start saving deals by tapping the heart icon on any deal card
              </p>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-premium"
                >
                  Explore Deals
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-4"
            >
              {favorites.map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <Link to={`/deal/${deal.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="card-premium overflow-hidden"
                    >
                      {/* Image Container */}
                      <div className="relative h-48 overflow-hidden">
                        <motion.img
                          src={deal.image}
                          alt={deal.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                        {/* Discount Badge */}
                        <motion.div
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className="absolute top-3 right-3 badge-discount shimmer-badge"
                        >
                          <span className="relative z-10">{deal.discount}% OFF</span>
                          <span className="shimmer-effect" />
                        </motion.div>

                        {/* Favorite Button */}
                        <div className="absolute top-14 right-3">
                          <FavoriteButton deal={deal} size="sm" />
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="text-sm font-bold text-foreground">
                            {deal.rating}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-bold text-foreground text-lg mb-1">
                          {deal.name}
                        </h3>
                        <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                          {deal.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-foreground/50">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{deal.location}</span>
                          </div>

                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-premium py-2 px-5 text-sm"
                          >
                            View Deal
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <DownloadApp />
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Favorites;
