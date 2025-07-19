@extends('admin.layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Buat Konten Baru</h1>
                <p class="text-gray-600">Buat konten baru dengan media pendukung</p>
            </div>

            @include('admin.components.notification')

            <!-- Form Card -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <form action="{{ route('admin.contents.store') }}" method="POST" enctype="multipart/form-data"
                    id="contentForm">
                    @csrf

                    <div class="p-6 space-y-6">
                        <!-- Title -->
                        <div>
                            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                                Judul <span class="text-red-500">*</span>
                            </label>
                            <input type="text" id="title" name="title" value="{{ old('title') }}"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 @error('title') border-red-500 @enderror"
                                placeholder="Masukkan judul konten" maxlength="255">
                            @error('title')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                            <p class="mt-1 text-xs text-gray-500">
                                <span id="titleCount">0</span>/255 karakter
                            </p>
                        </div>

                        <!-- Content Type -->
                        <div>
                            <label for="content_type" class="block text-sm font-medium text-gray-700 mb-2">
                                Tipe Konten
                            </label>
                            <select id="content_type" name="content_type"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 @error('content_type') border-red-500 @enderror">
                                <option value="">Pilih tipe konten</option>
                                <option value="article" {{ old('content_type') == 'article' ? 'selected' : '' }}>Artikel
                                </option>
                                <option value="news" {{ old('content_type') == 'video' ? 'selected' : '' }}>Video</option>
                                <option value="guide" {{ old('content_type') == 'modul' ? 'selected' : '' }}>Modul PDF
                                </option>
                            </select>
                            @error('content_type')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Body -->
                        <div>
                            <label for="body" class="block text-sm font-medium text-gray-700 mb-2">
                                Konten <span class="text-red-500">*</span>
                            </label>
                            <textarea id="body" name="body" rows="10"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 @error('body') border-red-500 @enderror"
                                placeholder="Tulis konten di sini...">{{ old('body') }}</textarea>
                            @error('body')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                            <p class="mt-1 text-xs text-gray-500">
                                <span id="bodyCount">0</span> karakter
                            </p>
                        </div>

                        <!-- Media Upload -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Media Pendukung
                            </label>
                            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
                                id="dropZone">
                                <input type="file" id="mediaInput" name="media[]" multiple
                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml,image/webp,video/mp4,video/mov,video/avi,video/mkv,video/wmv"
                                    class="hidden" onchange="handleFileSelect(this)">
                                <div class="cursor-pointer" onclick="document.getElementById('mediaInput').click()">
                                    <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none"
                                        viewBox="0 0 48 48">
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    <p class="text-gray-600 mb-2">Klik untuk upload atau drag & drop file</p>
                                    <p class="text-sm text-gray-500">Gambar: JPG, PNG, GIF, SVG, WebP (max 10MB)</p>
                                    <p class="text-sm text-gray-500">Video: MP4, MOV, AVI, MKV, WMV (max 10MB)</p>
                                </div>
                            </div>

                            <!-- File Preview -->
                            <div id="filePreview" class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>

                            <!-- Upload Progress -->
                            <div id="uploadProgress" class="mt-4 hidden">
                                <div class="bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: 0%"
                                        id="progressBar"></div>
                                </div>
                                <p class="text-sm text-gray-600 mt-1">Memproses file... <span id="progressText">0%</span>
                                </p>
                            </div>

                            @error('media')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                            @error('media.*')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>

                    <!-- Form Footer -->
                    <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                        <a href="{{ route('admin.contents.index') }}"
                            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                            Batal
                        </a>
                        <button type="submit" id="submitBtn"
                            class="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <span id="submitText">Simpan Konten</span>
                            <svg id="submitLoader" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white hidden"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        let selectedFiles = [];
        const maxFileSize = 10 * 1024 * 1024; // 10MB
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp'];
        const allowedVideoTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/mkv', 'video/wmv'];

        // Character counter for title
        document.getElementById('title').addEventListener('input', function() {
            const count = this.value.length;
            document.getElementById('titleCount').textContent = count;

            if (count > 255) {
                this.classList.add('border-red-500');
                document.getElementById('titleCount').classList.add('text-red-600');
            } else {
                this.classList.remove('border-red-500');
                document.getElementById('titleCount').classList.remove('text-red-600');
            }
        });

        // Character counter for body
        document.getElementById('body').addEventListener('input', function() {
            const count = this.value.length;
            document.getElementById('bodyCount').textContent = count.toLocaleString();
        });

        // Initialize character counters
        document.addEventListener('DOMContentLoaded', function() {
            const titleInput = document.getElementById('title');
            const bodyInput = document.getElementById('body');

            if (titleInput.value) {
                document.getElementById('titleCount').textContent = titleInput.value.length;
            }

            if (bodyInput.value) {
                document.getElementById('bodyCount').textContent = bodyInput.value.length.toLocaleString();
            }
        });

        function handleFileSelect(input) {
            const files = Array.from(input.files);
            const filePreview = document.getElementById('filePreview');
            const uploadProgress = document.getElementById('uploadProgress');

            // Show progress
            uploadProgress.classList.remove('hidden');

            // Clear previous previews
            filePreview.innerHTML = '';
            selectedFiles = [];

            let processedFiles = 0;
            const totalFiles = files.length;

            files.forEach((file, index) => {
                // Validate file
                if (!validateFile(file)) {
                    processedFiles++;
                    updateProgress(processedFiles, totalFiles);
                    return;
                }

                selectedFiles.push(file);

                const fileItem = document.createElement('div');
                fileItem.className = 'relative bg-gray-100 rounded-lg p-4 border hover:shadow-md transition-shadow';

                const fileType = file.type.startsWith('image/') ? 'image' : 'video';

                if (fileType === 'image') {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        fileItem.innerHTML = `
                    <div class="relative">
                        <img src="${e.target.result}" class="w-full h-24 object-cover rounded mb-2">
                        <div class="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            IMG
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 truncate font-medium">${file.name}</p>
                    <p class="text-xs text-gray-500">${formatFileSize(file.size)}</p>
                    <button type="button" onclick="removeFile(${index})" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors">
                        ×
                    </button>
                `;
                        processedFiles++;
                        updateProgress(processedFiles, totalFiles);
                    };
                    reader.readAsDataURL(file);
                } else {
                    fileItem.innerHTML = `
                <div class="relative">
                    <div class="w-full h-24 bg-gray-200 rounded flex items-center justify-center mb-2">
                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div class="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        VID
                    </div>
                </div>
                <p class="text-sm text-gray-600 truncate font-medium">${file.name}</p>
                <p class="text-xs text-gray-500">${formatFileSize(file.size)}</p>
                <button type="button" onclick="removeFile(${index})" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors">
                    ×
                </button>
            `;
                    processedFiles++;
                    updateProgress(processedFiles, totalFiles);
                }

                filePreview.appendChild(fileItem);
            });

            updateFileInput();
        }

        function validateFile(file) {
            // Check file size
            if (file.size > maxFileSize) {
                showError(`File "${file.name}" terlalu besar. Maksimal 10MB.`);
                return false;
            }

            // Check file type
            const isValidImage = allowedImageTypes.includes(file.type);
            const isValidVideo = allowedVideoTypes.includes(file.type);

            if (!isValidImage && !isValidVideo) {
                showError(`File "${file.name}" format tidak didukung.`);
                return false;
            }

            return true;
        }

        function showError(message) {
            // Create error notification
            const errorDiv = document.createElement('div');
            errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
            errorDiv.textContent = message;

            document.body.appendChild(errorDiv);

            // Remove after 5 seconds
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        }

        function updateProgress(processed, total) {
            const percentage = (processed / total) * 100;
            document.getElementById('progressBar').style.width = percentage + '%';
            document.getElementById('progressText').textContent = Math.round(percentage) + '%';

            if (processed === total) {
                setTimeout(() => {
                    document.getElementById('uploadProgress').classList.add('hidden');
                }, 1000);
            }
        }

        function removeFile(index) {
            selectedFiles.splice(index, 1);
            updateFileInput();
            refreshPreview();
        }

        function refreshPreview() {
            const filePreview = document.getElementById('filePreview');
            filePreview.innerHTML = '';

            selectedFiles.forEach((file, newIndex) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'relative bg-gray-100 rounded-lg p-4 border hover:shadow-md transition-shadow';

                const fileType = file.type.startsWith('image/') ? 'image' : 'video';

                if (fileType === 'image') {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        fileItem.innerHTML = `
                    <div class="relative">
                        <img src="${e.target.result}" class="w-full h-24 object-cover rounded mb-2">
                        <div class="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            IMG
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 truncate font-medium">${file.name}</p>
                    <p class="text-xs text-gray-500">${formatFileSize(file.size)}</p>
                    <button type="button" onclick="removeFile(${newIndex})" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors">
                        ×
                    </button>
                `;
                    };
                    reader.readAsDataURL(file);
                } else {
                    fileItem.innerHTML = `
                <div class="relative">
                    <div class="w-full h-24 bg-gray-200 rounded flex items-center justify-center mb-2">
                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div class="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        VID
                    </div>
                </div>
                <p class="text-sm text-gray-600 truncate font-medium">${file.name}</p>
                <p class="text-xs text-gray-500">${formatFileSize(file.size)}</p>
                <button type="button" onclick="removeFile(${newIndex})" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors">
                    ×
                </button>
            `;
                }

                filePreview.appendChild(fileItem);
            });
        }

        function updateFileInput() {
            const input = document.getElementById('mediaInput');
            const dt = new DataTransfer();

            selectedFiles.forEach(file => {
                dt.items.add(file);
            });

            input.files = dt.files;
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';

            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));

            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // Drag and drop functionality
        const dropZone = document.getElementById('dropZone');

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-blue-400', 'bg-blue-50');
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-blue-400', 'bg-blue-50');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-blue-400', 'bg-blue-50');

            const files = Array.from(e.dataTransfer.files);
            const input = document.getElementById('mediaInput');

            const dt = new DataTransfer();
            files.forEach(file => {
                dt.items.add(file);
            });

            input.files = dt.files;
            handleFileSelect(input);
        });

        // Form submission handling
        document.getElementById('contentForm').addEventListener('submit', function(e) {
            const submitBtn = document.getElementById('submitBtn');
            const submitText = document.getElementById('submitText');
            const submitLoader = document.getElementById('submitLoader');

            // Disable button and show loading
            submitBtn.disabled = true;
            submitText.textContent = 'Menyimpan...';
            submitLoader.classList.remove('hidden');

            // Validate required fields
            const title = document.getElementById('title').value.trim();
            const body = document.getElementById('body').value.trim();

            if (!title || !body) {
                e.preventDefault();
                submitBtn.disabled = false;
                submitText.textContent = 'Simpan Konten';
                submitLoader.classList.add('hidden');
                showError('Judul dan konten wajib diisi!');
                return;
            }

            // If validation passes, let the form submit normally
        });

        // Auto-save functionality (optional)
        let autoSaveTimeout;

        function autoSave() {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                const formData = new FormData(document.getElementById('contentForm'));
                localStorage.setItem('content_draft', JSON.stringify({
                    title: formData.get('title'),
                    body: formData.get('body'),
                    content_type: formData.get('content_type'),
                    timestamp: new Date().toISOString()
                }));
                console.log('Draft saved to localStorage');
            }, 2000);
        }

        // Add auto-save listeners
        document.getElementById('title').addEventListener('input', autoSave);
        document.getElementById('body').addEventListener('input', autoSave);
        document.getElementById('content_type').addEventListener('change', autoSave);

        // Load draft on page load
        document.addEventListener('DOMContentLoaded', function() {
            const draft = localStorage.getItem('content_draft');
            if (draft) {
                try {
                    const draftData = JSON.parse(draft);
                    const draftTime = new Date(draftData.timestamp);
                    const now = new Date();
                    const hoursDiff = (now - draftTime) / (1000 * 60 * 60);

                    // Only restore if draft is less than 24 hours old
                    if (hoursDiff < 24) {
                        if (confirm('Ditemukan draft yang tersimpan. Apakah Anda ingin memulihkannya?')) {
                            document.getElementById('title').value = draftData.title || '';
                            document.getElementById('body').value = draftData.body || '';
                            document.getElementById('content_type').value = draftData.content_type || '';

                            // Update character counters
                            document.getElementById('titleCount').textContent = (draftData.title || '').length;
                            document.getElementById('bodyCount').textContent = (draftData.body || '').length
                                .toLocaleString();
                        }
                    }
                } catch (e) {
                    console.error('Error loading draft:', e);
                }
            }
        });
    </script>
@endpush
