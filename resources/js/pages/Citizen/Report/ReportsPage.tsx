import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import ReportsPage from '@/components/report/ReportsPage';
import { router as Inertia } from '@inertiajs/react';
import { useState } from 'react';

const ReportsPageRoute = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleNavigate = (page: string) => {
        Inertia.visit(`/${page}`);
    };

    const handleViewDetails = (id: string) => {
        Inertia.visit(route('report.show', { report: id }));
    };

    const handleCreateReport = () => {
        Inertia.visit(route('create.report'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
            <Navbar
                onNavigate={handleNavigate}
                currentPage="reports"
                onNotificationClick={() => setIsNotificationOpen(true)}
                onProfileClick={() => Inertia.visit(route('dashboard'))}
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
