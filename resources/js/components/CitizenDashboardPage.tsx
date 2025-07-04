import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ArrowRight,
    Award,
    FileText,
    Heart,
    Map,
    Plus,
    Target,
    Trophy,
    User,
} from 'lucide-react';
import { useState } from 'react';
import { Link, router as Inertia } from '@inertiajs/react';

const CitizenDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('reports');

    const userProfile = {
        name: 'Ahmad Wijaya',
        email: 'ahmad.wijaya@email.com',
        phone: '+62 812-3456-7890',
        address: 'Jakarta Selatan, DKI Jakarta, Kebayoran Baru',
        bio: 'Pecinta lingkungan yang aktif melaporkan isu-isu lingkungan di Jakarta',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    };

    const stats = [
        {
            label: 'LAPORAN DIBUAT',
            value: '12',
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
            label: 'POIN KONTRIBUSI',
            value: '2,450',
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

    const myReports = [
        {
            id: 1,
            title: 'Pencemaran Air Sungai Ciliwung',
            location: 'Jakarta Selatan',
            status: 'On Progress',
            date: '2024-01-15',
        },
        {
            id: 2,
            title: 'Penumpukan Sampah di Taman Kota',
            location: 'Jakarta Selatan',
            status: 'Completed',
            date: '2024-01-10',
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

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'Gold':
                return 'border-yellow-400 bg-yellow-50';
            case 'Silver':
                return 'border-gray-400 bg-gray-50';
            case 'Bronze':
                return 'border-orange-400 bg-orange-50';
            default:
                return 'border-gray-200 bg-gray-50';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                            <Avatar className="h-24 w-24">
                                <AvatarImage
                                    src={userProfile.avatar}
                                    alt={userProfile.name}
                                />
                                <AvatarFallback>
                                    <User className="h-12 w-12" />
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                                    {userProfile.name}
                                </h1>
                                <div className="space-y-1 text-gray-600">
                                    <p>{userProfile.email}</p>
                                    <p>{userProfile.phone}</p>
                                    <p>{userProfile.address}</p>
                                </div>
                                <p className="mt-3 text-gray-700">
                                    {userProfile.bio}
                                </p>
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
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {stat.label}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="mt-2 text-xs"
                                    >
                                        Lihat semua{' '}
                                        <ArrowRight className="ml-1 h-3 w-3" />
                                    </Button>
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
                                    {myReports.map((report) => (
                                        <Card key={report.id}>
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">
                                                            {report.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            {report.location}
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {report.date}
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

export default CitizenDashboardPage;
