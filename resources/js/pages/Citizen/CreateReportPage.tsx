import CreateReportPage from '@/components/CreateReportPage';
import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import { useState } from 'react';
import { router as Inertia } from '@inertiajs/react'; // Import router dari Inertia.js

const CreateReportPageRoute = () => {
    // useNavigate dari react-router-dom tidak lagi diperlukan
    // const navigate = useNavigate();

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Fungsi navigasi akan menggunakan Inertia.visit
    const handleNavigate = (page: string) => {
        // Sesuaikan dengan rute Laravel Anda, bisa pakai route() helper
        Inertia.visit(`/${page}`);
    };

    const handleBack = () => {
        // Menggunakan Inertia.visit untuk kembali ke halaman daftar laporan
        // Pastikan Anda memiliki rute '/reports' atau named route 'reports.index'
        Inertia.visit(route('reports.index')); // Contoh dengan route helper
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
            <Navbar
                onNavigate={handleNavigate} // Teruskan fungsi navigasi Inertia
                currentPage="reports" // Tetap 'reports' karena ini adalah bagian dari alur laporan
                onNotificationClick={() => setIsNotificationOpen(true)}
                onProfileClick={() => Inertia.visit(route('dashboard'))} // Navigasi Inertia ke dashboard atau root
            />

            <main className="pt-16">
                <CreateReportPage onBack={handleBack} />
            </main>

            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </div>
    );
};

export default CreateReportPageRoute;
