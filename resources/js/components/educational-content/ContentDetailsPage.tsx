import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Content } from '@/types/content';
import { formatFullDateTime } from '@/utils/formatDate';
import { ArrowLeft, Download, FileText, Play, Share2 } from 'lucide-react';
interface ContentDetailsPageProps {
    content: Content;
    onBack: () => void;
}

const ContentDetailsPage = ({ content, onBack }: ContentDetailsPageProps) => {
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Video':
                return <Play size={20} className="text-red-600" />;
            case 'Artikel':
                return <FileText size={20} className="text-blue-600" />;
            case 'Modul PDF':
                return <Download size={20} className="text-green-600" />;
            default:
                return <FileText size={20} className="text-gray-600" />;
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
            <div className="mb-6 flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="text-gray-600 hover:text-emerald-600"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Kembali ke Daftar Konten
                </Button>
                <div className="space-x-1 text-sm text-gray-500">
                    <span className="cursor-pointer hover:underline">Home</span>
                    <span className="cursor-pointer hover:underline">
                        / Konten
                    </span>{' '}
                    /<span className="font-medium text-gray-700">Detail</span>
                </div>
            </div>
            <div className="space-y-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="mb-6 flex flex-col items-start justify-between md:flex-row">
                            <div className="flex-1">
                                <div className="mb-3 flex flex-wrap gap-2">
                                    <Badge
                                        className={getTypeColor(
                                            content.content_type,
                                        )}
                                    >
                                        <div className="flex items-center gap-1">
                                            {getTypeIcon(content.content_type)}
                                            {content.content_type}
                                        </div>
                                    </Badge>
                                </div>

                                <h1 className="mb-4 text-3xl font-bold text-gray-900">
                                    {content.title}
                                </h1>

                                <div className="text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <span>
                                            Oleh: {content.author?.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <span>
                                            Diunggah:
                                            {formatFullDateTime(
                                                content.created_at,
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2 md:mt-0">
                                <Button variant="outline" size="sm">
                                    <Share2 size={16} className="mr-2" />
                                    Bagikan
                                </Button>
                                {content.content_type === 'Modul PDF' && (
                                    <Button
                                        className="bg-emerald-600 hover:bg-emerald-700"
                                        size="sm"
                                    >
                                        <Download size={16} className="mr-2" />
                                        Unduh PDF
                                    </Button>
                                )}
                            </div>
                        </div>
                        <CardContent className="py-4">
                            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                {content.media?.map((mediaItem, index) => {
                                    const type = mediaItem.media_type;

                                    if (type === 'document') {
                                        return (
                                            <a
                                                key={index}
                                                href={`/storage/${mediaItem.media_url}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-gray-50"
                                            >
                                                <FileText className="h-14 w-14 text-emerald-600" />
                                                <div>
                                                    <p className="truncate font-medium text-gray-900">
                                                        {mediaItem.media_url
                                                            ? mediaItem.media_url.replace(
                                                                  /^contents\//,
                                                                  '',
                                                              )
                                                            : `Dokumen ${index + 1}`}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        Modul PDF
                                                    </p>
                                                </div>
                                            </a>
                                        );
                                    }

                                    return (
                                        <div
                                            key={index}
                                            className="aspect-video overflow-hidden rounded-lg bg-black"
                                        >
                                            {type === 'video' ? (
                                                <video
                                                    controls
                                                    className="h-full w-full object-contain"
                                                    src={`/storage/${mediaItem.media_url}`}
                                                />
                                            ) : (
                                                <img
                                                    src={`/storage/${mediaItem.media_url}`}
                                                    alt={`Media ${index + 1}`}
                                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="prose prose-emerald max-w-none">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: content.content,
                                    }}
                                />
                            </div>
                        </CardContent>
                        <p className="leading-relaxed text-gray-700">
                            {content.body}
                        </p>
                    </CardContent>
                    {/* <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex cursor-pointer items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-gray-50">
                                <FileText
                                    size={20}
                                    className="h-14 w-14 rounded object-cover text-emerald-600"
                                />
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">
                                        Nugget Rebus
                                    </h4>
                                    <div className="mt-1 flex items-center">
                                        <span className="text-sm text-gray-500">
                                            Modul PDF
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex cursor-pointer items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-gray-50">
                                <FileText
                                    size={20}
                                    className="h-14 w-14 rounded object-cover text-emerald-600"
                                />
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">
                                        Nugget Rebus
                                    </h4>
                                    <div className="mt-1 flex items-center">
                                        <span className="text-sm text-gray-500">
                                            Modul PDF
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent> */}
                </Card>
            </div>
        </div>
    );
};

export default ContentDetailsPage;
