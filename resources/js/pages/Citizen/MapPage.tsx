import MapPage from '@/components/MapPage';
import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import { useState } from 'react';
import { router as Inertia } from '@inertiajs/react'; // Import router sebagai Inertia

const MapPageRoute = () => {
    // useNavigate dari react-router-dom tidak lagi diperlukan
    // const navigate = useNavigate();

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Fungsi navigasi akan menggunakan Inertia.visit
    const handleNavigate = (page: string) => {
        // Gunakan route() helper jika halaman memiliki nama rute di Laravel
        // Contoh: if (page === 'dashboard') Inertia.visit(route('dashboard'));
        // else Inertia.visit(`/${page}`);
        Inertia.visit(`/${page}`); // Atau sesuaikan dengan rute Laravel Anda
    };

    const handleViewReport = (id: string) => {
        // Gunakan route() helper untuk rute 'report.show' yang telah kita definisikan sebelumnya
        Inertia.visit(route('report.show', { report: id }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
            <Navbar
                onNavigate={handleNavigate} // Teruskan fungsi navigasi Inertia
                currentPage="map"
                onNotificationClick={() => setIsNotificationOpen(true)}
                onProfileClick={() => Inertia.visit(route('dashboard'))} // Navigasi Inertia ke dashboard atau root
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
