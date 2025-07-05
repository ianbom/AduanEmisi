<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg" href="/LogoBaru.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap"
        rel="stylesheet" />

    <title>@yield('title', 'Admin - EcoTrack')</title>

    @vite(['resources/css/app.css'])

</head>
<body class="bg-gray-100">
    <div>
        {{-- @include('admin.layouts.header') --}}
        @include('admin.layouts.sidebar')

    </div>

    @include('admin.layouts.footer')

    @yield('scripts')
</body>
</html>
