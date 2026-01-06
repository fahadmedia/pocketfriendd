# PocketFriend Supabase Integration Guide

## Environment Setup

Create `.env` file in project root:

```env
VITE_SUPABASE_URL=https://xugskhncmrrczstnlapl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1Z3NraG5jbXJyY3pzdG5sYXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNDYyNTYsImV4cCI6MjA4MjkyMjI1Nn0.KLUPcFNSeeCxKWWt5QdOYlI7APlLEH8D4fxDmOsP5fc
```

## Installation

```bash
npm install @supabase/supabase-js
```

## 1. Supabase Client Setup

**File: `src/lib/supabase.ts`**

```typescript
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
```

## 2. Authentication Context

**File: `src/contexts/AuthContext.tsx`**

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, User } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) return { error: authError };

      // 2. Create user profile in users table
      if (authData.user) {
        const { error: profileError } = await supabase.from('users').insert({
          id: authData.user.id,
          full_name: fullName,
          email: email,
        });

        if (profileError) return { error: profileError };
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## 3. Deals & Restaurants Queries

**File: `src/hooks/useDeals.ts`**

```typescript
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

      // Filter by city (via restaurant)
      if (options.city) {
        query = query.eq('restaurants.location_city', options.city);
      }

      // Filter by cuisine type (via restaurant)
      if (options.cuisineType) {
        query = query.contains('restaurants.cuisine_types', [options.cuisineType]);
      }

      // Sorting
      if (options.sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else if (options.sortBy === 'popularity') {
        // Join with deal_usage_stats for popularity sorting
        query = query.order('deal_usage_stats.total_redemptions', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      setDeals(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { deals, loading, error, refetch: fetchDeals };
};
```

**File: `src/hooks/useDealDetail.ts`**

```typescript
import { useState, useEffect } from 'react';
import { supabase, Deal } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export const useDealDetail = (dealSlug: string) => {
  const { user } = useAuth();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [canRedeem, setCanRedeem] = useState(true);
  const [cooldownUntil, setCooldownUntil] = useState<string | null>(null);

  useEffect(() => {
    fetchDealDetail();
    if (user) {
      checkCooldown();
    }
  }, [dealSlug, user]);

  const fetchDealDetail = async () => {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select(`
          *,
          restaurant:restaurants(*)
        `)
        .eq('slug', dealSlug)
        .single();

      if (error) throw error;
      setDeal(data);
    } catch (err) {
      console.error('Error fetching deal:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkCooldown = async () => {
    if (!user || !deal) return;

    try {
      const { data, error } = await supabase
        .from('redemption_cooldowns')
        .select('cooldown_until')
        .eq('user_id', user.id)
        .eq('deal_id', deal.id)
        .eq('is_active', true)
        .gte('cooldown_until', new Date().toISOString())
        .single();

      if (data) {
        setCanRedeem(false);
        setCooldownUntil(data.cooldown_until);
      } else {
        setCanRedeem(true);
        setCooldownUntil(null);
      }
    } catch (err) {
      // No active cooldown found
      setCanRedeem(true);
    }
  };

  return { deal, loading, canRedeem, cooldownUntil, refetch: fetchDealDetail };
};
```

## 4. Favorites Management

**File: `src/hooks/useFavorites.ts`**

```typescript
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
```

## 5. QR Redemption Flow

**File: `src/hooks/useRedemption.ts`**

```typescript
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useRedemption = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeSession, setActiveSession] = useState<any>(null);

  const startRedemption = async (dealId: string, restaurantId: string) => {
    if (!user) {
      toast.error('Please log in to redeem deals');
      return null;
    }

    try {
      setLoading(true);

      // Generate unique session code
      const sessionCode = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Get deal details for time limit
      const { data: deal } = await supabase
        .from('deals')
        .select('redemption_time_limit_minutes')
        .eq('id', dealId)
        .single();

      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + (deal?.redemption_time_limit_minutes || 20));

      // Create active session
      const { data, error } = await supabase
        .from('active_redemption_sessions')
        .insert({
          user_id: user.id,
          deal_id: dealId,
          restaurant_id: restaurantId,
          session_code: sessionCode,
          expires_at: expiresAt.toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      setActiveSession(data);
      toast.success('Redemption session started!');
      return data;
    } catch (err) {
      console.error('Error starting redemption:', err);
      toast.error('Failed to start redemption');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const completeRedemption = async (sessionCode: string) => {
    try {
      setLoading(true);

      // Call the RPC function to complete redemption
      const { data, error } = await supabase.rpc('complete_redemption_scan', {
        scan_code: sessionCode,
      });

      if (error) throw error;

      if (data.success) {
        toast.success(`Deal redeemed! Code: ${data.confirmation_code}`);
        setActiveSession(null);
        return data;
      } else {
        toast.error(data.error || 'Redemption failed');
        return null;
      }
    } catch (err) {
      console.error('Error completing redemption:', err);
      toast.error('Failed to complete redemption');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { startRedemption, completeRedemption, activeSession, loading };
};
```

## 6. Notifications

**File: `src/hooks/useNotifications.ts`**

```typescript
import { useState, useEffect } from 'react';
import { supabase, Notification } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchNotifications();

      // Subscribe to real-time notifications
      const subscription = supabase
        .channel('notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            setNotifications((prev) => [payload.new as Notification, ...prev]);
            setUnreadCount((prev) => prev + 1);
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setNotifications(data || []);
      setUnreadCount(data?.filter((n) => !n.is_read).length || 0);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return { notifications, unreadCount, loading, markAsRead, refetch: fetchNotifications };
};
```

## 7. Contact & Feedback Forms

**File: `src/hooks/useContactForm.ts`**

```typescript
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);

  const submitContact = async (fullName: string, email: string, issueDescription: string) => {
    try {
      setLoading(true);

      const { error } = await supabase.from('contact_submissions').insert({
        full_name: fullName,
        email: email,
        issue_description: issueDescription,
      });

      if (error) throw error;

      toast.success('Your message has been sent!');
      return true;
    } catch (err) {
      console.error('Error submitting contact form:', err);
      toast.error('Failed to send message');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitContact, loading };
};

export const useFeedbackForm = () => {
  const [loading, setLoading] = useState(false);

  const submitFeedback = async (
    userId: string | null,
    fullName: string,
    feedbackType: 'upgrade' | 'issue',
    description: string
  ) => {
    try {
      setLoading(true);

      const { error } = await supabase.from('feedback_submissions').insert({
        user_id: userId,
        full_name: fullName,
        feedback_type: feedbackType,
        description: description,
      });

      if (error) throw error;

      toast.success('Thank you for your feedback!');
      return true;
    } catch (err) {
      console.error('Error submitting feedback:', err);
      toast.error('Failed to submit feedback');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitFeedback, loading };
};
```

## 8. App.tsx Integration

Update your `App.tsx` to wrap with AuthProvider:

```typescript
import { AuthProvider } from '@/contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Your existing app routes */}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

## Next Steps

1. **Run the RLS SQL**: Execute `supabase_rls.sql` in your Supabase SQL Editor
2. **Install dependencies**: `npm install @supabase/supabase-js`
3. **Create `.env` file** with your Supabase credentials
4. **Update components** to use the new hooks instead of mock data
5. **Test authentication flow** with signup/login
6. **Test deal redemption** flow end-to-end

## Security Notes

- All RLS policies are enforced at the database level
- Users can only access their own data (favorites, redemptions, notifications)
- Public data (restaurants, deals) is read-only for all users
- The `complete_redemption_scan` RPC function handles complex redemption logic securely
