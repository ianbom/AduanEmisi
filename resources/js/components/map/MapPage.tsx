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
import { Eye, Filter, MapPin, Search } from 'lucide-react';
import { useState } from 'react';

interface MapPageProps {
    onViewReport: (id: string) => void;
}

const MapPage = ({ onViewReport }: MapPageProps) => {
    const [selectedPin, setSelectedPin] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    const reports = [
        {
            id: '1',
            title: 'Sampah Plastik di Pantai Kuta',
            location: 'Pantai Kuta, Bali',
            status: 'Dalam Progress',
            category: 'Pencemaran Laut',
            coordinates: { lat: -8.7183, lng: 115.1686 },
            color: 'yellow',
        },
        {
            id: '2',
            title: 'Deforestasi Ilegal di Hutan Lindung',
            location: 'Bogor, Jawa Barat',
            status: 'Menunggu',
            category: 'Kerusakan Hutan',
            coordinates: { lat: -6.5944, lng: 106.7892 },
            color: 'red',
        },
        {
            id: '3',
            title: 'Pencemaran Sungai Citarum',
            location: 'Bandung, Jawa Barat',
            status: 'Selesai',
            category: 'Pencemaran Air',
            coordinates: { lat: -6.9175, lng: 107.6191 },
            color: 'green',
        },
    ];

    const legendItems = [
        {
            color: 'red',
            status: 'Menunggu',
            description: 'Laporan baru yang perlu ditindaklanjuti',
        },
        {
            color: 'yellow',
            status: 'Dalam Progress',
            description: 'Sedang dalam proses penanganan',
        },
        {
            color: 'green',
            status: 'Selesai',
            description: 'Masalah telah diselesaikan',
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

    const getPinColor = (status: string) => {
        switch (status) {
            case 'Selesai':
                return 'bg-green-500';
            case 'Dalam Progress':
                return 'bg-yellow-500';
            case 'Menunggu':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="flex h-screen">
            {/* Filter Sidebar */}
            <div
                className={`w-80 border-r border-gray-200 bg-white shadow-lg transition-transform duration-300 ${
                    showFilters
                        ? 'translate-x-0'
                        : '-translate-x-full lg:translate-x-0'
                } fixed z-30 h-full overflow-y-auto lg:relative`}
            >
                <div className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="flex items-center text-xl font-semibold text-gray-900">
                            <Filter
                                size={20}
                                className="mr-2 text-emerald-600"
                            />
                            Filter & Legenda
                        </h2>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden"
                            onClick={() => setShowFilters(false)}
                        >
                            ×
                        </Button>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Cari lokasi..."
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-8 space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Kategori Laporan
                            </label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Semua kategori" />
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
                                Status Laporan
                            </label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Semua status" />
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
                                    <SelectValue placeholder="Semua provinsi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="semua">
                                        Semua Provinsi
                                    </SelectItem>
                                    <SelectItem value="bali">Bali</SelectItem>
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
                                    Kota
                                </label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kota" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bandung">
                                            Bandung
                                        </SelectItem>
                                        <SelectItem value="bogor">
                                            Bogor
                                        </SelectItem>
                                        <SelectItem value="denpasar">
                                            Denpasar
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Kecamatan
                                </label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kecamatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="kuta">
                                            Kuta
                                        </SelectItem>
                                        <SelectItem value="denpasar">
                                            Denpasar
                                        </SelectItem>
                                        <SelectItem value="ubud">
                                            Ubud
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                                Terapkan Filter
                            </Button>
                            <Button variant="outline" className="flex-1">
                                Reset Filter
                            </Button>
                        </div>
                    </div>

                    {/* Legend */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Legenda</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {legendItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-3"
                                >
                                    <div
                                        className={`mt-0.5 h-4 w-4 rounded-full ${getPinColor(item.status)}`}
                                    />
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {item.status}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Main Map Area */}
            <div className="relative flex-1">
                {/* Mobile Filter Toggle */}
                <Button
                    className="absolute left-4 top-4 z-20 bg-white text-gray-700 shadow-lg hover:bg-gray-50 lg:hidden"
                    onClick={() => setShowFilters(true)}
                >
                    <Filter size={16} className="mr-2" />
                    Filter
                </Button>

                {/* Map Container */}
                <div className="relative h-full overflow-hidden bg-gradient-to-br from-blue-50 to-green-50">
                    {/* Indonesia Map Outline (Simplified) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
                            {/* Map Background */}
                            <div className="relative h-3/4 w-full overflow-hidden rounded-lg bg-gradient-to-br from-emerald-100 to-blue-100 shadow-inner">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                {/* Indonesia Silhouette */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="select-none text-6xl font-bold text-emerald-200/30">
                                        PETA INDONESIA
                                    </div>
                                </div>

                                {/* Report Pins */}
                                {reports.map((report) => (
                                    <div key={report.id}>
                                        {/* Pin */}
                                        <div
                                            className={`absolute h-6 w-6 ${getPinColor(report.status)} z-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110`}
                                            style={{
                                                left: `${30 + Math.random() * 40}%`,
                                                top: `${30 + Math.random() * 40}%`,
                                            }}
                                            onClick={() =>
                                                setSelectedPin(
                                                    selectedPin === report.id
                                                        ? null
                                                        : report.id,
                                                )
                                            }
                                        >
                                            <div className="absolute inset-0 animate-ping rounded-full bg-white/30" />
                                        </div>

                                        {/* Popup */}
                                        {selectedPin === report.id && (
                                            <div
                                                className="absolute z-20 -translate-x-1/2 -translate-y-full transform"
                                                style={{
                                                    left: `${30 + Math.random() * 40}%`,
                                                    top: `${25 + Math.random() * 40}%`,
                                                }}
                                            >
                                                <Card className="w-80 border-0 shadow-xl">
                                                    <CardContent className="p-4">
                                                        <div className="mb-3 flex items-start justify-between">
                                                            <Badge
                                                                className={getStatusColor(
                                                                    report.status,
                                                                )}
                                                            >
                                                                {report.status}
                                                            </Badge>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    setSelectedPin(
                                                                        null,
                                                                    )
                                                                }
                                                            >
                                                                ×
                                                            </Button>
                                                        </div>

                                                        <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
                                                            {report.title}
                                                        </h3>

                                                        <div className="mb-3 flex items-center text-sm text-gray-600">
                                                            <MapPin
                                                                size={14}
                                                                className="mr-1"
                                                            />
                                                            <span>
                                                                {
                                                                    report.location
                                                                }
                                                            </span>
                                                        </div>

                                                        <div className="mb-3">
                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {
                                                                    report.category
                                                                }
                                                            </Badge>
                                                        </div>

                                                        <Button
                                                            size="sm"
                                                            className="w-full bg-emerald-600 hover:bg-emerald-700"
                                                            onClick={() =>
                                                                onViewReport(
                                                                    report.id,
                                                                )
                                                            }
                                                        >
                                                            <Eye
                                                                size={14}
                                                                className="mr-2"
                                                            />
                                                            Lihat Detail
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Map Info */}
                    <div className="absolute bottom-4 right-4">
                        <Card className="bg-white/90 backdrop-blur-sm">
                            <CardContent className="p-3 text-center">
                                <div className="text-sm font-medium text-gray-900">
                                    {reports.length} Laporan Ditemukan
                                </div>
                                <div className="text-xs text-gray-600">
                                    Klik pin untuk melihat detail
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Backdrop for mobile filter */}
            {showFilters && (
                <div
                    className="fixed inset-0 z-20 bg-black/20 lg:hidden"
                    onClick={() => setShowFilters(false)}
                />
            )}
        </div>
    );
};

export default MapPage;
