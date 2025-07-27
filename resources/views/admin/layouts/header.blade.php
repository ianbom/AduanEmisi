<header class="sticky top-0 z-40 bg-white/75 backdrop-blur-lg shadow-sm">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {{-- Tombol Hamburger untuk Mobile --}}
        <div class="flex items-center gap-x-6 lg:hidden">
            <button id="open-sidebar-btn" type="button" class="-m-2.5 p-2.5 text-gray-700">
                <span class="sr-only">Open sidebar</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </div>

        {{-- Judul Halaman (Opsional, bisa diisi dinamis) --}}
        <div class="hidden lg:flex lg:flex-1">
            <h1 class="text-lg font-semibold text-gray-800">Dashboard</h1>
        </div>

        {{-- Bagian Kanan Header: Notifikasi & Profil --}}
        <div class="flex flex-1 items-center justify-end gap-x-4">
            @auth


                <!-- Pemisah Vertikal -->
                <div class="hidden sm:block sm:h-6 sm:w-px sm:bg-gray-200" aria-hidden="true"></div>

                <!-- Dropdown Profil Pengguna -->
                <div class="relative">
                    <button type="button" class="flex items-center gap-x-3 rounded-full bg-white p-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 hover:bg-gray-50 transition-colors duration-200" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                        <img class="h-8 w-8 rounded-full object-cover" src="https://ui-avatars.com/api/?name={{ urlencode(Auth::user()->name) }}&background=107555&color=ffffff&size=128" alt="User avatar">
                        <span class="hidden lg:flex lg:items-center">
                            <span class="text-sm font-semibold text-gray-900" aria-hidden="true">{{ Auth::user()->name }}</span>
                            <svg class="ml-2 h-5 w-5 text-gray-400 transition-transform duration-200" id="dropdown-arrow" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg>
                        </span>
                    </button>

                    <!-- Dropdown menu -->
                    <div id="user-menu" class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 transform opacity-0 scale-95 pointer-events-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                        <div class="px-4 py-3 border-b border-gray-100">
                            <p class="text-sm font-medium text-gray-900">{{ Auth::user()->name }}</p>
                            <p class="text-sm text-gray-500">{{ Auth::user()->email }}</p>
                        </div>
                        <div class="py-1">
                            <a href="#" class="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                <svg class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                Profil Saya
                            </a>
                            <a href="#" class="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                <svg class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0 .55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                Pengaturan
                            </a>
                        </div>
                        <div class="border-t border-gray-100"></div>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit" class="group flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50" role="menuitem">
                                <svg class="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
                                Keluar
                            </button>
                        </form>
                    </div>
                </div>
            @else
                <a href="{{ route('login') }}" class="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600">Log in <span aria-hidden="true">→</span></a>
            @endauth
        </div>
    </div>
</header>

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // --- User Profile Dropdown (Desktop) ---
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenu = document.getElementById('user-menu');
    const dropdownArrow = document.getElementById('dropdown-arrow');

    if (userMenuButton && userMenu && dropdownArrow) {
        userMenuButton.addEventListener('click', function (event) {
            event.stopPropagation();
            const isExpanded = userMenuButton.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // Menutup dropdown
                userMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
                dropdownArrow.classList.remove('rotate-180');
            } else {
                // Membuka dropdown
                userMenu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
                dropdownArrow.classList.add('rotate-180');
            }
            userMenuButton.setAttribute('aria-expanded', !isExpanded);
        });

        // Menutup dropdown saat mengklik di luar
        document.addEventListener('click', function(event) {
            if (!userMenuButton.contains(event.target) && !userMenu.contains(event.target)) {
                if (userMenuButton.getAttribute('aria-expanded') === 'true') {
                    userMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
                    dropdownArrow.classList.remove('rotate-180');
                    userMenuButton.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Menutup dropdown dengan tombol Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && userMenuButton.getAttribute('aria-expanded') === 'true') {
                userMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
                dropdownArrow.classList.remove('rotate-180');
                userMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- Tombol Hamburger (Jika ada di layout ini) ---
    // Logika untuk tombol hamburger sudah ada di file sidebar.blade.php Anda,
    // jadi tidak perlu diduplikasi di sini kecuali jika ini adalah file yang terpisah.
});
</script>
@endpush
