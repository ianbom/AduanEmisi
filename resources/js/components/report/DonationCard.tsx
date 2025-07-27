import React, { useMemo, useState } from 'react';
import { Heart, ChevronDown, ChevronUp, Users, DollarSign, X, Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { router as Inertia } from '@inertiajs/react';

// --- Tipe Data (Sangat penting untuk TypeScript) ---
interface Donor {
    id: number;
    name: string;
    profile_url?: string | null;
}

interface Donation {
    id: number;
    amount: number;
    created_at: string;
    user: Donor;
}

interface DonationCardProps {
    donations: Donation[];
    reportId: number;
}

// --- Helper Functions ---
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

// Clean Modal Component sesuai design
const DonationModal = ({ isOpen, onClose, onSubmit, loading }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (amount: number) => void;
    loading: boolean;
}) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const predefinedAmounts = [25000, 50000, 100000, 250000, 500000, 1000000];

    const handleSubmit = () => {
        const numAmount = parseInt(amount.replace(/\D/g, ''));

        if (!numAmount || numAmount < 10000) {
            setError('Minimal donasi adalah Rp 10.000');
            return;
        }

        setError('');
        onSubmit(numAmount);
    };

    const handleAmountChange = (value: string) => {
        const cleanValue = value.replace(/\D/g, '');
        setAmount(cleanValue);
        setError('');
    };

    const formatInputCurrency = (value: string) => {
        if (!value) return '';
        const number = parseInt(value.replace(/\D/g, ''));
        return number.toLocaleString('id-ID');
    };

    if (!isOpen) return null;

    return (
         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl flex overflow-hidden transform transition-all duration-300 scale-100">
                {/* Bagian Kiri: Gambar Laporan */}
                <div className="hidden md:block md:w-1/2 bg-gray-200">
                    <img
                        src={'/donasi.jpg'} // Gunakan gambar dari prop atau fallback
                        alt="Donation context"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Bagian Kanan: Form Donasi */}
                <div className="w-full md:w-1/2 p-8 flex flex-col">
                    <div className="flex-grow">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                <Gift className="h-6 w-6 mr-3 text-emerald-600" />
                                Jumlah Donasi
                            </h3>
                        </div>

                        {/* Input Jumlah Donasi */}
                        <div className="relative mb-4">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                Rp
                            </span>
                            <input
                                type="text"
                                value={formatInputCurrency(amount)}
                                onChange={(e) => handleAmountChange(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg text-gray-800"
                                placeholder="0"
                                disabled={loading}
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-red-600 mb-4">{error}</p>
                        )}

                        {/* Pilihan Cepat */}
                        <div className="mb-8">
                            <p className="text-sm font-medium text-gray-600 mb-3 flex items-center">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                                Pilihan Cepat:
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {predefinedAmounts.map((preAmount) => (
                                    <button
                                        key={preAmount}
                                        type="button"
                                        onClick={() => { setAmount(preAmount.toString()); setError(''); }}
                                        className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200
                                            ${parseInt(amount) === preAmount ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-gray-300 hover:bg-emerald-50 hover:border-emerald-400'}`}
                                        disabled={loading}
                                    >
                                        {formatCurrency(preAmount).replace(/\s*Rp/g, '')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tombol Aksi di Bawah */}
                    <div className="mt-auto space-y-3">
                        <Button
                            onClick={handleSubmit}
                            disabled={loading || !amount}
                            className="w-full py-3 h-auto bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold text-base"
                        >
                            {loading ? (
                                <div className="flex items-center"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" /><span>Memproses...</span></div>
                            ) : (
                                <><Heart className="h-5 w-5 mr-2" /><span>Donasi Sekarang</span></>
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={loading}
                            className="w-full py-3 h-auto rounded-lg border-gray-300 hover:bg-gray-100 font-medium"
                        >
                            Batal
                        </Button>
                         <p className="text-xs text-gray-500 text-center pt-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 inline-block"></span>
                            Donasi Anda akan langsung disalurkan untuk penanganan
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function DonationCard({ donations, reportId }: DonationCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // --- Kalkulasi Data dari Props menggunakan useMemo untuk efisiensi ---
    const { totalAmount, totalDonors } = useMemo(() => {
        const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
        return {
            totalAmount: total,
            totalDonors: donations.length,
        };
    }, [donations]);

    const handleDonateSubmit = async (amount: number) => {
        setLoading(true);
        try {
            await Inertia.post(route('report.donate', reportId), {
                amount: amount
            }, {
                onSuccess: () => {
                    setModalOpen(false);
                    setLoading(false);
                },
                onError: () => {
                    setLoading(false);
                }
            });
        } catch (error) {
            setLoading(false);
            console.error('Error submitting donation:', error);
        }
    };

    return (
        <>
            <Card className="bg-gradient-to-r from-emerald-50 to-green-50">
                <CardContent className="p-6">
                    <div className="text-center">
                        <Heart className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
                        <h3 className="mb-2 text-xl font-semibold">
                            Donasi untuk Penanganan
                        </h3>
                        <p className="mb-4 text-gray-600">
                            Bantu penanganan masalah ini dengan memberikan donasi
                        </p>

                        {/* Donation Statistics */}
                        <div className="mb-6 grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-white/70 p-4">
                                <div className="flex items-center justify-center mb-2">
                                    <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
                                    <span className="text-sm font-medium text-gray-600">Total Donasi</span>
                                </div>
                                <p className="text-lg font-bold text-emerald-700">
                                    {formatCurrency(totalAmount)}
                                </p>
                            </div>
                            <div className="rounded-lg bg-white/70 p-4">
                                <div className="flex items-center justify-center mb-2">
                                    <Users className="h-5 w-5 text-emerald-600 mr-2" />
                                    <span className="text-sm font-medium text-gray-600">Donatur</span>
                                </div>
                                <p className="text-lg font-bold text-emerald-700">
                                    {totalDonors} Orang
                                </p>
                            </div>
                        </div>

                        {/* Donor List */}
                        {totalDonors > 0 && (
                            <div>
                                <button
                                    className="flex items-center justify-center w-full mb-4 text-sm text-emerald-700 hover:text-emerald-800 transition-colors"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <Users className="h-4 w-4 mr-2" />
                                    {isOpen ? 'Sembunyikan' : 'Lihat'} Daftar Donatur
                                    {isOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                                </button>

                                {isOpen && (
                                    <div className="mb-6">
                                        <div className="max-h-64 overflow-y-auto">
                                            <div className="space-y-3">
                                                {donations.map((donation) => (
                                                    <div
                                                        key={donation.id}
                                                        className="flex items-center justify-between bg-white/70 rounded-lg p-3 text-left"
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            <div className="flex-shrink-0">
                                                                {donation.user.profile_url ? (
                                                                    <img
                                                                        className="h-8 w-8 rounded-full object-cover"
                                                                        src={`/storage/${donation.user.profile_url}`}
                                                                        alt={donation.user.name}
                                                                    />
                                                                ) : (
                                                                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                                                        <span className="text-xs font-medium text-emerald-700">
                                                                            {getInitials(donation.user.name)}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                                    {donation.user.name}
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    {formatDate(donation.created_at)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-semibold text-emerald-700">
                                                                {formatCurrency(donation.amount)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <Button
                            size="lg"
                            className="bg-emerald-600 hover:bg-emerald-700 w-full"
                            onClick={() => setModalOpen(true)}
                        >
                            <Heart className="h-4 w-4 mr-2" />
                            Donasi Sekarang
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <DonationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleDonateSubmit}
                loading={loading}
            />
        </>
    );
}
