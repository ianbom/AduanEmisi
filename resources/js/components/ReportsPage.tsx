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
import {
    Calendar,
    Filter,
    MapPin,
    Plus,
    Search,
    TrendingUp,
} from 'lucide-react';
import { useState } from 'react';

interface ReportsPageProps {
    onViewDetails: (id: string) => void;
    onCreateReport: () => void;
}

const ReportsPage = ({ onViewDetails, onCreateReport }: ReportsPageProps) => {
    const [sortBy, setSortBy] = useState('newest');

    const reports = [
        {
            id: '1',
            title: 'Sampah Plastik di Pantai Kuta',
            location: 'Pantai Kuta, Bali',
            status: 'Dalam Progress',
            category: 'Pencemaran Laut',
            image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400',
            hasMission: true,
            upvotes: 45,
            date: '2024-01-15',
        },
        {
            id: '2',
            title: 'Deforestasi Ilegal di Hutan Lindung',
            location: 'Bogor, Jawa Barat',
            status: 'Menunggu',
            category: 'Kerusakan Hutan',
            image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400',
            hasMission: false,
            upvotes: 32,
            date: '2024-01-14',
        },
        {
            id: '3',
            title: 'Pencemaran Sungai Citarum',
            location: 'Bandung, Jawa Barat',
            status: 'Selesai',
            category: 'Pencemaran Air',
            image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400',
            hasMission: true,
            upvotes: 78,
            date: '2024-01-10',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Selesai':
                return 'bg-green-100 text-green-700';
            case 'Dalam Progress':
                return 'bg-yellow-100 text-yellow-700';
            case 'Menunggu':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
                <div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        Laporan Lingkungan
                    </h1>
                    <p className="text-gray-600">
                        Temukan dan bergabung dalam aksi penyelamatan lingkungan
                    </p>
                </div>
                <Button
                    onClick={onCreateReport}
                    className="mt-4 bg-emerald-600 text-white hover:bg-emerald-700 md:mt-0"
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

                    {/* Reports Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {reports.map((report) => (
                            <Card
                                key={report.id}
                                className="group cursor-pointer border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                onClick={() => onViewDetails(report.id)}
                            >
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <img
                                        src={report.image}
                                        alt={report.title}
                                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute right-3 top-3">
                                        <Badge
                                            className={getStatusColor(
                                                report.status,
                                            )}
                                        >
                                            {report.status}
                                        </Badge>
                                    </div>
                                    {report.hasMission && (
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
                                        <MapPin size={14} className="mr-1" />
                                        <span className="truncate">
                                            {report.location}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar
                                                size={14}
                                                className="mr-1"
                                            />
                                            <span>{report.date}</span>
                                        </div>
                                        <div className="flex items-center text-sm font-medium text-emerald-600">
                                            <TrendingUp
                                                size={14}
                                                className="mr-1"
                                            />
                                            <span>{report.upvotes}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="mt-8 text-center">
                        <Button
                            variant="outline"
                            size="lg"
                            className="min-w-32"
                        >
                            Muat Lebih Banyak
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
