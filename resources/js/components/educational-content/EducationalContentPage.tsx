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
import { Content } from '@/types/content';
import { getTypeColor } from '@/utils/educationColor';
import { formatDateOnly } from '@/utils/formatDate';
import { router as Inertia } from '@inertiajs/react';
import { Calendar, Eye, Filter, Play, Search, X } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import Badge from '../core/Badge';
import RenderHTML from '../RenderHtml';

interface EducationalContentPageProps {
    contents: Content[];
    onViewDetails: (id: number) => void;
}

interface FilterState {
    topic: string;
    contentType: string;
    search: string;
    sortBy: string;
}

const EducationalContentPage = ({
    onViewDetails,
    contents,
}: EducationalContentPageProps) => {
    const [filters, setFilters] = useState<FilterState>({
        topic: 'semua',
        contentType: 'semua',
        search: '',
        sortBy: 'newest'
    });

    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(filters.search);
        }, 300);

        return () => clearTimeout(timer);
    }, [filters.search]);

    // Filter and sort contents
    const filteredAndSortedContents = useMemo(() => {
        let filtered = contents.filter((content) => {
            // Topic filter (you might need to add topic field to your schema)
            const topicMatch = filters.topic === 'semua' ||
                (content.title.toLowerCase().includes(getTopicKeyword(filters.topic)) ||
                 content.body.toLowerCase().includes(getTopicKeyword(filters.topic)));

            // Content type filter
            const typeMatch = filters.contentType === 'semua' ||
                content.content_type === filters.contentType;

            // Search filter
            const searchMatch = debouncedSearch === '' ||
                content.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                content.body.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                content.author?.name?.toLowerCase().includes(debouncedSearch.toLowerCase());

            return topicMatch && typeMatch && searchMatch;
        });

        // Sort contents
        filtered.sort((a, b) => {
            switch (filters.sortBy) {
                case 'newest':
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case 'oldest':
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'author':
                    return (a.author?.name || '').localeCompare(b.author?.name || '');
                default:
                    return 0;
            }
        });

        return filtered;
    }, [contents, filters.topic, filters.contentType, debouncedSearch, filters.sortBy]);

    // Helper function to get topic keywords for filtering
    const getTopicKeyword = (topic: string): string => {
        const topicKeywords: { [key: string]: string } = {
            'sampah': 'sampah',
            'air': 'air',
            'biodiversitas': 'biodiversitas',
            'energi': 'energi'
        };
        return topicKeywords[topic] || '';
    };

    // Update filter functions
    const updateFilter = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Reset filters
    const resetFilters = () => {
        setFilters({
            topic: 'semua',
            contentType: 'semua',
            search: '',
            sortBy: 'newest'
        });
    };

    // Check if any filters are active
    const hasActiveFilters = filters.topic !== 'semua' ||
        filters.contentType !== 'semua' ||
        filters.search !== '';

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
                            <CardTitle className="flex items-center justify-between text-lg">
                                <div className="flex items-center">
                                    <Filter
                                        size={20}
                                        className="mr-2 text-emerald-600"
                                    />
                                    Filter Konten
                                </div>
                                {hasActiveFilters && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={resetFilters}
                                        className="text-xs text-gray-500 hover:text-gray-700"
                                    >
                                        Reset
                                    </Button>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Tipe Konten
                                </label>
                                <Select
                                    value={filters.contentType}
                                    onValueChange={(value) => updateFilter('contentType', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
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
                                        <SelectItem value="modul">
                                            Modul
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2 pt-4">
                                <Button
                                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                                    onClick={() => {
                                        // Optional: Add analytics or additional actions when applying filters
                                        console.log('Filters applied:', filters);
                                    }}
                                >
                                    Filter Diterapkan
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={resetFilters}
                                >
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
                            <Select
                                value={filters.sortBy}
                                onValueChange={(value) => updateFilter('sortBy', value)}
                            >
                                <SelectTrigger className="w-48">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">
                                        Terbaru
                                    </SelectItem>
                                    <SelectItem value="oldest">
                                        Terlama
                                    </SelectItem>
                                    <SelectItem value="title">
                                        Judul (A-Z)
                                    </SelectItem>
                                    <SelectItem value="author">
                                        Penulis (A-Z)
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <span className="text-sm text-gray-500">
                                {filteredAndSortedContents.length} dari {contents.length} konten
                            </span>
                        </div>

                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Cari konten..."
                                className="pl-10"
                                value={filters.search}
                                onChange={(e) => updateFilter('search', e.target.value)}
                            />
                            {filters.search && (
                                <X
                                    className="absolute right-3 top-3 h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-600"
                                    onClick={() => updateFilter('search', '')}
                                />
                            )}
                        </div>
                    </div>

                    {filteredAndSortedContents.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {filteredAndSortedContents.map((content: Content) => (
                                    <Card
                                        key={content.id}
                                        className="group cursor-pointer border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onViewDetails(content.id);
                                        }}
                                    >
                                        <div className="relative overflow-hidden rounded-t-lg">
                                            {content.media?.[0]?.media_type?.startsWith(
                                                'video',
                                            ) ? (
                                                <div className="relative h-48 w-full bg-black">
                                                    <video
                                                        className="h-full w-full object-cover opacity-50"
                                                        src={`/storage/${content.media[0].media_url}`}
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
                                            ) : content.media?.[0]
                                                  ?.media_type ===
                                              'document' ? (
                                                <div className="flex h-48 w-full items-center justify-center bg-gray-100">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-12 w-12 text-emerald-600"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 13h8v2H8v-2zm0 4h5v2H8v-2z" />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <img
                                                    src={`/storage/${content.media?.[0]?.media_url}`}
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
                                                        {content.content_type}
                                                    </div>
                                                </Badge>
                                            </div>

                                            {content.content_type === 'video' && (
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
                                            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-emerald-600">
                                                {content.title}
                                            </h3>
                                            <div className="mb-3 line-clamp-2 text-sm text-gray-600">
                                                <RenderHTML
                                                    htmlString={content.body}
                                                    className="leading-relaxed text-gray-700"
                                                />
                                            </div>
                                            <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                                                <span>
                                                    Oleh: {content.author?.name}
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
                                                            content.created_at,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                            <Button
                                                className="mt-auto w-full bg-amber-500 transition-colors duration-200 hover:bg-amber-700"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    Inertia.visit(
                                                        `/content/${content.id}`,
                                                    );
                                                }}
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

                            {filteredAndSortedContents.length >= 12 && (
                                <div className="mt-8 text-center">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="min-w-32"
                                    >
                                        Muat Lebih Banyak
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex w-full items-center justify-center">
                            <Card className="w-full px-8 py-32 text-center">
                                <div className="mb-4 flex justify-center">
                                    <div className="rounded-full bg-gray-100 p-4">
                                        <Search className="h-12 w-12 text-gray-400" />
                                    </div>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    {hasActiveFilters ? 'Tidak Ada Hasil Ditemukan' : 'Konten Edukasi Belum Tersedia'}
                                </h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    {hasActiveFilters
                                        ? 'Coba ubah atau hapus filter untuk melihat lebih banyak konten.'
                                        : 'Belum ada konten edukasi yang tersedia saat ini. Coba lagi nanti.'
                                    }
                                </p>
                                {hasActiveFilters && (
                                    <Button
                                        variant="outline"
                                        onClick={resetFilters}
                                        className="mt-2"
                                    >
                                        Reset Semua Filter
                                    </Button>
                                )}
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EducationalContentPage;
