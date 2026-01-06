import { motion } from "framer-motion";
import { Receipt, MapPin, Clock, Calendar, Tag } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const discountHistory = [
  {
    id: 1,
    restaurant: "Mario's Pizza",
    discount: "25% Off",
    originalPrice: "$24.99",
    savedAmount: "$6.25",
    date: "Dec 10, 2024",
    time: "7:30 PM",
    location: "123 Main Street",
    category: "Pizza",
  },
  {
    id: 2,
    restaurant: "Burger Palace",
    discount: "Buy 1 Get 1 Free",
    originalPrice: "$18.99",
    savedAmount: "$9.50",
    date: "Dec 8, 2024",
    time: "1:15 PM",
    location: "456 Oak Avenue",
    category: "Burgers",
  },
  {
    id: 3,
    restaurant: "Kebab House",
    discount: "30% Off",
    originalPrice: "$32.00",
    savedAmount: "$9.60",
    date: "Dec 5, 2024",
    time: "8:00 PM",
    location: "789 Elm Boulevard",
    category: "Kebab",
  },
  {
    id: 4,
    restaurant: "Continental Bistro",
    discount: "15% Off",
    originalPrice: "$45.00",
    savedAmount: "$6.75",
    date: "Dec 1, 2024",
    time: "6:45 PM",
    location: "321 Pine Road",
    category: "Continental",
  },
];

const DiscountsHistory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">Discounts History</h1>
          <p className="text-foreground/60 text-sm">Your past discount redemptions</p>
        </motion.div>

        <div className="space-y-4">
          {discountHistory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-premium p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-foreground text-lg">{item.restaurant}</h3>
                  <span className="inline-flex items-center gap-1 bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded-full mt-1">
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-gradient-orange font-bold text-lg">{item.discount}</span>
                  <p className="text-xs text-foreground/50">Saved {item.savedAmount}</p>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-border/20">
                <div className="flex items-center gap-2 text-foreground/70 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/70 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/70 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/20">
                <span className="text-foreground/50 text-sm">Original: {item.originalPrice}</span>
                <div className="flex items-center gap-1 text-green-500 font-medium">
                  <Receipt className="w-4 h-4" />
                  <span>Redeemed</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default DiscountsHistory;
