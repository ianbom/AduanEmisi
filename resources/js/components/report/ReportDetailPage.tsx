import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Report } from '@/types/report';
import { Comment } from '@/types/report/comment';
import { User } from '@/types/user/interface';
import { formatFullDateTime } from '@/utils/formatDate';
import { getStatusColor as getMissionStatusColor } from '@/utils/missionStatusColor';
import { getStatusColor } from '@/utils/reportStatusColor';
import { router as Inertia, useForm } from '@inertiajs/react';
import axios from 'axios';
import {
    ArrowLeft,
    Calendar,
    Heart,
    LocateFixed,
    MapPin,
    MessageCircle,
    Share2,
    ThumbsDown,
    ThumbsUp,
    User as UserIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Badge from '../core/Badge';
import ImageWithPopup from '../core/ImageWithPopup';
import AttendanceFormModal from '../mission/AttendanceFormModal';
import CancelVolunteerModal from '../mission/CancelVolunteerModal';
import ConfirmVolunteerAsCommunityModal from '../mission/ConfirmVolunteerAsCommunityModal';
import ConfirmVolunteerModal from '../mission/ConfirmVolunteerModal';
import UploadDocumentationModal from '../mission/UploadDocumentationModal';
import CommentUploadCard from './InputCommentReport';
interface Leader {
    id: number;
    name: string;
}

interface ReportDetailPageProps {
    report: Report;
    myParticipation:
        | (User & {
              pivot: {
                  is_leader: boolean;
                  participation_status:
                      | 'pending'
                      | 'confirmed'
                      | 'cancelled'
                      | 'attended';
                  certificate_url: string | null;
                  awarded_at: string | null;
              };
          })
        | null;
    confirmedLeader: User | null;
    comments: Comment[];
    volunteers: User[];
    volunteerCounts: number;
    your_vote: 'upvote' | 'dislike' | null;
    user: User[] | null;
    onBack: () => void;
}

const ReportDetailPage = ({
    report,
    onBack,
    myParticipation,
    confirmedLeader,
    comments,
    volunteers,
    volunteerCounts,
    user,
    your_vote,
}: ReportDetailPageProps) => {
    const [hasUpvoted, setHasUpvoted] = useState(your_vote === 'upvote');
    const [hasDownvoted, setHasDownvoted] = useState(your_vote === 'dislike');
    const [reportState, setReport] = useState(report);
    const [replying, setReplying] = useState<string | number | null>(null);
    console.log(confirmedLeader);
    const {
        data: replyData,
        setData: setReplyData,
        post: postReply,
        processing: processingReply,
        // errors: replyErrors,
        reset: resetReply,
    } = useForm({
        comment: '',
        report_id: report.id,
        reply_id: null as string | number | null,
    });
    const [showAll, setShowAll] = useState(false);
    const INITIAL_COMMENTS_COUNT = 4;
    const [showAllDocs, setShowAllDocs] = useState(false);
    const INITIAL_DOCS_COUNT = 3;
    const groupedDocs = report.mission?.documentation.reduce(
        (acc, doc) => {
            if (!acc[doc.content]) acc[doc.content] = [];
            acc[doc.content].push(doc);
            return acc;
        },
        {} as Record<string, typeof report.mission.documentation>,
    );
    const docEntries = Object.entries(groupedDocs || {});
    const displayedDocs = showAllDocs
        ? docEntries
        : docEntries.slice(0, INITIAL_DOCS_COUNT);
    const hasMoreDocs = docEntries.length > INITIAL_DOCS_COUNT;
    const displayedComments = showAll
        ? comments
        : comments.slice(0, INITIAL_COMMENTS_COUNT);
    const hasMoreComments = comments.length > INITIAL_COMMENTS_COUNT;
    const [openModalAttendance, setOpenModalAttendance] = useState(false);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [modalOpenRegister, setModalOpenRegister] = useState(false);
    const [showCommunityModal, setShowCommunityModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState<'ketua' | 'anggota'>(
        'anggota',
    );

    console.log('myParticipation:', myParticipation);
    console.log('ini komen', comments);
    const handleOpenModalRegister = (role: 'ketua' | 'anggota') => {
        setSelectedRole(role);
        setModalOpenRegister(true);
    };
    const handleOpenModalRegisterAsCommunity = () => {
        setShowCommunityModal(true);
    };
    const handleCancel = () => {
        Inertia.delete(route('volunteer.cancel', report.mission?.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Pendaftaran berhasil dibatalkan');
                setOpenCancelModal(false);
            },
            onError: () => {
                toast.error('Gagal membatalkan pendaftaran');
            },
        });
    };

    const handleVote = async (type: 'upvote' | 'dislike') => {
        console.log('Handle Vote Triggered:', type);
        try {
            const response = await axios.post(`/reports/${report.id}/vote`, {
                vote_type: type,
            });

            const { upvotes_count, dislikes_count, your_vote } = response.data;
            console.log('Vote response:', response.data);
            console.log('Type:', type);
            console.log('New your_vote:', your_vote);

            setReport((prev) => ({
                ...prev,
                upvotes_count,
                dislikes_count,
            }));

            setHasUpvoted(your_vote === 'upvote');
            setHasDownvoted(your_vote === 'dislike');
        } catch (err) {
            console.error(err);
            alert('Vote gagal');
        }
    };

    const handleConfirmRegister = () => {
        setModalOpenRegister(false);
        const isLeader = selectedRole === 'ketua';
        Inertia.post(
            `/join-missions/${report.mission?.id}`,
            {
                is_leader: isLeader,
            },
            {
                onSuccess: () => {
                    console.log('Berhasil mendaftar');
                    console.log('myParticipation:', myParticipation);
                },
                onError: (errors) => {
                    console.error(errors);
                },
            },
        );
    };
    const handleConfirmRegisterAsCommunity = () => {
        setShowCommunityModal(false);
        Inertia.post(
            `/join-missions/${report.mission?.id}`,
            {
                is_leader: true,
            },
            {
                onSuccess: () => {
                    console.log('Berhasil mendaftar sebagai komunitas');
                    console.log('myParticipation:', myParticipation);
                },
                onError: (errors) => {
                    console.error(errors);
                },
            },
        );
    };

    const handleReplySubmit = () => {
        // `replyData` sudah berisi `reply_id` yang benar
        postReply(route('comments.store'), {
            onSuccess: () => {
                resetReply('comment', 'reply_id'); // Reset form
                setReplying(null); // Tutup form balasan
            },
            preserveScroll: true,
        });
    };

    const formatCommentDate = (dateString: string) => {
        try {
            return formatFullDateTime(dateString);
        } catch (error) {
            return dateString;
        }
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
                                        <Badge className="border border-gray-400 bg-white text-gray-700">
                                            {report.category}
                                        </Badge>
                                        <Badge
                                            className={getStatusColor(
                                                report.status,
                                            )}
                                        >
                                            {report.status}
                                        </Badge>
                                        {report.mission && (
                                            <Badge className="bg-indigo-100 text-indigo-700">
                                                Ada Misi
                                            </Badge>
                                        )}
                                    </div>

                                    <h1 className="mb-4 text-3xl font-bold text-gray-900">
                                        {report.title}
                                    </h1>

                                    <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2">
                                        <div className="flex items-center">
                                            <UserIcon
                                                size={16}
                                                className="mr-2"
                                            />
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
                                            <span>
                                                {formatFullDateTime(
                                                    report.created_at,
                                                )}
                                            </span>
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
                                                {report.district?.name},{' '}
                                                {report.city?.name},{' '}
                                                {report.province?.name}
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
                            <h3 className="mb-3 text-lg font-semibold">
                                Media Pendukung
                            </h3>
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
                                                className="h-full w-full object-contain"
                                                src={`/storage/${mediaItem.media_url}`}
                                            />
                                        ) : (
                                            <ImageWithPopup
                                                src={`/storage/${mediaItem.media_url}`}
                                                alt={`Media laporan ${index + 1}`}
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
                                {/* Tombol Upvote */}
                                <button
                                    onClick={() => handleVote('upvote')}
                                    className={`flex items-center rounded-md border px-3 py-2 transition-colors ${
                                        hasUpvoted
                                            ? 'border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700'
                                            : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                                    } `}
                                >
                                    <ThumbsUp size={16} className="mr-2" />
                                    {reportState.upvotes_count}
                                </button>

                                {/* Tombol Downvote */}
                                <button
                                    onClick={() => handleVote('dislike')}
                                    className={`flex items-center rounded-md border px-3 py-2 transition-colors ${
                                        hasDownvoted
                                            ? 'border-red-600 bg-red-600 text-white hover:bg-red-700'
                                            : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                                    } `}
                                >
                                    <ThumbsDown size={16} className="mr-2" />
                                    {reportState.dislikes_count}
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Mission Section */}
                    {report.mission && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-emerald-700">
                                    Misi Terkait
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-3 flex flex-wrap gap-2">
                                    <Badge
                                        className={getMissionStatusColor(
                                            report.mission?.status,
                                        )}
                                    >
                                        {report.mission?.status}
                                    </Badge>
                                </div>
                                <h1 className="mb-4 text-3xl font-bold text-gray-900">
                                    {report.mission?.title}
                                </h1>
                                <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2">
                                    <div className="flex items-center">
                                        <UserIcon size={16} className="mr-2" />
                                        <span>
                                            Misi dibuat oleh:{' '}
                                            {report.mission?.creator?.name}
                                        </span>
                                    </div>
                                    <div className="flex items-start md:col-span-2">
                                        <Calendar
                                            size={16}
                                            className="mr-2 mt-0.5"
                                        />
                                        <span>
                                            Misi dibuat:{' '}
                                            {formatFullDateTime(
                                                report.mission?.created_at,
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-start md:col-span-2">
                                        <Calendar
                                            size={16}
                                            className="mr-2 mt-0.5"
                                        />
                                        <span>
                                            Misi terjadwal:{' '}
                                            {formatFullDateTime(
                                                report.mission?.scheduled_date,
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="my-6">
                                    <h3 className="mb-3 text-lg font-semibold">
                                        Deskripsi Misi
                                    </h3>
                                    <p className="leading-relaxed text-gray-700">
                                        {report.mission.description}
                                    </p>
                                </div>

                                {report.status === 'under-authority' ? (
                                    <div className="my-6">
                                        <Badge className="mb-3 bg-yellow-300 text-lg font-semibold text-black">
                                            Misi Khusus Pihak Berwenang
                                        </Badge>
                                        <p className="text-gray-700">
                                            Misi ini ditangani oleh otoritas
                                            terkait dan tidak terbuka untuk
                                            partisipasi umum.
                                        </p>
                                    </div>
                                ) : report.mission?.volunteers ? (
                                    <div className="mb-6">
                                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                {/* <span className="text-gray-600">
                                                    Ketua Tim:{' '}
                                                    {confirmedLeader
                                                        ? confirmedLeader.name
                                                        : 'Belum ada'}
                                                </span>
                                                <span className="font-medium">
                                                    {
                                                        report.mission
                                                            ?.volunteers
                                                            ?.is_leader
                                                    }
                                                </span> */}
                                                <span className="font-medium text-gray-600">
                                                    Ketua Tim:
                                                </span>
                                                {confirmedLeader.length > 0 ? (
                                                    <ul className="ml-5 list-disc text-gray-700">
                                                        {confirmedLeader.map(
                                                            (
                                                                leader: Leader,
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        leader.id
                                                                    }
                                                                >
                                                                    {
                                                                        leader.name
                                                                    }
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                ) : (
                                                    <span className="ml-2 text-gray-500">
                                                        Belum ada
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <span className="text-gray-600">
                                                    Anggota Bergabung:{' '}
                                                    {volunteerCounts || 0}
                                                </span>
                                                <span className="font-medium">
                                                    {report.mission?.volunteers
                                                        ?.is_leader ==
                                                        false}{' '}
                                                    orang
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 sm:flex-row">
                                            {myParticipation == null && (
                                                <>
                                                    {user?.role ===
                                                    'community' ? (
                                                        <Button
                                                            variant="outline"
                                                            className="bg-yellow-400 text-black hover:bg-black hover:text-yellow-400"
                                                            onClick={
                                                                handleOpenModalRegisterAsCommunity
                                                            }
                                                        >
                                                            Daftar sebagai
                                                            Komunitas
                                                        </Button>
                                                    ) : (
                                                        <>
                                                            <Button
                                                                onClick={() =>
                                                                    handleOpenModalRegister(
                                                                        'ketua',
                                                                    )
                                                                }
                                                            >
                                                                Ikut sebagai
                                                                Ketua Tim
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                onClick={() =>
                                                                    handleOpenModalRegister(
                                                                        'anggota',
                                                                    )
                                                                }
                                                            >
                                                                Ikut sebagai
                                                                Anggota
                                                            </Button>
                                                        </>
                                                    )}
                                                </>
                                            )}

                                            {myParticipation && (
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Kamu sudah mendaftar sebagai{' '}
                                                    <strong>
                                                        {myParticipation.pivot
                                                            .is_leader
                                                            ? 'Ketua'
                                                            : 'Anggota'}{' '}
                                                    </strong>
                                                    (
                                                    {
                                                        myParticipation.pivot
                                                            .participation_status
                                                    }
                                                    )
                                                </p>
                                            )}

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
                                            <ConfirmVolunteerAsCommunityModal
                                                open={showCommunityModal}
                                                onClose={() =>
                                                    setShowCommunityModal(false)
                                                }
                                                onConfirm={
                                                    handleConfirmRegisterAsCommunity
                                                }
                                            />

                                            {myParticipation &&
                                                [
                                                    'pending',
                                                    'confirmed',
                                                ].includes(
                                                    myParticipation.pivot
                                                        .participation_status,
                                                ) && (
                                                    <>
                                                        <Button
                                                            onClick={() =>
                                                                setOpenCancelModal(
                                                                    true,
                                                                )
                                                            }
                                                            variant="destructive"
                                                        >
                                                            Batal Daftar
                                                        </Button>
                                                        <CancelVolunteerModal
                                                            open={
                                                                openCancelModal
                                                            }
                                                            onClose={() =>
                                                                setOpenCancelModal(
                                                                    false,
                                                                )
                                                            }
                                                            onConfirm={
                                                                handleCancel
                                                            }
                                                            is_leader={
                                                                myParticipation
                                                                    .pivot
                                                                    .is_leader
                                                            }
                                                        />
                                                    </>
                                                )}
                                        </div>

                                        {myParticipation &&
                                            myParticipation.pivot
                                                .participation_status !==
                                                'cancelled' &&
                                            myParticipation.pivot.is_leader && (
                                                <Button
                                                    onClick={() =>
                                                        setOpenModalAttendance(
                                                            true,
                                                        )
                                                    }
                                                    className="my-2 bg-sky-600 hover:bg-sky-700"
                                                >
                                                    Presensi Kehadiran
                                                </Button>
                                            )}

                                        <AttendanceFormModal
                                            open={openModalAttendance}
                                            onClose={() =>
                                                setOpenModalAttendance(false)
                                            }
                                            missionId={report.mission?.id}
                                            teamLeader={
                                                confirmedLeader &&
                                                confirmedLeader.length > 0
                                                    ? confirmedLeader
                                                          .map(
                                                              (
                                                                  leader: Leader,
                                                              ) => leader.name,
                                                          )
                                                          .join(', ')
                                                    : 'Belum ditentukan'
                                            }
                                            members={volunteers}
                                        />
                                    </div>
                                ) : null}
                                {report.mission?.documentation && (
                                    <div>
                                        {report.status !==
                                            'under-authority' && (
                                            <h3 className="mb-3 text-lg font-semibold">
                                                Dokumentasi Misi
                                            </h3>
                                        )}

                                        {myParticipation &&
                                            myParticipation.pivot.is_leader &&
                                            ['confirmed', 'attended'].includes(
                                                myParticipation.pivot
                                                    .participation_status,
                                            ) && (
                                                <>
                                                    <Button
                                                        onClick={() =>
                                                            setOpenUploadModal(
                                                                true,
                                                            )
                                                        }
                                                    >
                                                        Upload Dokumentasi
                                                    </Button>
                                                    <UploadDocumentationModal
                                                        open={openUploadModal}
                                                        onClose={() =>
                                                            setOpenUploadModal(
                                                                false,
                                                            )
                                                        }
                                                        missionId={
                                                            report.mission?.id
                                                        }
                                                    />
                                                </>
                                            )}
                                        <div className="space-y-6">
                                            <div
                                                className={`space-y-6 ${showAllDocs ? 'max-h-96 overflow-y-auto pr-2' : ''}`}
                                            >
                                                {displayedDocs.map(
                                                    (
                                                        [content, docs],
                                                        index,
                                                    ) => (
                                                        <div
                                                            key={index}
                                                            className="my-2 rounded-xl border border-gray-300 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
                                                        >
                                                            {/* Media Grid */}
                                                            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                                {docs.map(
                                                                    (
                                                                        doc,
                                                                        idx,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="space-y-2"
                                                                        >
                                                                            {doc.media_type ===
                                                                            'video' ? (
                                                                                <div className="group relative">
                                                                                    <video
                                                                                        src={`/storage/${doc.media_url}`}
                                                                                        controls
                                                                                        preload="metadata"
                                                                                        className="aspect-video w-full rounded-lg border border-gray-200 shadow-sm"
                                                                                    />
                                                                                    <div className="absolute right-2 top-2 rounded bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
                                                                                        Video
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="group relative">
                                                                                    <div className="mx-auto w-full max-w-[200px]">
                                                                                        <ImageWithPopup
                                                                                            src={`/storage/${doc.media_url}`}
                                                                                            alt={`Media dokumentasi ${idx + 1}`}
                                                                                            className="h-auto w-full rounded-lg border border-gray-200 object-cover shadow-sm transition-shadow duration-200 hover:shadow-md"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="absolute right-2 top-2 rounded bg-black bg-opacity-50 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                                                                        {idx +
                                                                                            1}

                                                                                        /
                                                                                        {
                                                                                            docs.length
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>

                                                            {/* Documentation Details */}
                                                            <div className="space-y-3">
                                                                <div className="flex items-start space-x-2">
                                                                    <div className="flex-1">
                                                                        <h4 className="mb-2 text-sm font-semibold text-gray-800">
                                                                            Keterangan
                                                                            Dokumentasi
                                                                        </h4>
                                                                        <p className="text-sm leading-relaxed text-gray-700">
                                                                            {
                                                                                content
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                {/* Metadata */}
                                                                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                                                    <div className="flex items-center space-x-4">
                                                                        <div className="flex items-center space-x-2">
                                                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                                                                                <span className="text-xs font-medium text-emerald-700">
                                                                                    {
                                                                                        docs[0]
                                                                                            .uploader
                                                                                            .name[0]
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <span className="text-sm font-medium text-gray-700">
                                                                                {
                                                                                    docs[0]
                                                                                        .uploader
                                                                                        .name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                                            <svg
                                                                                className="h-3 w-3"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={
                                                                                        2
                                                                                    }
                                                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                                />
                                                                            </svg>
                                                                            <span>
                                                                                {formatFullDateTime(
                                                                                    docs[0]
                                                                                        .created_at,
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <span className="rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-500">
                                                                            {
                                                                                docs.length
                                                                            }{' '}
                                                                            file
                                                                            {docs.length >
                                                                            1
                                                                                ? 's'
                                                                                : ''}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>

                                            {/* Show more/less button */}
                                            {hasMoreDocs && (
                                                <div className="flex justify-center border-t border-gray-100 pt-4">
                                                    <button
                                                        onClick={() =>
                                                            setShowAllDocs(
                                                                !showAllDocs,
                                                            )
                                                        }
                                                        className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-emerald-600 transition-colors duration-200 hover:bg-emerald-50 hover:text-emerald-700"
                                                    >
                                                        {showAllDocs ? (
                                                            <>
                                                                <svg
                                                                    className="mr-2 h-4 w-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M5 15l7-7 7 7"
                                                                    />
                                                                </svg>
                                                                Lihat Sedikit
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg
                                                                    className="mr-2 h-4 w-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M19 9l-7 7-7-7"
                                                                    />
                                                                </svg>
                                                                Lihat Semua (
                                                                {
                                                                    docEntries.length
                                                                }{' '}
                                                                dokumentasi)
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
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
                                <div
                                    className={`space-y-4 ${showAll ? 'max-h-96 overflow-y-auto pr-2' : ''}`}
                                >
                                    {displayedComments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
                                        >
                                            <div className="flex space-x-4">
                                                <Avatar className="h-10 w-10 ring-2 ring-gray-100">
                                                    <AvatarImage
                                                        src={
                                                            comment.user
                                                                .profile_url
                                                        }
                                                        className="object-cover"
                                                    />
                                                    <AvatarFallback className="bg-emerald-100 font-semibold text-emerald-700">
                                                        {comment.user.name[0]}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div className="min-w-0 flex-1">
                                                    {/* User info */}
                                                    <div className="mb-3 flex items-center space-x-3">
                                                        <span className="font-semibold text-gray-900">
                                                            {comment.user.name}
                                                        </span>
                                                        <span className="rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-500">
                                                            {formatCommentDate(
                                                                comment.created_at,
                                                            )}
                                                        </span>
                                                    </div>

                                                    {/* Comment text */}
                                                    <p className="mb-4 leading-relaxed text-gray-700">
                                                        {comment.comment}
                                                    </p>

                                                    {/* Media */}
                                                    {comment.media_url && (
                                                        <div className="mb-4">
                                                            {comment.media_type ===
                                                            'video' ? (
                                                                <video
                                                                    src={`/storage/${comment.media_url}`}
                                                                    controls
                                                                    preload="metadata"
                                                                    className="aspect-video w-full max-w-md rounded-lg border border-gray-200 shadow-sm"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={`/storage/${comment.media_url}`}
                                                                    alt={`Media untuk komentar`}
                                                                    className="max-h-64 w-auto rounded-lg border border-gray-200 object-cover shadow-sm"
                                                                />
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Replies */}
                                                    {comment.replies &&
                                                        comment.replies.length >
                                                            0 && (
                                                            <div className="ml-2 mt-4 space-y-3 border-l-2 border-emerald-100 pl-4">
                                                                {comment.replies.map(
                                                                    (reply) => (
                                                                        <div
                                                                            key={
                                                                                reply.id
                                                                            }
                                                                            className="flex space-x-3 rounded-lg bg-gray-50 p-3"
                                                                        >
                                                                            <Avatar className="h-7 w-7 ring-1 ring-gray-200">
                                                                                <AvatarImage
                                                                                    src={
                                                                                        reply
                                                                                            .user
                                                                                            .profile_url
                                                                                    }
                                                                                    className="object-cover"
                                                                                />
                                                                                <AvatarFallback className="bg-emerald-50 text-xs font-medium text-emerald-600">
                                                                                    {
                                                                                        reply
                                                                                            .user
                                                                                            .name[0]
                                                                                    }
                                                                                </AvatarFallback>
                                                                            </Avatar>
                                                                            <div className="min-w-0 flex-1">
                                                                                <div className="mb-1 flex items-center space-x-2">
                                                                                    <span className="text-sm font-medium text-gray-900">
                                                                                        {
                                                                                            reply
                                                                                                .user
                                                                                                .name
                                                                                        }
                                                                                    </span>
                                                                                    <span className="text-xs text-gray-500">
                                                                                        {formatCommentDate(
                                                                                            reply.created_at,
                                                                                        )}
                                                                                    </span>
                                                                                </div>
                                                                                <p className="text-sm leading-relaxed text-gray-700">
                                                                                    {
                                                                                        reply.comment
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>
                                                        )}

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (
                                                                replying ===
                                                                comment.id
                                                            ) {
                                                                setReplying(
                                                                    null,
                                                                );
                                                            } else {
                                                                setReplying(
                                                                    comment.id,
                                                                );
                                                                setReplyData({
                                                                    ...replyData,
                                                                    reply_id:
                                                                        comment.id,
                                                                    comment: '',
                                                                });
                                                            }
                                                        }}
                                                        className="group mt-3 inline-flex items-center text-sm font-medium text-emerald-600 transition-colors duration-200 hover:text-emerald-700"
                                                    >
                                                        <svg
                                                            className="mr-1 h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                                                            />
                                                        </svg>
                                                        Balas
                                                    </button>
                                                    {replying ===
                                                        comment.id && (
                                                        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                                            <Textarea
                                                                rows={3}
                                                                placeholder={`Balas komentar ${comment.user.name}...`}
                                                                value={
                                                                    replyData.comment
                                                                }
                                                                onChange={(e) =>
                                                                    setReplyData(
                                                                        'comment',
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                className="resize-none border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                                            />
                                                            <div className="mt-3 flex justify-end space-x-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() =>
                                                                        setReplying(
                                                                            null,
                                                                        )
                                                                    }
                                                                    className="text-gray-600 hover:text-gray-700"
                                                                >
                                                                    Batal
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={
                                                                        handleReplySubmit
                                                                    }
                                                                    disabled={
                                                                        processingReply ||
                                                                        !replyData.comment.trim()
                                                                    }
                                                                    className="bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                                                                >
                                                                    {processingReply ? (
                                                                        <div className="flex items-center space-x-2">
                                                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                                                            <span>
                                                                                Mengirim...
                                                                            </span>
                                                                        </div>
                                                                    ) : (
                                                                        'Kirim Balasan'
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {hasMoreComments && (
                                    <div className="flex justify-center border-t border-gray-100 pt-4">
                                        <button
                                            onClick={() => setShowAll(!showAll)}
                                            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-emerald-600 transition-colors duration-200 hover:bg-emerald-50 hover:text-emerald-700"
                                        >
                                            {showAll ? (
                                                <>
                                                    <svg
                                                        className="mr-2 h-4 w-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 15l7-7 7 7"
                                                        />
                                                    </svg>
                                                    Lihat Sedikit
                                                </>
                                            ) : (
                                                <>
                                                    <svg
                                                        className="mr-2 h-4 w-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                    Lihat Semua (
                                                    {comments.length} komentar)
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <CommentUploadCard reportId={report.id} />
                </div>
            </div>
        </div>
    );
};
export default ReportDetailPage;
