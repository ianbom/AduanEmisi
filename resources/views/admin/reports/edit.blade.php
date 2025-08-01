@extends('admin.layouts.app')

@section('content')
    <div class="container px-4 py-8 mx-auto">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Detail Report #{{ $report->id }}</h1>
                <p class="mt-1 text-sm text-gray-600">Dilaporkan pada {{ $report->created_at->format('d M Y, H:i') }}</p>
            </div>
            <div class="flex space-x-2">
                <a href="{{ route('report.show', $report->id) }}"
                    class="px-4 py-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600">
                    Lihat Detail
                </a>
                <a href="{{ route('admin.reports.index') }}"
                    class="px-4 py-2 text-white transition-colors bg-gray-500 rounded-lg hover:bg-gray-600">
                    Kembali
                </a>
                @if ($report->status !== 'completed')
                    {{-- <a href="{{ route('admin.reports.edit', $report->id) }}" class="px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600">
                Edit Status
            </a> --}}
                @endif
            </div>
        </div>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <!-- Main Content -->
            <div class="space-y-6 lg:col-span-2">
                <!-- Report Information -->
                <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h2 class="mb-4 text-lg font-semibold text-gray-900">Informasi Laporan</h2>

                    <div class="space-y-4">
                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Judul</label>
                            <p class="font-medium text-gray-900">{{ $report->title }}</p>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Deskripsi</label>
                            <p class="leading-relaxed text-gray-900">{{ $report->description }}</p>
                        </div>

                        @if ($report->category)
                            <div>
                                <label class="block mb-1 text-sm font-medium text-gray-700">Kategori</label>
                                <span class="inline-block px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                                    {{ $report->category }}
                                </span>
                            </div>
                        @endif

                        @if ($report->completion_details)
                            <div>
                                <label class="block mb-1 text-sm font-medium text-gray-700">Detail Penyelesaian</label>
                                <p class="leading-relaxed text-gray-900">{{ $report->completion_details }}</p>
                            </div>
                        @endif
                    </div>
                </div>

                <!-- Location Information -->
                <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h2 class="mb-4 text-lg font-semibold text-gray-900">Lokasi</h2>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Provinsi</label>
                            <p class="text-gray-900">{{ $report->province->name ?? 'Tidak diketahui' }}</p>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Kota</label>
                            <p class="text-gray-900">{{ $report->city->name }}</p>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-700">Kecamatan</label>
                            <p class="text-gray-900">{{ $report->district->name }}</p>
                        </div>
                    </div>

                    @if ($report->address)
                        <div class="mt-4">
                            <label class="block mb-1 text-sm font-medium text-gray-700">Alamat Lengkap</label>
                            <p class="text-gray-900">{{ $report->address }}</p>
                        </div>
                    @endif

                    @if ($report->latitude && $report->longitude)
                        <div class="mt-4">
                            <label class="block mb-1 text-sm font-medium text-gray-700">Koordinat</label>
                            <p class="text-gray-900">{{ $report->latitude }}, {{ $report->longitude }}</p>
                            <a href="https://maps.google.com/?q={{ $report->latitude }},{{ $report->longitude }}"
                                target="_blank" class="text-sm text-blue-600 hover:text-blue-800">
                                Lihat di Google Maps →
                            </a>
                        </div>
                    @endif
                </div>

                <!-- Media Files -->
                @if ($report->media && $report->media->count() > 0)
                    <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <h2 class="mb-4 text-lg font-semibold text-gray-900">Media Lampiran</h2>

                        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            @foreach ($report->media as $media)
                                @if ($media->media_type === 'image')
                                    <div class="overflow-hidden border border-gray-200 rounded-lg">
                                        <img src="{{ asset('storage/' . $media->media_url) }}" alt="Report Image"
                                            class="object-cover w-full h-48">
                                        <div class="p-2">
                                            <span class="text-xs text-gray-500">Gambar</span>
                                        </div>
                                    </div>
                                @elseif($media->media_type === 'video')
                                    <div class="overflow-hidden border border-gray-200 rounded-lg">
                                        <video controls class="w-full h-48">
                                            <source src="{{ $media->media_url }}" type="video/mp4">
                                            Browser Anda tidak mendukung video.
                                        </video>
                                        <div class="p-2">
                                            <span class="text-xs text-gray-500">Video</span>
                                        </div>
                                    </div>
                                @endif
                            @endforeach
                        </div>
                    </div>
                @endif


            <!-- Donation Management -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-lg font-semibold text-gray-900">Manajemen Donasi</h2>


                    <form action="{{ route('admin.reports.toggle-donation', $report->id) }}" method="POST" class="inline-block">
                        @csrf

                        @method('PUT')
                        <button type="submit"
                                class="px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                {{ $report->is_donation
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-green-500 hover:bg-green-600 text-white' }}">
                            {{ $report->is_donation ? 'Nonaktifkan Donasi' : 'Aktifkan Donasi' }}
                        </button>
                    </form>
                </div>
                 @if ($report->is_donation)
                        <span class="text-sm text-green-600 font-medium">Donasi Aktif</span>
                    @else
                        <span class="text-sm text-red-600 font-medium">Donasi Non Aktif</span>
                    @endif

                @if($donations->count() > 0)
                <div class="space-y-6">
                    <!-- Donation Statistics -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-green-50 p-4 rounded-lg">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <svg class="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Donasi</dt>
                                        <dd class="text-lg font-medium text-gray-900">
                                            Rp {{ number_format($report->donations->where('status', 'paid')->sum('amount'), 0, ',', '.') }}
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                        </div>


                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <svg class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Transaksi</dt>
                                        <dd class="text-lg font-medium text-gray-900">
                                            {{ $report->donations->where('status', 'paid')->count() }} transaksi
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                        </div>


                        <div class="bg-yellow-50 p-4 rounded-lg">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <svg class="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Pending</dt>
                                        <dd class="text-lg font-medium text-gray-900">
                                            {{ $report->donations->where('status', 'pending')->count() }} transaksi
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                        </div>
                    </div>



                </div>
                @else
                <div class="text-center py-12">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">Donasi Tidak Aktif</h3>
                    <p class="mt-1 text-sm text-gray-500">Aktifkan donasi untuk memungkinkan user berdonasi pada laporan ini.</p>
                </div>
                @endif
                   <!-- Donations DataTable -->
                    @if($donations->count() > 0)
                    <div class="overflow-hidden">
                        <h3 class="text-md font-semibold text-gray-900 mb-4">Daftar Donatur</h3>
                        <div class="overflow-x-auto">
                            <table id="donationsTable" class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Donatur
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Jumlah
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>

                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Transaction ID
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    @foreach($donations->sortByDesc('created_at') as $donation)
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 h-10 w-10">
                                                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                        <span class="text-sm font-medium text-gray-700">
                                                            {{ substr($donation->user->name, 0, 1) }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="ml-4">
                                                    <div class="text-sm font-medium text-gray-900">
                                                        {{ $donation->user->name }}
                                                    </div>
                                                    <div class="text-sm text-gray-500">
                                                        {{ $donation->user->email }}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-medium text-gray-900">
                                                Rp {{ number_format($donation->amount, 0, ',', '.') }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full
                                                @if($donation->status === 'paid') bg-green-100 text-green-800
                                                @elseif($donation->status === 'pending') bg-yellow-100 text-yellow-800
                                                @elseif($donation->status === 'cancelled') bg-red-100 text-red-800
                                                @elseif($donation->status === 'expired') bg-gray-100 text-gray-800
                                                @endif">
                                                {{ ucfirst($donation->status) }}
                                            </span>
                                        </td>

                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {{ $donation->created_at->format('d M Y, H:i') }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {{ $donation->transaction_id ?? '-' }}
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>

                        </div>
                    </div>
                    @else
                    <div class="text-center py-12">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-900">Belum ada donasi</h3>
                        <p class="mt-1 text-sm text-gray-500">Donasi akan muncul di sini setelah ada yang berdonasi.</p>
                    </div>
                    @endif
            </div>



        </div>


            <!-- Sidebar -->
            <div class="space-y-6">
                <!-- Status Card -->
                <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h2 class="mb-4 text-lg font-semibold text-gray-900">Status</h2>

                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium text-gray-700">Status Saat Ini</span>
                            <span
                                class="px-3 py-1 rounded-full text-sm font-medium
                            @if ($report->status === 'pending') bg-yellow-100 text-yellow-800
                            @elseif($report->status === 'verified') bg-blue-100 text-blue-800
                            @elseif($report->status === 'on-progress') bg-purple-100 text-purple-800
                            @elseif($report->status === 'rejected') bg-red-100 text-red-800
                            @elseif($report->status === 'completed') bg-green-100 text-green-800
                            @elseif($report->status === 'under-authority') bg-orange-100 text-orange-800 @endif">
                                {{ ucfirst(str_replace('-', ' ', $report->status)) }}
                            </span>
                        </div>


                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Status Donasi</span>
                        <span class="px-3 py-1 rounded-full text-sm font-medium
                            {{ $report->is_donation ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800' }}">
                            {{ $report->is_donation ? 'Aktif' : 'Nonaktif' }}
                        </span>
                    </div>

                    @if($report->verified_at)
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Diverifikasi</span>
                        <span class="text-sm text-gray-900">{{ $report->verified_at->format('d M Y') }}</span>

                    </div>
                </div>

                <!-- Reporter Information -->
                <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h2 class="mb-4 text-lg font-semibold text-gray-900">Pelapor</h2>

                    <div class="space-y-3">
                        <div class="flex items-center space-x-3">
                            <div class="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
                                <span class="text-sm font-medium text-gray-700">
                                    {{ substr($report->reporter->name, 0, 1) }}
                                </span>
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">{{ $report->reporter->name }}</p>
                                <p class="text-sm text-gray-600">{{ $report->reporter->email }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Votes Information -->
                <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h2 class="mb-4 text-lg font-semibold text-gray-900">Voting</h2>

                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-2">
                                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="text-sm font-medium text-gray-700">Upvotes</span>
                            </div>
                            <span class="text-sm font-medium text-gray-900">{{ $report->upvotes_count }}</span>
                        </div>

                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-2">
                                <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.293a1 1 0 00-1.414-1.414L9 8.586 5.707 5.293a1 1 0 00-1.414 1.414L7.586 10l-3.293 3.293a1 1 0 101.414 1.414L9 11.414l3.293 3.293a1 1 0 001.414-1.414L10.414 10l3.293-3.293z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="text-sm font-medium text-gray-700">Dislikes</span>
                            </div>
                            <span class="text-sm font-medium text-gray-900">{{ $report->dislikes_count }}</span>
                        </div>
                    </div>
                </div>




        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Tindakan Admin</h2>

            {{-- Tampilkan tombol hanya jika status laporan masih 'pending' --}}
            @if($report->status === 'pending')
                <div class="space-y-3">
                    <!-- Form untuk Menyetujui/Verifikasi Laporan -->
                    <form action="{{ route('admin.reports.accept', $report->id) }}" method="POST">
                        @csrf
                        @method('PUT')
                        <button type="submit" class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            Setujui & Verifikasi Laporan
                        </button>
                    </form>

                    <form action="{{ route('admin.reports.underAuthority', $report->id) }}" method="POST">
                        @csrf
                        @method('PUT')
                        <button type="submit" class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            Verifikasi Pihak Berwenang
                        </button>
                    </form>

                    <!-- Form untuk Menolak Laporan -->
                    <form action="{{ route('admin.reports.reject', $report->id) }}" method="POST">
                        @csrf
                        @method('PUT')
                        <button type="submit"
                                onclick="return confirm('Apakah Anda yakin ingin menolak laporan ini?')"
                                class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                            Tolak Laporan
                        </button>
                    </form>
                </div>
            @else
                {{-- Jika status bukan 'pending', tampilkan info staff yang memproses --}}
                <p class="text-sm text-gray-500 italic">Tindakan untuk laporan ini sudah diproses.</p>
                <div class="mt-4 space-y-4">
                    @if($report->verifiedByUser)
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Diverifikasi oleh</label>
                        <p class="text-gray-900">{{ $report->verifiedByUser->name }}</p>
                    </div>
                    @endif


                            @if ($report->completedByUser)
                                <div>
                                    <label class="block mb-1 text-sm font-medium text-gray-700">Diselesaikan oleh</label>
                                    <p class="text-gray-900">{{ $report->completedByUser->name }}</p>
                                </div>
                            @endif
                        </div>
                    @endif
                </div>


        @if ($mission)
                <a href="{{ route('admin.missions.edit', $mission->id) }}"
                   class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                    Lihat Misi
                </a>
        @endif




        </div>
    </div>
@endsection

@section('scripts')

<!-- DataTables CSS & JS -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/dataTables.tailwindcss.min.css">
<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/dataTables.tailwindcss.min.js"></script>

<script>
    // Script untuk lightbox gambar
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('img[alt="Report Image"]');

        images.forEach(img => {
            img.addEventListener('click', function() {
                // Buat lightbox overlay
                const overlay = document.createElement('div');
                overlay.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
                overlay.innerHTML = `

                    <div class="max-w-4xl max-h-full p-4">
                        <img src="${this.src}" alt="Report Image" class="object-contain max-w-full max-h-full">
                        <button class="absolute text-2xl text-white top-4 right-4" onclick="this.parentElement.parentElement.remove()">×</button>
                    </div>
                `;

                    document.body.appendChild(overlay);

                    // Tutup dengan klik di luar gambar
                    overlay.addEventListener('click', function(e) {
                        if (e.target === overlay) {
                            overlay.remove();
                        }
                    });
                });

                // Ubah cursor menjadi pointer
                img.style.cursor = 'pointer';
            });

            // Script untuk toggle mission form
            const toggleBtn = document.getElementById('toggleMissionForm');
            const missionForm = document.getElementById('missionForm');
            const toggleText = document.getElementById('toggleText');
            const cancelBtn = document.getElementById('cancelMission');

            toggleBtn.addEventListener('click', function() {
                if (missionForm.classList.contains('hidden')) {
                    missionForm.classList.remove('hidden');
                    toggleText.textContent = 'Sembunyikan Form';
                    toggleBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
                    toggleBtn.classList.add('bg-gray-500', 'hover:bg-gray-600');
                } else {
                    missionForm.classList.add('hidden');
                    toggleText.textContent = 'Buat Misi';
                    toggleBtn.classList.remove('bg-gray-500', 'hover:bg-gray-600');
                    toggleBtn.classList.add('bg-green-500', 'hover:bg-green-600');
                }
            });


        // Initialize DataTable for donations
        $('#donationsTable').DataTable({
            "pageLength": 10,
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "order": [[4, "desc"]], // Sort by date column descending
            "columnDefs": [
                { "orderable": false, "targets": [0] } // Disable sorting for donatur column
            ],
            "language": {
                "search": "Cari:",
                "lengthMenu": "Tampilkan _MENU_ entri",
                "info": "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
                "infoEmpty": "Menampilkan 0 sampai 0 dari 0 entri",
                "infoFiltered": "(difilter dari _MAX_ total entri)",
                "paginate": {
                    "first": "Pertama",
                    "last": "Terakhir",
                    "next": "Selanjutnya",
                    "previous": "Sebelumnya"
                },
                "emptyTable": "Tidak ada data yang tersedia dalam tabel",
                "zeroRecords": "Tidak ditemukan data yang sesuai"
            }
        });



    });
</script>

@endsection
