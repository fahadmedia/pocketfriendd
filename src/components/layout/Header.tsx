import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, MapPin, ChevronDown, Heart, Search, Home, Tag, QrCode, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

const locations = [
  { id: "current", label: "Current Location" },
  { id: "melbourne", label: "Melbourne" },
];

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Tag, label: "Deals", path: "/deals" },
  { icon: User, label: "Profile", path: "/profile" },
];

const Header = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const location = useLocation();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container relative flex items-center justify-between gap-4 py-3 px-4 md:px-6">
        {/* Mobile Layout: Logo - Location (centered) - Icons */}
        {/* Desktop Layout: Logo + Location - Nav (centered) - Icons */}

        {/* Left: Logo (+ Location on Desktop) */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link to="/">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={logo} alt="PocketFriend" className="h-10 md:h-12 w-auto" />
            </motion.div>
          </Link>

          {/* Location Selector - Desktop only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="hidden md:block"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 bg-background/50 border border-foreground/20 rounded-full text-sm hover:border-primary transition-colors">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-foreground">
                    {selectedLocation.label}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-48 bg-background border border-border z-50"
              >
                {locations.map((loc) => (
                  <DropdownMenuItem
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{loc.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>

        {/* Center: Mobile Location (absolutely centered) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: "-50%" }}
          animate={{ opacity: 1, scale: 1, x: "-50%" }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="md:hidden absolute left-1/2"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-background/50 border border-foreground/20 rounded-full text-xs hover:border-primary transition-colors">
                <MapPin className="w-3 h-3 text-primary" />
                <span className="text-foreground truncate max-w-[100px]">
                  {selectedLocation.label}
                </span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="w-48 bg-background border border-border z-50"
            >
              {locations.map((loc) => (
                <DropdownMenuItem
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className="flex items-center gap-2 cursor-pointer text-sm"
                >
                  <MapPin className="w-3 h-3 text-primary" />
                  <span>{loc.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* Center: Main Navigation - Desktop only - Absolutely centered */}
        <nav className="hidden md:flex items-center gap-16 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  to={item.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Right: Action Icons */}
        <div className="flex items-center gap-2">
          {/* Favorites - Now visible on all screens */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/favorites"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center justify-center p-2 rounded-full border border-foreground/20 hover:border-primary transition-colors"
            >
              <Heart className="w-4 md:w-5 h-4 md:h-5 text-foreground" />
            </Link>
          </motion.div>

          {/* Search */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/search"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center justify-center p-2 rounded-full border border-foreground/20 hover:border-primary transition-colors"
            >
              <Search className="w-4 md:w-5 h-4 md:h-5 text-foreground" />
            </Link>
          </motion.div>

          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/notifications"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative flex items-center justify-center p-2 rounded-full border border-foreground/20 hover:border-primary transition-colors"
            >
              <Bell className="w-4 md:w-5 h-4 md:h-5 text-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-bold text-primary-foreground">
                2
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
