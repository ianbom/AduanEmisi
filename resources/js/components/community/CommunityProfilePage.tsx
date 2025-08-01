import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Donation } from '@/types/donation/interface';
import { Point } from '@/types/reedem/point';
import { Report } from '@/types/report';
import { Mission } from '@/types/report/mission';
import { User } from '@/types/user/interface';
import { UserBadge } from '@/types/user/user-badge';
import { UserCertificate } from '@/types/user/user-certificate';
import { getStatusClass } from '@/utils/badgeStatusDonationColor';
import { formatFullDateTime } from '@/utils/formatDate';
import { getStatusColor as getMissionStatusColor } from '@/utils/missionStatusColor';
import { getMissionStatusLabel } from '@/utils/missionStatusLabel';
import { getStatusColor } from '@/utils/reportStatusColor';
import { getStatusLabel } from '@/utils/reportStatusLabel';
import { getStatusDonationLabel } from '@/utils/statusDonationLabel';
import { Link, router } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    Building2,
    Calendar,
    Clock,
    Crown,
    FileText,
    Heart,
    Mail,
    Map,
    MapPin,
    MapPinned,
    Phone,
    Plus,
    Star,
    Target,
    Trophy,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import AchievementCard from '../citizen/profile/AchievementCard';
interface CommunityProfilePageProps {
    user: User | null;
    myReports: Report[];
    myReportsCount: number;
    myMissions: Mission[];
    myMissionCounts: number;
    myBadges: UserBadge[];
    myCertificates: UserCertificate[];
    myDonations: Donation[];
    myPoints: Point[];
    myBadgeCounts: number;
}

const CommunityProfilePage = ({
    user,
    myReports,
    myReportsCount,
    myDonations,
    myPoints,
    myBadges,
    myCertificates,
    myMissions,
    myMissionCounts,
    myBadgeCounts,
}: CommunityProfilePageProps) => {
    const [activeTab, setActiveTab] = useState('reports');
    const [activeTabPoints, setActiveTabPoints] = useState('all-points');
    console.log(myMissionCounts);
    console.log(myMissions);
    console.log(myReportsCount);
    const stats = [
        {
            label: 'LAPORAN DIBUAT',
            value: myReportsCount ?? 0,
            icon: FileText,
            color: 'text-blue-600',
        },
        {
            label: 'MISI DIIKUTI',
            value: myMissionCounts ?? 0,
            icon: Target,
            color: 'text-green-600',
        },
        {
            label: 'KOLEKSI BADGE',
            value: myBadgeCounts ?? 0,
            icon: Trophy,
            color: 'text-purple-600',
        },
    ];
    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-start">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage
                                            src={
                                                user?.profile_url
                                                    ? `/storage/${user.profile_url}`
                                                    : undefined
                                            }
                                        />

                                        <AvatarFallback className="bg-emerald-100 text-xl font-semibold text-emerald-700">
                                            {user?.name
                                                ?.charAt(0)
                                                .toUpperCase() || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                <a
                                    href="/community/edit-profile"
                                    className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-emerald-700"
                                >
                                    <svg
                                        className="mr-2 h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                    Edit Profile
                                </a>
                            </div>
                            <div className="w-full flex-1">
                                <div className="mb-6">
                                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                                        {user?.name || 'User Name'}
                                    </h1>
                                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        {user?.points_balance || 0} Poin
                                    </div>
                                </div>
                                <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    <div className="space-y-4">
                                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-800">
                                            Informasi Kontak
                                        </h3>

                                        <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                                                <Mail
                                                    size={16}
                                                    className="text-blue-600"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                                    Email
                                                </p>
                                                <p className="truncate text-sm font-medium text-gray-900">
                                                    {user?.email ||
                                                        'Tidak tersedia'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                                                <Phone
                                                    size={16}
                                                    className="text-green-600"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                                    Telepon
                                                </p>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {user?.phone ||
                                                        'Tidak tersedia'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-800">
                                            Informasi Lokasi
                                        </h3>

                                        <div className="flex items-start space-x-3 rounded-lg bg-gray-50 p-3">
                                            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-100">
                                                <MapPin
                                                    size={16}
                                                    className="text-red-600"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                                    Wilayah
                                                </p>
                                                <p className="text-sm font-medium leading-relaxed text-gray-900">
                                                    {[
                                                        user?.district?.name,
                                                        user?.city?.name,
                                                        user?.province?.name,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(', ') ||
                                                        'Tidak tersedia'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3 rounded-lg bg-gray-50 p-3">
                                            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100">
                                                <MapPinned
                                                    size={16}
                                                    className="text-purple-600"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                                    Alamat
                                                </p>
                                                <p className="text-sm font-medium leading-relaxed text-gray-900">
                                                    {user?.address ||
                                                        'Tidak tersedia'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 pt-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                                                <Calendar
                                                    size={14}
                                                    className="text-emerald-600"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                                    Bergabung
                                                </p>
                                                <p className="text-sm font-medium text-gray-700">
                                                    {formatFullDateTime(
                                                        user?.created_at || '',
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100">
                                                <Clock
                                                    size={14}
                                                    className="text-orange-600"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                                    Terakhir Diperbarui
                                                </p>
                                                <p className="text-sm font-medium text-gray-700">
                                                    {formatFullDateTime(
                                                        user?.updated_at || '',
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="mb-8 overflow-hidden border-0 shadow-lg">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 py-8">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">
                                    Informasi Komunitas
                                </h1>
                                <p className="text-emerald-100">
                                    Detail lengkap tentang komunitas Anda
                                </p>
                            </div>
                        </div>
                    </div>

                    <CardContent className="p-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="group rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
                                <div className="flex items-start space-x-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 transition-colors group-hover:bg-emerald-200">
                                        <Building2 className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                                            Nama Komunitas
                                        </label>
                                        <p className="mt-1 truncate text-lg font-semibold text-gray-900">
                                            {user?.community?.name || (
                                                <span className="italic text-gray-400">
                                                    Belum ada nama komunitas
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="group rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 transition-all duration-200 hover:border-blue-200 hover:shadow-md">
                                <div className="flex items-start space-x-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-blue-200">
                                        <Crown className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                                            Ketua Komunitas
                                        </label>
                                        <p className="mt-1 truncate text-lg font-semibold text-gray-900">
                                            {user?.name || (
                                                <span className="italic text-gray-400">
                                                    Ketua belum ditentukan
                                                </span>
                                            )}
                                        </p>
                                        {user?.email && (
                                            <p className="mt-1 truncate text-xs text-gray-500">
                                                {user.email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="group rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5 transition-all duration-200 hover:border-amber-200 hover:shadow-md">
                                <div className="flex items-start space-x-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 transition-colors group-hover:bg-amber-200">
                                        <FileText className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                                            Deskripsi Komunitas
                                        </label>
                                        <div className="mt-2">
                                            {user?.community?.description ? (
                                                <p className="text-sm leading-relaxed text-gray-700">
                                                    {user.community.description}
                                                </p>
                                            ) : (
                                                <div className="flex items-center space-x-2 text-gray-400">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span className="text-sm italic">
                                                        Deskripsi komunitas
                                                        belum ditambahkan
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-2">
                            <div className="rounded-lg bg-gray-50 p-3 text-center">
                                <div className="text-lg font-bold text-gray-900">
                                    {user?.community?.member_count || '0'}
                                </div>
                                <div className="text-xs text-gray-600">
                                    Anggota
                                </div>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-3 text-center">
                                <div className="text-lg font-bold text-gray-900">
                                    {user?.community?.created_at
                                        ? new Date(
                                              user.community.created_at,
                                          ).getFullYear()
                                        : new Date().getFullYear()}
                                </div>
                                <div className="text-xs text-gray-600">
                                    Dibuat
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Quick Stats */}
                <div className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">
                        Kilas Balik Kontribusi Anda
                    </h2>
                    <div className="mb-6 grid gap-6 md:grid-cols-3">
                        {stats.map((stat, index) => (
                            <Card
                                key={index}
                                className="transition-shadow hover:shadow-lg"
                            >
                                <CardContent className="p-6 text-center">
                                    <stat.icon
                                        className={`h-8 w-8 ${stat.color} mx-auto mb-3`}
                                    />
                                    <div className="mb-1 text-3xl font-bold text-gray-900">
                                        {stat.value ?? 0}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {stat.label}
                                    </div>

                                    {stat.label === 'LAPORAN DIBUAT' ? (
                                        myReportsCount === 0 ? (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="mt-2 text-xs"
                                                onClick={() =>
                                                    router.visit(
                                                        '/report-create',
                                                    )
                                                }
                                            >
                                                Buat Sekarang
                                                <ArrowRight className="ml-1 h-3 w-3" />
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="mt-2 text-xs"
                                                onClick={() =>
                                                    router.visit('/report')
                                                }
                                            >
                                                Lihat Semua
                                                <ArrowRight className="ml-1 h-3 w-3" />
                                            </Button>
                                        )
                                    ) : stat.label === 'MISI DIIKUTI' ? (
                                        myMissionCounts === 0 ? (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="mt-2 text-xs"
                                                onClick={() =>
                                                    router.visit('/mission')
                                                }
                                            >
                                                Cari Misi
                                                <ArrowRight className="ml-1 h-3 w-3" />
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="mt-2 text-xs"
                                                onClick={() =>
                                                    router.visit('/my-mission')
                                                }
                                            >
                                                Lihat Semua
                                                <ArrowRight className="ml-1 h-3 w-3" />
                                            </Button>
                                        )
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="mt-2 text-xs"
                                        >
                                            Lihat Semua
                                            <ArrowRight className="ml-1 h-3 w-3" />
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <Link href="/report-create">
                            <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
                                <CardContent className="p-6 text-center">
                                    <Plus className="mx-auto mb-3 h-12 w-12 text-green-600" />
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                        LAPORKAN ISU BARU
                                    </h3>
                                    <p className="text-gray-600">
                                        Laporkan masalah lingkungan yang Anda
                                        temui
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/map">
                            <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
                                <CardContent className="p-6 text-center">
                                    <Map className="mx-auto mb-3 h-12 w-12 text-blue-600" />
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                        LIHAT PETA LAPORAN
                                    </h3>
                                    <p className="text-gray-600">
                                        Jelajahi laporan lingkungan di peta
                                        interaktif
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
                {/* Detailed Activity Tabs */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Riwayat Aktivitas Detail</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="hidden w-full grid-cols-3 md:grid">
                                <TabsTrigger value="reports">
                                    Laporan Saya
                                </TabsTrigger>
                                <TabsTrigger value="missions">
                                    Misi Saya
                                </TabsTrigger>
                                <TabsTrigger value="donations">
                                    Donasi Saya
                                </TabsTrigger>
                            </TabsList>
                            <div className="mb-4 md:hidden">
                                <Select
                                    value={activeTab}
                                    onValueChange={setActiveTab}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih aktivitas" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="reports">
                                            Laporan Saya
                                        </SelectItem>
                                        <SelectItem value="missions">
                                            Misi Saya
                                        </SelectItem>
                                        <SelectItem value="donations">
                                            Donasi Saya
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <TabsContent value="reports" className="mt-6">
                                <div className="space-y-4">
                                    {myReports?.length > 0 ? (
                                        <>
                                            {myReports
                                                .slice(0, 5)
                                                .map((report) => (
                                                    <Card key={report.id}>
                                                        <CardContent className="p-4">
                                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                                <div className="flex-1">
                                                                    <h3 className="font-semibold text-gray-900">
                                                                        {
                                                                            report.title
                                                                        }
                                                                    </h3>
                                                                    <p className="text-sm text-gray-600">
                                                                        {
                                                                            report.address
                                                                        }
                                                                    </p>
                                                                    <p className="mt-1 text-xs text-gray-500">
                                                                        Laporan
                                                                        dibuat:{' '}
                                                                        {formatFullDateTime(
                                                                            report.created_at,
                                                                        )}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center gap-3 self-start">
                                                                    <Badge
                                                                        className={getStatusColor(
                                                                            report.status,
                                                                        )}
                                                                    >
                                                                        {getStatusLabel(
                                                                            report.status,
                                                                        )}
                                                                    </Badge>
                                                                    <Link
                                                                        href={`/report/${report.id}`}
                                                                    >
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                        >
                                                                            Lihat
                                                                            Detail
                                                                        </Button>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            {myReports.length > 5 && (
                                                <div className="flex justify-center pt-4">
                                                    <Link href="/my-report">
                                                        <Button
                                                            variant="outline"
                                                            className="flex items-center gap-2"
                                                        >
                                                            <FileText
                                                                size={16}
                                                            />
                                                            Lihat Semua (
                                                            {myReports.length}{' '}
                                                            Laporan)
                                                        </Button>
                                                    </Link>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                            <p className="text-gray-600">
                                                Belum ada riwayat laporan
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="missions" className="mt-6">
                                <div className="space-y-4">
                                    {myMissions?.length > 0 ? (
                                        <>
                                            {myMissions
                                                .slice(0, 5)
                                                .map((mission) => (
                                                    <Card key={mission.id}>
                                                        <CardContent className="p-4">
                                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                                <div className="flex-1">
                                                                    <h3 className="font-semibold text-gray-900">
                                                                        {
                                                                            mission.title
                                                                        }
                                                                    </h3>
                                                                    <p className="text-sm text-gray-600">
                                                                        Peran:{' '}
                                                                        {mission
                                                                            .pivot
                                                                            ?.is_leader
                                                                            ? 'Ketua Tim'
                                                                            : 'Anggota Tim'}
                                                                    </p>
                                                                    <p className="mt-1 text-xs text-gray-500">
                                                                        Misi
                                                                        dibuat:{' '}
                                                                        {formatFullDateTime(
                                                                            mission.created_at,
                                                                        )}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center gap-3 self-start">
                                                                    <Badge
                                                                        className={getMissionStatusColor(
                                                                            mission.status,
                                                                        )}
                                                                    >
                                                                        {getMissionStatusLabel(
                                                                            mission.status,
                                                                        )}
                                                                    </Badge>
                                                                    <Link
                                                                        href={`/report/${mission.id}`}
                                                                    >
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                        >
                                                                            Lihat
                                                                            Detail
                                                                        </Button>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            {myMissions.length > 5 && (
                                                <div className="flex justify-center pt-4">
                                                    <Link href="/my-mission">
                                                        <Button
                                                            variant="outline"
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Target size={16} />
                                                            Lihat Semua (
                                                            {
                                                                myReports.length
                                                            }{' '}
                                                            Misi)
                                                        </Button>
                                                    </Link>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <Target className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                            <p className="text-gray-600">
                                                Belum ada riwayat misi
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                            <TabsContent value="donations" className="mt-6">
                                <div className="space-y-4">
                                    {myDonations?.length > 0 ? (
                                        <>
                                            {myDonations
                                                .slice(0, 5)
                                                .map((donation) => (
                                                    <Card key={donation.id}>
                                                        <CardContent className="p-4">
                                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                                <div className="flex-1">
                                                                    <h3 className="font-semibold text-gray-900">
                                                                        {
                                                                            donation
                                                                                .report
                                                                                ?.title
                                                                        }
                                                                    </h3>
                                                                    <p className="text-sm text-gray-600">
                                                                        {
                                                                            donation.transaction_id
                                                                        }
                                                                    </p>
                                                                    <p className="mt-1 text-xs text-gray-500">
                                                                        Waktu
                                                                        donasi:{' '}
                                                                        {formatFullDateTime(
                                                                            donation.created_at,
                                                                        )}
                                                                    </p>
                                                                </div>
                                                                <div className="flex flex-col items-end gap-1 self-start">
                                                                    <Badge
                                                                        className={getStatusClass(
                                                                            donation.status,
                                                                        )}
                                                                    >
                                                                        {getStatusDonationLabel(
                                                                            donation.status,
                                                                        )}
                                                                    </Badge>
                                                                    <p className="text-xl font-semibold text-emerald-600">
                                                                        Rp.{' '}
                                                                        {
                                                                            donation.amount
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            {myDonations.length > 5 && (
                                                <div className="flex justify-center pt-4">
                                                    <Link href="/my-donations">
                                                        <Button
                                                            variant="outline"
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Heart size={16} />
                                                            Lihat Semua (
                                                            {
                                                                myDonations.length
                                                            }{' '}
                                                            Donasi)
                                                        </Button>
                                                    </Link>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <Heart className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                            <p className="text-gray-600">
                                                Belum ada riwayat donasi
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
                {/* Detailed Activity Point Tabs */}
                <Card className="mb-8">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Riwayat Poin</CardTitle>
                        <div className="inline-flex items-center gap-1.5 rounded-md bg-yellow-100 px-2 py-2.5 text-xs font-medium text-yellow-800">
                            Poin Saat Ini:
                            <Star className="h-4 w-4 text-yellow-500" />
                            {user?.points_balance || 0} Poin
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs
                            value={activeTabPoints}
                            onValueChange={setActiveTabPoints}
                        >
                            <TabsList className="hidden w-full grid-cols-3 md:grid">
                                <TabsTrigger value="all-points">
                                    Semua
                                </TabsTrigger>
                                <TabsTrigger value="increment-points">
                                    Increment
                                </TabsTrigger>
                                <TabsTrigger value="decrement-points">
                                    Decrement
                                </TabsTrigger>
                            </TabsList>
                            <div className="mb-4 md:hidden">
                                <Select
                                    value={activeTabPoints}
                                    onValueChange={setActiveTabPoints}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih aktivitas" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all-points">
                                            Semua
                                        </SelectItem>
                                        <SelectItem value="increment-points">
                                            Increment
                                        </SelectItem>
                                        <SelectItem value="decrement-points">
                                            Decrement
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <TabsContent value="all-points" className="mt-6">
                                {myPoints.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                            <svg
                                                className="h-8 w-8 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                                            Data tidak ditemukan
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Belum ada riwayat poin yang tersedia
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                        {myPoints.map((point) => (
                                            <Card
                                                key={point.id}
                                                className={cn(
                                                    'p-3 shadow-sm transition-colors',
                                                    point.type === 'increment'
                                                        ? 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50'
                                                        : 'border-red-200 bg-red-50/50 hover:bg-red-50',
                                                )}
                                            >
                                                <CardContent className="p-0">
                                                    <div
                                                        className={cn(
                                                            'mb-1 text-sm font-semibold',
                                                            point.type ===
                                                                'increment'
                                                                ? 'text-emerald-600'
                                                                : 'text-red-600',
                                                        )}
                                                    >
                                                        {point.type ===
                                                        'increment'
                                                            ? '+'
                                                            : '-'}
                                                        {point.amount} poin
                                                    </div>
                                                    <p className="text-xs text-gray-700">
                                                        {point.description}
                                                    </p>
                                                    <p className="mt-1 text-[10px] text-gray-400">
                                                        {formatFullDateTime(
                                                            point.created_at,
                                                        )}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent
                                value="increment-points"
                                className="mt-6"
                            >
                                {myPoints.filter((p) => p.type === 'increment')
                                    .length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                                            <svg
                                                className="h-8 w-8 text-emerald-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                                            Data tidak ditemukan
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Belum ada riwayat penambahan poin
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                        {myPoints
                                            .filter(
                                                (p) => p.type === 'increment',
                                            )
                                            .map((point) => (
                                                <Card
                                                    key={point.id}
                                                    className="border-emerald-200 bg-emerald-50/50 p-3 shadow-sm transition-colors hover:bg-emerald-50"
                                                >
                                                    <CardContent className="p-0">
                                                        <div className="mb-1 text-sm font-semibold text-emerald-600">
                                                            +{point.amount} poin
                                                        </div>
                                                        <p className="text-xs text-gray-700">
                                                            {point.description}
                                                        </p>
                                                        <p className="mt-1 text-[10px] text-gray-400">
                                                            {formatFullDateTime(
                                                                point.created_at,
                                                            )}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent
                                value="decrement-points"
                                className="mt-6"
                            >
                                {myPoints.filter((p) => p.type === 'decrement')
                                    .length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                            <svg
                                                className="h-8 w-8 text-red-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M20 12H4"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                                            Data tidak ditemukan
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Belum ada riwayat pengurangan poin
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                        {myPoints
                                            .filter(
                                                (p) => p.type === 'decrement',
                                            )
                                            .map((point) => (
                                                <Card
                                                    key={point.id}
                                                    className="border-red-200 bg-red-50/50 p-3 shadow-sm transition-colors hover:bg-red-50"
                                                >
                                                    <CardContent className="p-0">
                                                        <div className="mb-1 text-sm font-semibold text-red-600">
                                                            -{point.amount} poin
                                                        </div>
                                                        <p className="text-xs text-gray-700">
                                                            {point.description}
                                                        </p>
                                                        <p className="mt-1 text-[10px] text-gray-400">
                                                            {formatFullDateTime(
                                                                point.created_at,
                                                            )}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
                <AchievementCard
                    myBadges={myBadges}
                    myCertificates={myCertificates}
                />
            </div>
        </div>
    );
};

export default CommunityProfilePage;
