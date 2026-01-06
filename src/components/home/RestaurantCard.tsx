import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import pizzaIcon from "@/assets/pizza-icon.png";
import FavoriteButton from "@/components/FavoriteButton";

interface RestaurantCardProps {
  id: string;
  image: string;
  name: string;
  subtitle: string;
  description: string;
  discount: number;
  rating: number;
  location: string;
  index?: number;
  logo?: string;
  dealHeadline?: string;
}

const RestaurantCard = ({
  id,
  image,
  name,
  subtitle,
  description,
  discount,
  rating,
  location,
  index = 0,
  logo,
  dealHeadline,
}: RestaurantCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="parallax-container"
    >
      <Link to={`/restaurant/${id}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="card-premium overflow-hidden parallax-item"
        >
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

            {/* Discount Badge with shimmer */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute top-3 right-3 badge-discount shimmer-badge"
            >
              <span className="relative z-10">{discount}% OFF</span>
              <span className="shimmer-effect" />
            </motion.div>

            {/* Favorite Button */}
            <div className="absolute top-14 right-3">
              <FavoriteButton
                deal={{
                  id,
                  name,
                  description,
                  image,
                  discount,
                  rating,
                  location,
                }}
                size="sm"
              />
            </div>

            {/* Floating Food Icon */}
            <motion.img
              src={pizzaIcon}
              alt="pizza"
              className="absolute top-3 left-3 w-8 h-8 object-contain drop-shadow-lg"
              animate={{
                y: [0, -5, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut"
              }}
            />

            {/* Rating Badge */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-bold text-foreground">{rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              {logo && (
                <img
                  src={logo}
                  alt={`${name} logo`}
                  className="w-6 h-6 rounded-full object-cover border border-primary/30"
                />
              )}
              <h3 className="font-bold text-foreground text-lg">
                {name}
              </h3>
            </div>
            <p className="text-primary text-sm font-medium mb-1">
              {subtitle}
            </p>
            {dealHeadline && (
              <p className="text-foreground font-semibold text-sm mb-2">
                {dealHeadline}
              </p>
            )}
            <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
              {description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-foreground/50">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{location}</span>
              </div>

              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium py-2 px-5 text-sm"
              >
                View Restaurant
              </motion.span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;
