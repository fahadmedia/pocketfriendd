import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useFavorites, Deal } from "@/contexts/FavoritesContext";

interface FavoriteButtonProps {
    deal: Deal;
    className?: string;
    size?: "sm" | "md" | "lg";
}

const FavoriteButton = ({ deal, className = "", size = "md" }: FavoriteButtonProps) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isActive = isFavorite(deal.id);

    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(deal);
    };

    return (
        <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            className={`p-3 rounded-full glass transition-all duration-300 ${className}`}
            aria-label={isActive ? "Remove from favorites" : "Add to favorites"}
        >
            <motion.div
                animate={
                    isActive
                        ? {
                            scale: [1, 1.3, 1],
                            rotate: [0, -10, 10, 0],
                        }
                        : { scale: 1, rotate: 0 }
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <Heart
                    className={`${sizeClasses[size]} transition-all duration-300 ${isActive
                            ? "fill-primary text-primary drop-shadow-[0_0_8px_rgba(255,107,107,0.6)]"
                            : "text-foreground hover:text-primary"
                        }`}
                />
            </motion.div>
        </motion.button>
    );
};

export default FavoriteButton;
