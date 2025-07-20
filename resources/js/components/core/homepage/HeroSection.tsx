import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

import { ArrowRight, Plus } from 'lucide-react';
const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-700 py-12 text-white">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute inset-0 opacity-20">
                <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-white/10 blur-xl"></div>
                <div className="absolute bottom-20 left-1/4 h-48 w-48 rounded-full bg-emerald-300/10 blur-2xl"></div>
                <div className="absolute right-20 top-1/3 h-40 w-40 rounded-full bg-white/5 blur-xl"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="text-center lg:text-left">
                        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
                            Bersama Menjaga
                            <span className="relative block text-green-200">
                                Lingkungan Indonesia
                                <div className="absolute -bottom-2 left-0 h-1 w-full rounded bg-gradient-to-r from-green-200 to-transparent lg:w-3/4"></div>
                            </span>
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-green-100 md:text-2xl lg:mx-0">
                            Platform kolaboratif untuk melaporkan, mengatasi,
                            dan mencegah masalah lingkungan di seluruh Indonesia
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                            <Link href="/reports/create">
                                <Button
                                    size="lg"
                                    className="bg-white text-green-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-50 hover:shadow-xl"
                                >
                                    <Plus className="mr-2 h-5 w-5" />
                                    Laporkan Isu Sekarang
                                </Button>
                            </Link>
                            <Link href="/reports">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white text-green-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:text-green-600 hover:shadow-xl"
                                >
                                    Lihat Semua Laporan
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        <div className="relative z-10">
                            <div className="rounded-2xl bg-white/50 p-6 shadow-2xl backdrop-blur-sm">
                                <img
                                    src="/assets/images/hero.jpg"
                                    alt="Lingkungan Indonesia"
                                    className="h-80 w-full rounded-xl object-cover shadow-lg"
                                />
                                <div className="absolute -right-4 -top-4 rounded-lg bg-green-200 px-4 py-2 text-sm font-semibold text-green-800 shadow-lg">
                                    🌱 Go Green
                                </div>
                                <div className="absolute -bottom-4 -left-4 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-green-600 shadow-lg">
                                    ♻️ Sustainable
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-emerald-300/20 to-transparent blur-xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
