import { NavItems, NavUser } from '@/types/navbar/interface';
import { User } from '@/types/user/interface';
import { usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import { Badge } from '../ui/badge';
import ProfileMenuDropdown from './ProfileDropdown';
import { PageProps } from '@/types';

interface NavbarProps {
    navItems: NavItems[];
    onNavigate: (page: string) => void;
    currentPage: string;
    onNotificationClick: () => void;
    user?: NavUser;
    profileMenuContent: React.ReactNode;
}

const Navbar = ({
    navItems,
    onNavigate,
    currentPage,
    onNotificationClick,
    profileMenuContent,
    user,
}: NavbarProps) => {
    // Ambil data notifikasi dari shared props Inertia
    const { notifications } = usePage<PageProps>().props;
    const unreadCount = notifications?.unread_count || 0;

    return (
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-emerald-100 bg-white/95 shadow-sm backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div
                        className="group flex cursor-pointer items-center"
                        onClick={() => onNavigate('/homepage')}
                    >
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl">
                            <img
                                src="/assets/images/LogoSobatBumi.png"
                                alt="Logo Sobat Bumi"
                                className="h-10 w-10"
                            />
                        </div>
                        <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-2xl font-bold text-transparent">
                            SobatBumi
                        </span>
                    </div>
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
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onNotificationClick}
                            className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-red-500 p-0 text-xs text-white">
                                    {unreadCount > 99 ? '99+' : unreadCount}
                                </Badge>
                            )}
                        </button>
                        <ProfileMenuDropdown
                            user={user as User}
                            menuItems={profileMenuContent}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
