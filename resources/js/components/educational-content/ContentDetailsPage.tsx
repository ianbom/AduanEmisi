import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Content } from '@/types/content';
import { getTypeColor, getTypeIcon } from '@/utils/educationColor';
import { formatFullDateTime } from '@/utils/formatDate';
import { ArrowLeft, Download, FileText, Share2 } from 'lucide-react';
import Badge from '../core/Badge';
import ImageWithPopup from '../core/ImageWithPopup';
import RenderHTML from '../RenderHtml';
interface ContentDetailsPageProps {
    content: Content;
    onBack: () => void;
}

const ContentDetailsPage = ({ content, onBack }: ContentDetailsPageProps) => {
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
                                                // <img
                                                //     src={`/storage/${mediaItem.media_url}`}
                                                //     alt={`Media ${index + 1}`}
                                                //     className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                                // />
                                                <ImageWithPopup
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
                            <RenderHTML
                                htmlString={content.body}
                                className="leading-relaxed text-gray-700"
                            />
                        </p>
                    </CardContent>
                    {/* <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex items-center p-4 space-x-4 transition-colors border rounded-lg cursor-pointer hover:bg-gray-50">
                                <FileText
                                    size={20}
                                    className="object-cover rounded h-14 w-14 text-emerald-600"
                                />
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">
                                        Nugget Rebus
                                    </h4>
                                    <div className="flex items-center mt-1">
                                        <span className="text-sm text-gray-500">
                                            Modul PDF
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-4 space-x-4 transition-colors border rounded-lg cursor-pointer hover:bg-gray-50">
                                <FileText
                                    size={20}
                                    className="object-cover rounded h-14 w-14 text-emerald-600"
                                />
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">
                                        Nugget Rebus
                                    </h4>
                                    <div className="flex items-center mt-1">
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
