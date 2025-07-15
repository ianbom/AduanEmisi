import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getTypeColor, getTypeIcon } from '@/utils/educationColor';
import { router as Inertia } from '@inertiajs/react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Content } from '@/types/content';
import { formatDateOnly } from '@/utils/formatDate';
import { Calendar, Eye, Filter, Play, Search } from 'lucide-react';
import { useState } from 'react';
interface EducationalContentPageProps {
    contents: Content[];

    onViewDetails: (id: number) => void;
}

const EducationalContentPage = ({
    onViewDetails,
    contents,
}: EducationalContentPageProps) => {
    const [sortBy, setSortBy] = useState('newest');
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
                    {contents.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {contents.map((content: Content) => (
                                    <Card
                                        key={content.id}
                                        className="group cursor-pointer border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                        onClick={() =>
                                            onViewDetails(content.id)
                                        }
                                    >
                                        <div className="relative overflow-hidden rounded-t-lg">
                                            {content.media?.[0]?.media_type?.startsWith(
                                                'video',
                                            ) ? (
                                                <div className="relative h-48 w-full bg-black">
                                                    <video
                                                        className="h-full w-full object-cover opacity-50"
                                                        src={`/contents/${content.media[0].media_url}`}
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
                                                    src={`/contents/${content.media?.[0]?.media_url}`}
                                                    alt={content.title}
                                                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            )}
                                            <div className="absolute right-3 top-3">
                                                <Badge
                                                    className={getTypeColor(
                                                        content.content_type,
                                                    )}
                                                >
                                                    <div className="flex items-center gap-1">
                                                        {getTypeIcon(
                                                            content.content_type,
                                                        )}
                                                        {content.content_type}
                                                    </div>
                                                </Badge>
                                            </div>
                                            {content.content_type ===
                                                'Video' && (
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
                                                    {content.content_type}
                                                </Badge>
                                            </div>

                                            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-emerald-600">
                                                {content.title}
                                            </h3>
                                            <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                                                {content.body}
                                            </p>
                                            <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                                                <span>
                                                    Oleh: {content.author?.name}
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
                                            <div className="mb-4 flex items-center justify-between">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Calendar
                                                        size={14}
                                                        className="mr-1"
                                                    />
                                                    <span>
                                                        {formatDateOnly(
                                                            content.created_at,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                            <Button
                                                className="mt-auto w-full bg-amber-500 transition-colors duration-200 hover:bg-amber-700"
                                                onClick={() =>
                                                    Inertia.visit(
                                                        `/content/${content.id}`,
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
                                    Konten Edukasi Belum Tersedia
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Belum ada konten edukasi yang tersedia saat
                                    ini. Coba lagi nanti.
                                </p>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EducationalContentPage;
