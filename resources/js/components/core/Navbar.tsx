import { Badge } from '@/components/ui/badge';
import { Bell, User } from 'lucide-react';

interface NavbarProps {
    onNavigate: (page: string) => void;
    currentPage: string;
    onNotificationClick: () => void;
    onProfileClick: () => void;
}

const Navbar = ({
    onNavigate,
    currentPage,
    onNotificationClick,
    onProfileClick,
}: NavbarProps) => {
    const navItems = [
        { id: 'report', label: 'Daftar Laporan', key: 'report' },
        { id: 'my-report', label: 'Laporan Saya', key: 'my-report' },
        { id: 'map', label: 'Peta', key: 'map' },
        { id: 'education', label: 'Konten Edukasi', key: 'education' },
    ];

    return (
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-emerald-100 bg-white/95 shadow-sm backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div
                        className="group flex cursor-pointer items-center"
                        onClick={() => onNavigate('/homepage')}
                    >
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 transition-shadow group-hover:shadow-lg">
                            <span className="text-lg font-bold text-white">
                                E
                            </span>
                        </div>
                        <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-2xl font-bold text-transparent">
                            EcoTrack
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden space-x-1 md:flex">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.key)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                    currentPage === item.key
                                        ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    {/* Right Side - Notifications & Profile */}
                    <div className="flex items-center space-x-4">
                        {/* Notification Icon */}
                        <button
                            onClick={onNotificationClick}
                            className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <Bell size={20} />
                            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-red-500 p-0 text-xs text-white">
                                3
                            </Badge>
                        </button>

                        {/* Profile Photo */}
                        <button
                            onClick={onProfileClick}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white transition-shadow hover:shadow-lg"
                        >
                            <User size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
