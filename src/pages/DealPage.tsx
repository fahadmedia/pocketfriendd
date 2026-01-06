import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Star, QrCode, ExternalLink, Share2 } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import BottomNav from "@/components/layout/BottomNav";
import RedeemDealModal from "@/components/modals/RedeemDealModal";
import pizzaImg from "@/assets/pizza-restaurant.jpg";
import burgerImg from "@/assets/burger-restaurant.jpg";
import continentalImg from "@/assets/continental-restaurant.jpg";
import pizzaIcon from "@/assets/pizza-icon.png";
const dealData: Record<string, {
  restaurantId: string;
  restaurantName: string;
  title: string;
  discount: number;
  description: string;
  fullDescription: string;
  images: string[];
  validUntil: string;
  terms: string[];
  address: string;
  mapsUrl: string;
}> = {
  "30-off-menu": {
    restaurantId: "dough-pizzeria",
    restaurantName: "Dough Pizzeria & Pasta Ashwood",
    title: "30% OFF — Entire Menu",
    discount: 30,
    description: "Enjoy 30% off all menu items",
    fullDescription: "Enjoy 30% off all menu items — from classic wood-fired pizzas to signature pastas and irresistible sides. This exclusive PocketFriend deal transforms every visit into a flavor-packed savings adventure. Whether you're craving our famous Margherita, creamy Carbonara, or indulgent Tiramisu, everything on the menu comes with a delicious discount.",
    images: ["https://xugskhncmrrczstnlapl.supabase.co/storage/v1/object/public/restaurant%20info/dough%20pizzeria/imgi_30_AF1QipNj6SyWssfdnbe2O3bALV9mmwK5sALvpC7mhUac=s652-k-no.jpg"],
    validUntil: "Valid until 31 Dec 2025",
    terms: [
      "Redeem the deal by scanning the restaurant's QR code using the PocketFriend app",
      "Show your active redemption screen to staff before placing your order",
      "Discount cannot be combined with other promotions or offers",
      "One redemption per customer per visit",
      "Redemption expires after 20 minutes once activated",
      "Same deal can be redeemed again after a 3 hour cooldown period"
    ],
    address: "211 High St Rd, Ashwood VIC 3147, Australia",
    mapsUrl: "https://www.google.com/maps/place/Dough+Pizzeria+%26+Pasta+Ashwood/@-37.8677126,145.1086609,18.26z/data=!4m15!1m8!3m7!1s0x6ad6403bc2ccc70f:0x7a71c0dee5f8d668!2sDough+Pizzeria+%26+Pasta+Ashwood!8m2!3d-37.8672517!4d145.1084929!10e5!16s%2Fg%2F1vj5_bmv!3m5!1s0x6ad6403bc2ccc70f:0x7a71c0dee5f8d668!8m2!3d-37.8672517!4d145.1084929!16s%2Fg%2F1vj5_bmv!18m1!1e1?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D",
  }
};
const DealPage = () => {
  const {
    restaurantId,
    dealId
  } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const deal = dealData[dealId || "30-off-menu"] || dealData["30-off-menu"];

  const handleShare = async () => {
    const shareData = {
      title: `${deal.title} at ${deal.restaurantName} - PocketFriend`,
      text: `Check out this amazing deal! ${deal.discount}% OFF at ${deal.restaurantName}`,
      url: `https://pocketfriend.app/deal/${dealId}`,
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

  return <div className="min-h-screen bg-background">
    {/* Hero Image */}
    <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="relative h-64">
      <motion.img initial={{
        scale: 1.1
      }} animate={{
        scale: 1
      }} transition={{
        duration: 0.8
      }} src={deal.images[0]} alt={deal.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <motion.button whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.95
        }} onClick={() => navigate(-1)} className="p-3 rounded-full glass">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </motion.button>
        <motion.button whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.95
        }} onClick={handleShare} className="p-3 rounded-full glass">
          <Share2 className="w-5 h-5 text-foreground" />
        </motion.button>
      </div>

      {/* Animated Discount Badge */}
      <motion.div initial={{
        scale: 0,
        rotate: -20
      }} animate={{
        scale: 1,
        rotate: 0
      }} transition={{
        delay: 0.3,
        type: "spring"
      }} className="absolute bottom-4 right-4">
        <motion.div className="badge-discount text-xl px-5 py-2.5 font-bold" animate={{
          boxShadow: ["0 0 20px hsl(32 100% 50% / 0.4)", "0 0 40px hsl(32 100% 50% / 0.7)", "0 0 20px hsl(32 100% 50% / 0.4)"]
        }} transition={{
          repeat: Infinity,
          duration: 2
        }}>
          {deal.discount}% OFF
        </motion.div>
      </motion.div>

      {/* Floating Icons */}
      <motion.img src={pizzaIcon} alt="pizza" className="absolute bottom-16 left-6 w-10 h-10 object-contain drop-shadow-lg z-10" animate={{
        y: [0, -8, 0],
        rotate: [0, -10, 0]
      }} transition={{
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }} />
    </motion.div>

    {/* Content */}
    <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2
    }} className="px-4 -mt-6 relative z-10 pb-40">
      {/* Deal Info Card */}
      <div className="card-premium p-6 mb-4">
        <Link to={`/restaurant/${restaurantId}`} className="text-primary text-sm font-medium mb-2 block hover:underline">
          {deal.restaurantName}
        </Link>

        <h1 className="text-2xl font-bold text-foreground mb-2">{deal.title}</h1>

        <p className="text-foreground/80 text-sm leading-relaxed mb-4">
          {deal.fullDescription}
        </p>


      </div>

      {/* How to Redeem */}
      <div className="card-premium p-5 mb-4">
        <h2 className="text-foreground font-bold mb-4 flex items-center gap-2">
          <div className="p-2 rounded-full bg-primary/20">
            <Star className="w-5 h-5 text-primary" />
          </div>
          How to Redeem Your Discount
        </h2>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">1</span>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm">Visit the Restaurant</p>
              <p className="text-foreground/60 text-xs">Head to any participating PocketFriend restaurant listed in the app.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">2</span>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm">Tap "Redeem Discount"</p>
              <p className="text-foreground/60 text-xs">Open the deal and tap Redeem Discount.</p>
              <p className="text-foreground/60 text-xs mt-1">Your camera will open with a prompt to scan the restaurant's QR code.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">3</span>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm">Scan the Restaurant QR Code</p>
              <p className="text-foreground/60 text-xs">Scan the QR code displayed at the restaurant.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">4</span>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm">Discount Activated</p>
              <p className="text-foreground/60 text-xs">Once scanned, a confirmation screen will appear with a code.</p>
              <p className="text-foreground/60 text-xs mt-1">Show this screen to the restaurant staff when placing your order.</p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">5</span>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm">Enjoy Your Savings</p>
              <p className="text-foreground/60 text-xs">The restaurant applies the discount manually at checkout.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="card-premium p-5 mb-4">
        <h2 className="text-foreground font-bold mb-3">Terms & Conditions</h2>
        <ul className="space-y-2">
          {deal.terms.map((term, idx) => <li key={idx} className="text-foreground/70 text-sm flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            {term}
          </li>)}
        </ul>
      </div>

      {/* Location */}
      <div className="card-premium p-4 mb-4">
        <motion.a
          href={deal.mapsUrl}
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
            <p className="text-foreground font-medium text-sm">Location</p>
            <p className="text-foreground/50 text-xs">{deal.address}</p>
          </div>
          <ExternalLink className="w-4 h-4 text-primary" />
        </motion.a>
      </div>

      {/* CTA Buttons */}
      <div className="fixed bottom-20 left-4 right-4 flex gap-3 z-30">
        <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} onClick={() => setIsSaved(!isSaved)} className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${isSaved ? "bg-primary/20 text-primary border-2 border-primary" : "btn-outline-white"}`}>
          {isSaved ? "✓ Saved" : "Save Deal"}
        </motion.button>
        <motion.button whileHover={{
          scale: 1.02,
          y: -2
        }} whileTap={{
          scale: 0.98
        }} onClick={() => setShowRedeemModal(true)} className="flex-1 btn-premium py-4" style={{
          animation: "pulse-glow 2s ease-in-out infinite"
        }}>
          Redeem Discount
        </motion.button>
      </div>
    </motion.div>

    <BottomNav />
    <RedeemDealModal isOpen={showRedeemModal} onClose={() => setShowRedeemModal(false)} />
  </div>;
};
export default DealPage;