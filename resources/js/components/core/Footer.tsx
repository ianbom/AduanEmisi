const Footer = () => {
    return (
        <footer className="relative overflow-hidden bg-green-900 text-white">
            <div className="absolute inset-0 bg-emerald-600"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-16">
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                        <div className="mb-6 flex items-center gap-3">
                            <div>
                                <h3 className="text-2xl font-bold">
                                    SobatBumi
                                </h3>
                                <p className="text-sm text-slate-200">
                                    Aksi nyata untuk bumi, mulai dari laporan
                                    hingga misi sosial.
                                </p>
                            </div>
                        </div>
                        <p className="mb-6 max-w-md leading-relaxed text-slate-50">
                            SobatBumi merupakan platform kolaboratif untuk
                            pelaporan isu lingkungan, partisipasi misi sosial,
                            edukasi, dan donasi. Ayo ambil bagian dalam langkah
                            nyata menyelamatkan bumi.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 transition-colors hover:bg-amber-800"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 transition-colors hover:bg-amber-800"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-6 text-lg font-semibold">Navigasi</h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-300 transition-colors hover:text-white"
                                >
                                    Laporan
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-300 transition-colors hover:text-white"
                                >
                                    Misi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-300 transition-colors hover:text-white"
                                >
                                    Peta
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-300 transition-colors hover:text-white"
                                >
                                    Konten Edukasi
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-6 text-lg font-semibold">Layanan</h4>
                        <ul className="space-y-3">
                            <li>
                                <p className="text-slate-300 transition-colors hover:text-white">
                                    Pengajuan Laporan
                                </p>
                            </li>
                            <li>
                                <p className="text-slate-300 transition-colors hover:text-white">
                                    Review Laporan
                                </p>
                            </li>
                            <li>
                                <p className="text-slate-300 transition-colors hover:text-white">
                                    Verifikasi Sukarelawan
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-emerald-900 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
                        <div className="flex flex-col items-center gap-4 text-sm sm:flex-row">
                            <p>&copy; 2025 SobatBumi. All rights reserved.</p>
                            <div className="flex items-center gap-4">
                                <a
                                    href="#"
                                    className="transition-colors hover:text-white"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-white"
                                >
                                    Terms of Service
                                </a>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-white"
                                >
                                    Cookie Policy
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <span>Made with</span>
                            <svg
                                className="h-4 w-4 text-red-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span>by Tim Kebut Semalam, Surabaya</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-500/5 blur-2xl"></div>
        </footer>
    );
};
export default Footer;
