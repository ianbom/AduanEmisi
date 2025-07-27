import React, { useMemo, useState } from 'react';
import { Heart, ChevronDown, ChevronUp, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { router as Inertia } from '@inertiajs/react';

// --- Tipe Data (Sangat penting untuk TypeScript) ---
interface Donor {
    id: number;
    name: string;
    profile_url?: string | null; // Sesuaikan dengan field avatar Anda
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

export function DonationCard({ donations, reportId }: DonationCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    // --- Kalkulasi Data dari Props menggunakan useMemo untuk efisiensi ---
    const { totalAmount, totalDonors } = useMemo(() => {
        const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
        return {
            totalAmount: total,
            totalDonors: donations.length,
        };
    }, [donations]);

    const handleDonateClick = () => {
        // Asumsi Anda memiliki route bernama 'donations.create'
        // dan ia menerima 'report_id'
        Inertia.get(route('donations.create', { report_id: reportId }));
    };

    return (
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

                    {/* Donation Statistics (menggunakan data yang dihitung) */}
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

                    {/* Donor List (hanya tampil jika ada donatur) */}
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
                        onClick={handleDonateClick} // Menjadi fungsional
                    >
                        <Heart className="h-4 w-4 mr-2" />
                        Donasi Sekarang
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

