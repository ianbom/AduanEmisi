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
        { id: 'report', label: 'Laporan', key: 'report' },
        { id: 'map', label: 'Peta', key: 'map' },
        { id: 'education', label: 'Konten Edukasi', key: 'education' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b shadow-sm border-emerald-100 bg-white/95 backdrop-blur-md">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div
                        className="flex items-center cursor-pointer group"
                        onClick={() => onNavigate('/homepage')}
                    >
                        <div className="flex items-center justify-center w-10 h-10 mr-3 transition-shadow rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 group-hover:shadow-lg">
                            <span className="text-lg font-bold text-white">
                                E
                            </span>
                        </div>
                        <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text">
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
                            className="relative p-2 text-gray-500 transition-colors rounded-lg hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <Bell size={20} />
                            <Badge className="absolute flex items-center justify-center w-5 h-5 p-0 text-xs text-white bg-red-500 -right-1 -top-1">
                                3
                            </Badge>
                        </button>

                        {/* Profile Photo */}
                        <button
                            onClick={onProfileClick}
                            className="flex items-center justify-center w-10 h-10 text-white transition-shadow rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 hover:shadow-lg"
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
