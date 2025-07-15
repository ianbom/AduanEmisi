import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Report } from '@/types/report';
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
}
const CitizenProfilePage = ({
    user,
    myReports,
    myReportsCount,
}: CitizenProfilePageProps) => {
    const [activeTab, setActiveTab] = useState('reports');

    const stats = [
        {
            label: 'LAPORAN DIBUAT',
            value: myReportsCount,
            icon: FileText,
            color: 'text-blue-600',
        },
        {
            label: 'MISI DIIKUTI',
            value: '8',
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

    const myMissions = [
        {
            id: 1,
            title: 'Pembersihan Pantai Ancol',
            role: 'Anggota',
            status: 'Completed',
            date: '2024-01-12',
        },
        {
            id: 2,
            title: 'Penanaman Pohon di Monas',
            role: 'Ketua Tim',
            status: 'On Progress',
            date: '2024-01-18',
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                            <Avatar className="h-24 w-24">
                                <AvatarImage
                                    src={user?.profile_url}
                                    alt={user?.name}
                                />
                                <AvatarFallback className="bg-emerald-100 text-xl font-semibold text-emerald-700">
                                    {user?.name?.charAt(0)?.toUpperCase() ||
                                        'U'}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <h1 className="mb-3 text-2xl font-bold text-gray-900">
                                    {user?.name || 'User Name'}
                                </h1>

                                <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                                    <div className="space-y-2 text-gray-600 md:flex-1">
                                        <div className="flex items-center gap-2">
                                            <Mail
                                                size={16}
                                                className="text-gray-400"
                                            />
                                            <p>{user?.email}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Phone
                                                size={16}
                                                className="text-gray-400"
                                            />
                                            <p>{user?.phone || '-'}</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <MapPin
                                                size={16}
                                                className="mt-0.5 text-gray-400"
                                            />
                                            <p className="text-gray-700">
                                                {
                                                    (user?.district.name,
                                                    user?.city.name,
                                                    user?.province.name || '-')
                                                }
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <MapPinned
                                                size={16}
                                                className="mt-0.5 text-gray-400"
                                            />
                                            <p className="text-gray-700">
                                                {user?.address || '-'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-500 md:flex-shrink-0">
                                        <div className="flex items-center gap-2">
                                            <Calendar
                                                size={14}
                                                className="text-gray-400"
                                            />
                                            <p>
                                                Bergabung:{' '}
                                                {formatFullDateTime(
                                                    user?.created_at || '',
                                                )}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Clock
                                                size={14}
                                                className="text-gray-400"
                                            />
                                            <p>
                                                Diperbarui:{' '}
                                                {formatFullDateTime(
                                                    user?.updated_at || '',
                                                )}
                                            </p>
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
                                        myReportsCount === 0
                                            ? '-'
                                            : stat.value}
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
                            <TabsList className="grid w-full grid-cols-5">
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

                            <TabsContent value="reports" className="mt-6">
                                <div className="space-y-4">
                                    {myReports?.length > 0 ? (
                                        myReports.map((report) => (
                                            <Card key={report.id}>
                                                <CardContent className="p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div>
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
                                                        <div className="flex items-center gap-3">
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
                                    {myMissions.map((mission) => (
                                        <Card key={mission.id}>
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">
                                                            {mission.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            Peran:{' '}
                                                            {mission.role}
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {mission.date}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
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
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Lihat Detail
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
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
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {badges.map((badge) => (
                                        <Card
                                            key={badge.id}
                                            className={`border-2 ${getRarityColor(badge.rarity)}`}
                                        >
                                            <CardContent className="p-6 text-center">
                                                <div className="mb-3 text-4xl">
                                                    {badge.icon}
                                                </div>
                                                <h3 className="mb-2 font-semibold text-gray-900">
                                                    {badge.title}
                                                </h3>
                                                <p className="mb-3 text-sm text-gray-600">
                                                    {badge.description}
                                                </p>
                                                <Badge
                                                    variant="outline"
                                                    className="mb-2"
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
