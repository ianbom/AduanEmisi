<div>
    {{-- PERUBAHAN: Menambahkan ID dan kelas 'hidden' untuk state awal --}}
    <div id="mobile-sidebar" class="relative z-50 hidden lg:hidden" role="dialog" aria-modal="true">
        <div id="sidebar-backdrop"
            class="fixed inset-0 transition-opacity duration-300 ease-linear opacity-0 bg-gray-900/80" aria-hidden="true">
        </div>

        <div class="fixed inset-0 flex">
            <div id="mobile-sidebar-panel"
                class="relative flex flex-1 w-full max-w-xs mr-16 transition duration-300 ease-in-out transform -translate-x-full">
                <div
                    class="absolute top-0 flex justify-center w-16 pt-5 transition duration-300 ease-in-out opacity-0 left-full">
                    {{-- PERUBAHAN: Menambahkan ID pada tombol close --}}
                    <button id="mobile-close-btn" type="button" class="-m-2.5 p-2.5">
                        <span class="sr-only">Close sidebar</span>
                        <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {{-- <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div class="flex h-16 shrink-0 items-center">
                        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
                    </div>
                    <nav class="flex flex-col flex-1">
                        <ul role="list" class="flex flex-col flex-1 gap-y-7">
                            <li>
                                <ul role="list" class="-mx-2 space-y-1">
                                    <li>
                                        <!-- Current: "bg-gray-50 text-indigo-600", Default: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50" -->
                                        <a href="#"
                                            class="flex p-2 font-semibold text-indigo-600 rounded-md group gap-x-3 bg-gray-50 text-sm/6">
                                            <svg class="text-indigo-600 size-6 shrink-0" fill="none"
                                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                aria-hidden="true" data-slot="icon">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                            </svg>
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a href="{{ route('admin.reports.index') }}"
                                            class="flex p-2 font-semibold text-gray-700 rounded-md group gap-x-3 text-sm/6 hover:bg-gray-50 hover:text-indigo-600">
                                            <svg class="text-gray-400 size-6 shrink-0 group-hover:text-indigo-600"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                            </svg>
                                            Reports
                                        </a>
                                    </li>
                                    <li>
                                        <a href="{{ route('admin.contents.index') }}"
                                            class="flex p-2 font-semibold text-gray-700 rounded-md group gap-x-3 text-sm/6 hover:bg-gray-50 hover:text-indigo-600">
                                            <svg class="text-gray-400 size-6 shrink-0 group-hover:text-indigo-600"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                            </svg>
                                            Missions
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex p-2 font-semibold text-gray-700 rounded-md group gap-x-3 text-sm/6 hover:bg-gray-50 hover:text-indigo-600">
                                            <svg class="text-gray-400 size-6 shrink-0 group-hover:text-indigo-600"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                            </svg>
                                            Calendar
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex p-2 font-semibold text-gray-700 rounded-md group gap-x-3 text-sm/6 hover:bg-gray-50 hover:text-indigo-600">
                                            <svg class="text-gray-400 size-6 shrink-0 group-hover:text-indigo-600"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                            </svg>
                                            Documents
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex p-2 font-semibold text-gray-700 rounded-md group gap-x-3 text-sm/6 hover:bg-gray-50 hover:text-indigo-600">
                                            <svg class="text-gray-400 size-6 shrink-0 group-hover:text-indigo-600"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                            </svg>
                                            Reports
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div class="font-semibold text-gray-400 text-xs/6">Your teams</div>
                                <ul role="list" class="mt-2 -mx-2 space-y-1">
                                    <li>
                                        <!-- Current: "bg-gray-50 text-indigo-600", Default: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50" -->
                                        <a href="#"
                                            class="flex p-2 font-semibold text-gray-700 rounded-md group gap-x-3 text-sm/6 hover:bg-gray-50 hover:text-indigo-600">
                                            <span
                                                class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">H</span>
                                            <span class="truncate">Heroicons</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex p-2 font-semibold text-gray-700 rounded-md group gap-x-3 text-sm/6 hover:bg-gray-50 hover:text-indigo-600">
                                            <span
                                                class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">T</span>
                                            <span class="truncate">Tailwind Labs</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex p-2 font-semibold text-gray-700 rounded-md group gap-x-3 text-sm/6 hover:bg-gray-50 hover:text-indigo-600">
                                            <span
                                                class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">W</span>
                                            <span class="truncate">Workcation</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div> --}}
            </div>
        </div>
    </div>

    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div class="flex h-16 shrink-0 items-center">
                <img class="h-8 w-auto" src="/LogoSobatBumi.png" alt="Your Company">
                <span>Admin Sobat Bumi</span>
            </div>
    <nav class="flex flex-1 flex-col">
    <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
            <div class="text-xs/6 font-semibold text-gray-400">Reports and Missions</div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li>
                    {{-- Reports --}}
                    <a href="{{ route('admin.reports.index') }}" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold {{ request()->routeIs('admin.reports.*') ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50' }}">
                        <svg class="size-6 shrink-0 {{ request()->routeIs('admin.reports.*') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600' }}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 5.25 6h.008a2.25 2.25 0 0 1 2.242 2.135 48.42 48.42 0 0 1-.334 6.114A2.25 2.25 0 0 1 7.12 16.5h-.008a2.25 2.25 0 0 1-2.242-2.135 48.36 48.36 0 0 1 .334-6.114A2.251 2.251 0 0 1 5.25 6Z" />
                        </svg>
                        Reports
                    </a>
                </li>
                <li>
                    {{-- Missions --}}
                    <a href="{{ route('admin.missions.index') }}" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold {{ request()->routeIs('admin.missions.*') ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50' }}">
                        <svg class="size-6 shrink-0 {{ request()->routeIs('admin.missions.*') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600' }}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M5.834 19.834l-1.591-1.591M3.75 10.5H6m11.935-4.666l-3.84-3.84A1.5 1.5 0 0 0 12 2.25h-1.5a4.5 4.5 0 0 0-4.5 4.5v1.5a1.5 1.5 0 0 0 1.066 1.415l3.84 3.84m-4.667-4.667L6 12m6-6l3.84-3.84" />
                        </svg>
                        Missions
                    </a>
                </li>
                <li>
                    {{-- Map --}}
                    <a href="#" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                        <svg class="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.25c-.836-.417-1.873-.417-2.709 0L3.372 4.82c-.836.417-.88 1.38-.128 1.847l3.848 2.437c.317.2.69.2 1.006 0l4.125-2.063c.836-.417 1.873-.417 2.709 0L21 6.75" />
                        </svg>
                        Map
                    </a>
                </li>
                <li>
                    {{-- Content --}}
                    <a href="{{ route('admin.contents.index') }}" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold {{ request()->routeIs('admin.contents.*') ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50' }}">
                        <svg class="size-6 shrink-0 {{ request()->routeIs('admin.contents.*') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600' }}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        Content
                    </a>
                </li>
            </ul>
        </li>
        <li>
            <div class="text-xs/6 font-semibold text-gray-400">Sertifikat dan Badges</div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li>
                    {{-- Sertifikat --}}
                    <a href="{{ route('admin.certificates.index') }}" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold {{ request()->routeIs('admin.certificates.*') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600' }}">
                        <svg class="size-6 shrink-0 {{ request()->routeIs('admin.certificates.*') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600' }}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 1 0 0-13.5h9a9.75 9.75 0 1 0 0 13.5ZM16.5 18.75h-9a9.75 9.75 0 1 0 0-13.5h9a9.75 9.75 0 1 0 0 13.5Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span class="truncate">Sertifikat</span>
                    </a>
                </li>
                <li>
                    {{-- Badges --}}
                    <a href="{{ route('admin.badges.index') }}" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold {{ request()->routeIs('admin.badges.*') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600' }}">
                        <svg class="size-6 shrink-0 {{ request()->routeIs('admin.badges.*') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600' }}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.602-.36-3.112-.984-4.425" />
                        </svg>
                        <span class="truncate">Badges</span>
                    </a>
                </li>
            </ul>
        </li>
        <li>
            <div class="text-xs/6 font-semibold text-gray-400">User Management</div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li>
                    {{-- Users --}}
                    <a href="{{ route('admin.users.index') }}" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold {{ request()->routeIs('admin.users.*') ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50' }}">
                        <svg class="size-6 shrink-0 {{ request()->routeIs('admin.users.*') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600' }}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Z" />
                        </svg>
                        Users
                    </a>
                </li>
            </ul>
        </li>
        <li class="-mx-6 mt-auto">
            <a href="#" class="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50">
                <img class="size-8 rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                <span class="sr-only">Your profile</span>
                <span aria-hidden="true">{{ auth()->user()->name }}</span>
            </a>
        </li>
    </ul>
</nav>
        </div>
    </div>

    <div class="sticky top-0 z-40 flex items-center px-4 py-4 bg-white shadow-sm gap-x-6 sm:px-6 lg:hidden">
        {{-- PERUBAHAN: Menambahkan ID pada tombol hamburger --}}
        <button id="open-sidebar-btn" type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
        <div class="flex-1 text-sm font-semibold text-gray-900">Dashboard</div>
        <a href="#">
            <span class="sr-only">Your profile</span>
            <img class="w-8 h-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="">
        </a>
    </div>

    <main class="lg:pl-72">
        {{-- Header Anda mungkin ada di sini atau di dalam app.blade.php --}}
        @include('admin.layouts.header')
        <div class="px-4 py-5 sm:px-6 lg:px-8">
            @yield('content')
        </div>
    </main>
</div>

@push('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Ambil semua elemen yang dibutuhkan
            const openBtn = document.getElementById('open-sidebar-btn');
            const closeBtn = document.getElementById('mobile-close-btn');
            const sidebar = document.getElementById('mobile-sidebar');
            const backdrop = document.getElementById('sidebar-backdrop');
            const sidebarPanel = document.getElementById('mobile-sidebar-panel');

            if (!sidebar) return; // Hentikan jika elemen tidak ada

            const openSidebar = () => {
                sidebar.classList.remove('hidden');
                // Gunakan timeout kecil agar transisi berjalan setelah display berubah
                setTimeout(() => {
                    backdrop.classList.remove('opacity-0');
                    backdrop.classList.add('opacity-100');
                    sidebarPanel.classList.remove('-translate-x-full');
                    sidebarPanel.classList.add('translate-x-0');
                    closeBtn.parentElement.classList.remove('opacity-0');
                    closeBtn.parentElement.classList.add('opacity-100');
                }, 10);
            };

            const closeSidebar = () => {
                backdrop.classList.remove('opacity-100');
                backdrop.classList.add('opacity-0');
                sidebarPanel.classList.remove('translate-x-0');
                sidebarPanel.classList.add('-translate-x-full');
                closeBtn.parentElement.classList.remove('opacity-100');
                closeBtn.parentElement.classList.add('opacity-0');
                // Sembunyikan elemen setelah transisi selesai (300ms)
                setTimeout(() => {
                    sidebar.classList.add('hidden');
                }, 300);
            };

            // Tambahkan event listener
            openBtn.addEventListener('click', openSidebar);
            closeBtn.addEventListener('click', closeSidebar);
            backdrop.addEventListener('click', closeSidebar);
        });
    </script>
@endpush
