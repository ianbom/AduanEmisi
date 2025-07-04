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
import { Download, FileText, Filter, Image, Play, Search } from 'lucide-react';
import { useState } from 'react';

interface EducationalContentPageProps {
    onViewContent: (id: string) => void;
}

const EducationalContentPage = ({
    onViewContent,
}: EducationalContentPageProps) => {
    const [sortBy, setSortBy] = useState('newest');

    const contents = [
        {
            id: '1',
            title: 'Cara Mengelola Sampah Rumah Tangga',
            type: 'Video',
            topic: 'Pengelolaan Sampah',
            description:
                'Pelajari cara efektif mengelola sampah rumah tangga untuk mengurangi dampak lingkungan.',
            thumbnail:
                'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400',
            author: 'Dr. Sari Lestari',
            duration: '12 menit',
            views: 1250,
        },
        {
            id: '2',
            title: 'Panduan Konservasi Air di Rumah',
            type: 'Artikel',
            topic: 'Konservasi Air',
            description:
                'Tips praktis menghemat air dan menjaga kualitas air bersih di rumah.',
            thumbnail:
                'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400',
            author: 'Prof. Ahmad Hidayat',
            readTime: '8 menit',
            views: 890,
        },
        {
            id: '3',
            title: 'Ekosistem Hutan Indonesia',
            type: 'Modul PDF',
            topic: 'Biodiversitas',
            description:
                'Modul pembelajaran tentang keanekaragaman hayati hutan Indonesia.',
            thumbnail:
                'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400',
            author: 'Tim Peneliti LIPI',
            pages: 45,
            downloads: 567,
        },
    ];

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Video':
                return <Play size={16} className="text-red-600" />;
            case 'Artikel':
                return <FileText size={16} className="text-blue-600" />;
            case 'Modul PDF':
                return <Download size={16} className="text-green-600" />;
            default:
                return <Image size={16} className="text-gray-600" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Video':
                return 'bg-red-100 text-red-700';
            case 'Artikel':
                return 'bg-blue-100 text-blue-700';
            case 'Modul PDF':
                return 'bg-green-100 text-green-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Konten Edukasi
                </h1>
                <p className="text-gray-600">
                    Pelajari berbagai topik lingkungan untuk meningkatkan
                    kesadaran Anda
                </p>
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
                                Filter Konten
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Kategori Topik
                                </label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih topik" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">
                                            Semua Topik
                                        </SelectItem>
                                        <SelectItem value="sampah">
                                            Pengelolaan Sampah
                                        </SelectItem>
                                        <SelectItem value="air">
                                            Konservasi Air
                                        </SelectItem>
                                        <SelectItem value="biodiversitas">
                                            Biodiversitas
                                        </SelectItem>
                                        <SelectItem value="energi">
                                            Energi Terbarukan
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Tipe Konten
                                </label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tipe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">
                                            Semua Tipe
                                        </SelectItem>
                                        <SelectItem value="video">
                                            Video
                                        </SelectItem>
                                        <SelectItem value="artikel">
                                            Artikel
                                        </SelectItem>
                                        <SelectItem value="pdf">
                                            Modul PDF
                                        </SelectItem>
                                        <SelectItem value="gambar">
                                            Infografis
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

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Kota
                                </label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kota" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">
                                            Semua Kota
                                        </SelectItem>
                                        <SelectItem value="bandung">
                                            Bandung
                                        </SelectItem>
                                        <SelectItem value="bogor">
                                            Bogor
                                        </SelectItem>
                                        <SelectItem value="jakarta-pusat">
                                            Jakarta Pusat
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
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
                                    <SelectItem value="rating">
                                        Rating Tertinggi
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Cari konten..."
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {contents.map((content) => (
                            <Card
                                key={content.id}
                                className="group cursor-pointer border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                onClick={() => onViewContent(content.id)}
                            >
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <img
                                        src={content.thumbnail}
                                        alt={content.title}
                                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute right-3 top-3">
                                        <Badge
                                            className={getTypeColor(
                                                content.type,
                                            )}
                                        >
                                            <div className="flex items-center gap-1">
                                                {getTypeIcon(content.type)}
                                                {content.type}
                                            </div>
                                        </Badge>
                                    </div>
                                    {content.type === 'Video' && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
                                                <Play
                                                    size={24}
                                                    className="ml-1 text-emerald-600"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <CardContent className="p-4">
                                    <div className="mb-2">
                                        <Badge
                                            variant="outline"
                                            className="mb-2 text-xs"
                                        >
                                            {content.topic}
                                        </Badge>
                                    </div>

                                    <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-emerald-600">
                                        {content.title}
                                    </h3>

                                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                                        {content.description}
                                    </p>

                                    <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                                        <span>Oleh: {content.author}</span>
                                        <span>
                                            {content.duration &&
                                                `${content.duration}`}
                                            {content.readTime &&
                                                `${content.readTime}`}
                                            {content.pages &&
                                                `${content.pages} halaman`}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            {content.views} views
                                            {content.downloads &&
                                                ` • ${content.downloads} downloads`}
                                        </span>
                                        <Button
                                            size="sm"
                                            className="bg-emerald-600 text-xs hover:bg-emerald-700"
                                        >
                                            {content.type === 'Video'
                                                ? 'Tonton'
                                                : content.type === 'Modul PDF'
                                                  ? 'Unduh'
                                                  : 'Baca'}
                                        </Button>
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

export default EducationalContentPage;
