import { motion } from "framer-motion";
import { Tag, Sparkles, Bell, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import DownloadApp from "@/components/layout/DownloadApp";
import Footer from "@/components/layout/Footer";

interface Notification {
  id: string;
  type: "deal" | "update" | "discount";
  title: string;
  description: string;
  time: string;
  isNew: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "deal",
    title: "New Deal Available",
    description: "Get 25% off at Burger Palace! Limited time offer on all combo meals. Don't miss out on this delicious savings opportunity.",
    time: "2 hours ago",
    isNew: true,
  },
  {
    id: "2",
    type: "update",
    title: "App Update Available",
    description: "We've added new features to make your experience even better! Check out the improved deal discovery and faster redemption process.",
    time: "1 day ago",
    isNew: false,
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "deal":
      return Tag;
    case "update":
      return Sparkles;
    case "discount":
      return Tag;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "deal":
      return "bg-primary/20 text-primary";
    case "update":
      return "bg-accent/20 text-accent-foreground";
    case "discount":
      return "bg-green-500/20 text-green-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Notifications = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Content */}
      <div className="container pt-24 pb-28 px-4">
        {/* Notifications Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-muted-foreground text-sm">
            You have <span className="text-primary font-semibold">{notifications.filter(n => n.isNew).length}</span> new notification{notifications.filter(n => n.isNew).length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification, index) => {
            const IconComponent = getNotificationIcon(notification.type);
            const colorClass = getNotificationColor(notification.type);

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`relative p-4 rounded-2xl border transition-all duration-300 ${notification.isNew
                  ? "bg-primary/5 border-primary/30 shadow-lg shadow-primary/10"
                  : "bg-card border-border hover:border-primary/30"
                  }`}
              >
                {/* New Badge */}
                {notification.isNew && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                    className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary rounded-full"
                  >
                    <span className="text-xs font-bold text-primary-foreground">NEW</span>
                  </motion.div>
                )}

                <div className="flex gap-4">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>

                {/* Decorative gradient line */}
                {notification.isNew && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Empty State Decoration */}
        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <Bell className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No notifications yet</p>
          </motion.div>
        )}
      </div>

      <DownloadApp />
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Notifications;
