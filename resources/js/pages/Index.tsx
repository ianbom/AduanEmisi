import CitizenDashboardPage from '@/components/CitizenDashboardPage';
import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleNavigate = (page: string) => {
        navigate(`/${page}`);
    };

    const getCurrentPage = () => {
        const path = location.pathname.slice(1);
        return path || 'dashboard';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
            <Navbar
                onNavigate={handleNavigate}
                currentPage={getCurrentPage()}
                onNotificationClick={() => setIsNotificationOpen(true)}
                onProfileClick={() => navigate('/')}
            />

            <main className="pt-16">
                <CitizenDashboardPage onNavigate={handleNavigate} />
            </main>

            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </div>
    );
};

export default Index;
