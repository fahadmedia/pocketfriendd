import { useState, useEffect } from 'react';
import { supabase, Deal } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useFavorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<Deal[]>([]);
    const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchFavorites();
        } else {
            setFavorites([]);
            setFavoriteIds(new Set());
            setLoading(false);
        }
    }, [user]);

    const fetchFavorites = async () => {
        if (!user) return;

        try {
            const { data, error } = await supabase
                .from('user_favorites')
                .select(`
          deal_id,
          deals:deal_id(
            *,
            restaurant:restaurants(*)
          )
        `)
                .eq('user_id', user.id);

            if (error) throw error;

            const dealsList = data?.map((fav: any) => fav.deals).filter(Boolean) || [];
            const ids = new Set(data?.map((fav: any) => fav.deal_id) || []);

            setFavorites(dealsList);
            setFavoriteIds(ids);
        } catch (err) {
            console.error('Error fetching favorites:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (dealId: string) => {
        if (!user) {
            toast.error('Please log in to save favorites');
            return;
        }

        const isFavorited = favoriteIds.has(dealId);

        try {
            if (isFavorited) {
                // Remove favorite
                const { error } = await supabase
                    .from('user_favorites')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('deal_id', dealId);

                if (error) throw error;

                setFavoriteIds((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(dealId);
                    return newSet;
                });

                toast.info('Deal removed from Favorites');
            } else {
                // Add favorite
                const { error } = await supabase
                    .from('user_favorites')
                    .insert({
                        user_id: user.id,
                        deal_id: dealId,
                    });

                if (error) throw error;

                setFavoriteIds((prev) => new Set(prev).add(dealId));
                toast.success('Deal saved to Favorites ❤️');
            }

            await fetchFavorites();
        } catch (err) {
            console.error('Error toggling favorite:', err);
            toast.error('Failed to update favorites');
        }
    };

    const isFavorite = (dealId: string) => favoriteIds.has(dealId);

    return { favorites, loading, toggleFavorite, isFavorite, refetch: fetchFavorites };
};
