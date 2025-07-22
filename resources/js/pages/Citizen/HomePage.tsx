import FeatureSection from '@/components/core/homepage/FeatureSection';
import HeroSection from '@/components/core/homepage/HeroSection';
import QnASection from '@/components/core/homepage/QnASection';
import StatSection from '@/components/core/homepage/StatSection';
import CitizenLayout from '@/components/layouts/CitizenLayout';

const HomePage = () => {
    return (
        <CitizenLayout currentPage="homepage">
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
                {/* Hero Section */}
                {/* <section className="relative overflow-hidden text-white bg-gradient-to-r from-emerald-600 to-emerald-700">
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
                                Platform kolaboratif untuk melaporkan,
                                mengatasi, dan mencegah masalah lingkungan di
                                seluruh Indonesia
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Link href="/reports/create">
                                    {' '}
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
                </section> */}
                <HeroSection />
                <StatSection />
                <FeatureSection />
                <QnASection />
            </div>
        </CitizenLayout>
    );
};

export default HomePage;
