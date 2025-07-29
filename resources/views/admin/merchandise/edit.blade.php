@extends('admin.layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">

    @include('admin.components.notification')

    <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">Edit Merchandise</h1>
                    <p class="text-gray-600 mt-2">Update informasi merchandise</p>
                </div>
                <a href="{{ route('admin.merchandise.index') }}"
                   class="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-lg transition duration-150 ease-in-out">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Kembali
                </a>
            </div>
        </div>

     

        <!-- Main Form Card -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <form action="{{ route('admin.merchandise.update', $merchandise->id) }}" method="POST" enctype="multipart/form-data" class="p-8">
                @csrf
                @method('PUT')

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Left Column -->
                    <div class="space-y-6">
                        <!-- Name Field -->
                        <div>
                            <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                                Nama Merchandise <span class="text-red-500">*</span>
                            </label>
                            <input type="text"
                                   id="name"
                                   name="name"
                                   value="{{ old('name', $merchandise->name) }}"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 @error('name') border-red-500 @enderror"
                                   placeholder="Masukkan nama merchandise"
                                   required>
                            @error('name')
                                <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Points Cost Field -->
                        <div>
                            <label for="points_cost" class="block text-sm font-semibold text-gray-700 mb-2">
                                Biaya Poin <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input type="number"
                                       id="points_cost"
                                       name="points_cost"
                                       value="{{ old('points_cost', $merchandise->points_cost) }}"
                                       min="0"
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 @error('points_cost') border-red-500 @enderror"
                                       placeholder="0"
                                       required>
                                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span class="text-gray-500 text-sm font-medium">Poin</span>
                                </div>
                            </div>
                            @error('points_cost')
                                <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Status Field -->
                        <div>
                            <label for="is_active" class="block text-sm font-semibold text-gray-700 mb-2">
                                Status
                            </label>
                            <div class="relative">
                                <select id="is_active"
                                        name="is_active"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 appearance-none @error('is_active') border-red-500 @enderror">
                                    <option value="1" {{ old('is_active', $merchandise->is_active) == 1 ? 'selected' : '' }}>
                                        Aktif
                                    </option>
                                    <option value="0" {{ old('is_active', $merchandise->is_active) == 0 ? 'selected' : '' }}>
                                        Tidak Aktif
                                    </option>
                                </select>
                                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                            @error('is_active')
                                <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>

                    <!-- Right Column -->
                    <div class="space-y-6">
                        <!-- Description Field -->
                        <div>
                            <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
                                Deskripsi <span class="text-red-500">*</span>
                            </label>
                            <textarea id="description"
                                      name="description"
                                      rows="5"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none @error('description') border-red-500 @enderror"
                                      placeholder="Masukkan deskripsi merchandise"
                                      required>{{ old('description', $merchandise->description) }}</textarea>
                            @error('description')
                                <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Image Upload Field -->
                        <div>
                            <label for="image_url" class="block text-sm font-semibold text-gray-700 mb-2">
                                Gambar Merchandise
                            </label>

                            <!-- Current Image Preview -->
                            @if($merchandise->image_url)
                                <div class="mb-4">
                                    <p class="text-sm text-gray-600 mb-2">Gambar saat ini:</p>
                                    <div class="relative inline-block">
                                        <img src="{{ Storage::url($merchandise->image_url) }}"
                                             alt="{{ $merchandise->name }}"
                                             class="w-32 h-32 object-cover rounded-lg border border-gray-200">
                                        <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded-lg"></div>
                                    </div>
                                </div>
                            @endif

                            <!-- File Input -->
                            <div class="relative">
                                <input type="file"
                                       id="image_url"
                                       name="image_url"
                                       accept="image/*"
                                       class="hidden"
                                       onchange="previewImage(this)">

                                <label for="image_url"
                                       class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-200">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500">
                                            <span class="font-semibold">Klik untuk upload</span> atau drag and drop
                                        </p>
                                        <p class="text-xs text-gray-500">PNG, JPG, JPEG (Max 2MB)</p>
                                    </div>
                                </label>
                            </div>

                            <!-- Preview Container -->
                            <div id="imagePreview" class="mt-4 hidden">
                                <p class="text-sm text-gray-600 mb-2">Preview gambar baru:</p>
                                <img id="preview" class="w-32 h-32 object-cover rounded-lg border border-gray-200">
                            </div>

                            @error('image_url')
                                <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                            @enderror

                            <p class="text-xs text-gray-500 mt-2">
                                * Kosongkan jika tidak ingin mengubah gambar
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                    <a href="{{ route('admin.merchandise.index') }}"
                       class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition duration-150 ease-in-out">
                        Batal
                    </a>
                    <button type="submit"
                            class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Update Merchandise
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- JavaScript for Image Preview -->
<script>
function previewImage(input) {
    const preview = document.getElementById('preview');
    const previewContainer = document.getElementById('imagePreview');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            preview.src = e.target.result;
            previewContainer.classList.remove('hidden');
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        previewContainer.classList.add('hidden');
    }
}

// File validation
document.getElementById('image_url').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        // Check file size (2MB = 2097152 bytes)
        if (file.size > 2097152) {
            alert('Ukuran file terlalu besar. Maksimal 2MB.');
            e.target.value = '';
            document.getElementById('imagePreview').classList.add('hidden');
            return;
        }

        // Check file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            alert('Format file tidak didukung. Gunakan PNG, JPG, atau JPEG.');
            e.target.value = '';
            document.getElementById('imagePreview').classList.add('hidden');
            return;
        }
    }
});

// Form validation before submit
document.querySelector('form').addEventListener('submit', function(e) {
    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const pointsCost = document.getElementById('points_cost').value;

    if (!name) {
        alert('Nama merchandise harus diisi.');
        e.preventDefault();
        document.getElementById('name').focus();
        return;
    }

    if (!description) {
        alert('Deskripsi harus diisi.');
        e.preventDefault();
        document.getElementById('description').focus();
        return;
    }

    if (!pointsCost || pointsCost < 0) {
        alert('Biaya poin harus diisi dan tidak boleh negatif.');
        e.preventDefault();
        document.getElementById('points_cost').focus();
        return;
    }
});
</script>
@endsection
