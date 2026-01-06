import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Star, Heart, Share2, Phone, Globe, ExternalLink } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BottomNav from "@/components/layout/BottomNav";
import SEO from "@/components/SEO";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import pizzaImg from "@/assets/pizza-restaurant.jpg";
import burgerImg from "@/assets/burger-restaurant.jpg";
import continentalImg from "@/assets/continental-restaurant.jpg";
import pizzaIcon from "@/assets/pizza-icon.png";

const doughPizzeriaLogo = "https://xugskhncmrrczstnlapl.supabase.co/storage/v1/object/public/restaurant%20info/dough%20pizzeria/21372893_345083582598063_4127533630962532352_a.jpg";

const restaurantData: Record<string, {
  name: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  images: string[];
  logo?: string;
  rating: number;
  reviews: number;
  location: string;
  address: string;
  mapsUrl: string;
  hours: string;
  phone: string;
  website: string;
  websiteUrl: string;
  cuisine: string[];
  deals: {
    id: string;
    title: string;
    discount: number;
    description: string;
    image: string;
  }[];
}> = {
  "dough-pizzeria": {
    name: "Dough Pizzeria & Pasta Ashwood",
    subtitle: "Pizza • Pasta • Italian Cuisine",
    description: "Savory Deals Await!",
    fullDescription: "Savor every slice and twirl with Dough Pizzeria where Ashwood's best pizza and pasta meet unbeatable 30% discounts only on PocketFriend. Authentic Italian recipes with the freshest ingredients, wood-fired to perfection.",
    images: [
      "https://xugskhncmrrczstnlapl.supabase.co/storage/v1/object/public/restaurant%20info/dough%20pizzeria/imgi_21_AF1QipMolHbHqCcFsTbYIVSxXr-cTXE__VM1ub5X1a83=w203-h135-k-no.png",
      "https://xugskhncmrrczstnlapl.supabase.co/storage/v1/object/public/restaurant%20info/dough%20pizzeria/imgi_28_AF1QipNf086qQ8Gz-KSbC9-V4iiIxOEmaQGItpCHWlnW=s652-k-no.jpg",
      "https://xugskhncmrrczstnlapl.supabase.co/storage/v1/object/public/restaurant%20info/dough%20pizzeria/imgi_30_AF1QipNj6SyWssfdnbe2O3bALV9mmwK5sALvpC7mhUac=s652-k-no.jpg",
      "https://xugskhncmrrczstnlapl.supabase.co/storage/v1/object/public/restaurant%20info/dough%20pizzeria/imgi_33_AF1QipOwEl3lwEgR-aalbuvXeAsmD0pSwNyYljqfEiKZ=w203-h152-k-no.jpg"
    ],
    logo: doughPizzeriaLogo,
    rating: 4.5,
    reviews: 328,
    location: "Ashwood, VIC 3147",
    address: "211 High St Rd, Ashwood VIC 3147, Australia",
    mapsUrl: "https://www.google.com/maps/place/Dough+Pizzeria+%26+Pasta+Ashwood/@-37.8677126,145.1086609,18.26z/data=!4m15!1m8!3m7!1s0x6ad6403bc2ccc70f:0x7a71c0dee5f8d668!2sDough+Pizzeria+%26+Pasta+Ashwood!8m2!3d-37.8672517!4d145.1084929!10e5!16s%2Fg%2F1vj5_bmv!3m5!1s0x6ad6403bc2ccc70f:0x7a71c0dee5f8d668!8m2!3d-37.8672517!4d145.1084929!16s%2Fg%2F1vj5_bmv!18m1!1e1?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D",
    hours: "11:00 AM – 10:30 PM",
    phone: "+61 3 9888 1234",
    website: "doughpizzeria.com.au",
    websiteUrl: "https://www.doughpizzeria.com.au/",
    cuisine: ["Pizza", "Pasta", "Italian"],
    deals: [
      {
        id: "30-off-menu",
        title: "30% OFF — Entire Menu",
        discount: 30,
        description: "Enjoy 30% off all menu items — from classic wood-fired pizzas to signature pastas and irresistible sides. Redeem in store by scanning the QR code at checkout.",
        image: pizzaImg,
      },
    ],
  },
};

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const restaurant = restaurantData[id || "dough-pizzeria"] || restaurantData["dough-pizzeria"];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: `${restaurant.name} - PocketFriend`,
      text: `Check out this amazing deal at ${restaurant.name}! ${restaurant.deals[0]?.discount}% OFF`,
      url: `https://pocketfriend.app/restaurant/${id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      // User cancelled or error occurred
      console.log("Share cancelled or failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${restaurant.name} - ${restaurant.deals[0]?.discount}% OFF | PocketFriend`}
        description={`${restaurant.fullDescription} Located in ${restaurant.location}. Save ${restaurant.deals[0]?.discount}% on your next visit with PocketFriend.`}
        keywords={`${restaurant.name}, ${restaurant.cuisine.join(', ')}, ${restaurant.location}, restaurant deals, food discounts, Melbourne dining`}
        ogTitle={`${restaurant.name} - Save ${restaurant.deals[0]?.discount}% with PocketFriend`}
        ogDescription={`${restaurant.fullDescription.substring(0, 150)}...`}
        ogImage={restaurant.images[0]}
        canonicalUrl={`https://pocketfriend.app/restaurant/${id}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "name": restaurant.name,
          "image": restaurant.images,
          "description": restaurant.fullDescription,
          "servesCuisine": restaurant.cuisine,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": restaurant.address.split(',')[0],
            "addressLocality": restaurant.location.split(',')[0],
            "addressRegion": "VIC",
            "addressCountry": "AU"
          },
          "telephone": restaurant.phone,
          "url": restaurant.websiteUrl,
          "openingHours": restaurant.hours,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": restaurant.rating.toString(),
            "reviewCount": restaurant.reviews.toString()
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Restaurant Deals",
            "itemListElement": restaurant.deals.map(deal => ({
              "@type": "Offer",
              "name": deal.title,
              "description": deal.description,
              "discount": `${deal.discount}%`,
              "availability": "https://schema.org/InStock",
              "validThrough": "2025-12-31"
            }))
          }
        }}
      />

      {/* Hero Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        <Carousel className="w-full">
          <CarouselContent>
            {restaurant.images.map((img, idx) => (
              <CarouselItem key={idx}>
                <div className="relative h-72 md:h-96 bg-secondary/20">
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={img}
                    alt={`${restaurant.name} ${idx + 1}`}
                    className="w-full h-full object-cover md:object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-background/50 border-0 text-foreground hover:bg-background/80" />
          <CarouselNext className="right-4 bg-background/50 border-0 text-foreground hover:bg-background/80" />
        </Carousel>

        {/* Top Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="p-3 rounded-full glass"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-3 rounded-full glass"
            >
              <Share2 className="w-5 h-5 text-foreground" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSaved(!isSaved)}
              className="p-3 rounded-full glass"
            >
              <Heart
                className={`w-5 h-5 ${isSaved ? "fill-primary text-primary" : "text-foreground"}`}
              />
            </motion.button>
          </div>
        </div>

        {/* Floating Food Icon */}
        <motion.img
          src={pizzaIcon}
          alt="pizza"
          className="absolute bottom-20 right-6 w-12 h-12 object-contain drop-shadow-lg z-10"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
        />
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
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                {restaurant.logo && (
                  <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    src={restaurant.logo}
                    alt={`${restaurant.name} logo`}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary/30"
                  />
                )}
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xl font-bold text-foreground"
                >
                  {restaurant.name}
                </motion.h1>
              </div>
              <p className="text-primary font-medium text-sm mb-1">{restaurant.subtitle}</p>
              <p className="text-foreground/60 text-sm italic">{restaurant.description}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1 bg-primary/20 px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-bold text-foreground">{restaurant.rating}</span>
            </div>
            <span className="text-foreground/60 text-sm">Based on {restaurant.reviews} reviews — trending favorite!</span>
          </div>

          <p className="text-foreground/80 text-sm leading-relaxed mb-4">
            {restaurant.fullDescription}
          </p>

          {/* Cuisine Tags */}
          <div className="flex flex-wrap gap-2">
            {restaurant.cuisine.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full bg-secondary/50 text-foreground/80 text-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="card-premium p-4 mb-4 space-y-4">
          {/* Address */}
          <motion.a
            href={restaurant.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-2.5 rounded-full bg-primary/20">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-foreground font-medium text-sm">{restaurant.location}</p>
              <p className="text-foreground/50 text-xs">{restaurant.address}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-primary" />
          </motion.a>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-primary/20">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium text-sm">Contact</p>
              <p className="text-foreground/50 text-xs">{restaurant.phone}</p>
            </div>
          </div>

          {/* Website */}
          <motion.a
            href={restaurant.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ x: 5 }}
          >
            <div className="p-2.5 rounded-full bg-primary/20">
              <Globe className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-foreground font-medium text-sm">Website</p>
              <p className="text-primary text-xs">{restaurant.website}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-primary" />
          </motion.a>
        </div>

        {/* Deals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            🔥 Available Deals
          </h2>

          {restaurant.deals.map((deal, index) => (
            <Link key={deal.id} to={`/restaurant/${id}/deal/${deal.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="card-premium overflow-hidden"
              >
                <div className="relative h-32">
                  <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />

                  {/* Shimmer Badge */}
                  <motion.div
                    className="absolute top-3 right-3 badge-discount overflow-hidden"
                    animate={{
                      boxShadow: [
                        "0 0 20px hsl(32 100% 50% / 0.4)",
                        "0 0 30px hsl(32 100% 50% / 0.7)",
                        "0 0 20px hsl(32 100% 50% / 0.4)"
                      ]
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {deal.discount}% OFF
                  </motion.div>

                  <div className="absolute inset-0 p-4 flex flex-col justify-center">
                    <h3 className="text-foreground font-bold text-base mb-1">{deal.title}</h3>
                    <p className="text-foreground/70 text-xs line-clamp-2">{deal.description}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default RestaurantDetails;
