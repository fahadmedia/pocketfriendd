import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Star, Share2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BottomNav from "@/components/layout/BottomNav";
import FavoriteButton from "@/components/FavoriteButton";
import RedeemDealModal from "@/components/modals/RedeemDealModal";
import pizzaImg from "@/assets/pizza-restaurant.jpg";
import burgerImg from "@/assets/burger-restaurant.jpg";
import kebabImg from "@/assets/kebab-restaurant.jpg";
import continentalImg from "@/assets/continental-restaurant.jpg";

const dealsData: Record<string, {
  name: string;
  description: string;
  fullDescription: string;
  image: string;
  discount: number;
  rating: number;
  reviews: number;
  location: string;
  address: string;
  hours: string;
  features: string[];
}> = {
  "1": {
    name: "Bella Italia",
    description: "Authentic Italian pizzas with fresh ingredients",
    fullDescription: "Experience the finest Italian cuisine with our wood-fired pizzas made from authentic recipes passed down through generations. Fresh ingredients imported directly from Italy.",
    image: pizzaImg,
    discount: 35,
    rating: 4.8,
    reviews: 234,
    location: "Sydney CBD",
    address: "123 George Street, Sydney NSW 2000",
    hours: "11:00 AM - 10:00 PM",
    features: ["Dine-in", "Takeaway", "Delivery"],
  },
  "2": {
    name: "Grill Masters",
    description: "Gourmet burgers with premium Angus beef",
    fullDescription: "Premium gourmet burgers crafted with 100% Australian Angus beef, topped with artisan cheeses and house-made sauces. A burger lover's paradise.",
    image: burgerImg,
    discount: 50,
    rating: 4.9,
    reviews: 456,
    location: "Melbourne",
    address: "456 Collins Street, Melbourne VIC 3000",
    hours: "10:00 AM - 11:00 PM",
    features: ["Dine-in", "Takeaway", "Outdoor Seating"],
  },
  "3": {
    name: "Sultan's Kitchen",
    description: "Traditional Middle Eastern kebabs & mezze",
    fullDescription: "Authentic Middle Eastern flavours with our charcoal-grilled kebabs, fresh mezze platters, and traditional recipes from the heart of Istanbul.",
    image: kebabImg,
    discount: 40,
    rating: 4.7,
    reviews: 189,
    location: "Brisbane",
    address: "789 Queen Street, Brisbane QLD 4000",
    hours: "12:00 PM - 10:00 PM",
    features: ["Dine-in", "Catering", "Halal"],
  },
  "4": {
    name: "The Grand Table",
    description: "Fine dining continental cuisine experience",
    fullDescription: "An elevated fine dining experience featuring continental cuisine prepared by award-winning chefs. Perfect for special occasions and romantic dinners.",
    image: continentalImg,
    discount: 25,
    rating: 4.9,
    reviews: 312,
    location: "Perth",
    address: "321 St Georges Terrace, Perth WA 6000",
    hours: "6:00 PM - 11:00 PM",
    features: ["Fine Dining", "Wine Pairing", "Private Rooms"],
  },
};

const DealDetails = () => {
  const { id } = useParams();
  const [showRedeemModal, setShowRedeemModal] = useState(false);

  const deal = dealsData[id || "1"] || dealsData["1"];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-72"
      >
        <img
          src={deal.image}
          alt={deal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Top Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full glass"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
          </Link>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full glass"
            >
              <Share2 className="w-5 h-5 text-foreground" />
            </motion.button>
            <FavoriteButton
              deal={{
                id: id || "1",
                name: deal.name,
                description: deal.description,
                image: deal.image,
                discount: deal.discount,
                rating: deal.rating,
                location: deal.location,
              }}
            />
          </div>
        </div>

        {/* Discount Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute bottom-4 right-4 badge-discount text-lg px-4 py-2"
        >
          {deal.discount}% OFF
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 -mt-8 relative z-10 pb-36"
      >
        {/* Main Info Card */}
        <div className="card-premium p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">{deal.name}</h1>
              <p className="text-foreground/60">{deal.description}</p>
            </div>
            <div className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-bold text-foreground">{deal.rating}</span>
              <span className="text-foreground/60 text-sm">({deal.reviews})</span>
            </div>
          </div>

          <p className="text-foreground/80 text-sm leading-relaxed mb-4">
            {deal.fullDescription}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {deal.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 rounded-full bg-secondary/50 text-foreground/80 text-xs font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="card-premium p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-primary/20">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium text-sm">{deal.location}</p>
              <p className="text-foreground/50 text-xs">{deal.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/20">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium text-sm">Opening Hours</p>
              <p className="text-foreground/50 text-xs">{deal.hours}</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 btn-outline-white"
          >
            Save Deal
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowRedeemModal(true)}
            className="flex-1 btn-premium animate-pulse-glow"
          >
            Redeem Deal
          </motion.button>
        </div>
      </motion.div>

      <BottomNav />
      <RedeemDealModal isOpen={showRedeemModal} onClose={() => setShowRedeemModal(false)} />
    </div>
  );
};

export default DealDetails;
