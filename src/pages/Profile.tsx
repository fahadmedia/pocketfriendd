import { motion } from "framer-motion";
import {
  User,
  Heart,
  Clock,
  Settings,
  ChevronRight,
  Edit3,
  LogOut,
  MessageSquare,
  HelpCircle,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import DownloadApp from "@/components/layout/DownloadApp";
import Footer from "@/components/layout/Footer";
import FeedbackModal from "@/components/modals/FeedbackModal";
import UpgradeConfirmationModal from "@/components/modals/UpgradeConfirmationModal";
import IssueConfirmationModal from "@/components/modals/IssueConfirmationModal";
import { DEFAULT_PROFILE_IMAGE } from "@/components/modals/PhotoSelectionModal";

const menuItems = [
  { icon: Heart, label: "My Saved Deals", count: 12, path: "/favorites" },
  { icon: Clock, label: "Discounts History", count: null, path: "/discounts-history" },
  { icon: Settings, label: "Settings", count: null, path: "/settings" },
  { icon: MessageSquare, label: "Feedback", count: null, path: null, action: "feedback" },
  { icon: HelpCircle, label: "Help", count: null, path: "/contact-us" },
  { icon: FileText, label: "Terms & Policies", count: null, path: "/terms-policies" },
];

const Profile = () => {
  const navigate = useNavigate();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isUpgradeConfirmOpen, setIsUpgradeConfirmOpen] = useState(false);
  const [isIssueConfirmOpen, setIsIssueConfirmOpen] = useState(false);
  const [profileImage] = useState<string>(DEFAULT_PROFILE_IMAGE);

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.action === "feedback") {
      setIsFeedbackOpen(true);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleFeedbackSubmit = (type: "upgrade" | "issue") => {
    setIsFeedbackOpen(false);
    if (type === "upgrade") {
      setIsUpgradeConfirmOpen(true);
    } else {
      setIsIssueConfirmOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-28 px-4">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-premium p-6 mb-6"
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/edit-profile")}
                className="w-20 h-20 rounded-full border-2 border-foreground/20 bg-secondary flex items-center justify-center overflow-hidden cursor-pointer"
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/edit-profile")}
                className="absolute -bottom-1 -right-1 p-2 rounded-full bg-primary glow-orange"
              >
                <Edit3 className="w-3 h-3 text-primary-foreground" />
              </motion.button>
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold text-foreground mb-1"
              >
                John Smith
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-foreground/60 text-sm"
              >
                john.smith@email.com
              </motion.p>
            </div>
          </div>

          {/* Deals Used Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center mt-6 pt-6 border-t border-border/30"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="flex items-center gap-3 bg-primary/15 px-5 py-3 rounded-full"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary glow-orange">
                <span className="text-lg font-bold text-primary-foreground">24</span>
              </div>
              <span className="text-sm font-medium text-foreground">Deals Redeemed</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium overflow-hidden mb-6"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.05 }}
                whileHover={{ x: 5, backgroundColor: "rgba(255,138,0,0.1)" }}
                onClick={() => handleMenuClick(item)}
                className="w-full flex items-center justify-between p-4 border-b border-border/20 last:border-b-0 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/20">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.count && (
                    <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-foreground/40" />
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/auth")}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </motion.button>
      </main>

      <BottomNav />

      {/* Feedback Modals */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
      <UpgradeConfirmationModal
        isOpen={isUpgradeConfirmOpen}
        onClose={() => setIsUpgradeConfirmOpen(false)}
      />
      <IssueConfirmationModal
        isOpen={isIssueConfirmOpen}
        onClose={() => setIsIssueConfirmOpen(false)}
      />

      <DownloadApp />
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Profile;
