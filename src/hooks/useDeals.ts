import { useState, useEffect } from 'react';
import { supabase, Deal } from '@/lib/supabase';

interface UseDealsOptions {
    category?: string;
    cuisineType?: string;
    city?: string;
    sortBy?: 'newest' | 'popularity';
}

export const useDeals = (options: UseDealsOptions = {}) => {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchDeals();
    }, [options.category, options.cuisineType, options.city, options.sortBy]);

    const fetchDeals = async () => {
        try {
            setLoading(true);

            let query = supabase
                .from('deals')
                .select(`
          *,
          restaurant:restaurants(*)
        `)
                .eq('is_active', true)
                .lte('valid_from', new Date().toISOString())
                .gte('valid_until', new Date().toISOString());

            // Filter by category
            if (options.category) {
                query = query.eq('category', options.category);
            }

            // Sorting
            if (options.sortBy === 'newest') {
                query = query.order('created_at', { ascending: false });
            }

            const { data, error } = await query;

            if (error) throw error;
            setDeals(data || []);
        } catch (err) {
            setError(err as Error);
            console.error('Error fetching deals:', err);
        } finally {
            setLoading(false);
        }
    };

    return { deals, loading, error, refetch: fetchDeals };
};
