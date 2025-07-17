@extends('admin.layouts.app')

@section('content')
@include('admin.components.notification')

<div class="container mx-auto px-4 py-6">
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
            <h1 class="text-2xl font-bold text-gray-800">Detail User</h1>
            <a href="{{ route('admin.users.index') }}" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200">
                <i class="fas fa-arrow-left mr-2"></i>Kembali
            </a>
        </div>

        <!-- User Profile Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div class="flex items-center space-x-4">
                    @if($user->profile_url)
                        <img src="{{ $user->profile_url }}" alt="Profile" class="w-20 h-20 rounded-full object-cover">
                    @else
                        <div class="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                            <i class="fas fa-user text-gray-600 text-2xl"></i>
                        </div>
                    @endif
                    <div>
                        <h2 class="text-xl font-semibold text-gray-800">{{ $user->name }}</h2>
                        <p class="text-gray-600">{{ $user->email }}</p>
                        <span class="inline-block px-3 py-1 text-sm font-medium rounded-full
                            @if($user->role === 'admin') bg-red-100 text-red-800
                            @elseif($user->role === 'superadmin') bg-purple-100 text-purple-800
                            @elseif($user->role === 'community') bg-blue-100 text-blue-800
                            @else bg-green-100 text-green-800
                            @endif">
                            {{ ucfirst($user->role) }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="space-y-3">
                <div class="grid grid-cols-1 gap-3">
                    <div>
                        <label class="text-sm font-medium text-gray-600">Nomor Telepon:</label>
                        <p class="text-gray-800">{{ $user->phone ?: 'Belum diisi' }}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-600">Alamat:</label>
                        <p class="text-gray-800">{{ $user->address ?: 'Belum diisi' }}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-600">Bergabung:</label>
                        <p class="text-gray-800">{{ $user->created_at->format('d F Y') }}</p>
                    </div>
                    {{-- <div>
                        <label class="text-sm font-medium text-gray-600">Status Email:</label>
                        <span class="inline-block px-2 py-1 text-xs font-medium rounded-full
                            {{ $user->email_verified_at ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                            {{ $user->email_verified_at ? 'Terverifikasi' : 'Belum Terverifikasi' }}
                        </span>
                    </div> --}}
                </div>
            </div>
        </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
                <div class="bg-yellow-100 rounded-full p-3 mr-4">
                    <i class="fas fa-medal text-yellow-600 text-xl"></i>
                </div>
                <div>
                    <p class="text-2xl font-bold text-gray-800">{{ $badges->count() }}</p>
                    <p class="text-gray-600">Total Badges</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
                <div class="bg-green-100 rounded-full p-3 mr-4">
                    <i class="fas fa-hand-holding-heart text-green-600 text-xl"></i>
                </div>
                <div>
                    <p class="text-2xl font-bold text-gray-800">{{ $donations->count() }}</p>
                    <p class="text-gray-600">Total Donasi</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
                <div class="bg-blue-100 rounded-full p-3 mr-4">
                    <i class="fas fa-hands-helping text-blue-600 text-xl"></i>
                </div>
                <div>
                    <p class="text-2xl font-bold text-gray-800">{{ $volunteers->count() }}</p>
                    <p class="text-gray-600">Total Volunteer</p>
                </div>
            </div>
        </div>
    </div>


    <!-- Tabs Navigation -->
    <div class="bg-white rounded-lg shadow-md">
        <div class="border-b border-gray-200">
            <nav class="flex space-x-8 px-6" aria-label="Tabs">
                 <button class="tab-button py-4 px-1 border-b-2 border-blue-500 font-medium text-sm text-blue-600 whitespace-nowrap" data-tab="badges">
                    <i class="fas fa-medal mr-2"></i>Badges
                </button>
                <button class="tab-button py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap" data-tab="reports">
                    <i class="fa fa-file-text mr-2"></i>Laporan
                </button>
                <button class="tab-button py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap" data-tab="volunteers">
                    <i class="fas fa-hands-helping mr-2"></i>Volunteers
                </button>
                <button class="tab-button py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap" data-tab="donations">
                    <i class="fas fa-hand-holding-heart mr-2"></i>Donations
                </button>

            </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">

     <!-- Badges Tab -->
            <div id="badges-tab" class="tab-content">
                <div class="mb-4">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Badges User</h3>
                    <div class="overflow-x-auto">
                        <table id="badges-table" class="min-w-full bg-white">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badge</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diperoleh</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                @foreach($badges as $badge)
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $badge->id }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div class="flex items-center">
                                            <i class="fas fa-medal text-yellow-500 mr-2"></i>
                                            {{ $badge->badge->name ?? 'Badge ID: ' . $badge->badge_id }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {{ $badge->created_at->format('d M Y, H:i') }}
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        <!-- Reports Tab -->
        <div id="reports-tab" class="tab-content hidden">
            <div class="mb-4">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Riwayat Laporan Pengguna</h3>
                <div class="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table id="reports-table" class="min-w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul Laporan</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Dibuat</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            {{-- PERBAIKAN: Loop melalui variabel $reports --}}
                            @forelse($reports as $report)
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{{ $report->id }}</td>
                                <td class="px-6 py-4">
                                    <div class="text-sm font-medium text-gray-900">{{ $report->title }}</div>
                                    <div class="text-xs text-gray-500">{{ $report->city->name ?? '' }}, {{ $report->district->name ?? '' }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                     <span class="bg-gray-100 px-2 py-1 rounded-lg text-xs font-medium">
                                        {{ ucfirst($report->category ?? '-') }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{-- PERBAIKAN: Logika status disesuaikan untuk laporan --}}
                                    @php
                                        $statusColors = [
                                            'pending'     => 'bg-yellow-100 text-yellow-800',
                                            'verified'    => 'bg-blue-100 text-blue-800',
                                            'on-progress' => 'bg-purple-100 text-purple-800',
                                            'rejected'    => 'bg-red-100 text-red-800',
                                            'completed'   => 'bg-green-100 text-green-800'
                                        ];
                                    @endphp
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $statusColors[$report->status] ?? 'bg-gray-100 text-gray-800' }}">
                                        {{ ucfirst(str_replace('-', ' ', $report->status)) }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {{ $report->created_at->format('d M Y, H:i') }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <a href="{{ route('report.show', $report->id) }}" class="text-indigo-600 hover:text-indigo-900">
                                        Lihat Detail
                                    </a>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                                    Pengguna ini belum membuat laporan apapun.
                                </td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    <!-- Volunteers Tab -->
            <div id="volunteers-tab" class="tab-content hidden">
                <div class="mb-4">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Riwayat Volunteer</h3>
                    <div class="overflow-x-auto">
                        <table id="volunteers-table" class="min-w-full bg-white">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mission</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sertifikat</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                @foreach($volunteers as $volunteer)
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $volunteer->id }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                         {{ $volunteer->mission->title }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full
                                            @if($volunteer->participation_status === 'confirmed') bg-green-100 text-green-800
                                            @elseif($volunteer->participation_status === 'pending') bg-yellow-100 text-yellow-800
                                            @elseif($volunteer->participation_status === 'attended') bg-blue-100 text-blue-800
                                            @else bg-red-100 text-red-800
                                            @endif">
                                            {{ ucfirst($volunteer->participation_status) }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        @if($volunteer->is_leader)
                                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                                                <i class="fas fa-crown mr-1"></i>Leader
                                            </span>
                                        @else
                                            <span class="text-gray-500">Member</span>
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        @if($volunteer->certificate_url)
                                            <a href="{{ $volunteer->certificate_url }}" target="_blank" class="text-blue-600 hover:text-blue-800">
                                                <i class="fas fa-certificate mr-1"></i>Lihat Sertifikat
                                            </a>
                                        @else
                                            <span class="text-gray-500">Belum ada</span>
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {{ $volunteer->created_at->format('d M Y, H:i') }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <a href="{{ route('report.show', $report->id) }}" class="text-indigo-600 hover:text-indigo-900">
                                        Lihat Detail
                                    </a>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



            <!-- Donations Tab -->
            <div id="donations-tab" class="tab-content hidden">
                <div class="mb-4">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Riwayat Donasi</h3>
                    <div class="overflow-x-auto">
                        <table id="donations-table" class="min-w-full bg-white">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                @foreach($donations as $donation)
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $donation->id }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <span class="font-medium text-green-600">Rp {{ number_format($donation->amount, 0, ',', '.') }}</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        Report ID: {{ $donation->report_id }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full
                                            @if($donation->status === 'paid') bg-green-100 text-green-800
                                            @elseif($donation->status === 'pending') bg-yellow-100 text-yellow-800
                                            @elseif($donation->status === 'cancelled') bg-red-100 text-red-800
                                            @else bg-gray-100 text-gray-800
                                            @endif">
                                            {{ ucfirst($donation->status) }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {{ $donation->created_at->format('d M Y, H:i') }}
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    </div>
</div>

@endsection

@push('scripts')
<!-- DataTables CSS -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.tailwind.min.css">

<!-- DataTables JS -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.11.5/js/dataTables.tailwind.min.js"></script>

<!-- FontAwesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

<script>
$(document).ready(function() {
    // Initialize DataTables
    $('#badges-table').DataTable({
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/id.json'
        },
        order: [[0, 'desc']]
    });

    $('#donations-table').DataTable({
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/id.json'
        },
        order: [[0, 'desc']]
    });

    $('#volunteers-table').DataTable({
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/id.json'
        },
        order: [[0, 'desc']]
    });

    $('#reports-table').DataTable({
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/id.json'
        },
        order: [[0, 'desc']]
    });

    // Tab functionality
    $('.tab-button').on('click', function() {
        const targetTab = $(this).data('tab');

        // Remove active classes from all tabs
        $('.tab-button').removeClass('border-blue-500 text-blue-600').addClass('border-transparent text-gray-500');
        $('.tab-content').addClass('hidden');

        // Add active class to clicked tab
        $(this).removeClass('border-transparent text-gray-500').addClass('border-blue-500 text-blue-600');
        $(`#${targetTab}-tab`).removeClass('hidden');

        // Redraw DataTables to fix column widths
        setTimeout(function() {
            $.fn.dataTable.tables({visible: true, api: true}).columns.adjust();
        }, 100);
    });
});
</script>

<style>
/* Custom DataTables styling */
.dataTables_wrapper .dataTables_length,
.dataTables_wrapper .dataTables_filter,
.dataTables_wrapper .dataTables_info,
.dataTables_wrapper .dataTables_processing,
.dataTables_wrapper .dataTables_paginate {
    color: #374151;
    margin-bottom: 1rem;
}

.dataTables_wrapper .dataTables_paginate .paginate_button {
    padding: 0.5rem 1rem;
    margin: 0 0.125rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    background: white;
    color: #374151;
}

.dataTables_wrapper .dataTables_paginate .paginate_button:hover {
    background: #f3f4f6;
    border-color: #9ca3af;
}

.dataTables_wrapper .dataTables_paginate .paginate_button.current {
    background: #3b82f6;
    border-color: #3b82f6;
    color: white;
}

.dataTables_wrapper .dataTables_filter input {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    margin-left: 0.5rem;
}

.dataTables_wrapper .dataTables_length select {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    margin: 0 0.5rem;
}
</style>
@endpush
