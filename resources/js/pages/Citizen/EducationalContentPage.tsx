import EducationalContentPage from '@/components/EducationalContentPage';
import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import { useState } from 'react';
import { router as Inertia } from '@inertiajs/react'; // Import router sebagai Inertia

const EducationalContentPageRoute = () => {
    // useNavigate dari react-router-dom tidak lagi diperlukan
    // const navigate = useNavigate();

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Fungsi navigasi akan menggunakan Inertia.visit
    const handleNavigate = (page: string) => {
        // Sesuaikan dengan rute Laravel Anda, bisa pakai route() helper
        Inertia.visit(`/${page}`);
    };

    const handleViewContent = (id: string) => {
        // Asumsikan ada rute 'content.show' di Laravel yang menerima ID konten
        Inertia.visit(route('content.show', { content: id }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
            <Navbar
                onNavigate={handleNavigate} // Teruskan fungsi navigasi Inertia
                currentPage="education"
                onNotificationClick={() => setIsNotificationOpen(true)}
                onProfileClick={() => Inertia.visit(route('dashboard'))} // Navigasi Inertia ke dashboard atau root
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
