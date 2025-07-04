import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import ReportsPage from '@/components/ReportsPage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReportsPageRoute = () => {
    const navigate = useNavigate();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleNavigate = (page: string) => {
        navigate(`/${page}`);
    };

    const handleViewDetails = (id: string) => {
        navigate(`/report-details/${id}`);
    };

    const handleCreateReport = () => {
        navigate('/create-report');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
            <Navbar
                onNavigate={handleNavigate}
                currentPage="reports"
                onNotificationClick={() => setIsNotificationOpen(true)}
                onProfileClick={() => navigate('/')}
            />

            <main className="pt-16">
                <ReportsPage
                    onViewDetails={handleViewDetails}
                    onCreateReport={handleCreateReport}
                />
            </main>

            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </div>
    );
};

export default ReportsPageRoute;
