@extends('admin.layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Edit Mission</h1>

    @include('admin.components.notification')

    <form action="{{ route('admin.missions.update', $mission->id) }}" method="POST" enctype="multipart/form-data" class="bg-white rounded-lg shadow-md p-6 mb-8">
        @csrf
        @method('PUT')

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Bagian Kiri: Informasi Utama -->
            <div>
                <h2 class="text-xl font-semibold text-gray-700 mb-4">Mission Details</h2>

                <div class="mb-4">
                    <label for="title" class="block text-gray-700 font-medium mb-2">Title</label>
                    <input type="text" name="title" id="title" value="{{ old('title', $mission->title) }}"
                           class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    @error('title')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-4">
                    <label for="description" class="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea name="description" id="description" rows="4"
                              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">{{ old('description', $mission->description) }}</textarea>
                    @error('description')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-4">
                    <label for="report_id" class="block text-gray-700 font-medium mb-2">Related Report</label>
                    <select name="report_id" id="report_id"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">-- Select Report --</option>
                        @foreach($reports as $report)
                            <option value="{{ $report->id }}"
                                {{ old('report_id', $mission->report_id) == $report->id ? 'selected' : '' }}>
                                {{ $report->title }}
                            </option>
                        @endforeach
                    </select>
                    @error('report_id')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label for="status" class="block text-gray-700 font-medium mb-2">Status</label>
                        <select name="status" id="status"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            @foreach(['open', 'on-progress', 'completed', 'cancelled'] as $option)
                                <option value="{{ $option }}"
                                    {{ old('status', $mission->status) === $option ? 'selected' : '' }}>
                                    {{ ucfirst($option) }}
                                </option>
                            @endforeach
                        </select>
                        @error('status')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="scheduled_date" class="block text-gray-700 font-medium mb-2">Scheduled Date</label>
                        <input type="datetime-local" name="scheduled_date" id="scheduled_date"
                               value="{{ old('scheduled_date', $mission->scheduled_date ? $mission->scheduled_date->format('Y-m-d\TH:i') : '') }}"
                               class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        @error('scheduled_date')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

            <div class="mb-6">
                <label for="thumbnail_url" class="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail
                </label>

                <!-- Current Image Display -->
                @if($mission->thumbnail_url)
                <div class="mb-4">
                    <p class="text-sm text-gray-600 mb-2">Icon saat ini:</p>
                    <div class="flex items-center space-x-4">
                        <img src="{{ asset('storage/' . $mission->thumbnail_url) }}" alt="Current mission Icon" class="w-16 h-16 object-cover rounded-lg border">
                        <div>
                            <p class="text-sm font-medium">{{ basename($mission->thumbnail_url) }}</p>
                            <p class="text-xs text-gray-500">Upload gambar baru untuk mengganti</p>
                        </div>
                    </div>
                </div>
                @endif

                <div class="flex items-center justify-center w-full">
                        <label for="thumbnail_url" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors @error('thumbnail_url') border-red-500 @enderror">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6" id="upload-placeholder">
                                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p class="mb-2 text-sm text-gray-500">
                                    <span class="font-semibold">Klik untuk upload</span> atau drag and drop
                                </p>
                                <p class="text-xs text-gray-500">PNG, JPG, GIF, SVG (MAX. 2MB)</p>
                                @if($mission->thumbnail_url)
                                <p class="text-xs text-blue-600 mt-1">Biarkan kosong jika tidak ingin mengganti</p>
                                @endif
                            </div>
                            <div class="hidden" id="image-preview">
                                <img id="preview-img" class="max-w-full max-h-48 rounded-lg" alt="Preview">
                                <p class="mt-2 text-sm text-gray-600 text-center" id="file-name"></p>
                            </div>
                            <input
                                id="thumbnail_url"
                                name="thumbnail_url"
                                type="file"
                                class="hidden"
                                accept="image/*"
                                onchange="previewImage(this)"
                            />
                        </label>
                    </div>
                    @error('thumbnail_url')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
            </div>

            </div>

            <!-- Bagian Kanan: Lokasi & Penugasan -->
            <div>
                <h2 class="text-xl font-semibold text-gray-700 mb-4">Location & Assignment</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label for="province_id" class="block text-gray-700 font-medium mb-2">Province</label>
                        <select name="province_id" id="province_id"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-- Select province --</option>
                            @foreach($provinces as $province)
                                <option value="{{ $province->id }}"
                                    {{ old('province_id', $mission->province_id) == $province->id ? 'selected' : '' }}>
                                    {{ $province->name }}
                                </option>
                            @endforeach
                        </select>
                        @error('province_id')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="city_id" class="block text-gray-700 font-medium mb-2">City</label>
                        <select name="city_id" id="city_id"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-- Select City --</option>
                            @foreach($cities as $city)
                                <option value="{{ $city->id }}"
                                    {{ old('city_id', $mission->city_id) == $city->id ? 'selected' : '' }}>
                                    {{ $city->name }}
                                </option>
                            @endforeach
                        </select>
                        @error('city_id')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="district_id" class="block text-gray-700 font-medium mb-2">District</label>
                        <select name="district_id" id="district_id"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">-- Select District --</option>
                            @foreach($districts as $district)
                                <option value="{{ $district->id }}"
                                    {{ old('district_id', $mission->district_id) == $district->id ? 'selected' : '' }}>
                                    {{ $district->name }}
                                </option>
                            @endforeach
                        </select>
                        @error('district_id')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <div class="mb-4">
                    <label for="address" class="block text-gray-700 font-medium mb-2">Address</label>
                    <textarea name="address" id="address" rows="3"
                              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">{{ old('address', $mission->address) }}</textarea>
                    @error('address')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label for="latitude" class="block text-gray-700 font-medium mb-2">Latitude</label>
                        <input type="text" name="latitude" id="latitude" value="{{ old('latitude', $mission->latitude) }}"
                               class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        @error('latitude')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="longitude" class="block text-gray-700 font-medium mb-2">Longitude</label>
                        <input type="text" name="longitude" id="longitude" value="{{ old('longitude', $mission->longitude) }}"
                               class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        @error('longitude')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                {{-- <div class="mb-4">
                    <label for="assigned_to_type" class="block text-gray-700 font-medium mb-2">Assign To</label>
                    <select name="assigned_to_type" id="assigned_to_type"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">-- Select Type --</option>
                        <option value="community" {{ old('assigned_to_type', $mission->assigned_to_type) === 'community' ? 'selected' : '' }}>Community</option>
                        <option value="volunteer" {{ old('assigned_to_type', $mission->assigned_to_type) === 'volunteer' ? 'selected' : '' }}>Volunteer</option>
                    </select>
                    @error('assigned_to_type')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div> --}}

                {{-- <div class="mb-4">
                    <label for="assigned_volunteer_id" class="block text-gray-700 font-medium mb-2">Assign Volunteer</label>
                    <select name="assigned_volunteer_id" id="assigned_volunteer_id"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">-- Select Volunteer --</option>
                        <!-- Daftar volunteer akan ditampilkan di sini -->
                    </select>
                    @error('assigned_volunteer_id')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div> --}}
            </div>
        </div>

        <div class="flex justify-between items-center border-t pt-4">
            <a href="{{ route('admin.missions.index') }}"
               class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors">
                Cancel
            </a>
            <button type="submit"
                    class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Update Mission
            </button>
        </div>
    </form>

        <!-- Bagian Tambahan: Volunteers, Communities, Documentation -->
    <div class="space-y-6">
        <!-- Volunteers Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Volunteers</h2>

            @if($volunteers->count() > 0)
                <div class="overflow-x-auto">
                    <table id="volunteerTable" class="min-w-full table-auto border-collapse">
                        <thead>
                            <tr class="bg-gray-50">
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    No
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    Name
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    Role
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    Status
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    Leader
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    Sertifikat
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            @foreach($volunteers as $volunteer)
                                <tr class="hover:bg-gray-50 transition-colors duration-150">
                                    <td class="px-4 py-4 whitespace-nowrap">
                                        {{ $volunteer->id }}
                                    </td>
                                    <td class="px-4 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            @if($volunteer->is_leader)
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 00-2-2H5z" />
                                                </svg>
                                            @endif
                                            <p class="font-medium text-gray-900">{{ $volunteer->user->name }}</p>
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 whitespace-nowrap">
                                        {{ $volunteer->user->role }}
                                    </td>
                                    <td class="px-4 py-4 whitespace-nowrap">
                                        <span class="px-2 py-1 text-xs font-medium rounded-full capitalize
                                            @if($volunteer->participation_status === 'confirmed')
                                                bg-green-100 text-green-800
                                            @elseif($volunteer->participation_status === 'pending')
                                                bg-yellow-100 text-yellow-800
                                            @elseif($volunteer->participation_status === 'cancelled')
                                                bg-red-100 text-red-800
                                            @else
                                                bg-blue-100 text-blue-800
                                            @endif
                                        ">
                                            {{ $volunteer->participation_status }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-4 whitespace-nowrap">
                                        @if($volunteer->is_leader)
                                            <span class="px-3 py-1 bg-yellow-200 text-yellow-800 text-xs font-bold rounded-full">
                                                LEADER
                                            </span>
                                        @else
                                            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                                MEMBER
                                            </span>
                                        @endif
                                    </td>
                                      <td class="px-4 py-4 whitespace-nowrap text-sm">
                                    {{-- INI BAGIAN YANG DIPERBAIKI --}}
                                    @if($volunteer->certificate_url)
                                        <a href="{{ asset('storage/' . $volunteer->certificate_url) }}" target="_blank"
                                           class="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full hover:bg-green-200 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Lihat
                                        </a>
                                    @elseif($volunteer->participation_status == 'attended')
                                        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                                            Belum Dibuat
                                        </span>
                                    @endif
                                </td>
                                    <td class="px-4 py-4 whitespace-nowrap">
                                        <button
                                            onclick="openEditModal({{ $volunteer->id }}, '{{ $volunteer->user->name }}', '{{ $volunteer->participation_status }}', {{ $volunteer->is_leader ? 'true' : 'false' }})"
                                            class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150">
                                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                            </svg>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            @else
                <div class="text-center py-8">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <p class="text-gray-500 italic">No volunteers assigned to this mission.</p>
                </div>
            @endif
        </div>

               <!-- Section: Generate Certificate -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">

            {{-- Cek apakah ada volunteer yang hadir. Jika tidak, tampilkan pesan. --}}
            @if($volunteers->where('participation_status', 'attended')->count() > 0)

                <div class="p-6 border-b border-gray-200">
                    <h2 class="text-xl font-semibold text-gray-800">Generate Sertifikat Massal</h2>
                    <p class="mt-1 text-sm text-gray-600">
                        Gunakan form ini untuk membuat sertifikat bagi
                        <span class="font-bold text-blue-600">{{ $volunteers->where('participation_status', 'attended')->count() }} volunteer</span>
                        yang statusnya 'Attended'.
                    </p>
                </div>

                <form id="certificateForm" action="{{ route('admin.missions.certificates.generate') }}" method="POST">
                    @csrf
                    <input type="hidden" name="mission_id" value="{{ $mission->id }}">

                    <div class="p-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Certificate Signer Title -->
                            <div>
                                <label for="certificate_title" class="block mb-2 text-sm font-medium text-gray-700">Jabatan Penanda Tangan <span class="text-red-500">*</span></label>
                                <input type="text" name="title" id="certificate_title" placeholder="cth: Ketua Pelaksana" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                @error('title')
                                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                                @enderror
                            </div>

                            <!-- Certificate Date -->
                            <div>
                                <label for="certificate_date" class="block mb-2 text-sm font-medium text-gray-700">Tanggal Sertifikat <span class="text-red-500">*</span></label>
                                <input type="date" name="date" id="certificate_date" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required value="{{ date('Y-m-d') }}">
                                @error('date')
                                    <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>
                    </div>

                    <!-- Form Footer -->
                    <div class="flex justify-end px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <button id="generateBtn" type="submit" class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed">
                            <svg id="btnIcon" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            <svg id="btnSpinner" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span id="btnText">Generate Sertifikat</span>
                        </button>
                    </div>
                </form>

            @else
                {{-- Pesan yang ditampilkan jika tidak ada volunteer yang hadir --}}
                <div class="p-6 text-center">
                    <div class="flex justify-center items-center flex-col text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <h3 class="text-lg font-semibold text-gray-700">Sertifikat Belum Dapat Dibuat</h3>
                        <p class="mt-1 text-sm">Tidak ada volunteer yang tercatat hadir (Attended) pada misi ini.</p>
                    </div>
                </div>

            @endif
        </div>

        <!-- Documentation Section -->
        {{-- <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Documentation</h2>
            @if($missionDocumentations->count() > 0)
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    @foreach($missionDocumentations as $doc)
                        <div class="aspect-square bg-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                            @if($doc->media_type === 'image')
                                <img src="{{ $doc->media_url }}" alt="Documentation" class="w-full h-full object-cover cursor-pointer">
                            @else
                                <div class="w-full h-full flex items-center justify-center bg-gray-800 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                        <path d="M10 6l4 4-4 4" />
                                    </svg>
                                </div>
                            @endif
                        </div>
                    @endforeach
                </div>
            @else
                <div class="text-center py-8">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-gray-500 italic">No documentation available for this mission.</p>
                </div>
            @endif
        </div> --}}
    </div>
</div>

  <div id="editModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="mt-3">
                <!-- Modal Header -->
                <div class="flex items-center justify-between pb-4 border-b">
                    <h3 class="text-lg font-medium text-gray-900">
                        Edit Status Volunteer
                    </h3>
                    <button onclick="closeEditModal()" class="text-gray-400 hover:text-gray-600">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <!-- Modal Body -->
                <form id="editForm" method="POST" class="mt-4">
                    @csrf
                    @method('PUT')

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Volunteer Name
                        </label>
                        <input type="text" id="volunteerName" readonly
                               class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                    </div>

                    <div class="mb-4">
                        <label for="participation_status" class="block text-sm font-medium text-gray-700 mb-2">
                            Participation Status
                        </label>
                        <select name="participation_status" id="participation_status"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="attended">Attended</option>
                        </select>
                    </div>

                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Leadership Status
                        </label>
                        <div class="flex items-center space-x-4">
                            <label class="flex items-center">
                                <input type="radio" name="is_leader" value="1"
                                       class="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300">
                                <span class="ml-2 text-sm text-gray-700">Leader</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" name="is_leader" value="0"
                                       class="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300">
                                <span class="ml-2 text-sm text-gray-700">Member</span>
                            </label>
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div class="flex items-center justify-end space-x-3 pt-4 border-t">
                        <button type="button" onclick="closeEditModal()"
                                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            Cancel
                        </button>
                        <button type="submit"
                                class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Update Status
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection



@push('scripts')

 <script>
    document.addEventListener('DOMContentLoaded', function() {
    const certForm = document.getElementById('certificateForm');

    if (certForm) {
        certForm.addEventListener('submit', function() {
            const generateBtn = document.getElementById('generateBtn');
            const btnIcon = document.getElementById('btnIcon');
            const btnSpinner = document.getElementById('btnSpinner');
            const btnText = document.getElementById('btnText');

            // Disable button to prevent double-clicking
            generateBtn.disabled = true;

            // Show spinner and change text
            btnIcon.classList.add('hidden');
            btnSpinner.classList.remove('hidden');
            btnText.textContent = 'Generating...';
        });
    }
});

        function openEditModal(missionVolunteer, volunteerName, participationStatus, isLeader) {
            // Set form action URL
            document.getElementById('editForm').action = `/admin/missions/update/volunteer/${missionVolunteer}`;

            // Fill form data
            document.getElementById('volunteerName').value = volunteerName;
            document.getElementById('participation_status').value = participationStatus;

            // Set leadership status radio button
            const leaderRadio = document.querySelector('input[name="is_leader"][value="1"]');
            const memberRadio = document.querySelector('input[name="is_leader"][value="0"]');

            if (isLeader) {
                leaderRadio.checked = true;
            } else {
                memberRadio.checked = true;
            }

            // Show modal
            document.getElementById('editModal').classList.remove('hidden');
        }

        function closeEditModal() {
            document.getElementById('editModal').classList.add('hidden');
        }

        // Close modal when clicking outside
        document.getElementById('editModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeEditModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeEditModal();
            }
        });
    </script>

<script>

    document.addEventListener('DOMContentLoaded', function() {
        const volunteerSelect = document.getElementById('assigned_volunteer_id');

        assignTypeSelect.addEventListener('change', function() {
            if (this.value === 'volunteer') {
                volunteerSelect.disabled = false;

            } else {
                volunteerSelect.disabled = true;
                volunteerSelect.value = '';
            }
        });


        if (assignTypeSelect.value !== 'volunteer') {
            volunteerSelect.disabled = true;
        }
    });

    $(document).ready(function() {

        $('#volunteerTable').DataTable({

        });
    });



function previewImage(input) {
    const file = input.files[0];
    const placeholder = document.getElementById('upload-placeholder');
    const preview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    const fileName = document.getElementById('file-name');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            fileName.textContent = file.name;
            placeholder.classList.add('hidden');
            preview.classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    } else {
        placeholder.classList.remove('hidden');
        preview.classList.add('hidden');
    }
}

// Drag and drop functionality
const uploadArea = document.querySelector('label[for="thumbnail_url"]');
const fileInput = document.getElementById('thumbnail_url');

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('border-blue-500', 'bg-blue-50');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('border-blue-500', 'bg-blue-50');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('border-blue-500', 'bg-blue-50');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        previewImage(fileInput);
    }
});
</script>
</script>
@endpush



