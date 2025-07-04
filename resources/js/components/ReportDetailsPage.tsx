import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
    ArrowLeft,
    Calendar,
    Heart,
    MapPin,
    MessageCircle,
    Share2,
    ThumbsDown,
    ThumbsUp,
    Upload,
    User,
} from 'lucide-react';
import { useState } from 'react';

interface ReportDetailsPageProps {
    reportId: string;
    onBack: () => void;
}

const ReportDetailsPage = ({ reportId, onBack }: ReportDetailsPageProps) => {
    const [comment, setComment] = useState('');
    const [hasUpvoted, setHasUpvoted] = useState(false);
    const [hasDownvoted, setHasDownvoted] = useState(false);

    const report = {
        id: reportId,
        title: 'Sampah Plastik di Pantai Kuta',
        category: 'Pencemaran Laut',
        reporter: 'Ahmad Wijaya',
        date: '15 Januari 2024',
        address: 'Pantai Kuta, Badung, Bali',
        status: 'Dalam Progress',
        description:
            'Saya menemukan banyak sekali sampah plastik yang berserakan di sepanjang Pantai Kuta. Kondisi ini sangat mengkhawatirkan karena dapat membahayakan ekosistem laut dan mengganggu aktivitas wisata. Sampah-sampah ini tampaknya berasal dari aktivitas wisatawan dan juga terbawa arus laut.',
        images: [
            'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800',
            'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800',
        ],
        upvotes: 45,
        downvotes: 3,
        hasMission: true,
        mission: {
            title: 'Pembersihan Pantai Kuta',
            assignedTo: 'Volunteer',
            teamLeader: 'Budi Santoso',
            members: 12,
            documentation: [
                {
                    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400',
                    caption: 'Tim volunteer sedang mengumpulkan sampah',
                    uploader: 'Sari Dewi',
                },
            ],
        },
    };

    const comments = [
        {
            id: '1',
            user: 'Maria Santos',
            avatar: '/api/placeholder/40/40',
            date: '16 Januari 2024',
            content:
                'Situasi yang sangat memprihatinkan. Saya juga sering ke Pantai Kuta dan memang kondisinya semakin buruk.',
        },
        {
            id: '2',
            user: 'Rizki Pratama',
            avatar: '/api/placeholder/40/40',
            date: '16 Januari 2024',
            content:
                'Terima kasih sudah melaporkan. Kita perlu aksi nyata untuk mengatasi masalah ini.',
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
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="mb-4 text-gray-600 hover:text-emerald-600"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Kembali ke Laporan
                </Button>
            </div>

            <div className="space-y-8">
                {/* Main Report Info */}
                <Card>
                    <CardContent className="p-6">
                        <div className="mb-6 flex flex-col items-start justify-between md:flex-row">
                            <div className="flex-1">
                                <div className="mb-3 flex flex-wrap gap-2">
                                    <Badge variant="outline">
                                        {report.category}
                                    </Badge>
                                    <Badge
                                        className={getStatusColor(
                                            report.status,
                                        )}
                                    >
                                        {report.status}
                                    </Badge>
                                    {report.hasMission && (
                                        <Badge className="bg-blue-100 text-blue-700">
                                            Ada Misi
                                        </Badge>
                                    )}
                                </div>

                                <h1 className="mb-4 text-3xl font-bold text-gray-900">
                                    {report.title}
                                </h1>

                                <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2">
                                    <div className="flex items-center">
                                        <User size={16} className="mr-2" />
                                        <span>
                                            Dilaporkan oleh: {report.reporter}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar size={16} className="mr-2" />
                                        <span>{report.date}</span>
                                    </div>
                                    <div className="flex items-start md:col-span-2">
                                        <MapPin
                                            size={16}
                                            className="mr-2 mt-0.5"
                                        />
                                        <span>{report.address}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2 md:mt-0">
                                <Button variant="outline" size="sm">
                                    <Share2 size={16} className="mr-2" />
                                    Bagikan
                                </Button>
                            </div>
                        </div>

                        {/* Image Gallery */}
                        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {report.images.map((image, index) => (
                                <div
                                    key={index}
                                    className="aspect-video overflow-hidden rounded-lg"
                                >
                                    <img
                                        src={image}
                                        alt={`Foto laporan ${index + 1}`}
                                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="mb-3 text-lg font-semibold">
                                Deskripsi Laporan
                            </h3>
                            <p className="leading-relaxed text-gray-700">
                                {report.description}
                            </p>
                        </div>

                        {/* Voting Section */}
                        <div className="flex items-center gap-4 border-t border-gray-200 py-4">
                            <Button
                                variant={hasUpvoted ? 'default' : 'outline'}
                                onClick={() => {
                                    setHasUpvoted(!hasUpvoted);
                                    if (hasDownvoted) setHasDownvoted(false);
                                }}
                                className={
                                    hasUpvoted
                                        ? 'bg-emerald-600 hover:bg-emerald-700'
                                        : ''
                                }
                            >
                                <ThumbsUp size={16} className="mr-2" />
                                {report.upvotes + (hasUpvoted ? 1 : 0)}
                            </Button>

                            <Button
                                variant={
                                    hasDownvoted ? 'destructive' : 'outline'
                                }
                                onClick={() => {
                                    setHasDownvoted(!hasDownvoted);
                                    if (hasUpvoted) setHasUpvoted(false);
                                }}
                            >
                                <ThumbsDown size={16} className="mr-2" />
                                {report.downvotes + (hasDownvoted ? 1 : 0)}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Mission Section */}
                {report.hasMission && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-emerald-700">
                                Misi Terkait
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3 className="mb-4 text-xl font-semibold">
                                {report.mission.title}
                            </h3>

                            {report.mission.assignedTo === 'Volunteer' && (
                                <div className="mb-6">
                                    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <span className="text-gray-600">
                                                Ketua Tim:{' '}
                                            </span>
                                            <span className="font-medium">
                                                {report.mission.teamLeader}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                Anggota Bergabung:{' '}
                                            </span>
                                            <span className="font-medium">
                                                {report.mission.members} orang
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                                            Ikut sebagai Ketua Tim
                                        </Button>
                                        <Button variant="outline">
                                            Ikut sebagai Anggota
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Mission Documentation */}
                            {report.mission.documentation && (
                                <div>
                                    <h4 className="mb-3 font-semibold">
                                        Dokumentasi Misi
                                    </h4>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {report.mission.documentation.map(
                                            (doc, index) => (
                                                <div
                                                    key={index}
                                                    className="space-y-2"
                                                >
                                                    <img
                                                        src={doc.image}
                                                        alt={doc.caption}
                                                        className="aspect-video w-full rounded-lg object-cover"
                                                    />
                                                    <p className="text-sm text-gray-700">
                                                        {doc.caption}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Oleh: {doc.uploader}
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Donation Section */}
                <Card className="bg-gradient-to-r from-emerald-50 to-green-50">
                    <CardContent className="p-6">
                        <div className="text-center">
                            <Heart className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
                            <h3 className="mb-2 text-xl font-semibold">
                                Donasi untuk Penanganan
                            </h3>
                            <p className="mb-4 text-gray-600">
                                Bantu penanganan masalah ini dengan memberikan
                                donasi
                            </p>
                            <Button
                                size="lg"
                                className="bg-emerald-600 hover:bg-emerald-700"
                            >
                                Donasi Sekarang
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Comments Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <MessageCircle size={20} className="mr-2" />
                            Diskusi ({comments.length} komentar)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Add Comment */}
                        <div className="mb-6">
                            <Textarea
                                placeholder="Tambah komentar Anda..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={3}
                                className="mb-3"
                            />
                            <div className="flex items-center justify-between">
                                <Button variant="outline" size="sm">
                                    <Upload size={16} className="mr-2" />
                                    Unggah Foto/Video
                                </Button>
                                <Button className="bg-emerald-600 hover:bg-emerald-700">
                                    Kirim Komentar
                                </Button>
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="flex space-x-3 rounded-lg bg-gray-50 p-4"
                                >
                                    <Avatar>
                                        <AvatarImage src={comment.avatar} />
                                        <AvatarFallback>
                                            {comment.user[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="mb-1 flex items-center space-x-2">
                                            <span className="font-medium">
                                                {comment.user}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {comment.date}
                                            </span>
                                        </div>
                                        <p className="text-gray-700">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ReportDetailsPage;
