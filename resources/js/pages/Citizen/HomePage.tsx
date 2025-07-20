import { ArrowRight, FileText, Image, Map, Plus } from 'lucide-react';
// Ganti Link dari 'react-router-dom' dengan Link dari '@inertiajs/react'
import CitizenLayout from '@/components/layouts/CitizenLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
const HomePage = () => {
    const stats = [
        { label: 'Laporan Aktif', value: '1,247', color: 'text-blue-600' },
        { label: 'Misi Selesai', value: '892', color: 'text-green-600' },
        { label: 'Volunteer Aktif', value: '3,451', color: 'text-purple-600' },
        { label: 'Komunitas', value: '127', color: 'text-orange-600' },
    ];

    const features = [
        {
            icon: <FileText className="h-8 w-8 text-green-600" />,
            title: 'Laporkan Isu Lingkungan',
            description:
                'Laporkan masalah lingkungan di sekitar Anda dengan mudah dan cepat',
            link: '/reports/create',
        },
        {
            icon: <Map className="h-8 w-8 text-blue-600" />,
            title: 'Lihat Peta Laporan',
            description:
                'Jelajahi peta interaktif untuk melihat laporan di berbagai daerah',
            link: '/map',
        },
        {
            icon: <Image className="h-8 w-8 text-purple-600" />,
            title: 'Konten Edukasi',
            description:
                'Akses berbagai materi edukasi tentang pelestarian lingkungan',
            link: '/education',
        },
    ];

    return (
        <CitizenLayout currentPage="homepage">
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                                Bersama Menjaga
                                <span className="block text-green-200">
                                    Lingkungan Indonesia
                                </span>
                            </h1>
                            <p className="mx-auto mb-8 max-w-3xl text-xl text-green-100 md:text-2xl">
                                Platform kolaboratif untuk melaporkan,
                                mengatasi, dan mencegah masalah lingkungan di
                                seluruh Indonesia
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Link href="/reports/create">
                                    {' '}
                                    {/* Gunakan 'href' bukan 'to' */}
                                    <Button
                                        size="lg"
                                        className="bg-white text-green-600 hover:bg-green-50"
                                    >
                                        <Plus className="mr-2 h-5 w-5" />
                                        Laporkan Isu Sekarang
                                    </Button>
                                </Link>
                                <Link href="/reports">
                                    {' '}
                                    {/* Gunakan 'href' bukan 'to' */}
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white text-white hover:bg-white hover:text-green-600"
                                    >
                                        Lihat Semua Laporan
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-white py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div
                                        className={`text-3xl font-bold md:text-4xl ${stat.color} mb-2`}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-600">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                                Mulai Berkontribusi Hari Ini
                            </h2>
                            <p className="mx-auto max-w-2xl text-xl text-gray-600">
                                Pilih cara Anda untuk berpartisipasi dalam
                                menjaga kelestarian lingkungan
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            {features.map((feature, index) => (
                                <Card
                                    key={index}
                                    className="transition-shadow duration-300 hover:shadow-lg"
                                >
                                    <CardContent className="p-6 text-center">
                                        <div className="mb-4 flex justify-center">
                                            {feature.icon}
                                        </div>
                                        <h3 className="mb-3 text-xl font-semibold text-gray-900">
                                            {feature.title}
                                        </h3>
                                        <p className="mb-4 text-gray-600">
                                            {feature.description}
                                        </p>
                                        <Link href={feature.link}>
                                            {' '}
                                            {/* Gunakan 'href' bukan 'to' */}
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                            >
                                                Mulai Sekarang
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-emerald-600 py-16 text-white">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            Bergabunglah dengan Gerakan Lingkungan
                        </h2>
                        <p className="mb-8 text-xl text-green-100">
                            Ribuan warga Indonesia telah bergabung. Saatnya Anda
                            menjadi bagian dari solusi!
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
                </section>
            </div>
        </CitizenLayout>
    );
};

export default HomePage;
