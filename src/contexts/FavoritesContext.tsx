import { createContext, useContext, ReactNode } from "react";
import { useFavorites as useSupabaseFavorites } from "@/hooks/useFavorites";
import { Deal } from "@/lib/supabase";

interface FavoritesContextType {
    favorites: Deal[];
    addFavorite: (deal: Deal) => void;
    removeFavorite: (dealId: string) => void;
    isFavorite: (dealId: string) => boolean;
    toggleFavorite: (deal: Deal) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const { favorites, toggleFavorite: supabaseToggle, isFavorite } = useSupabaseFavorites();

    const addFavorite = (deal: Deal) => {
        supabaseToggle(deal.id);
    };

    const removeFavorite = (dealId: string) => {
        supabaseToggle(dealId);
    };

    const toggleFavorite = (deal: Deal) => {
        supabaseToggle(deal.id);
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addFavorite,
                removeFavorite,
                isFavorite,
                toggleFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};
