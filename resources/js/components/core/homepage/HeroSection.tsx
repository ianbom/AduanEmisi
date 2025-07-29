// @ts-nocheck
// import { Button } from '@/components/ui/button';
// import { Link } from '@inertiajs/react';

// import { ArrowRight, Plus } from 'lucide-react';
// const HeroSection = () => {
//     return (
//         <section className="relative py-12 overflow-hidden text-white bg-gradient-to-r from-emerald-600 to-emerald-700">
//             <div className="absolute inset-0 bg-black opacity-10"></div>
//             <div className="absolute inset-0 opacity-20">
//                 <div className="absolute w-32 h-32 rounded-full left-10 top-10 bg-white/10 blur-xl"></div>
//                 <div className="absolute w-48 h-48 rounded-full bottom-20 left-1/4 bg-emerald-300/10 blur-2xl"></div>
//                 <div className="absolute w-40 h-40 rounded-full right-20 top-1/3 bg-white/5 blur-xl"></div>
//             </div>

//             <div className="relative px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
//                 <div className="grid items-center gap-12 lg:grid-cols-2">
//                     <div className="text-center lg:text-left">
//                         <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
//                             Bersama Menjaga
//                             <span className="relative block text-green-200">
//                                 Lingkungan Indonesia
//                                 <div className="absolute left-0 w-full h-1 rounded -bottom-2 bg-gradient-to-r from-green-200 to-transparent lg:w-3/4"></div>
//                             </span>
//                         </h1>
//                         <p className="max-w-2xl mx-auto mb-8 text-xl leading-relaxed text-green-100 md:text-2xl lg:mx-0">
//                             Platform kolaboratif untuk melaporkan, mengatasi,
//                             dan mencegah masalah lingkungan di seluruh Indonesia
//                         </p>
//                         <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
//                             <Link href="/reports/create">
//                                 <Button
//                                     size="lg"
//                                     className="text-green-600 transition-all duration-300 bg-white shadow-lg hover:scale-105 hover:bg-green-50 hover:shadow-xl"
//                                 >
//                                     <Plus className="w-5 h-5 mr-2" />
//                                     Laporkan Isu Sekarang
//                                 </Button>
//                             </Link>
//                             <Link href="/reports">
//                                 <Button
//                                     size="lg"
//                                     variant="outline"
//                                     className="text-green-600 transition-all duration-300 border-white shadow-lg hover:scale-105 hover:bg-white hover:text-green-600 hover:shadow-xl"
//                                 >
//                                     Lihat Semua Laporan
//                                     <ArrowRight className="w-5 h-5 ml-2" />
//                                 </Button>
//                             </Link>
//                         </div>
//                     </div>
//                     <div className="relative hidden lg:block">
//                         <div className="relative z-10">
//                             <div className="p-6 shadow-2xl rounded-2xl bg-white/50 backdrop-blur-sm">
//                                 <img
//                                     src="/assets/images/hero.jpg"
//                                     alt="Lingkungan Indonesia"
//                                     className="object-cover w-full shadow-lg h-80 rounded-xl"
//                                 />
//                                 <div className="absolute px-4 py-2 text-sm font-semibold text-green-800 bg-green-200 rounded-lg shadow-lg -right-4 -top-4">
//                                     🌱 Go Green
//                                 </div>
//                                 <div className="absolute px-4 py-2 text-sm font-semibold text-green-600 bg-white rounded-lg shadow-lg -bottom-4 -left-4">
//                                     ♻️ Sustainable
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-emerald-300/20 to-transparent blur-xl"></div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };
// export default HeroSection;
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

import { ArrowRight, Plus } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-700 py-12 text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 opacity-20">
                <div className="absolute left-10 top-10 h-32 w-32 animate-pulse rounded-full bg-white/10 blur-xl"></div>
                <div
                    className="absolute bottom-20 left-1/4 h-48 w-48 animate-bounce rounded-full bg-emerald-300/10 blur-2xl"
                    style={{ animationDuration: '3s' }}
                ></div>
                <div
                    className="absolute right-20 top-1/3 h-40 w-40 animate-pulse rounded-full bg-white/5 blur-xl"
                    style={{ animationDelay: '1s' }}
                ></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="text-center lg:text-left">
                        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                            Bersama Menjaga
                            <span className="animate-fade-in-up relative block text-green-200">
                                Lingkungan Indonesia
                                <div className="absolute -bottom-2 left-0 h-1 w-full animate-pulse rounded bg-gradient-to-r from-green-200 via-green-300 to-transparent lg:w-3/4"></div>
                            </span>
                        </h1>
                        <p
                            className="animate-fade-in mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-green-50/90 md:text-2xl lg:mx-0"
                            style={{ animationDelay: '0.3s' }}
                        >
                            Platform kolaboratif untuk melaporkan, mengatasi,
                            dan mencegah masalah lingkungan di seluruh Indonesia
                        </p>
                        <div
                            className="animate-fade-in-up flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
                            style={{ animationDelay: '0.6s' }}
                        >
                            <Link href="/reports/create">
                                <Button
                                    size="lg"
                                    className="group bg-teal-900 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-50 hover:shadow-xl active:scale-95"
                                >
                                    <Plus className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
                                    Laporkan Isu Sekarang
                                </Button>
                            </Link>
                            <Link href="/reports">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="group border-2 border-white/80 font-semibold text-teal-600 shadow-lg transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white hover:text-emerald-600 hover:shadow-xl active:scale-95"
                                >
                                    Lihat Semua Laporan
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        <div
                            className="animate-fade-in-scale relative z-10"
                            style={{ animationDelay: '0.9s' }}
                        >
                            <div className="group relative rounded-2xl bg-white/20 p-6 shadow-2xl backdrop-blur-md transition-all duration-500 hover:scale-105 hover:bg-white/25">
                                <img
                                    src="/assets/images/hero.jpg"
                                    alt="Lingkungan Indonesia"
                                    className="h-80 w-full rounded-xl object-cover shadow-lg transition-transform duration-500 group-hover:scale-105"
                                />
                                <div
                                    className="absolute -right-6 -top-6 animate-bounce rounded-xl bg-gradient-to-r from-green-200 to-green-300 px-4 py-2 text-sm font-bold text-green-800 shadow-xl backdrop-blur-sm"
                                    style={{ animationDuration: '2s' }}
                                >
                                    🌱 Go Green
                                </div>
                                <div className="absolute -bottom-6 -left-6 animate-pulse rounded-xl bg-white/95 px-4 py-2 text-sm font-bold text-emerald-600 shadow-xl backdrop-blur-sm">
                                    ♻️ Sustainable
                                </div>

                                <div className="absolute -right-2 top-1/2 h-24 w-1 rounded-full bg-gradient-to-b from-green-200 to-transparent opacity-60"></div>
                            </div>
                        </div>
                        <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-bl from-emerald-300/30 via-emerald-400/20 to-transparent blur-xl"></div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out forwards;
                }

                .animate-fade-in-scale {
                    animation: fade-in-scale 1s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;
