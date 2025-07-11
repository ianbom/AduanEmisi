import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import ReportsPage from '@/components/report/ReportsPage';
import { Report } from '@/types/report';
import { router as Inertia, usePage } from '@inertiajs/react';
import { useState } from 'react';
interface Report {
    id: number;
    title: string;
    description: string;
    // tambahkan properti lainnya sesuai data dari backend
}

interface ReportsPageProps {
    reports: {
        data: Report[];
        // tambahkan pagination jika ada
    };
    myReports: boolean;
}

const ReportsPageRoute = (myReports: boolean) => {
    const { props } = usePage();
    const reports = (props as any).reports?.data || [];

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleNavigate = (page: string) => {
        Inertia.visit(`/${page}`);
    };

    const handleViewDetails = (id: number) => {
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
                    myReports={myReports}
                    reports={reports}
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
