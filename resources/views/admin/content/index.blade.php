@extends('admin.layouts.app')

@section('content')
    @include('admin.components.notification')

    <div class="min-h-screen rounded-lg shadow-lg bg-gray-50">
        <div class="container px-4 py-8 mx-auto">
            <!-- Header Section -->
            <div class="mb-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="mb-2 text-3xl font-bold text-gray-900">Manajemen Konten</h1>
                        <p class="text-lg text-gray-600">Kelola dan pantau semua konten yang tersedia</p>
                    </div>
                    <div class="items-center hidden space-x-4 md:flex">
                        <div class="px-4 py-2 bg-white rounded-lg shadow-sm">
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span class="text-sm font-medium text-gray-700">System Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Stats Cards -->
            <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
                <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <div class="flex items-center">
                        <div class="p-3 bg-blue-100 rounded-lg">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                </path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Total Konten</p>
                            <p class="text-2xl font-bold text-gray-900">{{ $content->count() }}</p>
                        </div>
                    </div>
                </div>

                <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <div class="flex items-center">
                        <div class="p-3 bg-green-100 rounded-lg">
                            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                                </path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Artikel</p>
                            <p class="text-2xl font-bold text-gray-900">
                                {{ $content->where('content_type', 'article')->count() }}</p>
                        </div>
                    </div>
                </div>

                <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <div class="flex items-center">
                        <div class="p-3 bg-purple-100 rounded-lg">
                            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z">
                                </path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Berita</p>
                            <p class="text-2xl font-bold text-gray-900">
                                {{ $content->where('content_type', 'news')->count() }}</p>
                        </div>
                    </div>
                </div>

                <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <div class="flex items-center">
                        <div class="p-3 bg-orange-100 rounded-lg">
                            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                                </path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Panduan</p>
                            <p class="text-2xl font-bold text-gray-900">
                                {{ $content->where('content_type', 'guide')->count() }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filter Section -->
            <div class="mb-8 bg-white border border-gray-100 shadow-sm rounded-xl">
                <div class="p-6 border-b border-gray-100">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-semibold text-gray-800">Filter Konten</h2>
                        <button type="button" id="toggleFilters" class="font-medium text-blue-600 hover:text-blue-800">
                            <span class="hidden md:inline">Sembunyikan Filter</span>
                            <svg class="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div id="filterForm" class="p-6">
                    <form method="GET" action="{{ route('admin.contents.index') }}" class="space-y-6">
                        <!-- Row 1 -->
                        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <!-- Content Type Filter -->
                            <div class="space-y-2">
                                <label for="content_type" class="block text-sm font-semibold text-gray-700">Tipe
                                    Konten</label>
                                <select name="content_type" id="content_type"
                                    class="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="">Semua Tipe</option>
                                    <option value="artikel" {{ request('content_type') == 'article' ? 'selected' : '' }}>
                                        Artikel</option>
                                    <option value="video" {{ request('content_type') == 'video' ? 'selected' : '' }}>Video
                                    </option>
                                    <option value="modul" {{ request('content_type') == 'modul' ? 'selected' : '' }}>Modul
                                    </option>
                                </select>
                            </div>

                            <!-- Search Filter -->
                            <div class="space-y-2">
                                <label for="search" class="block text-sm font-semibold text-gray-700">Cari Konten</label>
                                <div class="relative">
                                    <input type="text" name="search" id="search" value="{{ request('search') }}"
                                        placeholder="Cari berdasarkan judul..."
                                        class="w-full px-4 py-3 pl-10 transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Date Range Filter -->
                            <div class="space-y-2">
                                <label class="block text-sm font-semibold text-gray-700">Tanggal Dibuat</label>
                                <div class="flex space-x-3">
                                    <input type="date" name="date_from" value="{{ request('date_from') }}"
                                        class="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <input type="date" name="date_to" value="{{ request('date_to') }}"
                                        class="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div
                            class="flex flex-col justify-end pt-6 space-y-3 border-t border-gray-100 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <a href="{{ route('admin.contents.index') }}"
                                class="px-6 py-3 font-medium text-center text-gray-700 transition-all duration-200 bg-gray-100 rounded-lg hover:bg-gray-200">
                                <svg class="inline w-5 h-5 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                    </path>
                                </svg>
                                Reset Filter
                            </a>
                            <button type="submit"
                                class="px-6 py-3 font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
                                <svg class="inline w-5 h-5 mr-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z">
                                    </path>
                                </svg>
                                Terapkan Filter
                            </button>

                            <a href="{{ route('admin.contents.create') }}"
                                class="inline-flex items-center px-6 py-3 font-medium text-white transition-all duration-200 bg-green-600 rounded-lg hover:bg-green-700">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4v16m8-8H4"></path>
                                </svg>
                                Buat Konten
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Content Table -->
            <div class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
                <div class="overflow-x-auto">
                    <table id="contentTable" class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                                    ID
                                </th>
                                <th
                                    class="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                                    Judul
                                </th>
                                <th
                                    class="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                                    Tipe Konten
                                </th>
                                <th
                                    class="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                                    Penulis
                                </th>
                                <th
                                    class="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                                    Konten
                                </th>
                                <th
                                    class="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                                    Tanggal Dibuat
                                </th>
                                <th
                                    class="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            @foreach ($content as $item)
                                <tr class="transition-colors duration-150 hover:bg-gray-50">
                                    <td class="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                        <span class="px-2 py-1 bg-gray-100 rounded-lg">#{{ $item->id }}</span>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-700">
                                        <div class="max-w-xs">
                                            <p class="font-medium truncate" title="{{ $item->title }}">
                                                {{ $item->title }}</p>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        @php
                                            $typeColors = [
                                                'article' => 'bg-blue-100 text-blue-800 border-blue-200',
                                                'news' => 'bg-purple-100 text-purple-800 border-purple-200',
                                                'guide' => 'bg-orange-100 text-orange-800 border-orange-200',
                                            ];
                                            $typeLabels = [
                                                'article' => 'Artikel',
                                                'news' => 'Berita',
                                                'guide' => 'Panduan',
                                            ];
                                        @endphp
                                        <span
                                            class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border {{ $typeColors[$item->content_type] ?? 'bg-gray-100 text-gray-800 border-gray-200' }}">
                                            {{ $typeLabels[$item->content_type] ?? ($item->content_type ? ucfirst($item->content_type) : 'Umum') }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 w-8 h-8">
                                                <div
                                                    class="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full">
                                                    <span class="text-xs font-medium text-gray-700">
                                                        {{ substr($item->author->name ?? 'Unknown', 0, 1) }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="ml-3">
                                                <p class="text-sm font-medium text-gray-900">
                                                    {{ $item->author->name ?? 'Unknown' }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-700">
                                        <div class="max-w-xs">
                                            <p class="truncate" title="{{ strip_tags($item->body) }}">
                                                {{ Str::limit(strip_tags($item->body), 50) }}</p>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                        {{ $item->created_at ? $item->created_at->format('d M Y') : '-' }}
                                    </td>
                                    <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                        <div class="flex items-center space-x-3">
                                            <a href="{{ route('admin.contents.show', $item->id) }}"
                                                class="text-blue-600 transition-colors duration-150 hover:text-blue-800">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                                    </path>
                                                </svg>
                                            </a>
                                            <a href="{{ route('admin.contents.edit', $item->id) }}"
                                                class="text-green-600 transition-colors duration-150 hover:text-green-800">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                                    </path>
                                                </svg>
                                            </a>
                                            <form action="{{ route('admin.contents.destroy', $item->id) }}"
                                                method="POST" class="inline">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit"
                                                    class="text-red-600 transition-colors duration-150 hover:text-red-800"
                                                    onclick="return confirm('Apakah Anda yakin ingin menghapus konten ini?')">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                        </path>
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

@push('scripts')
    <script>
        $(document).ready(function() {
            // Initialize DataTable
            $('#contentTable').DataTable({
                order: [
                    [0, 'desc']
                ],
                columnDefs: [{
                        orderable: false,
                        targets: -1
                    } // Disable ordering on the last column (actions)
                ]
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
                const hasActiveFilters =
                    {{ request()->hasAny(['content_type', 'search', 'date_from', 'date_to']) ? 'true' : 'false' }};

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
                submitBtn.html(
                    '<svg class="inline w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Memproses...'
                    );
                submitBtn.prop('disabled', true);

                // Re-enable button after 3 seconds as fallback
                setTimeout(function() {
                    submitBtn.html(originalText);
                    submitBtn.prop('disabled', false);
                }, 3000);
            });

            // Smooth hover animations for table rows
            $('#contentTable tbody tr').hover(
                function() {
                    $(this).addClass('transform scale-[1.01] transition-transform duration-150');
                },
                function() {
                    $(this).removeClass('transform scale-[1.01] transition-transform duration-150');
                }
            );
        });
    </script>
@endpush
