import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, CheckCircle, Heart, Info, X } from 'lucide-react';
import React from 'react';

interface Notification {
    id: string;
    type: 'report' | 'mission' | 'badge' | 'donation';
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
}

interface NotificationSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({
    isOpen,
    onClose,
}) => {
    const notifications: Notification[] = [
        {
            id: '1',
            type: 'mission',
            title: 'Misi Baru Tersedia',
            message: 'Pembersihan Pantai Sanur membutuhkan 5 volunteer lagi',
            timestamp: '2 jam yang lalu',
            isRead: false,
        },
        {
            id: '2',
            type: 'badge',
            title: 'Badge Baru Diperoleh!',
            message: 'Selamat! Anda mendapat badge "Pelapor Aktif"',
            timestamp: '1 hari yang lalu',
            isRead: false,
        },
        {
            id: '3',
            type: 'report',
            title: 'Laporan Diverifikasi',
            message: 'Laporan pencemaran sungai Anda telah diverifikasi admin',
            timestamp: '2 hari yang lalu',
            isRead: true,
        },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'report':
                return <AlertCircle className="h-5 w-5 text-blue-500" />;
            case 'mission':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'badge':
                return <Heart className="h-5 w-5 text-purple-500" />;
            default:
                return <Info className="h-5 w-5 text-gray-500" />;
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-40 bg-black bg-opacity-50"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 z-50 h-full w-80 transform bg-white shadow-xl transition-transform duration-300 ease-in-out">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Notifikasi Anda
                    </h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Notifications List */}
                <ScrollArea className="h-[calc(100vh-8rem)] flex-1">
                    <div className="space-y-3 p-4">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`rounded-lg border p-3 transition-colors ${
                                    notification.isRead
                                        ? 'border-gray-200 bg-gray-50'
                                        : 'border-blue-200 bg-blue-50'
                                }`}
                            >
                                <div className="flex items-start space-x-3">
                                    {getIcon(notification.type)}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {notification.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            {notification.message}
                                        </p>
                                        <p className="mt-2 text-xs text-gray-500">
                                            {notification.timestamp}
                                        </p>
                                        {!notification.isRead && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="mt-2 h-auto p-0 text-xs"
                                            >
                                                Tandai Sudah Dibaca
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4">
                    <Button variant="outline" className="w-full">
                        Lihat Semua Notifikasi
                    </Button>
                </div>
            </div>
        </>
    );
};

export default NotificationSidebar;
