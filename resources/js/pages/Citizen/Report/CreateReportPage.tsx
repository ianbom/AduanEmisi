import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import CreateReportPage from '@/components/report/CreateReportPage';
import { router as Inertia, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Province {
    id: number;
    name: string;
    cities: {
        id: number;
        name: string;
        districts: {
            id: number;
            name: string;
        }[];
    }[];
}

const CreateReportPageRoute = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const { provinces } = usePage().props as { provinces: Province[] };

    const handleNavigate = (page: string) => {
        Inertia.visit(`/${page}`);
    };

    const handleBack = () => {
        Inertia.visit(route('reports.index'));
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
                <CreateReportPage onBack={handleBack} provinces={provinces} />
            </main>

            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </div>
    );
};

export default CreateReportPageRoute;
