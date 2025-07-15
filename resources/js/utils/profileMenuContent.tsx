import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { User } from '@/types/user/interface';
import {
    Award,
    FileText,
    Heart,
    LogOut,
    Target,
    Trophy,
    User as UserIcon,
} from 'lucide-react';

interface Props {
    user?: User;
    onProfileClick: () => void;
    onLogoutClick: () => void;
}

export function getProfileMenuContent({
    user,
    onProfileClick,
    onLogoutClick,
}: Props): React.ReactNode {
    const role = user?.role || 'citizen';
    const routePrefix = role === 'community' ? '/community' : '';

    return (
        <>
            <div className="px-3 py-2.5">
                <p className="text-sm font-semibold text-gray-900">
                    {user?.name || 'Guest'}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-gray-500">
                Profil
            </DropdownMenuLabel>
            <DropdownMenuItem
                onClick={onProfileClick}
                className="flex cursor-pointer items-center gap-2"
            >
                <UserIcon className="h-4 w-4" />
                <span>Profil Saya</span>
            </DropdownMenuItem>
            <DropdownMenuLabel className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-gray-500">
                RIWAYAT
            </DropdownMenuLabel>

            <DropdownMenuItem
                onClick={() => (location.href = `${routePrefix}/my-report`)}
                className="flex cursor-pointer items-center gap-2"
            >
                <FileText className="h-4 w-4" />
                <span>Laporan Saya</span>
            </DropdownMenuItem>
            <DropdownMenuItem
                onClick={() => (location.href = `${routePrefix}/my-menu`)}
                className="flex cursor-pointer items-center gap-2"
            >
                <Target className="h-4 w-4" />
                <span>Misi Saya</span>
            </DropdownMenuItem>
            <DropdownMenuItem
                onClick={() => (location.href = `${routePrefix}/my-menu`)}
                className="flex cursor-pointer items-center gap-2"
            >
                <Heart className="h-4 w-4" />
                <span>Donasi Saya</span>
            </DropdownMenuItem>
            <DropdownMenuLabel className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-gray-500">
                PENGHARGAAN
            </DropdownMenuLabel>
            <DropdownMenuItem
                onClick={() => (location.href = `${routePrefix}/my-badge`)}
                className="flex cursor-pointer items-center gap-2"
            >
                <Award className="h-4 w-4" />
                <span>Sertifikat Saya</span>
            </DropdownMenuItem>
            <DropdownMenuItem
                onClick={() => (location.href = `${routePrefix}/my-badge`)}
                className="flex cursor-pointer items-center gap-2"
            >
                <Trophy className="h-4 w-4" />
                <span>Badge Saya</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
                onClick={onLogoutClick}
                className="flex cursor-pointer items-center gap-2 text-red-600 focus:bg-red-50 focus:text-red-600"
            >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
            </DropdownMenuItem>
        </>
    );
}
