import Navbar from '@/components/core/Navbar';
import NotificationSidebar from '@/components/core/NotificationSidebar';
import { PageProps } from '@/types';
import { getProfileMenuContent } from '@/utils/profileMenuContent';
import { showToast } from '@/utils/toast';
import { router as Inertia, usePage } from '@inertiajs/react';
import { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import FloatingChat from '../chatbot/FloatingChat';
import Footer from '../core/Footer';
interface Props {
    children: ReactNode;
    currentPage: string;
}

export default function CitizenLayout({ children, currentPage }: Props) {
    const { flash = {} } = usePage().props;
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;
    const navItems = [
        { id: 'homepage', label: 'Beranda', key: 'homepage' },
        { id: 'report', label: 'Laporan', key: 'report' },
        { id: 'mission', label: 'Misi', key: 'mission' },
        { id: 'map', label: 'Peta', key: 'map' },
        { id: 'education', label: 'Konten Edukasi', key: 'education' },
        { id: 'merchandise', label: 'Merchandise', key: 'merchandise' },
    ];
    useEffect(() => {
        console.log('Flash data di CitizenLayout:', flash);
        showToast.handleFlash(flash);
    }, [flash]);
    const handleNavigate = (page: string) => {
        Inertia.visit(`/${page}`);
    };
    const handleProfileClick = () => {
        if (user?.role === 'citizen') {
            Inertia.visit(route('profile.show'));
        } else {
            Inertia.visit(route('community.profile.show'));
        }
    };
    const handleLogoutClick = () => {
        Inertia.post(route('logout'));
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
            <Navbar
                user={user}
                navItems={navItems}
                onNavigate={handleNavigate}
                currentPage={currentPage}
                onNotificationClick={() => setIsNotificationOpen(true)}
                profileMenuContent={getProfileMenuContent({
                    user,
                    onProfileClick: handleProfileClick,
                    onLogoutClick: handleLogoutClick,
                })}
            />
            <main className="pt-16">{children}</main>
            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
            <FloatingChat />
            <Toaster position="top-right" richColors closeButton />

            <Footer />
        </div>
    );
}
