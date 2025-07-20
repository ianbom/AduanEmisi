import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

('use client');

const faqs = [
    {
        question: 'Bagaimana cara mendaftar sebagai penjual di platform ini?',
        answer: 'Anda dapat menjadi penjual dengan mengisi formulir registrasi toko yang tersedia di platform kami. Setelah itu, tim admin akan memverifikasi data Anda sebelum akun penjual siap digunakan.',
    },
    {
        question: 'Bagaimana sistem pembayaran dan keamanannya?',
        answer: 'Untuk kemudahan dan keamanan transaksi, kami menggunakan layanan pembayaran Midtrans. Anda dapat membayar melalui berbagai metode seperti transfer bank, e-wallet, QRIS, dan kartu kredit.',
    },
    {
        question: 'Berapa lama waktu pengiriman untuk produk lokal?',
        answer: 'Pengiriman disesuaikan dengan lokasi penerima. Estimasi waktu dan ongkos kirim akan muncul saat pemesanan.',
    },
    {
        question:
            'Bagaimana jika saya tidak puas dengan produk/jasa yang diterima?',
        answer: 'Jika Anda merasa tidak puas dengan produk atau layanan yang diterima, Anda dapat memberikan ulasan berisi masukan atau saran perbaikan. Selain itu, Anda juga dapat langsung menghubungi penjual terkait untuk menyampaikan keluhan atau mencari solusi bersama.',
    },
    {
        question:
            'Apakah bisa melakukan pemesanan dalam jumlah besar (grosir)?',
        answer: 'Untuk saat ini, kami belum menyediakan harga khusus untuk pembelian grosir. Namun, Anda tetap bisa memesan dalam jumlah banyak dengan harga normal.',
    },
];

const QnASection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-50/30 to-gray-50 py-20">
            {/* <div className="container relative px-10 mx-auto lg:px-10"> */}
            {/* <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"> */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <div className="mb-6 inline-flex items-center rounded-full border border-emerald-200/50 bg-emerald-100/80 px-4 py-2 text-sm font-medium text-emerald-800 backdrop-blur-sm">
                        Butuh Bantuan ❓
                    </div>
                    <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                        <span className="text-gradient">Pertanyaan</span> yang
                        Sering Diajukan
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        Temukan jawaban atas pertanyaan umum tentang layanan
                        kami. Jika tidak menemukan jawaban yang dicari, silakan
                        hubungi tim support kami.
                    </p>
                </div>

                <div className="mx-auto w-full space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="faq-item floating overflow-hidden rounded-2xl bg-white shadow-lg"
                        >
                            <button
                                className="w-full px-8 py-6 text-left focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="pr-4 text-xl font-bold text-gray-900">
                                        {faq.question}
                                    </h3>
                                    <svg
                                        className={`faq-toggle h-6 w-6 flex-shrink-0 text-black transition-transform duration-300 ${
                                            openIndex === index
                                                ? 'rotate-180'
                                                : ''
                                        }`}
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
                                </div>
                            </button>
                            {openIndex === index && (
                                <div className="faq-content bg-blue-50 px-8 pb-6 text-lg leading-relaxed text-gray-600">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="rounded-2xl bg-emerald-600 p-8 py-16 text-white shadow-lg">
                        <h3 className="mb-4 text-3xl font-bold text-white">
                            Bergabunglah dengan Gerakan Lingkungan
                        </h3>
                        <p className="mb-6 leading-relaxed text-white">
                            Ribuan warga Indonesia telah bergabung. Saatnya Anda
                            menjadi bagian dari solusi!{' '}
                        </p>
                        <Link href="/dashboard">
                            {' '}
                            {/* Gunakan 'href' bukan 'to' */}
                            <Button
                                size="lg"
                                className="bg-white text-green-600 hover:bg-green-50"
                            >
                                Lihat Dashboard Saya
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QnASection;
