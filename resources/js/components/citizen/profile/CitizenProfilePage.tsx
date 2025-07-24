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
import { Report } from '@/types/report';
import { Mission } from '@/types/report/mission';
import { User } from '@/types/user/interface';
import { getRarityColor } from '@/utils/badgeRarityColor';
import { formatFullDateTime } from '@/utils/formatDate';
import { Link, router } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    Calendar,
    Clock,
    FileText,
    Heart,
    Mail,
    Map,
    MapPin,
    MapPinned,
    Phone,
    Plus,
    Target,
    Trophy,
} from 'lucide-react';
import { useState } from 'react';
interface CitizenProfilePageProps {
    user: User | null;
    myReports: Report[];
    myReportsCount: number;
    myMissions: Mission[];
    myMissionCounts: number;
}

const CitizenProfilePage = ({
    user,
    myReports,
    myReportsCount,
    myMissions,
    myMissionCounts,
}: CitizenProfilePageProps) => {
    const [activeTab, setActiveTab] = useState('reports');
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
            value: '20',
            icon: Trophy,
            color: 'text-purple-600',
        },
    ];

    const badges = [
        {
            id: 1,
            title: 'Pelapor Aktif',
            description: 'Membuat 10+ laporan lingkungan',
            icon: '🏆',
            dateReceived: '2024-01-15',
            rarity: 'Gold',
        },
        {
            id: 2,
            title: 'Penggerak Komunitas',
            description: 'Mengikuti 5+ misi volunteer',
            icon: '🤝',
            dateReceived: '2024-01-10',
            rarity: 'Silver',
        },
        {
            id: 3,
            title: 'Pelindung Sungai',
            description: 'Melaporkan 3+ kasus pencemaran air',
            icon: '🌊',
            dateReceived: '2024-01-05',
            rarity: 'Bronze',
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
                                    href="/edit-profile"
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
                                    {/* <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                        <span className="text-sm font-medium text-emerald-600">
                                            Active Member
                                        </span>
                                    </div> */}
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
                                        {stat.label === 'LAPORAN DIBUAT' &&
                                            (stat.value ?? 0)}
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
                                        myMissionCounts === 0 ||
                                        myMissionCounts === undefined ? (
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
                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Aktivitas Detail</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="hidden w-full grid-cols-5 md:grid">
                                <TabsTrigger value="reports">
                                    Laporan Saya
                                </TabsTrigger>
                                <TabsTrigger value="missions">
                                    Misi Saya
                                </TabsTrigger>
                                <TabsTrigger value="donations">
                                    Donasi Saya
                                </TabsTrigger>
                                <TabsTrigger value="certificates">
                                    Sertifikat Saya
                                </TabsTrigger>
                                <TabsTrigger value="badges">
                                    Koleksi Badges
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
                                        <SelectItem value="certificates">
                                            Sertifikat Saya
                                        </SelectItem>
                                        <SelectItem value="badges">
                                            Koleksi Badges
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <TabsContent value="reports" className="mt-6">
                                <div className="space-y-4">
                                    {myReports?.length > 0 ? (
                                        myReports.map((report) => (
                                            <Card key={report.id}>
                                                <CardContent className="p-4">
                                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-gray-900">
                                                                {report.title}
                                                            </h3>
                                                            <p className="text-sm text-gray-600">
                                                                {report.address}
                                                            </p>
                                                            <p className="mt-1 text-xs text-gray-500">
                                                                {formatFullDateTime(
                                                                    report.created_at,
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-3 self-start">
                                                            <Badge
                                                                variant={
                                                                    report.status ===
                                                                    'Completed'
                                                                        ? 'default'
                                                                        : 'secondary'
                                                                }
                                                            >
                                                                {report.status}
                                                            </Badge>
                                                            <Link
                                                                href={`/report/${report.id}`}
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                >
                                                                    Lihat Detail
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
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
                                    {myMissions.length > 0 ? (
                                        myMissions.map((mission) => (
                                            <Card key={mission.id}>
                                                <CardContent className="p-4">
                                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-gray-900">
                                                                {mission.title}
                                                            </h3>
                                                            <p className="text-sm text-gray-600">
                                                                Peran:{' '}
                                                                {mission.pivot
                                                                    ?.is_leader
                                                                    ? 'Ketua Tim'
                                                                    : 'Anggota Tim'}
                                                            </p>
                                                            <p className="mt-1 text-xs text-gray-500">
                                                                {formatFullDateTime(
                                                                    mission.created_at,
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-3 self-start">
                                                            <Badge
                                                                variant={
                                                                    mission.status ===
                                                                    'Completed'
                                                                        ? 'default'
                                                                        : 'secondary'
                                                                }
                                                            >
                                                                {mission.status}
                                                            </Badge>
                                                            <Link
                                                                href={`/report/${mission.id}`}
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                >
                                                                    Lihat Detail
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
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
                                <div className="py-8 text-center">
                                    <Heart className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                    <p className="text-gray-600">
                                        Belum ada riwayat donasi
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="certificates" className="mt-6">
                                <div className="py-8 text-center">
                                    <Award className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                    <p className="text-gray-600">
                                        Belum ada sertifikat yang diterima
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="badges" className="mt-6">
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {badges.map((badge) => (
                                        <Card
                                            key={badge.id}
                                            className={`border-2 ${getRarityColor(badge.rarity)}`}
                                        >
                                            <CardContent className="p-4 text-center sm:p-6">
                                                <div className="mb-3 text-3xl sm:text-4xl">
                                                    {badge.icon}
                                                </div>
                                                <h3 className="mb-2 text-sm font-semibold text-gray-900 sm:text-base">
                                                    {badge.title}
                                                </h3>
                                                <p className="mb-3 text-xs text-gray-600 sm:text-sm">
                                                    {badge.description}
                                                </p>
                                                <Badge
                                                    variant="outline"
                                                    className="mb-2 text-xs"
                                                >
                                                    {badge.rarity}
                                                </Badge>
                                                <p className="text-xs text-gray-500">
                                                    Diterima:{' '}
                                                    {badge.dateReceived}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CitizenProfilePage;
