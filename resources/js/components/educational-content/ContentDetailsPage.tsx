import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Content } from '@/types/content';
import { formatFullDateTime } from '@/utils/formatDate';
import {
    ArrowLeft,
    Calendar,
    Download,
    FileText,
    Play,
    Share2,
    User,
} from 'lucide-react';
interface ContentDetailsPageProps {
    content: Content;
    onBack: () => void;
}

const ContentDetailsPage = ({ content, onBack }: ContentDetailsPageProps) => {
    // const content = {
    //     id: contentId,
    //     title: 'Cara Mengelola Sampah Rumah Tangga',
    //     type: 'Video',
    //     topic: 'Pengelolaan Sampah',
    //     author: 'Dr. Sari Lestari',
    //     publishDate: '10 Januari 2024',
    //     views: 1250,
    //     duration: '12 menit',
    //     description:
    //         'Video edukasi lengkap tentang cara mengelola sampah rumah tangga secara efektif. Dalam video ini, Anda akan mempelajari teknik-teknik praktis untuk mengurangi, memilah, dan mendaur ulang sampah di rumah Anda.',
    //     videoUrl:
    //         'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800',
    //     content: `
    //   <h2>Pengenalan Pengelolaan Sampah</h2>
    //   <p>Pengelolaan sampah rumah tangga yang baik merupakan langkah penting dalam menjaga kelestarian lingkungan. Dengan menerapkan prinsip 3R (Reduce, Reuse, Recycle), kita dapat mengurangi dampak negatif sampah terhadap lingkungan.</p>

    //   <h3>1. Reduce (Mengurangi)</h3>
    //   <p>Langkah pertama adalah mengurangi produksi sampah dengan cara:</p>
    //   <ul>
    //     <li>Menggunakan tas belanja yang dapat digunakan berulang</li>
    //     <li>Memilih produk dengan kemasan minimal</li>
    //     <li>Menghindari penggunaan barang sekali pakai</li>
    //   </ul>

    //   <h3>2. Reuse (Menggunakan Kembali)</h3>
    //   <p>Manfaatkan kembali barang-barang yang masih bisa digunakan:</p>
    //   <ul>
    //     <li>Menggunakan botol bekas sebagai pot tanaman</li>
    //     <li>Memanfaatkan kardus bekas untuk penyimpanan</li>
    //     <li>Menggunakan kertas bekas untuk catatan</li>
    //   </ul>

    //   <h3>3. Recycle (Mendaur Ulang)</h3>
    //   <p>Pisahkan sampah berdasarkan jenisnya untuk memudahkan proses daur ulang:</p>
    //   <ul>
    //     <li>Sampah organik untuk kompos</li>
    //     <li>Plastik, kertas, dan logam untuk daur ulang</li>
    //     <li>Sampah berbahaya perlu penanganan khusus</li>
    //   </ul>
    // `,
    //     relatedMedia: [
    //         {
    //             id: '1',
    //             title: 'Infografis Pemilahan Sampah',
    //             type: 'Gambar',
    //             thumbnail:
    //                 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400',
    //         },
    //         {
    //             id: '2',
    //             title: 'Panduan Kompos Rumahan',
    //             type: 'PDF',
    //             thumbnail:
    //                 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400',
    //         },
    //     ],
    // };

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
                {/* Content Header */}
                <Card>
                    <CardContent className="p-6">
                        <div className="mb-6 flex flex-col items-start justify-between md:flex-row">
                            <div className="flex-1">
                                <div className="mb-3 flex flex-wrap gap-2">
                                    {/* <Badge variant="outline">
                                        {content.topic}
                                    </Badge> */}
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

                                <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2 lg:grid-cols-4">
                                    <div className="flex items-center">
                                        <User size={16} className="mr-2" />
                                        <span>{content.author?.name}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar size={16} className="mr-2" />
                                        <span>
                                            {formatFullDateTime(
                                                content.created_at,
                                            )}
                                        </span>
                                    </div>
                                    {/* <div className="flex items-center">
                                        <Eye size={16} className="mr-2" />
                                        <span>{content.views} views</span>
                                    </div>
                                    {content.duration && (
                                        <div className="flex items-center">
                                            <Play size={16} className="mr-2" />
                                            <span>{content.duration}</span>
                                        </div>
                                    )} */}
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

                        <p className="leading-relaxed text-gray-700">
                            {content.body}
                        </p>
                    </CardContent>
                </Card>

                {/* Main Content */}
                <Card>
                    <CardHeader>
                        <CardTitle>Media Terkait</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {content.media?.map((mediaItem, index) => (
                                <div
                                    key={index}
                                    className="aspect-video overflow-hidden rounded-lg bg-black"
                                >
                                    {mediaItem.media_type?.startsWith(
                                        'video',
                                    ) ? (
                                        <video
                                            controls
                                            className="h-full w-full object-cover"
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
                            ))}
                        </div>
                        <div className="prose prose-emerald max-w-none">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: content.content,
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Related Media */}
                {/* {content.relatedMedia && content.relatedMedia.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Media Terkait</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {content.relatedMedia.map((media) => (
                                    <div
                                        key={media.id}
                                        className="flex items-center p-4 space-x-4 transition-colors border rounded-lg cursor-pointer hover:bg-gray-50"
                                    >
                                        <img
                                            src={media.thumbnail}
                                            alt={media.title}
                                            className="object-cover w-16 h-16 rounded"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">
                                                {media.title}
                                            </h4>
                                            <div className="flex items-center mt-1">
                                                {getTypeIcon(media.type)}
                                                <span className="ml-1 text-sm text-gray-500">
                                                    {media.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )} */}

                {/* Action Buttons */}
                {/* <div className="flex justify-center space-x-4">
                    <Button variant="outline" size="lg">
                        Konten Sebelumnya
                    </Button>
                    <Button
                        size="lg"
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        Konten Selanjutnya
                    </Button>
                </div> */}
            </div>
        </div>
    );
};

export default ContentDetailsPage;
