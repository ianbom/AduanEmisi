@extends('admin.layouts.app')
@section('content')

<div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
        <!-- Header Section -->
        <div class="mb-8">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Manajemen Laporan</h1>
                    <p class="text-gray-600 text-lg">Kelola dan pantau semua laporan yang masuk</p>
                </div>
                <div class="hidden md:flex items-center space-x-4">
                    <div class="bg-white px-4 py-2 rounded-lg shadow-sm">
                        <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span class="text-sm font-medium text-gray-700">System Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center">
                    <div class="p-3 bg-blue-100 rounded-lg">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Total Laporan</p>
                        <p class="text-2xl font-bold text-gray-900">{{ $reports->count() ?? 0 }}</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center">
                    <div class="p-3 bg-yellow-100 rounded-lg">
                        <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Menunggu</p>
                        <p class="text-2xl font-bold text-gray-900">{{ $reports->where('status', 'pending')->count() }}</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center">
                    <div class="p-3 bg-blue-100 rounded-lg">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Diproses</p>
                        <p class="text-2xl font-bold text-gray-900">{{ $reports->where('status', 'in_progress')->count() }}</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center">
                    <div class="p-3 bg-green-100 rounded-lg">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Terverifikasi</p>
                        <p class="text-2xl font-bold text-gray-900">{{ $reports->where('status', 'verified')->count() }}</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center">
                    <div class="p-3 bg-red-100 rounded-lg">
                        <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Ditolak</p>
                        <p class="text-2xl font-bold text-gray-900">{{ $reports->where('status', 'rejected')->count() }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filter Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
            <div class="p-6 border-b border-gray-100">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-semibold text-gray-800">Filter Laporan</h2>
                    <button type="button" id="toggleFilters" class="text-blue-600 hover:text-blue-800 font-medium">
                        <span class="hidden md:inline">Sembunyikan Filter</span>
                        <svg class="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div id="filterForm" class="p-6">
                <form method="GET" action="{{ route('admin.reports.index') }}" class="space-y-6">
                    <!-- Row 1 -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <!-- Status Filter -->
                        <div class="space-y-2">
                            <label for="status" class="block text-sm font-semibold text-gray-700">Status</label>
                            <select name="status" id="status" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                <option value="">Semua Status</option>
                                <option value="pending" {{ request('status') == 'pending' ? 'selected' : '' }}>Menunggu</option>
                                <option value="in_progress" {{ request('status') == 'in_progress' ? 'selected' : '' }}>Diproses</option>
                                <option value="verified" {{ request('status') == 'verified' ? 'selected' : '' }}>Terverifikasi</option>
                                <option value="rejected" {{ request('status') == 'rejected' ? 'selected' : '' }}>Ditolak</option>
                            </select>
                        </div>

                        <!-- City Filter -->
                        <div class="space-y-2">
                            <label for="city_id" class="block text-sm font-semibold text-gray-700">Kota</label>
                            <select name="city_id" id="city_id" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                <option value="">Semua Kota</option>
                                @if(isset($cities))
                                    @foreach($cities as $city)
                                        <option value="{{ $city->id }}" {{ request('city_id') == $city->id ? 'selected' : '' }}>
                                            {{ $city->name }}
                                        </option>
                                    @endforeach
                                @endif
                            </select>
                        </div>

                        <!-- District Filter -->
                        <div class="space-y-2">
                            <label for="district_id" class="block text-sm font-semibold text-gray-700">Kecamatan</label>
                            <select name="district_id" id="district_id" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                <option value="">Semua Kecamatan</option>
                                @if(isset($districts))
                                    @foreach($districts as $district)
                                        <option value="{{ $district->id }}" {{ request('district_id') == $district->id ? 'selected' : '' }}>
                                            {{ $district->name }}
                                        </option>
                                    @endforeach
                                @endif
                            </select>
                        </div>

                        <!-- Category Filter -->
                        <div class="space-y-2">
                            <label for="category" class="block text-sm font-semibold text-gray-700">Kategori</label>
                            <select name="category" id="category" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                <option value="">Semua Kategori</option>
                                <option value="infrastruktur" {{ request('category') == 'infrastruktur' ? 'selected' : '' }}>Infrastruktur</option>
                                <option value="lingkungan" {{ request('category') == 'lingkungan' ? 'selected' : '' }}>Lingkungan</option>
                                <option value="keamanan" {{ request('category') == 'keamanan' ? 'selected' : '' }}>Keamanan</option>
                                <option value="kesehatan" {{ request('category') == 'kesehatan' ? 'selected' : '' }}>Kesehatan</option>
                                <option value="pendidikan" {{ request('category') == 'pendidikan' ? 'selected' : '' }}>Pendidikan</option>
                                <option value="lainnya" {{ request('category') == 'lainnya' ? 'selected' : '' }}>Lainnya</option>
                            </select>
                        </div>
                    </div>

                    <!-- Row 2 -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Search Filter -->
                        <div class="space-y-2">
                            <label for="search" class="block text-sm font-semibold text-gray-700">Cari Judul</label>
                            <div class="relative">
                                <input type="text" name="search" id="search" value="{{ request('search') }}"
                                       placeholder="Cari berdasarkan judul..."
                                       class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Created Date Range -->
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-700">Tanggal Dibuat</label>
                            <div class="flex space-x-3">
                                <input type="date" name="created_from" value="{{ request('created_from') }}"
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                <input type="date" name="created_to" value="{{ request('created_to') }}"
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                            </div>
                        </div>

                        <!-- Verified Date Range -->
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-700">Tanggal Verifikasi</label>
                            <div class="flex space-x-3">
                                <input type="date" name="verified_from" value="{{ request('verified_from') }}"
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                <input type="date" name="verified_to" value="{{ request('verified_to') }}"
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-100">
                        <a href="{{ route('admin.reports.index') }}"
                           class="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium text-center">
                            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                            Reset Filter
                        </a>
                        <button type="submit"
                                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium">
                            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                            </svg>
                            Terapkan Filter
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Reports Table -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table id="reportsTable" class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                ID
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Judul
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Pelapor
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Kota/Kecamatan
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Kategori
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Tanggal Dibuat
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        @foreach($reports as $report)
                            <tr class="hover:bg-gray-50 transition-colors duration-150">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                    <span class="bg-gray-100 px-2 py-1 rounded-lg">#{{ $report->id }}</span>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-700">
                                    <div class="max-w-xs">
                                        <p class="truncate font-medium">{{ $report->title ?? '-' }}</p>
                                        <p class="text-xs text-gray-500 truncate">{{ $report->address ?? '-' }}</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-blue-600 font-semibold text-xs">
                                                {{ substr($report->reporter->name ?? 'U', 0, 1) }}
                                            </span>
                                        </div>
                                        <div>
                                            <p class="font-medium">{{ $report->reporter->name ?? '-' }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <div class="space-y-1">
                                        <div class="font-semibold text-gray-900">{{ $report->city->name ?? '-' }}</div>
                                        <div class="text-gray-500 text-xs">{{ $report->district->name ?? '-' }}</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <span class="bg-gray-100 px-2 py-1 rounded-lg text-xs font-medium">
                                        {{ ucfirst($report->category ?? '-') }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    @php
                                        $statusColors = [
                                            'pending' => 'bg-yellow-100 text-yellow-800 border-yellow-200',
                                            'in_progress' => 'bg-blue-100 text-blue-800 border-blue-200',
                                            'verified' => 'bg-green-100 text-green-800 border-green-200',
                                            'rejected' => 'bg-red-100 text-red-800 border-red-200'
                                        ];
                                        $statusLabels = [
                                            'pending' => 'Menunggu',
                                            'in_progress' => 'Diproses',
                                            'verified' => 'Terverifikasi',
                                            'rejected' => 'Ditolak'
                                        ];
                                    @endphp
                                    <span class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border {{ $statusColors[$report->status] ?? 'bg-gray-100 text-gray-800 border-gray-200' }}">
                                        {{ $statusLabels[$report->status] ?? ucfirst($report->status) }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {{ $report->created_at ? $report->created_at->format('d M Y') : '-' }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div class="flex items-center space-x-3">
                                        <a href="{{ route('admin.reports.show', $report->id) }}"
                                           class="text-blue-600 hover:text-blue-800 transition-colors duration-150">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                            </svg>
                                        </a>
                                        <a href="{{ route('admin.reports.edit', $report->id) }}"
                                           class="text-green-600 hover:text-green-800 transition-colors duration-150">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                        </a>
                                        <form action="{{ route('admin.reports.destroy', $report->id) }}" method="POST" class="inline">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit"
                                                    class="text-red-600 hover:text-red-800 transition-colors duration-150"
                                                    onclick="return confirm('Apakah Anda yakin ingin menghapus laporan ini?')">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

@endsection

@section('scripts')

<script>
    $(document).ready(function() {
        // Initialize DataTable
        $('#reportsTable').DataTable({

        });

        // Toggle filter functionality
        $('#toggleFilters').click(function() {
            const filterForm = $('#filterForm');
            const toggleText = $(this).find('span');

            if (filterForm.is(':visible')) {
                filterForm.slideUp(300);
                toggleText.text('Tampilkan Filter');
            } else {
                filterForm.slideDown(300);
                toggleText.text('Sembunyikan Filter');
            }
        });

        // Auto-hide filters on mobile if no active filters
        if (window.innerWidth < 768) {
            const hasActiveFilters = {{ request()->hasAny(['status', 'city_id', 'district_id', 'assigned_to_type', 'search', 'date_from', 'date_to', 'created_from', 'created_to', 'completed_from', 'completed_to']) ? 'true' : 'false' }};

            if (!hasActiveFilters) {
                $('#filterForm').hide();
                $('#toggleFilters span').text('Tampilkan Filter');
            }
        }

        // Enhanced form interactions
        $('select, input').focus(function() {
            $(this).addClass('ring-2 ring-blue-500');
        }).blur(function() {
            $(this).removeClass('ring-2 ring-blue-500');
        });

        // Add loading state to filter button
        $('form').submit(function() {
            const submitBtn = $(this).find('button[type="submit"]');
            const originalText = submitBtn.html();
            submitBtn.html('<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Memproses...');
            submitBtn.prop('disabled', true);

            // Re-enable button after 3 seconds as fallback
            setTimeout(function() {
                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
            }, 3000);
        });

        // Smooth hover animations for table rows
        $('#missionsTable tbody tr').hover(
            function() {
                $(this).addClass('transform scale-[1.01] transition-transform duration-150');
            },
            function() {
                $(this).removeClass('transform scale-[1.01] transition-transform duration-150');
            }
        );


    });
</script>
@endsection
