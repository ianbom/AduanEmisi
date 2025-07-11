import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import ReportDetailsPage from '@/components/report/ReportDetailsPage';
import { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { usePage } from '@inertiajs/react';

const ReportDetailsPageRoute = () => {
    // const navigate = useNavigate();
    // const { id } = useParams<{ id: string }>();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const { props } = usePage();
    const report = (props as any).report;

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
                <ReportDetailsPage report={report} onBack={() => {}} />
            </main>

            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </div>
    );
};

export default ReportDetailsPageRoute;
