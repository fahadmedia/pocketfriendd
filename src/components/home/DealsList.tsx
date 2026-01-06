import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import pizzaImg from "@/assets/pizza-restaurant.jpg";

const restaurants = [
  {
    id: "dough-pizzeria",
    image: pizzaImg,
    name: "Dough Pizzeria & Pasta Ashwood",
    subtitle: "Pizza • Pasta • Italian Cuisine",
    description: "Authentic pizza & pasta classics with a juicy 30% OFF across the entire menu. Melbourne's favorite Ashwood spot!",
    discount: 30,
    rating: 4.5,
    location: "Ashwood, VIC 3147",
    logo: "https://xugskhncmrrczstnlapl.supabase.co/storage/v1/object/public/restaurant%20info/dough%20pizzeria/21372893_345083582598063_4127533630962532352_a.jpg",
    dealHeadline: "30% OFF - Entire Menu",
  },
];

const DealsList = () => {
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate("/deals");
    window.scrollTo(0, 0);
  };

  return (
    <section className="px-4 py-6 pb-28">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-4"
      >
        <h2 className="text-lg font-bold text-foreground">Hot Deals 🔥</h2>
        <motion.button
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSeeAll}
          className="text-primary text-sm font-medium"
        >
          See All
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={restaurant.id} {...restaurant} index={index} />
        ))}
      </div>
    </section>
  );
};

export default DealsList;
