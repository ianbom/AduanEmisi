import { Badge } from '@/components/ui/badge';
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
import { Report } from '@/types/report';
import { formatDateOnly } from '@/utils/formatDate';
import { getStatusColor } from '@/utils/reportStatusColor';
import { router as Inertia } from '@inertiajs/react';
import {
    Calendar,
    Eye,
    Filter,
    MapPin,
    Plus,
    Search,
    ThumbsDown,
    ThumbsUp,
} from 'lucide-react';
import { useState } from 'react';
interface ReportsPageProps {
    reports: Report[];
    myReports: boolean;
    onViewDetails: (id: number) => void;
    onCreateReport: () => void;
}
const ReportsPage = ({
    reports,
    myReports,
    onViewDetails,
    onCreateReport,
}: ReportsPageProps) => {
    const [sortBy, setSortBy] = useState('newest');
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
                <div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        {myReports ? 'Laporan Saya' : 'Daftar Laporan'}
                    </h1>
                    <p className="text-gray-600">
                        {myReports
                            ? 'Laporan yang dibuat oleh Anda'
                            : 'Temukan Laporan dan bergabung dalam aksi penyelamatan lingkungan'}
                    </p>
                </div>
                <Button
                    onClick={onCreateReport}
                    className="mt-4 bg-emerald-700 text-white hover:bg-emerald-800 md:mt-0"
                    size="lg"
                >
                    <Plus size={20} className="mr-2" />
                    Buat Laporan Baru
                </Button>
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
                    {reports.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {reports.map((report: Report) => (
                                    <Card
                                        key={report.id}
                                        className="group cursor-pointer border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                        onClick={() => onViewDetails(report.id)}
                                    >
                                        <div className="relative overflow-hidden rounded-t-lg">
                                            {report.media?.[0]?.media_type?.startsWith(
                                                'video',
                                            ) ? (
                                                <div className="relative h-48 w-full bg-black">
                                                    <video
                                                        className="h-full w-full object-cover opacity-50"
                                                        src={`/storage/${report.media[0].media_url}`}
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
                                                    src={`/storage/${report.media?.[0]?.media_url}`}
                                                    alt={report.title}
                                                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            )}

                                            <div className="absolute right-3 top-3">
                                                <Badge
                                                    className={getStatusColor(
                                                        report.status,
                                                    )}
                                                >
                                                    {report.status}
                                                </Badge>
                                            </div>
                                            {report.mission && (
                                                <div className="absolute left-3 top-3">
                                                    <Badge className="bg-blue-100 text-blue-700">
                                                        Ada Misi
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>

                                        <CardContent className="p-4">
                                            <div className="mb-2">
                                                <Badge
                                                    variant="outline"
                                                    className="mb-2 text-xs"
                                                >
                                                    {report.category}
                                                </Badge>
                                            </div>

                                            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-emerald-600">
                                                {report.title}
                                            </h3>

                                            <div className="mb-3 flex items-center text-sm text-gray-500">
                                                <MapPin
                                                    size={14}
                                                    className="mr-1"
                                                />
                                                <span className="truncate">
                                                    {report.district?.name},{' '}
                                                    {report.city?.name},{' '}
                                                    {report.province?.name}
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
                                                            report.created_at,
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between gap-5">
                                                    <div className="flex items-center text-sm font-medium text-emerald-600">
                                                        <ThumbsUp
                                                            size={14}
                                                            className="mr-1"
                                                        />
                                                        <span>
                                                            {report.upvotes_count ||
                                                                0}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center text-sm font-medium text-emerald-600">
                                                        <ThumbsDown
                                                            size={14}
                                                            className="mr-1"
                                                        />
                                                        <span>
                                                            {report.dislikes_count ||
                                                                0}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <Button
                                                className="mt-auto w-full bg-amber-500 transition-colors duration-200 hover:bg-amber-700"
                                                onClick={() =>
                                                    Inertia.visit(
                                                        `/report/${report.id}`,
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
                                        <svg
                                            className="h-12 w-12 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    Laporan Belum Tersedia
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Belum ada laporan yang tersedia saat ini.
                                    Coba buat laporan baru.
                                </p>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
