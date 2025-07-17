import { router, usePage } from '@inertiajs/react';
import { AlertCircle, CheckCircle, Heart, Info, X } from 'lucide-react';
import React from 'react';
import { PageProps } from '@/types';
import { Notification } from '@/types/notification/interface';

// --- Komponen UI Lokal ---
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-lg border bg-white shadow-sm ${className}`}>{children}</div>
);

const Button = ({ children, variant = 'ghost', size = 'sm', onClick, className = '' }: any) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantStyles = {
        ghost: "hover:bg-gray-100 text-gray-600 hover:text-gray-900",
        outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
    };
    const sizeStyles = {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant] || variantStyles.ghost} ${sizeStyles[size] || sizeStyles.sm} ${className}`}
        >
            {children}
        </button>
    );
};

const ScrollArea = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`overflow-y-auto ${className}`}>{children}</div>
);

// --- Interface untuk props sidebar ---
interface NotificationSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({
    isOpen,
    onClose,
}) => {
    // Ambil data notifikasi dari shared props Inertia
    const { notifications: sharedNotifications } = usePage<PageProps>().props;

    // Pastikan data ada dan akses dengan benar
    const notifications = sharedNotifications?.notifications || [];
    const unread_count = sharedNotifications?.unread_count || 0;

    const getIcon = (type: string | null) => {
        switch (type) {
            case 'report_update':
                return <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />;
            case 'mission_assigned':
                return <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />;
            case 'badge_earned':
                return <Heart className="h-5 w-5 text-purple-500 flex-shrink-0" />;
            case 'donation_received':
                return <Heart className="h-5 w-5 text-pink-500 flex-shrink-0" />;
            default:
                return <Info className="h-5 w-5 text-gray-500 flex-shrink-0" />;
        }
    };

    // Fungsi untuk menandai notifikasi sebagai terbaca
    const handleMarkAsRead = (e: React.MouseEvent, notificationId: string | number) => {
        e.preventDefault();
        e.stopPropagation();

        // Pastikan route helper tersedia, atau gunakan URL langsung
        const url = ` /read-notification/${notificationId}`;

        router.put(url, {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Optional: tambahkan feedback atau refresh data
                console.log('Notification marked as read');
            },
            onError: (errors) => {
                console.error('Error marking notification as read:', errors);
            }
        });
    };

    // Fungsi untuk navigasi ke halaman semua notifikasi
    const handleViewAll = () => {
        router.get('/notifications'); // Sesuaikan dengan route yang ada
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 z-50 h-full w-full max-w-sm transform bg-white shadow-xl transition-transform duration-300 ease-in-out">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Notifikasi
                        {unread_count > 0 && (
                            <span className="ml-2 inline-block rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                                {unread_count}
                            </span>
                        )}
                    </h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Notifications List */}
                <ScrollArea className="h-[calc(100vh-8rem)]">
                    {notifications && notifications.length > 0 ? (
                        <div className="space-y-2 p-3">
                            {notifications.map((notification: Notification) => (
                                <div
                                    key={notification.id}
                                    className={`rounded-lg border p-3 transition-colors cursor-pointer hover:shadow-md ${
                                        !notification.is_read
                                            ? 'border-blue-200 bg-blue-50'
                                            : 'border-gray-200 bg-white hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-start space-x-3">
                                        {getIcon(notification.type)}
                                        <div className="min-w-0 flex-1">
                                            <h3 className={`text-sm font-medium ${
                                                !notification.is_read ? 'text-gray-900' : 'text-gray-700'
                                            }`}>
                                                {notification.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {notification.body}
                                            </p>
                                            <p className="mt-2 text-xs text-gray-500">
                                                {new Date(notification.created_at).toLocaleString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                            {!notification.is_read && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="mt-2 h-auto p-0 text-xs font-semibold text-blue-600 hover:underline"
                                                    onClick={(e) => handleMarkAsRead(e, notification.id)}
                                                >
                                                    Tandai Sudah Dibaca
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <div className="text-center">
                                <Info className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-sm text-gray-500 italic">Tidak ada notifikasi.</p>
                            </div>
                        </div>
                    )}
                </ScrollArea>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleViewAll}
                    >
                        Lihat Semua Notifikasi
                    </Button>
                </div>
            </div>
        </>
    );
};

export default NotificationSidebar;
