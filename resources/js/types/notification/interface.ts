// @ts-nocheck
export interface Notification {
    id: number;
    user_id: number;
    title: string;
    body: string;
    is_read: boolean;
    type: string | null;
    created_at: string;
    updated_at: string;
}

export interface NotificationData {
    unread_count: number;
    notifications: Notification[];
}

// Extend PageProps untuk include notifications
declare module '@inertiajs/inertia' {
    interface PageProps {
        notifications: NotificationData;
        auth: {
            user: any; // Sesuaikan dengan tipe User Anda
        };
    }
}
