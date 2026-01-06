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
        } else {
            setNotifications([]);
            setUnreadCount(0);
            setLoading(false);
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
