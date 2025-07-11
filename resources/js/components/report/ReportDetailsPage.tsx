import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Report } from '@/types/report';
import { getStatusColor } from '@/utils/reportStatusColor';
import {
    ArrowLeft,
    Calendar,
    Heart,
    LocateFixed,
    MapPin,
    MessageCircle,
    Share2,
    ThumbsUp,
    User,
} from 'lucide-react';
import { useState } from 'react';
import AttendanceFormModal from './AttendanceFormModal';
import ConfirmVolunteerModal from './ConfirmVolunteerModal';
import CommentUploadCard from './InputCommentReport';
interface ReportDetailsPageProps {
    report: Report;
    onBack: () => void;
}

const ReportDetailsPage = ({ report, onBack }: ReportDetailsPageProps) => {
    const [hasUpvoted, setHasUpvoted] = useState(false);
    const [hasDownvoted, setHasDownvoted] = useState(false);
    const [replying, setReplying] = useState<string | null>(null);
    const [replyText, setReplyText] = useState<string>('');
    const [openModalAttendance, setOpenModalAttendance] = useState(false);
    const [modalOpenRegister, setModalOpenRegister] = useState(false);
    const [selectedRole, setSelectedRole] = useState<'ketua' | 'anggota'>(
        'anggota',
    );
    const handleOpenModalRegister = (role: 'ketua' | 'anggota') => {
        setSelectedRole(role);
        setModalOpenRegister(true);
    };

    const handleConfirmRegister = () => {
        setModalOpenRegister(false);
        console.log(`Mendaftar sebagai ${selectedRole}`);
    };
    const dummyMembers = [
        { id: 1, name: 'Argya Dwi Ferdinand Putra' },
        { id: 2, name: 'Aprilia Dwi Crsityana' },
        { id: 3, name: 'Bayu Hadi Leksana' },
        { id: 4, name: 'Yudhistira Surya Ristyanto' },
        { id: 5, name: 'Achmad Dwiki Nomansyah' },
        { id: 6, name: 'Aaron Febrian Prakoso' },
        { id: 7, name: 'Mirza Ramadhani Hanasaputra' },
        { id: 8, name: 'Aldino Erlangga' },
        { id: 9, name: 'M. Ainur Ramadhan' },
    ];
    // const reportd = {
    //     id: r,
    //     title: 'Sampah Plastik di Pantai Kuta',
    //     category: 'Pencemaran Laut',
    //     reporter: 'Ahmad Wijaya',
    //     date: '15 Januari 2024',
    //     address: 'Pantai Kuta, Badung, Bali',
    //     status: 'Dalam Progress',
    //     description:
    //         'Saya menemukan banyak sekali sampah plastik yang berserakan di sepanjang Pantai Kuta. Kondisi ini sangat mengkhawatirkan karena dapat membahayakan ekosistem laut dan mengganggu aktivitas wisata. Sampah-sampah ini tampaknya berasal dari aktivitas wisatawan dan juga terbawa arus laut.',
    //     images: [
    //         'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800',
    //         'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800',
    //     ],
    //     upvotes: 45,
    //     downvotes: 3,
    //     hasMission: true,
    //     mission: {
    //         title: 'Pembersihan Pantai Kuta',
    //         assignedTo: 'Volunteer',
    //         teamLeader: 'Budi Santoso',
    //         members: 12,
    //         documentation: [
    //             {
    //                 image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400',
    //                 caption: 'Tim volunteer sedang mengumpulkan sampah',
    //                 uploader: 'Sari Dewi',
    //             },
    //         ],
    //     },
    // };

    const [comments, setComments] = useState([
        {
            id: '1',
            user: 'Maria Santos',
            avatar: '/api/placeholder/40/40',
            date: '16 Januari 2024',
            content: 'Kondisinya parah banget di lokasi ini.',
            media: [
                'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600',
                'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            ],
            replies: [
                {
                    id: '1-1',
                    user: 'Admin',
                    date: '17 Januari 2024',
                    content:
                        'Terima kasih infonya, Maria. Akan kami tindak lanjuti.',
                },
                {
                    id: '1-2',
                    user: 'Andi Rahman',
                    date: '17 Januari 2024',
                    content: 'Saya juga lihat kondisi ini kemarin malam.',
                },
            ],
        },
        {
            id: '2',
            user: 'Rizki Pratama',
            avatar: '/api/placeholder/40/40',
            date: '16 Januari 2024',
            content: 'Setuju, perlu penanganan cepat!',
            media: [],
            replies: [
                {
                    id: '2-1',
                    user: 'Ayu Lestari',
                    date: '17 Januari 2024',
                    content: 'Betul banget, Rizki. Terlalu lama dibiarkan.',
                },
            ],
        },
        {
            id: '3',
            user: 'Ayu Lestari',
            avatar: '/api/placeholder/40/40',
            date: '17 Januari 2024',
            content: 'Saya lewat sini tadi pagi, situasinya masih sama.',
            media: [
                'https://images.unsplash.com/photo-1584395630827-860eee694d7b?w=800',
            ],
            replies: [],
        },
        {
            id: '4',
            user: 'Bagus Wijaya',
            avatar: '/api/placeholder/40/40',
            date: '18 Januari 2024',
            content: 'Ini video dari warga sekitar.',
            media: [
                'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            ],
            replies: [
                {
                    id: '4-1',
                    user: 'Admin',
                    date: '18 Januari 2024',
                    content: 'Videonya sangat membantu, terima kasih Bagus!',
                },
            ],
        },
        {
            id: '5',
            user: 'Siti Nurhaliza',
            avatar: '/api/placeholder/40/40',
            date: '18 Januari 2024',
            content: 'Sudah saya laporkan ke pihak berwenang.',
            media: [
                'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700',
            ],
            replies: [],
        },
    ]);

    const handleReplySubmit = (commentId: string) => {
        if (!replyText.trim()) return;
        const newReply = {
            id: `${commentId}-${Date.now()}`,
            user: 'Kamu',
            date: new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }),
            content: replyText,
        };

        setComments((prev) =>
            prev.map((comment) =>
                comment.id === commentId
                    ? {
                          ...comment,
                          replies: [...(comment.replies || []), newReply],
                      }
                    : comment,
            ),
        );
        setReplyText('');
        setReplying(null);
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="text-gray-600 hover:text-emerald-600"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Kembali ke Daftar Laporan
                </Button>
                <div className="space-x-1 text-sm text-gray-500">
                    <span className="cursor-pointer hover:underline">Home</span>
                    <span className="cursor-pointer hover:underline">
                        / Laporan
                    </span>{' '}
                    /<span className="font-medium text-gray-700">Detail</span>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
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
                                                Dilaporkan oleh:{' '}
                                                {report.reporter?.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar
                                                size={16}
                                                className="mr-2"
                                            />
                                            <span>{report.created_at}</span>
                                        </div>
                                        <a
                                            href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex cursor-pointer items-start text-emerald-600 hover:underline md:col-span-2"
                                        >
                                            <LocateFixed
                                                size={16}
                                                className="mr-2 mt-0.5"
                                            />
                                            <span>
                                                {report.latitude} -{' '}
                                                {report.longitude}
                                            </span>
                                        </a>

                                        <div className="flex items-start md:col-span-2">
                                            <MapPin
                                                size={16}
                                                className="mr-2 mt-0.5"
                                            />
                                            <span>
                                                {report.district?.name} ,
                                                {report.city?.name},{' '}
                                                {report.province?.name},{' '}
                                            </span>
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
                            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                {report.media?.map((mediaItem, index) => (
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
                                                alt={`Media laporan ${index + 1}`}
                                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="mb-3 text-lg font-semibold">
                                    Lokasi Detail
                                </h3>
                                <p className="leading-relaxed text-gray-700">
                                    {report.address}
                                </p>
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
                                        if (hasDownvoted)
                                            setHasDownvoted(false);
                                    }}
                                    className={
                                        hasUpvoted
                                            ? 'bg-emerald-600 hover:bg-emerald-700'
                                            : ''
                                    }
                                >
                                    <ThumbsUp size={16} className="mr-2" />
                                    {report.upvotes_count +
                                        (hasUpvoted ? 1 : 0)}
                                </Button>

                                {/* <Button
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
                                </Button> */}
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
                                    {report.mission?.title}
                                </h3>

                                {report.mission?.assignedTo === 'Volunteer' && (
                                    <div className="mb-6">
                                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <span className="text-gray-600">
                                                    Ketua Tim:{' '}
                                                </span>
                                                <span className="font-medium">
                                                    {report.mission?.teamLeader}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">
                                                    Anggota Bergabung:{' '}
                                                </span>
                                                <span className="font-medium">
                                                    {report.mission?.members}{' '}
                                                    orang
                                                </span>
                                            </div>
                                        </div>
                                        {/* <div className="flex gap-3"> */}
                                        <div className="flex flex-col gap-3 sm:flex-row">
                                            <Button
                                                className="bg-emerald-600 hover:bg-emerald-700"
                                                onClick={() =>
                                                    handleOpenModalRegister(
                                                        'ketua',
                                                    )
                                                }
                                            >
                                                Ikut sebagai Ketua Tim
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    handleOpenModalRegister(
                                                        'anggota',
                                                    )
                                                }
                                            >
                                                Ikut sebagai Anggota
                                            </Button>

                                            <ConfirmVolunteerModal
                                                open={modalOpenRegister}
                                                onClose={() =>
                                                    setModalOpenRegister(false)
                                                }
                                                onConfirm={
                                                    handleConfirmRegister
                                                }
                                                role={selectedRole}
                                            />
                                            <>
                                                <Button
                                                    onClick={() =>
                                                        setOpenModalAttendance(
                                                            true,
                                                        )
                                                    }
                                                    className="bg-sky-600 hover:bg-sky-700"
                                                >
                                                    Presensi Kehadiran
                                                </Button>

                                                <AttendanceFormModal
                                                    open={openModalAttendance}
                                                    onClose={() =>
                                                        setOpenModalAttendance(
                                                            false,
                                                        )
                                                    }
                                                    teamLeader="Ian Ale Hansyah"
                                                    members={dummyMembers}
                                                />
                                            </>
                                        </div>
                                    </div>
                                )}
                                {/* Mission Documentation */}
                                {report.mission?.documentation && (
                                    <div>
                                        <h4 className="mb-3 font-semibold">
                                            Dokumentasi Misi
                                        </h4>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {report.mission?.documentation.map(
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
                                    Bantu penanganan masalah ini dengan
                                    memberikan donasi
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
                </div>

                <div className="space-y-6">
                    {/* Comments Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <MessageCircle size={20} className="mr-2" />
                                Diskusi ({comments.length} komentar)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
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

                                            {/* Media (Image / Video) */}
                                            {comment.media?.length > 0 && (
                                                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    {comment.media.map(
                                                        (url, idx) => {
                                                            const isVideo =
                                                                url.match(
                                                                    /\.(mp4|webm|ogg)$/i,
                                                                );
                                                            return isVideo ? (
                                                                <video
                                                                    key={idx}
                                                                    src={url}
                                                                    controls
                                                                    preload="metadata"
                                                                    className="w-full rounded-lg"
                                                                />
                                                            ) : (
                                                                <img
                                                                    key={idx}
                                                                    src={url}
                                                                    alt={`Media ${idx + 1}`}
                                                                    className="w-full rounded-lg object-cover"
                                                                />
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            )}

                                            {/* Replies */}
                                            {comment.replies &&
                                                comment.replies.length > 0 && (
                                                    <div className="mt-3 space-y-2 border-l-2 border-gray-200 pl-4">
                                                        {comment.replies.map(
                                                            (reply) => (
                                                                <div
                                                                    key={
                                                                        reply.id
                                                                    }
                                                                >
                                                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                                        <span className="font-medium">
                                                                            {
                                                                                reply.user
                                                                            }
                                                                        </span>
                                                                        <span className="text-xs text-gray-500">
                                                                            {
                                                                                reply.date
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-sm text-gray-700">
                                                                        {
                                                                            reply.content
                                                                        }
                                                                    </p>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                )}

                                            {/* Reply Button & Form */}
                                            <button
                                                onClick={() =>
                                                    setReplying(
                                                        replying === comment.id
                                                            ? null
                                                            : comment.id,
                                                    )
                                                }
                                                className="mt-2 text-sm text-emerald-600 hover:underline"
                                            >
                                                Balas
                                            </button>

                                            {replying === comment.id && (
                                                <div className="mt-2">
                                                    <Textarea
                                                        rows={2}
                                                        placeholder="Tulis balasan..."
                                                        value={replyText}
                                                        onChange={(e) =>
                                                            setReplyText(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                    <div className="mt-1 flex justify-end">
                                                        <Button
                                                            size="sm"
                                                            onClick={() =>
                                                                handleReplySubmit(
                                                                    comment.id,
                                                                )
                                                            }
                                                            className="bg-emerald-600 hover:bg-emerald-700"
                                                        >
                                                            Kirim Balasan
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <CommentUploadCard />
                </div>
            </div>
        </div>
    );
};

export default ReportDetailsPage;
