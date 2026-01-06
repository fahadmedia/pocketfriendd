import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import DownloadApp from "@/components/layout/DownloadApp";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import FoodCategories from "@/components/home/FoodCategories";
import DealsList from "@/components/home/DealsList";
import AppDownloadModal from "@/components/modals/AppDownloadModal";
import SEO from "@/components/SEO";
import { hasShownAppDownloadModal, markAppDownloadModalAsShown } from "@/utils/sessionStorage";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="PocketFriend - Exclusive Restaurant Deals & Discounts in Melbourne"
        description="Discover exclusive restaurant deals and discounts in Melbourne with PocketFriend. Save up to 50% at top restaurants including pizza, burgers, kebabs, and fine dining. Download the app for instant savings."
        keywords="restaurant deals Melbourne, food discounts Australia, Melbourne restaurant offers, student discounts food, pizza deals Melbourne, burger discounts, kebab deals, dining discounts Victoria, restaurant vouchers, food savings app"
        ogTitle="PocketFriend - Save Up to 50% at Melbourne's Best Restaurants"
        ogDescription="Unlock exclusive deals on pizza, burgers, kebabs, and fine dining in Melbourne. Join thousands saving money on every meal with PocketFriend."
        canonicalUrl="https://pocketfriend.app"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "PocketFriend",
          "applicationCategory": "LifestyleApplication",
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "0",
            "priceCurrency": "AUD",
            "offerCount": "50+"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "ratingCount": "1200"
          }
        }}
      />

      <Header />
      <main className="pt-2">
        <HeroBanner />
        <FoodCategories />
        <DealsList />
      </main>
      <DownloadApp />
      <Footer />
      <BottomNav />

      <AppDownloadModal isOpen={showAppModal} onClose={handleCloseAppModal} />
    </div>
  );
};

export default Index;

