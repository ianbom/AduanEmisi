@extends('admin.layouts.app')

@section('content')

@include('admin.components.notification')

<div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
        <!-- Header Section -->
        <div class="mb-8">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Manajemen Redeem</h1>
                    <p class="text-gray-600 text-lg">Kelola dan pantau semua permintaan penukaran merchandise</p>
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
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Total Redeem</p>
                        <p class="text-2xl font-bold text-gray-900">{{ $redeems->count() }}</p>
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
                        <p class="text-sm font-medium text-gray-600">Pending</p>
                        <p class="text-2xl font-bold text-gray-900">{{ $redeems->where('status', 'pending')->count() }}</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center">
                    <div class="p-3 bg-orange-100 rounded-lg">
                        <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Processing</p>
                        <p class="text-2xl font-bold text-gray-900">{{ $redeems->where('status', 'processing')->count() }}</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div class="flex items-center">
                    <div class="p-3 bg-blue-100 rounded-lg">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Shipped</p>
                        <p class="text-2xl font-bold text-gray-900">{{ $redeems->where('status', 'shipped')->count() }}</p>
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
                        <p class="text-sm font-medium text-gray-600">Completed</p>
                        <p class="text-2xl font-bold text-gray-900">{{ $redeems->where('status', 'completed')->count() }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filter Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
            <div class="p-6 border-b border-gray-100">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-semibold text-gray-800">Filter Redeem</h2>
                    <button type="button" id="toggleFilters" class="text-blue-600 hover:text-blue-800 font-medium">
                        <span class="hidden md:inline">Sembunyikan Filter</span>
                        <svg class="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div id="filterForm" class="p-6" style="display: none;">
                <form method="GET" action="{{ route('admin.redeems.index') }}" class="space-y-6">
                    <!-- Row 1 -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Status Filter -->
                        <div class="space-y-2">
                            <label for="status" class="block text-sm font-semibold text-gray-700">Status</label>
                            <select name="status" id="status" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                <option value="">Semua Status</option>
                                <option value="pending" {{ request('status') == 'pending' ? 'selected' : '' }}>Pending</option>
                                <option value="processing" {{ request('status') == 'processing' ? 'selected' : '' }}>Processing</option>
                                <option value="shipped" {{ request('status') == 'shipped' ? 'selected' : '' }}>Shipped</option>
                                <option value="completed" {{ request('status') == 'completed' ? 'selected' : '' }}>Completed</option>
                                <option value="cancelled" {{ request('status') == 'cancelled' ? 'selected' : '' }}>Cancelled</option>
                            </select>
                        </div>

                        <!-- Search Filter -->
                        <div class="space-y-2">
                            <label for="search" class="block text-sm font-semibold text-gray-700">Cari Redeem</label>
                            <div class="relative">
                                <input type="text" name="search" id="search" value="{{ request('search') }}"
                                       placeholder="Cari berdasarkan nama user atau merchandise..."
                                       class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                            </div>
                        </div>

                        <!-- Logistic Filter -->
                        <div class="space-y-2">
                            <label for="logistic" class="block text-sm font-semibold text-gray-700">Logistik</label>
                            <select name="logistic" id="logistic" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                <option value="">Semua Logistik</option>
                                <option value="JNE" {{ request('logistic') == 'JNE' ? 'selected' : '' }}>JNE</option>
                                <option value="J&T" {{ request('logistic') == 'J&T' ? 'selected' : '' }}>J&T</option>
                                <option value="SiCepat" {{ request('logistic') == 'SiCepat' ? 'selected' : '' }}>SiCepat</option>
                                <option value="Pos Indonesia" {{ request('logistic') == 'Pos Indonesia' ? 'selected' : '' }}>Pos Indonesia</option>
                                <option value="Tiki" {{ request('logistic') == 'Tiki' ? 'selected' : '' }}>Tiki</option>
                            </select>
                        </div>
                    </div>

                    <!-- Row 2 -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Date Range Filter -->
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-700">Rentang Tanggal</label>
                            <div class="grid grid-cols-2 gap-3">
                                <input type="date" name="date_from" value="{{ request('date_from') }}"
                                       class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                <input type="date" name="date_to" value="{{ request('date_to') }}"
                                       class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                            </div>
                        </div>

                        <!-- Points Range Filter -->
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-700">Rentang Poin</label>
                            <div class="grid grid-cols-2 gap-3">
                                <input type="number" name="points_min" value="{{ request('points_min') }}" placeholder="Min poin"
                                       class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                <input type="number" name="points_max" value="{{ request('points_max') }}" placeholder="Max poin"
                                       class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-100">
                        <a href="{{ route('admin.redeems.index') }}" class="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium text-center">Reset Filter</a>
                        <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Terapkan Filter</button>
                        <button type="button" id="exportRedeems" class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium inline-flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Export Data
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Redeems Table -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto p-6">
                <table id="redeemsTable" class="min-w-full" style="width:100%">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Merchandise</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Poin</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Logistik</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Resi</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        @foreach($redeems as $redeem)
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">#{{ $redeem->id }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {{ substr($redeem->user->name, 0, 1) }}
                                        </div>
                                        <div class="ml-3">
                                            <p class="text-sm font-medium text-gray-900">{{ $redeem->user->name }}</p>
                                            <p class="text-sm text-gray-500">{{ $redeem->user->email }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        @if($redeem->merchandise->image_url)
                                            <img src="{{ Storage::url($redeem->merchandise->image_url) }}" alt="Merchandise" class="h-12 w-12 rounded-lg object-cover">
                                        @else
                                            <div class="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                            </div>
                                        @endif
                                        <div class="ml-3">
                                            <p class="text-sm font-medium text-gray-900">{{ $redeem->merchandise->name }}</p>
                                            <p class="text-sm text-gray-500">{{ $redeem->merchandise->points_required }} poin</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600">{{ number_format($redeem->points_spent) }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    @php
                                        $statusColors = [
                                            'pending' => 'bg-yellow-100 text-yellow-800',
                                            'processing' => 'bg-orange-100 text-orange-800',
                                            'shipped' => 'bg-blue-100 text-blue-800',
                                            'completed' => 'bg-green-100 text-green-800',
                                            'cancelled' => 'bg-red-100 text-red-800'
                                        ];
                                    @endphp
                                    <span class="px-3 py-1 text-xs font-semibold rounded-full {{ $statusColors[$redeem->status] ?? 'bg-gray-100 text-gray-800' }}">
                                        {{ ucfirst($redeem->status) }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    {{ $redeem->logistic ?? '-' }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono">
                                    @if($redeem->tracking_number)
                                        <span class="bg-gray-100 px-2 py-1 rounded text-xs">{{ $redeem->tracking_number }}</span>
                                    @else
                                        <span class="text-gray-400">-</span>
                                    @endif
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">{{ $redeem->created_at->format('d M Y') }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div class="flex items-center space-x-3">
                                        <a href="{{ route('admin.redeems.show', $redeem->id) }}" class="text-blue-600 hover:text-blue-800" title="Lihat Detail">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                        </a>
                                        <a href="{{ route('admin.redeems.edit', $redeem->id) }}" class="text-green-600 hover:text-green-800" title="Update Status">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                        </a>
                                        @if($redeem->status === 'pending')
                                            <form action="{{ route('admin.redeems.destroy', $redeem->id) }}" method="POST" class="inline">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="text-red-600 hover:text-red-800" title="Cancel Redeem" onclick="return confirm('Cancel redeem ini?')">
                                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                </button>
                                            </form>
                                        @endif
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

<!-- Status Update Modal -->
<div id="statusModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" style="display: none;">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
            <h3 class="text-lg font-medium text-gray-900">Update Status Redeem</h3>
            <form id="statusUpdateForm" class="mt-4">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select id="newStatus" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div class="mb-4" id="logisticField">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Logistik</label>
                    <input type="text" id="logistic" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. JNE, J&T, SiCepat">
                </div>
                <div class="mb-4" id="trackingField">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Resi</label>
                    <input type="text" id="trackingNumber" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Masukkan nomor resi">
                </div>
                <div class="flex justify-end space-x-3">
                    <button type="button" id="closeModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Batal</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Update</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection

@push('scripts')
<script>
    $(document).ready(function() {
        // Initialize DataTable
        $('#redeemsTable').DataTable({
            order: [[0, 'desc']],
            columnDefs: [
                { orderable: false, targets: [1, 2, -1] } // Disable ordering on user, merchandise and actions columns
            ],
            language: {
                "sEmptyTable": "Tidak ada data yang tersedia pada tabel ini",
                "sProcessing": "Sedang memproses...",
                "sLengthMenu": "Tampilkan _MENU_ data",
                "sZeroRecords": "Tidak ditemukan data yang sesuai",
                "sInfo": "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
                "sInfoEmpty": "Menampilkan 0 sampai 0 dari 0 data",
                "sInfoFiltered": "(disaring dari _MAX_ total data)",
                "sSearch": "Cari:",
            }
        });

        // Toggle filter functionality
        $('#toggleFilters').click(function() {
            const filterForm = $('#filterForm');
            const toggleText = $(this).find('span');

            filterForm.slideToggle(300, function() {
                if ($(this).is(':visible')) {
                    toggleText.text('Sembunyikan Filter');
                } else {
                    toggleText.text('Tampilkan Filter');
                }
            });
        });

        // Show/hide logistic and tracking fields based on status
        $('#newStatus').change(function() {
            const status = $(this).val();
            if (status === 'shipped' || status === 'completed') {
                $('#logisticField, #trackingField').show();
            } else {
                $('#logisticField, #trackingField').hide();
            }
        });

        // Export functionality
        $('#exportRedeems').click(function() {
            const currentParams = new URLSearchParams(window.location.search);
            currentParams.set('export', 'excel');
            window.location.href = '{{ route("admin.redeems.index") }}?' + currentParams.toString();
        });

        // Modal functionality
        $('#closeModal').click(function() {
            $('#statusModal').hide();
        });

        // Status update form
        $('#statusUpdateForm').submit(function(e) {
            e.preventDefault();
            // Handle status update via AJAX
            // Implementation depends on your backend route
        });

        // Sembunyikan filter secara default di mobile jika tidak ada filter aktif
        if (window.innerWidth < 768) {
            const hasActiveFilters = {{ request()->hasAny(['status', 'search', 'logistic', 'date_from', 'date_to', 'points_min', 'points_max']) ? 'true' : 'false' }};
            if (!hasActiveFilters) {
                $('#filterForm').hide();
                $('#toggleFilters').find('span').text('Tampilkan Filter');
            } else {
                 $('#filterForm').show();
                 $('#toggleFilters').find('span').text('Sembunyikan Filter');
            }
        } else {
            $('#filterForm').show();
        }

        // Quick status update buttons
        $('.status-btn').click(function() {
            const redeemId = $(this).data('redeem-id');
            const currentStatus = $(this).data('current-status');

            // Set current values in modal
            $('#statusUpdateForm').data('redeem-id', redeemId);
            $('#newStatus').val(currentStatus);

            // Show/hide fields based on current status
            if (currentStatus === 'shipped' || currentStatus === 'completed') {
                $('#logisticField, #trackingField').show();
            } else {
                $('#logisticField, #trackingField').hide();
            }

            $('#statusModal').show();
        });

        // Bulk actions
        $('#selectAll').change(function() {
            $('.redeem-checkbox').prop('checked', $(this).prop('checked'));
            toggleBulkActions();
        });

        $('.redeem-checkbox').change(function() {
            toggleBulkActions();
        });

        function toggleBulkActions() {
            const checkedBoxes = $('.redeem-checkbox:checked').length;
            if (checkedBoxes > 0) {
                $('#bulkActions').show();
                $('#bulkCount').text(checkedBoxes);
            } else {
                $('#bulkActions').hide();
            }
        }


        // Auto-refresh for real-time updates
        let autoRefresh = false;
        $('#autoRefresh').change(function() {
            autoRefresh = $(this).prop('checked');
            if (autoRefresh) {
                setInterval(function() {
                    if (autoRefresh) {
                        location.reload();
                    }
                }, 30000); // Refresh every 30 seconds
            }
        });

        // Print shipping label
        $('.print-label').click(function() {
            const redeemId = $(this).data('redeem-id');
            window.open('{{ url("admin/redeems") }}/' + redeemId + '/print-label', '_blank');
        });

        // Track shipment
        $('.track-shipment').click(function() {
            const trackingNumber = $(this).data('tracking');
            const logistic = $(this).data('logistic');

            if (trackingNumber && logistic) {
                // Open tracking URL based on logistic provider
                let trackingUrl = '';
                switch(logistic.toLowerCase()) {
                    case 'jne':
                        trackingUrl = 'https://www.jne.co.id/id/tracking/trace/' + trackingNumber;
                        break;
                    case 'j&t':
                        trackingUrl = 'https://www.jet.co.id/track/' + trackingNumber;
                        break;
                    case 'sicepat':
                        trackingUrl = 'https://www.sicepat.com/checkAwb/' + trackingNumber;
                        break;
                    case 'pos indonesia':
                        trackingUrl = 'https://www.posindonesia.co.id/id/tracking/' + trackingNumber;
                        break;
                    case 'tiki':
                        trackingUrl = 'https://www.tiki.id/id/tracking/' + trackingNumber;
                        break;
                    default:
                        alert('Tracking URL tidak tersedia untuk logistik ' + logistic);
                        return;
                }
                window.open(trackingUrl, '_blank');
            } else {
                alert('Nomor resi atau logistik tidak tersedia');
            }
        });
    });
</script>
@endpush
