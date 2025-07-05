import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import ReportDetailsPage from '@/components/report/ReportDetailsPage';
import { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ReportDetailsPageRoute = () => {
    // const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // const handleNavigate = (page: string) => {
    //     navigate(`/${page}`);
    // };
    // const handleBack = () => {
    //     navigate('/reports');
    // };
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
            <Navbar
                onNavigate={() => {}}
                currentPage="reports"
                onNotificationClick={() => setIsNotificationOpen(true)}
                onProfileClick={() => {}}
            />

            <main className="pt-16">
                <ReportDetailsPage reportId={id || '1'} onBack={() => {}} />
            </main>

            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </div>
    );
};

export default ReportDetailsPageRoute;
