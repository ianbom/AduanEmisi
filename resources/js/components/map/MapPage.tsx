('use client');
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { City, District, Province } from '@/types/area/interface';
import { getStatusColor } from '@/utils/reportStatusColor';

import { Report } from '@/types/report';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
    Calendar,
    Eye,
    Filter,
    MapPin,
    Search,
    TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
interface MapPageProps {
    reports: Report[];
    provinces: Province[];
    cities: City[];
    districts: District[];
    onViewReport: (id: number | string) => void;
}

delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })
    ._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const MapPage = ({
    reports,
    provinces,
    cities,
    districts,
    onViewReport,
}: MapPageProps) => {
    const [showFilters, setShowFilters] = useState(false);
    return (
        <div className="flex h-screen">
            <div
                className={`w-80 border-r border-gray-200 bg-white shadow-lg transition-transform duration-300 ${
                    showFilters
                        ? 'translate-x-0'
                        : '-translate-x-full lg:translate-x-0'
                } fixed z-30 h-full overflow-y-auto lg:relative`}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="flex items-center text-xl font-semibold text-gray-900">
                            <Filter
                                size={20}
                                className="mr-2 text-emerald-600"
                            />
                            Filter
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
                    {/* <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                            <Input
                                placeholder="Cari lokasi..."
                                className="pl-10"
                            />
                        </div>
                    </div> */}
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
                                    <SelectValue placeholder="Semua Provinsi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="semua">
                                        Semua Provinsi
                                    </SelectItem>
                                    {provinces.map((province) => (
                                        <SelectItem
                                            key={province.id}
                                            value={province.id.toString()}
                                        >
                                            {province.name}
                                        </SelectItem>
                                    ))}
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
                                        <SelectValue placeholder="Semua Kota" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">
                                            Semua Kota
                                        </SelectItem>
                                        {cities.map((city) => (
                                            <SelectItem
                                                key={city.id}
                                                value={city.id.toString()}
                                            >
                                                {city.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Kecamatan
                                </label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Kecamatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">
                                            Semua Kecamatan
                                        </SelectItem>
                                        {districts.map((district) => (
                                            <SelectItem
                                                key={district.id}
                                                value={district.id.toString()}
                                            >
                                                {district.name}
                                            </SelectItem>
                                        ))}
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
                </div>
            </div>
            {/* Main Map Area */}
            <div className="relative flex-1">
                <MapContainer
                    center={[-2.5489, 118.0149]}
                    zoom={5}
                    scrollWheelZoom={true}
                    className="z-10 w-full h-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {reports.map((report) => (
                        <Marker
                            key={report.id}
                            position={[report.latitude, report.longitude]}
                        >
                            <Popup
                                className="custom-popup"
                                minWidth={280}
                                maxWidth={320}
                                closeButton={true}
                                autoPan={true}
                            >
                                <div className="relative overflow-hidden bg-white rounded-lg shadow-lg">
                                    <div className="relative h-32 bg-gradient-to-r from-emerald-500 to-teal-600">
                                        {report.media?.[0] ? (
                                            report.media[0].media_type?.startsWith(
                                                'video',
                                            ) ? (
                                                <div className="relative w-full h-full bg-black">
                                                    <video
                                                        className="object-cover w-full h-full opacity-50"
                                                        src={`/storage/${report.media[0].media_url}`}
                                                        muted
                                                        preload="metadata"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="p-2 rounded-full bg-white/80">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="w-6 h-6 text-black"
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
                                                    src={`/storage/${report.media[0].media_url}`}
                                                    alt={report.title}
                                                    className="object-cover w-full h-full"
                                                />
                                            )
                                        ) : (
                                            <div className="flex items-center justify-center h-full bg-gray-800">
                                                <svg
                                                    className="w-8 h-8 text-white/80"
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
                                        )}

                                        <div className="absolute right-2 top-2">
                                            <Badge
                                                className={`${getStatusColor(report.status)} text-xs font-medium shadow-sm`}
                                            >
                                                {report.status}
                                            </Badge>
                                        </div>

                                        {report.hasMission && (
                                            <div className="absolute left-2 top-2">
                                                <Badge className="text-xs font-medium text-white bg-blue-500 shadow-sm">
                                                    Ada Misi
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <div className="mb-2">
                                            <Badge
                                                variant="outline"
                                                className="text-xs font-medium text-gray-700 border-gray-200 bg-gray-50"
                                            >
                                                {report.category}
                                            </Badge>
                                        </div>

                                        <h3 className="mb-3 text-base font-semibold leading-tight text-gray-900 line-clamp-2">
                                            {report.title}
                                        </h3>

                                        <div className="flex items-start mb-3 text-sm text-gray-600">
                                            <MapPin
                                                size={14}
                                                className="mr-2 mt-0.5 flex-shrink-0 text-gray-400"
                                            />
                                            <span className="line-clamp-2">
                                                {report.address}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                                            <div className="flex items-center">
                                                <Calendar
                                                    size={12}
                                                    className="mr-1"
                                                />
                                                <span>{report.created_at}</span>
                                            </div>
                                            <div className="flex items-center text-emerald-600">
                                                <TrendingUp
                                                    size={12}
                                                    className="mr-1"
                                                />
                                                <span className="font-medium">
                                                    {report.upvotes_count || 0}
                                                </span>
                                            </div>
                                        </div>

                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                onViewReport(report.id)
                                            }
                                            className="w-full text-white transition-colors duration-200 bg-emerald-600 hover:bg-emerald-700"
                                        >
                                            <Eye size={14} className="mr-2" />
                                            Lihat Detail
                                        </Button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                <div className="absolute z-20 bottom-4 right-4">
                    <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
                        <CardContent className="p-3 text-center">
                            <div className="text-sm font-medium text-gray-900">
                                {reports.length} Laporan Ditemukan
                            </div>
                            <div className="text-xs text-gray-600">
                                Klik marker untuk lihat detail
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default MapPage;
