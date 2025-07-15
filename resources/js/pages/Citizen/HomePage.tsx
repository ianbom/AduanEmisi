import { ArrowRight, FileText, Image, Map, Plus } from 'lucide-react';
// Ganti Link dari 'react-router-dom' dengan Link dari '@inertiajs/react'
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
            icon: <FileText className="w-8 h-8 text-green-600" />,
            title: 'Laporkan Isu Lingkungan',
            description:
                'Laporkan masalah lingkungan di sekitar Anda dengan mudah dan cepat',
            link: '/reports/create',
        },
        {
            icon: <Map className="w-8 h-8 text-blue-600" />,
            title: 'Lihat Peta Laporan',
            description:
                'Jelajahi peta interaktif untuk melihat laporan di berbagai daerah',
            link: '/map',
        },
        {
            icon: <Image className="w-8 h-8 text-purple-600" />,
            title: 'Konten Edukasi',
            description:
                'Akses berbagai materi edukasi tentang pelestarian lingkungan',
            link: '/education',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden text-white bg-gradient-to-r from-emerald-600 to-emerald-700">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                            Bersama Menjaga
                            <span className="block text-green-200">
                                Lingkungan Indonesia
                            </span>
                        </h1>
                        <p className="max-w-3xl mx-auto mb-8 text-xl text-green-100 md:text-2xl">
                            Platform kolaboratif untuk melaporkan, mengatasi,
                            dan mencegah masalah lingkungan di seluruh Indonesia
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Link href="/reports/create">
                                {' '}
                                {/* Gunakan 'href' bukan 'to' */}
                                <Button
                                    size="lg"
                                    className="text-green-600 bg-white hover:bg-green-50"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Laporkan Isu Sekarang
                                </Button>
                            </Link>
                            <Link href="/reports">
                                {' '}
                                {/* Gunakan 'href' bukan 'to' */}
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="text-white border-white hover:bg-white hover:text-green-600"
                                >
                                    Lihat Semua Laporan
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
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
            <section className="py-16 bg-gray-50">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                            Mulai Berkontribusi Hari Ini
                        </h2>
                        <p className="max-w-2xl mx-auto text-xl text-gray-600">
                            Pilih cara Anda untuk berpartisipasi dalam menjaga
                            kelestarian lingkungan
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="transition-shadow duration-300 hover:shadow-lg"
                            >
                                <CardContent className="p-6 text-center">
                                    <div className="flex justify-center mb-4">
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
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 text-white bg-emerald-600">
                <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
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
                            className="text-green-600 bg-white hover:bg-green-50"
                        >
                            Lihat Dashboard Saya
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
