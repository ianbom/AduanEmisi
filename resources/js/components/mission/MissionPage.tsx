import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Mission } from '@/types/report/mission';
import { formatDateOnly } from '@/utils/formatDate';
import { getStatusColor } from '@/utils/reportStatusColor';
import { router as Inertia } from '@inertiajs/react';
import { Calendar, Eye, Filter, MapPin, Search, Target } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/badge';
interface MissionPageProps {
    missions: Mission[];
    myMissions: boolean;
    onViewDetails: (id: number) => void;
}
const MissionPage = ({
    missions,
    myMissions,
    onViewDetails,
}: MissionPageProps) => {
    const [sortBy, setSortBy] = useState('newest');
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
                <div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            {myMissions ? 'Misi yang Diikuti' : 'Daftar Misi'}
                        </h1>
                    </h1>
                    <p className="text-gray-600">
                        Temukan Misi dan jadilah bagian dalam aksi penyelamatan
                        lingkungan
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Filter Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle className="flex items-center text-lg">
                                <Filter
                                    size={20}
                                    className="mr-2 text-emerald-600"
                                />
                                Filter Laporan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Kategori
                                </label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">
                                            Semua Kategori
                                        </SelectItem>
                                        <SelectItem value="pencemaran-air">
                                            Pencemaran Air
                                        </SelectItem>
                                        <SelectItem value="pencemaran-laut">
                                            Pencemaran Laut
                                        </SelectItem>
                                        <SelectItem value="kerusakan-hutan">
                                            Kerusakan Hutan
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">
                                            Semua Status
                                        </SelectItem>
                                        <SelectItem value="menunggu">
                                            Menunggu
                                        </SelectItem>
                                        <SelectItem value="progress">
                                            Dalam Progress
                                        </SelectItem>
                                        <SelectItem value="selesai">
                                            Selesai
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Provinsi
                                </label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih provinsi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">
                                            Semua Provinsi
                                        </SelectItem>
                                        <SelectItem value="bali">
                                            Bali
                                        </SelectItem>
                                        <SelectItem value="jabar">
                                            Jawa Barat
                                        </SelectItem>
                                        <SelectItem value="jakarta">
                                            DKI Jakarta
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Tanggal Mulai
                                    </label>
                                    <Input type="date" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Tanggal Selesai
                                    </label>
                                    <Input type="date" />
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                                    Terapkan Filter
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Reset Filter
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    {/* Sort and Search */}
                    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center space-x-4">
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Urutkan berdasarkan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">
                                        Terbaru
                                    </SelectItem>
                                    <SelectItem value="popular">
                                        Terpopuler
                                    </SelectItem>
                                    <SelectItem value="status">
                                        Status
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Cari laporan..."
                                className="pl-10"
                            />
                        </div>
                    </div>
                    {missions.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {missions.map((mission: Mission) => (
                                    <Card
                                        key={mission.id}
                                        className="group cursor-pointer border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                        onClick={() =>
                                            onViewDetails(mission.report?.id)
                                        }
                                    >
                                        <div className="relative overflow-hidden rounded-t-lg">
                                            {mission.report.media?.[0]?.media_type?.startsWith(
                                                'video',
                                            ) ? (
                                                <div className="relative h-48 w-full bg-black">
                                                    <video
                                                        className="h-full w-full object-cover opacity-50"
                                                        src={`/storage/${mission.report.media[0].media_url}`}
                                                        muted
                                                        preload="metadata"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="rounded-full bg-white/80 p-2">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-6 w-6 text-black"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M14.752 11.168l-5.197-3.03A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <img
                                                    src={`/storage/${mission.thumbnail_url}`}
                                                    alt={mission.title}
                                                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            )}

                                            <div className="absolute right-3 top-3">
                                                <Badge
                                                    className={getStatusColor(
                                                        mission.status,
                                                    )}
                                                >
                                                    {mission.status}
                                                </Badge>
                                            </div>
                                        </div>

                                        <CardContent className="p-4">
                                            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-emerald-600">
                                                {mission.title}
                                            </h3>
                                            <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                                                {mission.description}
                                            </p>
                                            <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                                                <span>
                                                    Oleh:{' '}
                                                    {mission.creator?.name}
                                                </span>
                                                {/* <span>
                                            {content.duration &&
                                                ${content.duration}}
                                            {content.readTime &&
                                                ${content.readTime}}
                                            {content.pages &&
                                                ${content.pages} halaman}
                                        </span> */}
                                            </div>
                                            <div className="mb-3 flex items-center text-sm text-gray-500">
                                                <MapPin
                                                    size={14}
                                                    className="mr-1"
                                                />
                                                <span className="truncate">
                                                    {mission.district?.name},{' '}
                                                    {mission.city?.name},{' '}
                                                    {mission.province?.name}
                                                </span>
                                            </div>

                                            <div className="mb-4 flex items-center justify-between">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Calendar
                                                        size={14}
                                                        className="mr-1"
                                                    />
                                                    <span>
                                                        {formatDateOnly(
                                                            mission.created_at,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                            <Button
                                                className="mt-auto w-full bg-amber-500 transition-colors duration-200 hover:bg-amber-700"
                                                onClick={() =>
                                                    Inertia.visit(
                                                        `/report/${mission.id}`,
                                                    )
                                                }
                                            >
                                                <Eye
                                                    size={16}
                                                    className="mr-2"
                                                />
                                                Lihat Detail
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            <div className="mt-8 text-center">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="min-w-32"
                                >
                                    Muat Lebih Banyak
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex w-full items-center justify-center">
                            <Card className="w-full px-8 py-32 text-center">
                                <div className="mb-4 flex justify-center">
                                    <div className="rounded-full bg-gray-100 p-4">
                                        <Target
                                            size={32}
                                            className="h-12 w-12 text-gray-400"
                                        />
                                    </div>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    {myMissions
                                        ? 'Anda Belum Memiliki Misi'
                                        : 'Misi Belum Tersedia'}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {myMissions
                                        ? 'Anda belum memiliki misi. Silahkan mendaftar misi terlebih dahulu.'
                                        : 'Belum ada misi yang tersedia saat ini. Coba lagi nanti.'}
                                </p>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MissionPage;
