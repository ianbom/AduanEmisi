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

                <!-- Create Mission Form -->
                {{-- <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-lg font-semibold text-gray-900">Buat Misi Berdasarkan Laporan</h2>
                    <button id="toggleMissionForm" class="px-4 py-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600">
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

                        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div class="md:col-span-2">
                                <label for="title" class="block mb-2 text-sm font-medium text-gray-700">Judul Misi</label>
                                <input type="text"
                                       id="title"
                                       name="title"
                                       value="{{ old('title', 'Misi: ' . $report->title) }}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                       placeholder="Masukkan judul misi">
                            </div>

                            <div class="md:col-span-2">
                                <label for="description" class="block mb-2 text-sm font-medium text-gray-700">Deskripsi Misi</label>
                                <textarea id="description"
                                          name="description"
                                          rows="4"
                                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                          placeholder="Jelaskan detail misi yang akan dilakukan">{{ old('description') }}</textarea>
                            </div>

                            <div>
                                <label for="assigned_to_type" class="block mb-2 text-sm font-medium text-gray-700">Ditugaskan Kepada</label>
                                <select id="assigned_to_type"
                                        name="assigned_to_type"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                                    <option value="">Pilih jenis penugasan</option>
                                    <option value="community" {{ old('assigned_to_type') === 'community' ? 'selected' : '' }}>Komunitas</option>
                                    <option value="volunteer" {{ old('assigned_to_type') === 'volunteer' ? 'selected' : '' }}>Volunteer</option>
                                </select>
                            </div>

                            <div id="volunteerSelect" class="hidden">
                                <label for="assigned_volunteer_id" class="block mb-2 text-sm font-medium text-gray-700">Pilih Volunteer</label>
                                <select id="assigned_volunteer_id"
                                        name="assigned_volunteer_id"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                                    <option value="">Pilih volunteer</option>
                                    @foreach ($volunteers ?? [] as $volunteer)
                                        <option value="{{ $volunteer->id }}" {{ old('assigned_volunteer_id') == $volunteer->id ? 'selected' : '' }}>
                                            {{ $volunteer->name }} ({{ $volunteer->email }})
                                        </option>
                                    @endforeach
                                </select>
                            </div>

                            <div>
                                <label for="scheduled_date" class="block mb-2 text-sm font-medium text-gray-700">Tanggal Terjadwal</label>
                                <input type="datetime-local"
                                       id="scheduled_date"
                                       name="scheduled_date"
                                       value="{{ old('scheduled_date') }}"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                            </div>

                            <div>
                                <label for="status" class="block mb-2 text-sm font-medium text-gray-700">Status</label>
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
                        <div class="p-4 rounded-lg bg-gray-50">
                            <h3 class="mb-2 text-sm font-medium text-gray-900">Lokasi Misi (Dari Laporan)</h3>
                            <div class="space-y-1 text-sm text-gray-600">
                                <p><strong>Provinsi:</strong> {{ $report->province->name ?? 'Tidak diketahui' }}</p>
                                <p><strong>Kota:</strong> {{ $report->city->name }}</p>
                                <p><strong>Kecamatan:</strong> {{ $report->district->name }}</p>
                                @if ($report->address)
                                <p><strong>Alamat:</strong> {{ $report->address }}</p>
                                @endif
                                @if ($report->latitude && $report->longitude)
                                <p><strong>Koordinat:</strong> {{ $report->latitude }}, {{ $report->longitude }}</p>
                                @endif
                            </div>
                        </div>

                        <div class="flex items-center justify-end pt-4 space-x-3 border-t border-gray-200">
                            <button type="button"
                                    id="cancelMission"
                                    class="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300">
                                Batal
                            </button>
                            <button type="submit"
                                    class="px-6 py-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600">
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

                        @if ($report->verified_at)
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-medium text-gray-700">Diverifikasi</span>
                                <span class="text-sm text-gray-900">{{ $report->verified_at->format('d M Y') }}</span>
                            </div>
                        @endif
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

                <!-- Staff Information -->
                {{-- @if ($report->verified_by_user_id || $report->completed_by_user_id)
            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h2 class="mb-4 text-lg font-semibold text-gray-900">Staff</h2>

                <div class="space-y-4">
                    @if ($report->verifiedByUser)
                    <div>
                        <label class="block mb-1 text-sm font-medium text-gray-700">Diverifikasi oleh</label>
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
            </div>
            @endif --}}

                <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h2 class="mb-4 text-lg font-semibold text-gray-900">Tindakan Admin</h2>

                    {{-- Tampilkan tombol hanya jika status laporan masih 'pending' --}}
                    @if ($report->status === 'pending')
                        <div class="space-y-3">
                            <!-- Form untuk Menyetujui/Verifikasi Laporan -->
                            <form action="{{ route('admin.reports.accept', $report->id) }}" method="POST">
                                @csrf
                                @method('PUT')
                                <button type="submit"
                                    class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    Setujui & Verifikasi Laporan
                                </button>
                            </form>

                            <form action="{{ route('admin.reports.underAuthority', $report->id) }}" method="POST">
                                @csrf
                                @method('PUT')
                                <button type="submit"
                                    class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
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
                                    class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    Tolak Laporan
                                </button>
                            </form>
                        </div>
                    @else
                        {{-- Jika status bukan 'pending', tampilkan info staff yang memproses --}}
                        <p class="text-sm italic text-gray-500">Tindakan untuk laporan ini sudah diproses.</p>
                        <div class="mt-4 space-y-4">
                            @if ($report->verifiedByUser)
                                <div>
                                    <label class="block mb-1 text-sm font-medium text-gray-700">Diverifikasi oleh</label>
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
                    overlay.className =
                        'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
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
