import { motion } from "framer-motion";
import { User, Trash2, ChevronRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import DeleteAccountModal from "@/components/modals/DeleteAccountModal";

const settingsItems = [
  { icon: User, label: "Edit Profile", path: "/edit-profile", destructive: false },
  { icon: Trash2, label: "Delete Profile", path: null, destructive: true, action: "delete" },
];

const Settings = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleItemClick = (item: typeof settingsItems[0]) => {
    if (item.action === "delete") {
      setIsDeleteModalOpen(true);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleAccountDeleted = () => {
    setIsDeleteModalOpen(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-28 px-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
            className="p-2 rounded-full bg-secondary/50 border border-border/30"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </motion.div>

        {/* Settings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-premium overflow-hidden"
        >
          {settingsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                whileHover={{ x: 5, backgroundColor: item.destructive ? "rgba(239,68,68,0.1)" : "rgba(255,138,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleItemClick(item)}
                className="w-full flex items-center justify-between p-4 border-b border-border/20 last:border-b-0 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${item.destructive ? "bg-destructive/20" : "bg-primary/20"}`}>
                    <Icon className={`w-5 h-5 ${item.destructive ? "text-destructive" : "text-primary"}`} />
                  </div>
                  <span className={`font-medium ${item.destructive ? "text-destructive" : "text-foreground"}`}>
                    {item.label}
                  </span>
                </div>
                <ChevronRight className={`w-5 h-5 ${item.destructive ? "text-destructive/40" : "text-foreground/40"}`} />
              </motion.button>
            );
          })}
        </motion.div>
      </main>

      <BottomNav />

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleted={handleAccountDeleted}
      />
    </div>
  );
};

export default Settings;
