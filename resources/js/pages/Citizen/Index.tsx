import CitizenDashboardPage from '@/components/CitizenDashboardPage';
import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import { useState } from 'react';
import { router as Inertia, usePage } from '@inertiajs/react'; // Import router dan usePage

const Index = () => {
    // useNavigate dan useLocation dari react-router-dom tidak lagi diperlukan
    // const navigate = useNavigate();
    // const location = useLocation();

    // Dapatkan props halaman Inertia
    const { url } = usePage(); // Mengakses URL saat ini dari Inertia

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Fungsi navigasi akan menggunakan Inertia.visit
    const handleNavigate = (page: string) => {
        // Gunakan route() helper jika halaman memiliki nama rute di Laravel
        // Contoh: Inertia.visit(route(page)); jika nama rute sama dengan 'page'
        Inertia.visit(`/${page}`);
    };

    // Fungsi untuk mendapatkan nama halaman saat ini berdasarkan URL Inertia
    const getCurrentPage = () => {
        const path = url.slice(1); // Menghapus '/' di awal
        // Jika path kosong (misal untuk root '/'), default ke 'dashboard'
        // Jika path mengandung query params atau hash, ambil hanya path utamanya
        const cleanPath = path.split('?')[0].split('#')[0];
        return cleanPath || 'dashboard';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
            <Navbar
                onNavigate={handleNavigate} // Teruskan fungsi navigasi Inertia
                currentPage={getCurrentPage()} // Ambil nama halaman dari URL Inertia
                onNotificationClick={() => setIsNotificationOpen(true)}
                onProfileClick={() => Inertia.visit(route('dashboard'))} // Navigasi Inertia ke dashboard (asumsi rute root untuk profile)
            />

            <main className="pt-16">
                <CitizenDashboardPage onNavigate={handleNavigate} />
            </main>

            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </div>
    );
};

export default Index;
