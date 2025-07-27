<nav class="flex flex-1 flex-col">
    <ul role="list" class="flex flex-1 flex-col gap-y-7">
         <li>
            <div class="text-xs/6 font-semibold text-emerald-200">Dashboard</div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li>
                    {{-- Dashboard --}}
                    <a href="{{ route('admin.dashboard.index') }}" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold {{ request()->routeIs('admin.dashboard.*') ? 'bg-emerald-800 text-white' : 'text-emerald-100 hover:text-white hover:bg-emerald-800' }}">
                        <svg class="size-6 shrink-0 {{ request()->routeIs('admin.dashboard.*') ? 'text-white' : 'text-emerald-300 group-hover:text-white' }}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">

                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        Dashboard
                    </a>
                </li>

            </ul>
        </li>
        <li>
            <div class="text-xs/6 font-semibold text-emerald-200">Reports and Missions</div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li>
                    {{-- Reports --}}
                    <a href="{{ route('admin.reports.index') }}" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold {{ request()->routeIs('admin.reports.*') ? 'bg-emerald-800 text-white' : 'text-emerald-100 hover:text-white hover:bg-emerald-800' }}">
                        <svg class="size-6 shrink-0 {{ request()->routeIs('admin.reports.*') ? 'text-white' : 'text-emerald-300 group-hover:text-white' }}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 5.25 6h.008a2.25 2.25 0 0 1 2.242 2.135 48.42 48.42 0 0 1-.334 6.114A2.25 2.25 0 0 1 7.12 16.5h-.008a2.25 2.25 0 0 1-2.242-2.135 48.36 48.36 0 0 1 .334-6.114A2.251 2.251 0 0 1 5.25 6Z" />
                        </svg>
                        Reports
                    </a>
                </li>
                <li>
                    {{-- Missions --}}
                    <a href="{{ route('admin.missions.index') }}" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold {{ request()->routeIs('admin.missions.*') ? 'bg-emerald-800 text-white' : 'text-emerald-100 hover:text-white hover:bg-emerald-800' }}">
                        <svg class="size-6 shrink-0 {{ request()->routeIs('admin.missions.*') ? 'text-white' : 'text-emerald-300 group-hover:text-white' }}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M5.834 19.834l-1.591-1.591M3.75 10.5H6m11.935-4.666l-3.84-3.84A1.5 1.5 0 0 0 12 2.25h-1.5a4.5 4.5 0 0 0-4.5 4.5v1.5a1.5 1.5 0 0 0 1.066 1.415l3.84 3.84m-4.667-4.667L6 12m6-6l3.84-3.84" />
                        </svg>
                        Missions
                    </a>
                </li>

                <li>
                    {{-- Content --}}
                    <a href="{{ route('admin.contents.index') }}" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold {{ request()->routeIs('admin.contents.*') ? 'bg-emerald-800 text-white' : 'text-emerald-100 hover:text-white hover:bg-emerald-800' }}">
                        <svg class="size-6 shrink-0 {{ request()->routeIs('admin.contents.*') ? 'text-white' : 'text-emerald-300 group-hover:text-white' }}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        Content
                    </a>
                </li>
            </ul>
        </li>
        <li>
            <div class="text-xs/6 font-semibold text-emerald-200">Sertifikat dan Badges</div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li>
                    {{-- Sertifikat --}}
                    <a href="{{ route('admin.certificates.index') }}" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold {{ request()->routeIs('admin.certificates.*') ? 'bg-emerald-800 text-white' : 'text-emerald-100 hover:text-white hover:bg-emerald-800' }}">
                        <svg class="size-6 shrink-0 {{ request()->routeIs('admin.certificates.*') ? 'text-white' : 'text-emerald-300 group-hover:text-white' }}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 1 0 0-13.5h9a9.75 9.75 0 1 0 0 13.5ZM16.5 18.75h-9a9.75 9.75 0 1 0 0-13.5h9a9.75 9.75 0 1 0 0 13.5Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span class="truncate">Sertifikat</span>
                    </a>
                </li>
                <li>
                    {{-- Badges --}}
                    <a href="{{ route('admin.badges.index') }}" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold {{ request()->routeIs('admin.badges.*') ? 'bg-emerald-800 text-white' : 'text-emerald-100 hover:text-white hover:bg-emerald-800' }}">
                        <svg class="size-6 shrink-0 {{ request()->routeIs('admin.badges.*') ? 'text-white' : 'text-emerald-300 group-hover:text-white' }}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.602-.36-3.112-.984-4.425" />
                        </svg>
                        <span class="truncate">Badges</span>
                    </a>
                </li>
            </ul>
        </li>
        <li>
            <div class="text-xs/6 font-semibold text-emerald-200">User Management</div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li>
                    {{-- Users --}}
                    <a href="{{ route('admin.users.index') }}" class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold {{ request()->routeIs('admin.users.*') ? 'bg-emerald-800 text-white' : 'text-emerald-100 hover:text-white hover:bg-emerald-800' }}">
                        <svg class="size-6 shrink-0 {{ request()->routeIs('admin.users.*') ? 'text-white' : 'text-emerald-300 group-hover:text-white' }}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Z" />
                        </svg>
                        Users
                    </a>
                </li>
            </ul>
        </li>
        <li class="-mx-6 mt-auto">
            <a href="#" class="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-emerald-100 hover:bg-emerald-800 hover:text-white">
                <img class="size-8 rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                <span class="sr-only">Your profile</span>
                <span aria-hidden="true">{{ auth()->user()->name }}</span>
            </a>
        </li>
    </ul>
</nav>
