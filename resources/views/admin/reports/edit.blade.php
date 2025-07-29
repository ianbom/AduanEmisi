@extends('admin.layouts.app')

@section('content')
<div class="container mx-auto px-4 py-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Detail Report #{{ $report->id }}</h1>
            <p class="text-sm text-gray-600 mt-1">Dilaporkan pada {{ $report->created_at->format('d M Y, H:i') }}</p>
        </div>
        <div class="flex space-x-2">
            <a href="{{ route('report.show', $report->id) }}" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                Lihat Detail
            </a>
            <a href="{{ route('admin.reports.index') }}" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                Kembali
            </a>
            @if($report->status !== 'completed')
            {{-- <a href="{{ route('admin.reports.edit', $report->id) }}" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                Edit Status
            </a> --}}
            @endif
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
            <!-- Report Information -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Informasi Laporan</h2>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                        <p class="text-gray-900 font-medium">{{ $report->title }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                        <p class="text-gray-900 leading-relaxed">{{ $report->description }}</p>
                    </div>

                    @if($report->category)
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                        <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {{ $report->category }}
                        </span>
                    </div>
                    @endif

                    @if($report->completion_details)
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Detail Penyelesaian</label>
                        <p class="text-gray-900 leading-relaxed">{{ $report->completion_details }}</p>
                    </div>
                    @endif
                </div>
            </div>

            <!-- Location Information -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Lokasi</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                        <p class="text-gray-900">{{ $report->province->name ?? 'Tidak diketahui' }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                        <p class="text-gray-900">{{ $report->city->name }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
                        <p class="text-gray-900">{{ $report->district->name }}</p>
                    </div>
                </div>

                @if($report->address)
                <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                    <p class="text-gray-900">{{ $report->address }}</p>
                </div>
                @endif

                @if($report->latitude && $report->longitude)
                <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Koordinat</label>
                    <p class="text-gray-900">{{ $report->latitude }}, {{ $report->longitude }}</p>
                    <a href="https://maps.google.com/?q={{ $report->latitude }},{{ $report->longitude }}"
                       target="_blank"
                       class="text-blue-600 hover:text-blue-800 text-sm">
                        Lihat di Google Maps →
                    </a>
                </div>
                @endif
            </div>

            <!-- Media Files -->
            @if($report->media && $report->media->count() > 0)
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Media Lampiran</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    @foreach($report->media as $media)
                        @if($media->media_type === 'image')
                            <div class="border border-gray-200 rounded-lg overflow-hidden">
                                <img src="{{ asset('storage/' . $media->media_url) }}"
                                     alt="Report Image"
                                     class="w-full h-48 object-cover">
                                <div class="p-2">
                                    <span class="text-xs text-gray-500">Gambar</span>
                                </div>
                            </div>
                        @elseif($media->media_type === 'video')
                            <div class="border border-gray-200 rounded-lg overflow-hidden">
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

            <!-- Create Mission Form -->
            {{-- <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-lg font-semibold text-gray-900">Buat Misi Berdasarkan Laporan</h2>
                    <button id="toggleMissionForm" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                        <span id="toggleText">Buat Misi</span>
                    </button>
                </div>

                <div id="missionForm" class="hidden">
                    <form action="{{ route('admin.missions.store') }}" method="POST" class="space-y-6">
                        @csrf
                        <input type="hidden" name="report_id" value="{{ $report->id }}">
                        <input type="hidden" name="province_id" value="{{ $report->province_id }}">
                        <input type="hidden" name="city_id" value="{{ $report->city_id }}">
                        <input type="hidden" name="district_id" value="{{ $report->district_id }}">
                        <input type="hidden" name="latitude" value="{{ $report->latitude }}">
                        <input type="hidden" name="longitude" value="{{ $report->longitude }}">
                        <input type="hidden" name="address" value="{{ $report->address }}">

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="md:col-span-2">
                                <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Judul Misi</label>
                                <input type="text"
                                       id="title"
                                       name="title"
                                       value="{{ old('title', 'Misi: ' . $report->title) }}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                       placeholder="Masukkan judul misi">
                            </div>

                            <div class="md:col-span-2">
                                <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Deskripsi Misi</label>
                                <textarea id="description"
                                          name="description"
                                          rows="4"
                                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                          placeholder="Jelaskan detail misi yang akan dilakukan">{{ old('description') }}</textarea>
                            </div>

                            <div>
                                <label for="assigned_to_type" class="block text-sm font-medium text-gray-700 mb-2">Ditugaskan Kepada</label>
                                <select id="assigned_to_type"
                                        name="assigned_to_type"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                                    <option value="">Pilih jenis penugasan</option>
                                    <option value="community" {{ old('assigned_to_type') === 'community' ? 'selected' : '' }}>Komunitas</option>
                                    <option value="volunteer" {{ old('assigned_to_type') === 'volunteer' ? 'selected' : '' }}>Volunteer</option>
                                </select>
                            </div>

                            <div id="volunteerSelect" class="hidden">
                                <label for="assigned_volunteer_id" class="block text-sm font-medium text-gray-700 mb-2">Pilih Volunteer</label>
                                <select id="assigned_volunteer_id"
                                        name="assigned_volunteer_id"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                                    <option value="">Pilih volunteer</option>
                                    @foreach($volunteers ?? [] as $volunteer)
                                        <option value="{{ $volunteer->id }}" {{ old('assigned_volunteer_id') == $volunteer->id ? 'selected' : '' }}>
                                            {{ $volunteer->name }} ({{ $volunteer->email }})
                                        </option>
                                    @endforeach
                                </select>
                            </div>

                            <div>
                                <label for="scheduled_date" class="block text-sm font-medium text-gray-700 mb-2">Tanggal Terjadwal</label>
                                <input type="datetime-local"
                                       id="scheduled_date"
                                       name="scheduled_date"
                                       value="{{ old('scheduled_date') }}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                            </div>

                            <div>
                                <label for="status" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select id="status"
                                        name="status"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                                    <option value="open" {{ old('status') === 'open' ? 'selected' : '' }}>Open</option>
                                    <option value="on-progress" {{ old('status') === 'on-progress' ? 'selected' : '' }}>On Progress</option>
                                    <option value="completed" {{ old('status') === 'completed' ? 'selected' : '' }}>Completed</option>
                                    <option value="cancelled" {{ old('status') === 'cancelled' ? 'selected' : '' }}>Cancelled</option>
                                </select>
                            </div>
                        </div>

                        <!-- Location Information Display -->
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="text-sm font-medium text-gray-900 mb-2">Lokasi Misi (Dari Laporan)</h3>
                            <div class="text-sm text-gray-600 space-y-1">
                                <p><strong>Provinsi:</strong> {{ $report->province->name ?? 'Tidak diketahui' }}</p>
                                <p><strong>Kota:</strong> {{ $report->city->name }}</p>
                                <p><strong>Kecamatan:</strong> {{ $report->district->name }}</p>
                                @if($report->address)
                                <p><strong>Alamat:</strong> {{ $report->address }}</p>
                                @endif
                                @if($report->latitude && $report->longitude)
                                <p><strong>Koordinat:</strong> {{ $report->latitude }}, {{ $report->longitude }}</p>
                                @endif
                            </div>
                        </div>

                        <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                            <button type="button"
                                    id="cancelMission"
                                    class="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
                                Batal
                            </button>
                            <button type="submit"
                                    class="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                                Buat Misi
                            </button>
                        </div>
                    </form>
                </div>
            </div> --}}
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
            <!-- Status Card -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Status</h2>

                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Status Saat Ini</span>
                        <span class="px-3 py-1 rounded-full text-sm font-medium
                            @if($report->status === 'pending') bg-yellow-100 text-yellow-800
                            @elseif($report->status === 'verified') bg-blue-100 text-blue-800
                            @elseif($report->status === 'on-progress') bg-purple-100 text-purple-800
                            @elseif($report->status === 'rejected') bg-red-100 text-red-800
                            @elseif($report->status === 'completed') bg-green-100 text-green-800
                            @elseif($report->status === 'under-authority') bg-orange-100 text-orange-800
                            @endif">
                            {{ ucfirst(str_replace('-', ' ', $report->status)) }}
                        </span>
                    </div>

                    @if($report->verified_at)
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Diverifikasi</span>
                        <span class="text-sm text-gray-900">{{ $report->verified_at->format('d M Y') }}</span>
                    </div>
                    @endif
                </div>
            </div>

            <!-- Reporter Information -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Pelapor</h2>

                <div class="space-y-3">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
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
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Voting</h2>

                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700">Upvotes</span>
                        </div>
                        <span class="text-sm font-medium text-gray-900">{{ $report->upvotes_count }}</span>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.293a1 1 0 00-1.414-1.414L9 8.586 5.707 5.293a1 1 0 00-1.414 1.414L7.586 10l-3.293 3.293a1 1 0 101.414 1.414L9 11.414l3.293 3.293a1 1 0 001.414-1.414L10.414 10l3.293-3.293z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700">Dislikes</span>
                        </div>
                        <span class="text-sm font-medium text-gray-900">{{ $report->dislikes_count }}</span>
                    </div>
                </div>
            </div>

            <!-- Staff Information -->
            {{-- @if($report->verified_by_user_id || $report->completed_by_user_id)
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Staff</h2>

                <div class="space-y-4">
                    @if($report->verifiedByUser)
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Diverifikasi oleh</label>
                        <p class="text-gray-900">{{ $report->verifiedByUser->name }}</p>
                    </div>
                    @endif

                    @if($report->completedByUser)
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Diselesaikan oleh</label>
                        <p class="text-gray-900">{{ $report->completedByUser->name }}</p>
                    </div>
                    @endif
                </div>
            </div>
            @endif --}}

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

                    @if($report->completedByUser)
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Diselesaikan oleh</label>
                        <p class="text-gray-900">{{ $report->completedByUser->name }}</p>
                    </div>
                    @endif
                </div>
            @endif
        </div>

        </div>
    </div>
</div>
@endsection

@section('scripts')
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
                        <img src="${this.src}" alt="Report Image" class="max-w-full max-h-full object-contain">
                        <button class="absolute top-4 right-4 text-white text-2xl" onclick="this.parentElement.parentElement.remove()">×</button>
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

        cancelBtn.addEventListener('click', function() {
            missionForm.classList.add('hidden');
            toggleText.textContent = 'Buat Misi';
            toggleBtn.classList.remove('bg-gray-500', 'hover:bg-gray-600');
            toggleBtn.classList.add('bg-green-500', 'hover:bg-green-600');
        });

        // Script untuk menampilkan volunteer select
        const assignedToType = document.getElementById('assigned_to_type');
        const volunteerSelect = document.getElementById('volunteerSelect');

        assignedToType.addEventListener('change', function() {
            if (this.value === 'volunteer') {
                volunteerSelect.classList.remove('hidden');
            } else {
                volunteerSelect.classList.add('hidden');
            }
        });

        // Trigger change event on page load if volunteer is selected
        if (assignedToType.value === 'volunteer') {
            volunteerSelect.classList.remove('hidden');
        }
    });
</script>
@endsection
