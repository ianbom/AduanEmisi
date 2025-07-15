import Navbar from '@/components/core/Navbar';
import NotificationSidebar from '@/components/core/NotificationSidebar';
import { PageProps } from '@/types';
import { router as Inertia, usePage } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

interface Props {
    children: ReactNode;
    currentPage: string;
}

export default function CommunityLayout({ children, currentPage }: Props) {
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const navItems = [
        {
            id: 'community/report',
            label: 'Daftar Laporan',
            key: 'community/report',
        },
        {
            id: 'community/my-report',
            label: 'Laporan Saya',
            key: 'community/my-report',
        },
        { id: 'community/map', label: 'Peta', key: 'community/map' },
        {
            id: 'community/education',
            label: 'Konten Edukasi',
            key: 'community/education',
        },
    ];
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
                onProfileClick={handleProfileClick}
                onLogoutClick={handleLogoutClick}
                navItems={navItems}
                onNavigate={handleNavigate}
                currentPage={currentPage}
                onNotificationClick={() => setIsNotificationOpen(true)}
            />
            <main className="pt-16">{children}</main>
            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </div>
    );
}
