import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
});

// Database Types
export interface User {
    id: string;
    full_name: string;
    email: string;
    profile_image_url?: string;
    created_at: string;
    updated_at: string;
}

export interface Restaurant {
    id: string;
    slug: string;
    name: string;
    subtitle?: string;
    description?: string;
    logo_url?: string;
    cuisine_types: string[];
    rating: number;
    review_count: number;
    location_city: string;
    location_state: string;
    location_postcode: string;
    address: string;
    phone?: string;
    website_label?: string;
    website_url?: string;
    maps_url?: string;
    hours?: string;
    is_active: boolean;
}

export interface Deal {
    id: string;
    restaurant_id: string;
    slug: string;
    title: string;
    short_description?: string;
    full_description: string;
    discount_percentage: number;
    image_url: string;
    category: string;
    valid_from: string;
    valid_until: string;
    terms_and_conditions: string[];
    redemption_time_limit_minutes: number;
    cooldown_hours: number;
    is_active: boolean;
    restaurant?: Restaurant;
}

export interface UserFavorite {
    id: string;
    user_id: string;
    deal_id: string;
    created_at: string;
}

export interface CompletedRedemption {
    id: string;
    user_id: string;
    deal_id: string;
    restaurant_id: string;
    discount_percentage: number;
    redeemed_at: string;
    confirmation_code: string;
    original_price?: number;
    saved_amount?: number;
    restaurant_confirmed: boolean;
}

export interface ActiveRedemptionSession {
    id: string;
    user_id: string;
    deal_id: string;
    restaurant_id: string;
    session_code: string;
    qr_scanned_at: string;
    expires_at: string;
    is_completed: boolean;
    is_expired: boolean;
}

export interface Notification {
    id: string;
    user_id: string;
    notification_type: string;
    title: string;
    description: string;
    is_read: boolean;
    created_at: string;
    expires_at?: string;
}
