import EducationalContentPage from '@/components/EducationalContentPage';
import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EducationalContentPageRoute = () => {
    const navigate = useNavigate();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleNavigate = (page: string) => {
        navigate(`/${page}`);
    };

    const handleViewContent = (id: string) => {
        navigate(`/content-details/${id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
            <Navbar
                onNavigate={handleNavigate}
                currentPage="education"
                onNotificationClick={() => setIsNotificationOpen(true)}
                onProfileClick={() => navigate('/')}
            />

            <main className="pt-16">
                <EducationalContentPage onViewContent={handleViewContent} />
            </main>

            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </div>
    );
};

export default EducationalContentPageRoute;
