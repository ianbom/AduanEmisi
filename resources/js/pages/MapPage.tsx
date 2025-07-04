import MapPage from '@/components/MapPage';
import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MapPageRoute = () => {
    const navigate = useNavigate();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleNavigate = (page: string) => {
        navigate(`/${page}`);
    };

    const handleViewReport = (id: string) => {
        navigate(`/report-details/${id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
            <Navbar
                onNavigate={handleNavigate}
                currentPage="map"
                onNotificationClick={() => setIsNotificationOpen(true)}
                onProfileClick={() => navigate('/')}
            />

            <main className="pt-16">
                <MapPage onViewReport={handleViewReport} />
            </main>

            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </div>
    );
};

export default MapPageRoute;
